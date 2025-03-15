"use client"

import { Camera, ScanLine, Maximize2, BotIcon as Robot, Heart, Droplet, Flame, ImageIcon, Mic, Send, Copy, Check, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { PWAInstallPrompt } from "./components/pwa-install-prompt"
import { ServiceWorkerRegistration } from "./components/service-worker"
import { Header } from "./components/Header"
import { ClientWrapper } from "./components/ClientWrapper"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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

// Update the formatResponse function
const formatResponse = (text: string) => {
  return text
    // Handle bullet points
    .replace(/•/g, '\n•')
    // Ensure numbered lists start on new lines and have proper spacing
    .replace(/(\d+\.)\s*/g, '\n$1 ')
    // Handle warning/note headers
    .replace(/^(Warning|Important|Note):\s*/gm, '### $1: ')
    // Add consistent spacing around asterisks while preserving mid-word highlighting
    .replace(/\*\*(.*?)\*\*/g, (match, content) => {
      // Don't add spaces if asterisks are mid-word
      const hasLetterBefore = /[a-zA-Z]$/.test(text.charAt(text.indexOf(match) - 1));
      const hasLetterAfter = /^[a-zA-Z]/.test(text.charAt(text.indexOf(match) + match.length));
      
      if (hasLetterBefore && hasLetterAfter) {
        return match;
      }
      return ` ${match} `;
    })
    // Clean up any multiple spaces or newlines
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
};

export default function Home() {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string; image?: string | null }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if ((!message.trim() && !selectedImage) || isLoading) return
    
    setIsLoading(true)
    setIsTyping(true)

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      });

      let content;
      if (selectedImage) {
        const imageData = await selectedImage.arrayBuffer()
        const imageBase64 = Buffer.from(imageData).toString('base64')
        
        // Add image to messages immediately
        const userMessage = { 
          role: 'user', 
          content: message || "What do you see in this image?",
          image: imagePreview 
        }
        setMessages(prev => [...prev, userMessage])

        content = [{
          role: "user",
          parts: [
            { text: message || "What do you see in this image? Provide first aid advice if relevant." },
            {
              inlineData: {
                mimeType: selectedImage.type,
                data: imageBase64
              }
            }
          ]
        }]
      } else {
        const userMessage = { role: 'user', content: message }
        setMessages(prev => [...prev, userMessage])
        
        content = [{
          role: "user",
          parts: [{ text: `You are AidSnap, a medical first aid assistant. ${message}` }]
        }]
      }

      const result = await model.generateContent({
        contents: content,
        generationConfig,
      });

      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: text 
      }]);

      clearSelectedImage()
      setMessage("")
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false)
      setIsTyping(false)
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
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setSelectedImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
    }
    input.click()
  }

  const clearSelectedImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setSelectedImage(null)
    setImagePreview(null)
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

  const openImagePreview = (imageUrl: string) => {
    setPreviewImageUrl(imageUrl)
    setShowImagePreview(true)
  }

  return (
    <div className="relative h-[100dvh] w-full max-w-md mx-auto bg-neutral-900 flex flex-col overflow-hidden">
      <ServiceWorkerRegistration />
      <Header onMenuClick={handleMenuClick} />

      {/* Fixed Action Buttons with gradient transition */}
      <div className="sticky top-0 z-10 bg-neutral-900 px-4 pt-2 pb-4">
        <div className="flex gap-3">
          <button 
            onClick={handleImageUpload}
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
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-neutral-900 to-transparent" />
      </div>

      <main className="flex-1 px-4 flex flex-col gap-4 overflow-y-auto min-h-0">
        {/* Chat content starts slightly below the gradient */}
        <div className="pt-2">
          {messages.length === 0 && (
            <>
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
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start w-full'}`}
                >
                  {msg.role === 'user' ? (
                    <div className="max-w-[80%] space-y-2">
                      {msg.image && (
                        <div className="rounded-2xl overflow-hidden">
                          <img src={msg.image} alt="Uploaded" className="max-w-full h-auto" />
                        </div>
                      )}
                      <div className="p-4 rounded-2xl bg-red-500/20 text-red-200">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="h-px bg-neutral-700/30 mb-4" />
                      <ReactMarkdown 
                        components={{
                          strong: ({node, ...props}) => {
                            // Don't add margin if it's mid-word
                            const text = (props.children as string[])?.[0];
                            const inWord = text && 
                              /[a-zA-Z]/.test(text[0]) && 
                              /[a-zA-Z]/.test(text[text.length - 1]);
                            
                            return (
                              <span 
                                className={`text-red-500 font-bold ${inWord ? '' : '-mx-1'}`} 
                                {...props} 
                              />
                            );
                          },
                          li: ({node, ...props}) => (
                            <li className="my-2 text-neutral-200" {...props} />
                          ),
                          p: ({node, ...props}) => (
                            <p className="my-3 text-neutral-200" {...props} />
                          ),
                          h3: ({node, ...props}) => (
                            <h3 className="text-lg font-semibold text-yellow-500 my-2" {...props} />
                          ),
                          h1: ({node, ...props}) => (
                            <h1 className="text-xl font-bold text-neutral-100 my-3" {...props} />
                          ),
                          h2: ({node, ...props}) => (
                            <h2 className="text-lg font-semibold text-neutral-100 my-2" {...props} />
                          ),
                          ul: ({node, ...props}) => (
                            <ul className="my-2 ml-4 space-y-2 list-disc text-neutral-200" {...props} />
                          ),
                          ol: ({node, ...props}) => (
                            <ol className="my-2 ml-4 space-y-2 list-decimal text-neutral-200" {...props} />
                          ),
                        }}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {formatResponse(msg.content)}
                      </ReactMarkdown>
                      <div className="h-px bg-neutral-700/30 mt-4 mb-2" />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleCopyMessage(msg.content, index)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800/50 hover:bg-neutral-800/70 transition-colors"
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
                    </div>
                  )}
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
        </div>
      </main>

      {/* Gradient fade for bottom input */}
      <div className="h-4 bg-gradient-to-t from-neutral-900 to-transparent" />
      
      {/* Message Input - now without border */}
      <div className="bg-neutral-900 p-2 sm:p-4">
        {imagePreview && (
          <div className="mb-2 relative inline-block">
            <div 
              onClick={() => openImagePreview(imagePreview)}
              className="w-16 h-16 rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-neutral-700/50"
            >
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={clearSelectedImage}
              className="absolute -top-1.5 -right-1.5 p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition-colors border border-neutral-700/50"
            >
              <X className="w-3 h-3 text-neutral-300" />
            </button>
          </div>
        )}
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

      {/* Image Preview Modal */}
      {showImagePreview && previewImageUrl && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImagePreview(false)}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={previewImageUrl} 
              alt="Full Preview" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowImagePreview(false);
              }}
              className="absolute -top-2 -right-2 p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition-colors border border-neutral-700/50"
            >
              <X className="w-4 h-4 text-neutral-300" />
            </button>
          </div>
        </div>
      )}

      <PWAInstallPrompt />
    </div>
  )
}