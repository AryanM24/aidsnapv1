"use client"

import { 
  ChevronRight,
  Menu,
  Camera,
  LogOut,
  User,
  MessageSquare,
  Phone,
  Palette,
  Globe,
  Shield,
  Home as HomeIcon,
  Settings as SettingsIcon,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {Header} from '../components/Header'; // Adjust the path as necessary


export default function Settings() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <Header />

      <main className="p-4 space-y-6 pb-6">
        {/* Settings Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-neutral-200">Settings</h2>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center space-y-3 py-4">
          <div className="relative">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-neutral-200/20"></div>
            </div>
            <button className="absolute bottom-0 right-0 bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-xs">✏️</span>
            </button>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-neutral-200">Lucas Hu</h3>
            <p className="text-neutral-400 text-sm">@lucashu3</p>
          </div>
        </div>

        {/* Settings Items */}
        <div className="space-y-4">
          {/* Account */}
          <Link href="/account" className="card-base button-hover p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                <User className="text-blue-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Account</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </Link>

          {/* Chats */}
          <Link href="/" className="card-base button-hover p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-3">
                <MessageSquare className="text-green-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Chats</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </Link>

          {/* Recent Emergency Calls */}
          <Link href="/call_log" className="card-base button-hover p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center mr-3">
                <Phone className="text-red-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Recent Emergency Calls</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </Link>

          {/* Language */}
          <Link href="/language" className="card-base button-hover p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-3">
                <Globe className="text-yellow-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Language</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </Link>

          {/* Privacy & Security */}
          <Link href="/privacy" className="card-base button-hover p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center mr-3">
                <Shield className="text-cyan-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Privacy & Security</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </Link>

          {/* Log Out */}
          <Link href="/logout" className="card-base button-hover p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center mr-3">
                <LogOut className="text-red-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Log Out</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}