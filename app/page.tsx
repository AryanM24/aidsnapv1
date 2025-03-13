"use client"

import { Camera, Maximize2, BotIcon as Robot, Heart, Droplet, Flame, ImageIcon, Mic, Send } from "lucide-react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { PWAInstallPrompt } from "./components/pwa-install-prompt"
import { ServiceWorkerRegistration } from "./components/service-worker"
import { Header } from "./components/Header"
import { ClientWrapper } from "./components/ClientWrapper"

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

export default function Home() {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const router = useRouter()

  const handleSendMessage = () => {
    if (!message.trim()) return
    console.log("Sending message:", message)
    setMessage("")
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

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-neutral-900">
      <ServiceWorkerRegistration />
      <Header onMenuClick={function (): void {
        throw new Error("Function not implemented.")
      } } />

      <main className="flex-1 p-4 flex flex-col gap-6 overflow-y-auto">
      {/* Action Buttons */}
      <div className="flex gap-4 py-6">
        <button 
        onClick={() => console.log("Camera clicked")}
        className="card-base button-hover flex-1 p-6 flex justify-center items-center"
        >
        <div className="icon-container bg-red-500/10 group-hover:bg-red-500/20">
          <Camera className="text-red-400 w-6 h-6 group-hover:scale-110" />
        </div>
        </button>
        <button 
        onClick={() => console.log("Scan clicked")}
        className="card-base button-hover flex-1 p-6 flex justify-center items-center"
        >
        <div className="icon-container bg-red-500/10 group-hover:bg-red-500/20">
          <Maximize2 className="text-red-400 w-6 h-6 group-hover:scale-110" />
        </div>
        </button>
      </div>

      {/* Greeting */}
      <div className="text-neutral-300 text-xl font-medium">
        What can I do for you?
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-2 gap-4">
        {quickPrompts.map((prompt, index) => {
        const Icon = prompt.icon
        return (
          <button 
          key={index}
          onClick={() => setMessage(prompt.text)}
          className="card-base button-hover p-4 flex items-start gap-3 group"
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
      </main>

      {/* Message Input */}
      <div className="p-4 mt-auto">
      <div className="card-base p-2 flex items-center">
        <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message to AidSnap..."
        className="bg-transparent text-neutral-300 flex-1 px-3 outline-none 
             placeholder:text-neutral-500 focus:placeholder:text-neutral-400"
        />
        <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-neutral-700/50 rounded-full transition-all" 
            onClick={handleImageUpload}>
          <ImageIcon className="w-5 h-5 text-neutral-400 hover:text-neutral-300" />
        </button>
        <button className="p-2 hover:bg-neutral-700/50 rounded-full transition-all" 
            onClick={handleVoiceInput}>
          <Mic className={`w-5 h-5 ${isListening ? 'text-red-400' : 'text-neutral-400'} 
                 hover:text-neutral-300`} />
        </button>
        <button 
          onClick={handleSendMessage}
          className="bg-red-500/10 text-red-400 rounded-full px-4 py-2 
               flex items-center gap-1 hover:bg-red-500/20 transition-all 
               hover:scale-105 active:scale-95"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
        </div>
      </div>
      </div>

      <PWAInstallPrompt />
    </div>
  )
}

