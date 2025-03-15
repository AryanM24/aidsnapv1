"use client"

import { Camera, ScanLine, Maximize2, BotIcon as Robot, Heart, Droplet, Flame, ImageIcon, Mic, Send, Copy, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { PWAInstallPrompt } from "./components/pwa-install-prompt"
import { ServiceWorkerRegistration } from "./components/service-worker"
import { Header } from "./components/Header"
import { ClientWrapper } from "./components/ClientWrapper"
import ReactMarkdown from 'react-markdown'

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Define quick prompts with icons
const quickPrompts = [
  {
    icon: Robot,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    text: "Step-by-step instructions to reduce swelling and pain."
  },
  {
    icon: Heart,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    text: "Find out how to perform hands-only CPR in under a minute."
  },
  {
    icon: Droplet,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    text: "Tips to clean and protect cuts to avoid infection."
  },
  {
    icon: Flame,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    text: "Get step-by-step guidance for treating minor burns."
  }
]

const formatResponse = (text: string) => {
  // Enhanced formatting for medical responses
  return text
    .replace(/•/g, '\n•')
    .replace(/(\d+\.|-)(?!\s*\n)/g, '\n$1')
    .replace(/R\.I\.C\.E\./g, '**R.I.C.E.**')
    .replace(/(Warning|Caution|Note):/g, '**$1:**')
    .replace(
      /(seek medical attention|call 911|emergency|immediately)/gi,
      '**$1**'
    );
};

export default function Home() {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return
    
    const userMessage = { role: 'user', content: message }
    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
      });

      const prompt = `You are AidSnap, a medical first aid assistant. Provide clear, step-by-step guidance for first aid situations. If the situation is severe, recommend seeking emergency care. Current query: ${message}`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
      });

      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: text 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again or seek immediate medical attention if this is an emergency.' 
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    if ('webkitSpeechRecognition' in window) {
      // Implement speech recognition
      console.log("Voice input toggled")
    }
  }

  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("Image selected:", file)
      }
    }
    input.click()
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }
  
  const handleMenuClick = () => {
    // Handle menu click, for example navigate to settings
    router.push('/settings')
  }

  const handleQuickPrompt = (text: string) => {
    setMessage(text)
  }

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content)
    setCopiedMessageId(index)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  // Add responsive text handling
  const getInputPlaceholder = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 300) return "Type...";
      if (window.innerWidth < 350) return "Message...";
      return "Message to AidSnap...";
    }
    return "Message to AidSnap...";
  };

  return (
    <div className="relative h-[100dvh] w-full max-w-md mx-auto bg-neutral-900 flex flex-col overflow-hidden">
      <ServiceWorkerRegistration />
      <Header onMenuClick={handleMenuClick} />

      <main className="flex-1 px-4 flex flex-col gap-4 overflow-y-auto min-h-0">
        {/* Action Buttons */}
        {messages.length === 0 && (
          <>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => console.log("Camera clicked")}
                className="card-base button-hover flex-1 p-4 flex justify-center items-center"
              >
                <div className="icon-container bg-red-500/10 group-hover:bg-red-500/20">
                  <Camera className="text-red-400 w-5 h-5 group-hover:scale-110" />
                </div>
              </button>
              <button 
                onClick={() => console.log("Scan clicked")}
                className="card-base button-hover flex-1 p-4 flex justify-center items-center"
              >
                <div className="icon-container bg-red-500/10 group-hover:bg-red-500/20">
                  <ScanLine className="text-red-400 w-5 h-5 group-hover:scale-110" />
                </div>
              </button>
            </div>

            {/* Greeting */}
            <div className="text-neutral-300 text-lg font-medium py-2">
              What can I do for you?
            </div>

            {/* Quick Prompts */}
            <div className="grid grid-cols-2 gap-3 pb-4">
              {quickPrompts.map((prompt, index) => {
                const Icon = prompt.icon
                return (
                  <button 
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.text)}
                    className="card-base button-hover p-3 flex items-start gap-2 group"
                  >
                    <div className={`icon-container ${prompt.iconBg} group-hover:scale-110`}>
                      <Icon className={`${prompt.iconColor} w-4 h-4`} />
                    </div>
                    <div className="text-sm text-neutral-300 text-left group-hover:text-white">
                      {prompt.text}
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-4 py-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`group relative max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-red-500/20 text-red-200' 
                      : 'bg-neutral-800/30 text-neutral-200'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown 
                          components={{
                            strong: ({node, ...props}) => (
                              <span className="text-red-400 font-semibold" {...props} />
                            ),
                            li: ({node, ...props}) => (
                              <li className="my-1" {...props} />
                            ),
                          }}
                        >
                          {formatResponse(msg.content)}
                        </ReactMarkdown>
                      </div>
                      <div className="mt-3 pt-3 border-t border-neutral-700/30 flex justify-between items-center">
                        <button
                          onClick={() => handleCopyMessage(msg.content, index)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-700/50 hover:bg-neutral-700/70 transition-colors"
                        >
                          {copiedMessageId === index ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-neutral-400" />
                              <span className="text-xs text-neutral-400">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-red-200">{msg.content}</div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-800/30 text-neutral-200 p-4 rounded-2xl">
                  <span className="inline-block animate-pulse mr-1">●</span>
                  <span className="inline-block animate-pulse animation-delay-200 mr-1">●</span>
                  <span className="inline-block animate-pulse animation-delay-400">●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Message Input - Updated for better responsiveness */}
      <div className="p-2 sm:p-4 border-t border-neutral-800">
        <div className="card-base p-2 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={getInputPlaceholder()}
            className="bg-transparent text-neutral-300 min-w-0 flex-1 px-2 sm:px-3 outline-none 
                     placeholder:text-neutral-500 focus:placeholder:text-neutral-400 text-sm sm:text-base"
          />
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="p-1.5 sm:p-2 hover:bg-neutral-700/50 rounded-full transition-all" 
                onClick={handleImageUpload}>
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 hover:text-neutral-300" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-neutral-700/50 rounded-full transition-all" 
                onClick={handleVoiceInput}>
              <Mic className={`w-4 h-4 sm:w-5 sm:h-5 ${isListening ? 'text-red-400' : 'text-neutral-400'} 
                     hover:text-neutral-300`} />
            </button>
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="bg-red-500/10 text-red-400 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 
                   flex items-center gap-1 hover:bg-red-500/20 transition-all 
                   hover:scale-105 active:scale-95 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">Send</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <PWAInstallPrompt />
    </div>
  )
}