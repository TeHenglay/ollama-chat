import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [model, setModel] = useState('');
  const chatEndRef = useRef(null);

  // Fetch installed models from Ollama container
  useEffect(() => {
    fetch('http://localhost:11434/api/tags')
      .then((res) => res.json())
      .then((data) => {
        if (data.models?.length > 0) {
          const names = data.models.map((m) => m.name);
          setAvailableModels(names);
          setModel(names[0]);
        }
      })
      .catch((err) => console.error('Error fetching models:', err));
  }, []);

  // Auto-scroll on new message chunk
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !model) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages([...updatedMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: updatedMessages, stream: true }),
      });

      if (!response.ok) throw new Error(`Ollama API error: ${response.statusText}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value, { stream: true }).split('\n').filter(Boolean);

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              assistantResponse += parsed.message.content;
              setMessages((prev) => {
                const newArr = [...prev];
                newArr[newArr.length - 1] = { role: 'assistant', content: assistantResponse };
                return newArr;
              });
            }
          } catch (err) {
            console.error('Failed to parse line:', err);
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${error.message}. Is Ollama running with OLLAMA_ORIGINS="*"?` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
      <Header 
        availableModels={availableModels} 
        selectedModel={model} 
        onSelectModel={setModel} 
      />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl w-full mx-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
            <Bot className="w-12 h-12 stroke-[1.5]" />
            <p className="text-lg">Start a conversation with your local model.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg}
              isLoading={isLoading}
              isLastMessage={idx === messages.length - 1}
            />
          ))
        )}
        <div ref={chatEndRef} />
      </main>

      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        disabled={!model}
      />
    </div>
  );
}