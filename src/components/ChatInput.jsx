import React from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ChatInput({ input, setInput, onSubmit, isLoading, disabled }) {
  return (
    <footer className="p-4 bg-slate-800 border-t border-slate-700">
      <form onSubmit={onSubmit} className="max-w-4xl mx-auto flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled || isLoading}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white px-5 py-3 rounded-xl transition-colors flex items-center justify-center font-medium"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </footer>
  );
}