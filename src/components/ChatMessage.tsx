interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
          isUser
            ? 'bg-gray-900 text-white'
            : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
        }`}
      >
        {isUser ? 'You' : 'CC'}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[75%] rounded-xl px-5 py-4 ${
          isUser
            ? 'bg-gray-900 text-white'
            : 'border border-gray-200 bg-white text-gray-900 shadow-sm'
        }`}
      >
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
}
