'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onUseSuggestion: (suggestion: string) => void;
  disabled?: boolean;
}

const SUGGESTIONS = [
  'What are the specifications for EMT conduit installation?',
  'How do I create an RFI for a drawing conflict?',
  'What documents do I need for a lighting submittal?',
  'Explain NEC Article 250 grounding requirements',
];

export default function ChatInput({ onSend, onUseSuggestion, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-8 py-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about conduit specifications, panel schedules, RFI management..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 text-[15px] leading-relaxed focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:bg-gray-100"
            style={{
              minHeight: '48px',
              maxHeight: '120px',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';
            }}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-7 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          >
            Send
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onUseSuggestion(suggestion)}
              disabled={disabled}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-all hover:border-primary-500 hover:bg-orange-50 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {suggestion.length > 40 ? suggestion.substring(0, 40) + '...' : suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
