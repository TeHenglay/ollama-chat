import React from 'react';
import { Bot } from 'lucide-react';

export default function Header({ availableModels, selectedModel, onSelectModel }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
      <div className="flex items-center space-x-3">
        <Bot className="w-7 h-7 text-emerald-400" />
        <h1 className="text-xl font-bold tracking-wide">Local Ollama Workspace</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <label htmlFor="model-select" className="text-sm text-slate-400">Model:</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => onSelectModel(e.target.value)}
          className="bg-slate-700 text-sm border border-slate-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-100"
        >
          {availableModels.length > 0 ? (
            availableModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))
          ) : (
            <option value="">No models detected</option>
          )}
        </select>
      </div>
    </header>
  );
}