"use client"

import { Camera, Menu } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-800/50 backdrop-blur-sm border-b border-neutral-700/50 p-4 
                    flex justify-between items-center">
        <Link 
          href="/home"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="bg-red-500/10 rounded-md p-1 w-8 h-8 
               
               flex items-center justify-center transition-all 
                        hover:bg-red-500/20 hover:scale-105">
            <Camera className="text-red-400 w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-neutral-200">AidSnap</span>
        </Link>
        <Link 
          href="/settings"
          className="p-2 hover:bg-neutral-700/50 rounded-full transition-all" 
        >
          <Menu className="w-6 h-6 text-neutral-400 hover:text-neutral-300" />
        </Link>
      </div>
      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-[72px]" />
    </>
  )
}