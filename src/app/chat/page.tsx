'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import LoginModal from '@/components/LoginModal';
import AppLayout from '@/components/AppLayout';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const MAX_FREE_QUESTIONS = 30;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Check question limit
    if (questionCount >= MAX_FREE_QUESTIONS) {
      setShowLoginModal(true);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setQuestionCount((prev) => prev + 1);

    try {
      // Call the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Show login modal after 30 questions
      if (questionCount + 1 >= MAX_FREE_QUESTIONS) {
        setTimeout(() => {
          setShowLoginModal(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const useSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-4xl px-8 py-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Ask me anything about construction
            </h1>
            <p className="text-gray-600">
              Get instant answers about specifications, drawings, RFIs, submittals, and construction best practices
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-4xl px-8 py-8">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center py-20">
                <div className="text-center">
                  <div className="mx-auto mb-8 h-32 w-32 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 opacity-10"></div>
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">Start a conversation</h2>
                  <p className="mx-auto max-w-md text-gray-600">
                    Ask me anything about construction, electrical systems, specifications, or project management.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-sm font-semibold text-white">
                      CC
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-4">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <ChatInput
          onSend={sendMessage}
          onUseSuggestion={useSuggestion}
          disabled={isLoading || questionCount >= MAX_FREE_QUESTIONS}
        />
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </AppLayout>
  );
}
