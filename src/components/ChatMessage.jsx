import React from 'react';
import { Bot, User, Loader2 } from 'lucide-react';

export default function ChatMessage({ message, isLoading, isLastMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg">
          <Bot className="w-5 h-5" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-emerald-600 text-white rounded-tr-none'
            : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
        }`}
      >
        {message.content || (isLoading && isLastMessage ? (
          <span className="flex items-center space-x-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
          </span>
        ) : null)}
      </div>

      {isUser && (
        <div className="p-2 bg-slate-700 text-slate-300 rounded-lg">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}