"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!installPrompt) return

    await installPrompt.prompt()
    const choiceResult = await installPrompt.userChoice

    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true)
    }

    setInstallPrompt(null)
  }

  if (isInstalled || !installPrompt) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between w-full max-w-md">
        <div className="text-sm">Install AidSnap for offline access</div>
        <Button onClick={handleInstallClick} className="bg-red-400 hover:bg-red-500 text-white">
          Install
        </Button>
      </div>
    </div>
  )
}

