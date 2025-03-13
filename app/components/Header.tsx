"use client"

import { Camera, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter()

  const handleMenuClick = () => {
    // Handle menu click, for example navigate to settings
    router.push('/settings')
  }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-800/50 backdrop-blur-sm border-b border-neutral-700/50 p-4 flex justify-between items-center">
        <Link href="/home" className="flex items-center gap-2 hover:opacity-80 transition-all">
          <div className="bg-red-500/20 rounded-xl p-2 flex items-center justify-center">
            <Camera className="text-red-400 w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-neutral-200">AidSnap</h1>
        </Link>
        <button 
          onClick={onMenuClick || handleMenuClick}
          className="p-2 hover:bg-neutral-700/50 rounded-full transition-all"
        >
          <Menu className="w-6 h-6 text-neutral-400 hover:text-neutral-300" />
        </button>
      </header>
      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-[72px]" />
    </>
  )
}