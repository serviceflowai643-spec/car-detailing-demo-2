import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Phone, MapPin, Zap, Trash2, ArrowDown, Bot } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  // Default to gemini-3.1-flash-lite for tasks that should happen super fast
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.1-flash-lite');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your AI Detailing Concierge for Pure Detailing UK in Chelmsford. How can I help you with our paint enhancement, ceramic coatings, or studio appointments today?`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isStreaming]);

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Chat history cleared. How can Alex, Nathan, and the team assist you today?`,
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isStreaming) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsStreaming(true);

    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMessage: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Pre-insert empty assistant message to stream into
    setMessages((prev) => [...prev, initialAssistantMessage]);

    try {
      // Connect to server-side streaming API using Server-Sent Events for super fast response
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          model: selectedModel,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Streaming connection failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId ? { ...m, content: accumulatedText } : m
                  )
                );
              }
            } catch {
              // Ignore partial chunk parse error
            }
          }
        }
      }

      if (!accumulatedText.trim()) {
        // Fallback if empty stream returned
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content:
                    'Pure Detailing UK is located at Unit 16, Yard, 1 Pool\'s Ln, Chelmsford CM1 3QL. Call Alex & Nathan on +44 7875 500935 for instant quotes and booking.',
                }
              : m
          )
        );
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  'We are located at Unit 16, Yard, 1 Pool\'s Ln, Chelmsford CM1 3QL. For exact quotes and availability, please call Alex & Nathan on +44 7875 500935 or submit our quote form!',
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const quickPrompts = [
    'Where is your studio in Chelmsford?',
    'What is Paint Enhancement?',
    'How do I request a quote?',
    'How do Ceramic Coatings work?',
  ];

  return (
    <>
      {/* 
        CLOSED STATE: STRICT RULES COMPLIANCE
        Desktop: 48px x 48px, Mobile: 44px x 44px
        Fixed bottom-right, ~20px from edges.
        ONLY show small circular AI logo. NO text labels, NO dock, NO preview message, NO extra buttons!
      */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-black shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-neutral-950 cursor-pointer border border-amber-300"
          aria-label="Open Detailing Assistant"
          title="Open AI Concierge"
        >
          <Sparkles className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[2.2]" />
        </button>
      )}

      {/* OPEN STATE: Multi-turn scrollable Gemini chat thread */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[410px] h-[560px] max-h-[85vh] flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950/98 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  Gemini Concierge
                </span>
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Alex & Nathan • Chelmsford CM1 3QL
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Clear History */}
              <button
                onClick={handleClearHistory}
                disabled={isStreaming}
                className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-30"
                title="Clear conversation history"
                aria-label="Clear chat history"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Model Selector Bar (Super Fast default: gemini-3.1-flash-lite) */}
          <div className="px-3 py-1.5 bg-neutral-900/60 border-b border-neutral-800/80 flex items-center justify-between text-[10px]">
            <span className="text-neutral-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-400" />
              Engine:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  selectedModel === 'gemini-3.1-flash-lite'
                    ? 'bg-amber-500 text-black shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Ultra-low latency instant responses"
              >
                ⚡ Super Fast (Flash Lite)
              </button>
              <button
                onClick={() => setSelectedModel('gemini-3.5-flash')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  selectedModel === 'gemini-3.5-flash'
                    ? 'bg-amber-500 text-black shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="General tasks"
              >
                🎯 Balanced
              </button>
              <button
                onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  selectedModel === 'gemini-3.1-pro-preview'
                    ? 'bg-amber-500 text-black shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Complex detailing technical inquiries"
              >
                🧠 Pro
              </button>
            </div>
          </div>

          {/* Quick Studio Bar */}
          <div className="px-3.5 py-1.5 bg-neutral-950/70 border-b border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-400" />
              Unit 16, Yard, 1 Pool's Ln
            </span>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Phone className="h-3 w-3" />
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>

          {/* Scrollable Message Thread (Multi-Turn History) */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs leading-relaxed"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium rounded-tr-none'
                      : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="text-[9px] text-neutral-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isStreaming && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs py-1">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse [animation-delay:0.2s]" />
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse [animation-delay:0.4s]" />
                <span className="text-[11px] text-neutral-500 ml-1">Streaming response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 border-t border-neutral-800/80 bg-neutral-900/30">
            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={isStreaming}
                  className="rounded-md bg-neutral-900/90 hover:bg-neutral-800 px-2.5 py-1 text-[10px] text-neutral-300 hover:text-white border border-neutral-800 transition-colors text-left disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-neutral-800 bg-neutral-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={isStreaming ? 'Generating response...' : 'Ask about services, paint correction, ceramic coatings...'}
                value={input}
                disabled={isStreaming}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-400 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-40 transition-colors cursor-pointer shrink-0 shadow-md"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
