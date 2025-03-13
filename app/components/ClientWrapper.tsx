"use client"

import { useState } from "react"
import { Camera, Maximize2, BotIcon as Robot, Heart, Droplet, Flame, ImageIcon, Mic, Send } from "lucide-react"
import { QuickPrompt } from "../types"

interface ClientWrapperProps {
  quickPrompts: QuickPrompt[]
}

export function ClientWrapper({ quickPrompts }: ClientWrapperProps) {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
      }
      recognition.start()
    }
  }

  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Handle image upload
        console.log("Image selected:", file)
      }
    }
    input.click()
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Message Input */}
      <div className="p-4 mt-auto">
        <div className="bg-white rounded-full shadow-md p-2 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message to AidSnap..."
            className="text-gray-500 flex-1 px-3 outline-none"
          />
          <div className="flex items-center gap-2">
            <button className="p-2" onClick={handleImageUpload}>
              <ImageIcon className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2" onClick={handleVoiceInput}>
              <Mic className={`w-5 h-5 ${isListening ? 'text-red-400' : 'text-gray-400'}`} />
            </button>
            <button 
              onClick={() => {
                if (message.trim()) {
                  console.log("Sending message:", message)
                  setMessage("")
                }
              }}
              className="bg-red-400 text-white rounded-full px-4 py-2 flex items-center gap-1 hover:bg-red-500"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}