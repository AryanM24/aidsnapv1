"use client"

import { 
  Search, 
  Camera, 
  ScanLine, 
  Phone, 
  BookOpen, 
  Download, 
  ChevronRight,
  Menu
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-neutral-800/50 backdrop-blur-sm border-b border-neutral-700/50 p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-all">
          <div className="bg-red-500/20 rounded-xl p-2 flex items-center justify-center">
            <Camera className="text-red-400 w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-neutral-200">AidSnap</h1>
        </Link>
        <button className="p-2 hover:bg-neutral-700/50 rounded-full transition-all">
          <Menu className="w-6 h-6 text-neutral-400 hover:text-neutral-300" />
        </button>
      </header>

      <main className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="card-base button-hover p-3 flex items-center">
            <Search className="text-neutral-400 w-5 h-5 mr-2" />
            <input 
              type="text" 
              placeholder="Search for first aid guides..." 
              className="w-full bg-transparent text-neutral-300 focus:outline-none placeholder:text-neutral-500"
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-between items-center">
          <Link href="/status" className="card-base button-hover p-4 flex flex-col items-center">
            <div className="text-red-400 text-xl font-bold">23</div>
            <div className="text-xs text-neutral-400">15 26</div>
          </Link>
          
          <Link href="/hours" className="card-base button-hover bg-red-500/10 text-red-400 px-6 py-3 rounded-full">
            <span>2:30 Hours</span>
          </Link>
          
          <Link href="/temperature" className="card-base button-hover p-4 flex items-center gap-2">
            <div className="text-red-400 text-xl font-bold">10°</div>
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
            </div>
          </Link>
        </div>

        {/* Tagline */}
        <Link href="/about" className="card-base button-hover p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-neutral-200">Be Prepared, Anywhere, Anytime</h2>
          <ChevronRight className="text-neutral-400" />
        </Link>

        {/* Highlight Card */}
        <div className="card-base p-6 bg-gradient-to-br from-red-500/10 to-blue-500/10">
          <div className="flex justify-between">
            <div className="w-2/3">
              <p className="text-neutral-300 font-medium mb-4">
                AI to analyze injuries and guide you through emergencies with ease.
              </p>
              <Link href="/">
                <button className="bg-red-500/20 text-red-400 rounded-full px-6 py-2 
                                 hover:bg-red-500/30 transition-all hover:scale-105 active:scale-95">
                  Chat Now
                </button>
              </Link>
            </div>
            <div className="w-1/3 relative">
              <div className="relative h-24">
                <div className="absolute right-0 top-0">
                  <div className="relative w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <div className="absolute w-8 h-8 bg-neutral-900/50 backdrop-blur-sm text-blue-400 
                                  font-bold flex items-center justify-center rounded-lg">+</div>
                  </div>
                </div>
                <div className="absolute right-4 bottom-0">
                  <div className="relative w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-neutral-900/50 backdrop-blur-sm text-red-400 
                                  font-bold flex items-center justify-center rounded-lg">+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="space-y-3">
          {/* Analyze an injury */}
          <Link href="/" className="block">
            <div className="card-base button-hover p-4 flex items-center">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center mr-3">
                <Camera className="text-red-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300 flex-1">Analyze an injury</span>
              <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center">
                <span className="text-neutral-400 text-xs">✓</span>
              </div>
            </div>
          </Link>

          {/* Scan for Resources */}
          <Link href="/scan" className="block">
            <div className="card-base button-hover p-4 flex items-center">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-3">
                <ScanLine className="text-green-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300 flex-1">Scan for Resources</span>
              <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center">
                <span className="text-neutral-400 text-xs">🔎</span>
              </div>
            </div>
          </Link>

          {/* Emergency Contact Assistant */}
          <Link href="/call_log" className="block">
            <div className="card-base button-hover p-4 flex items-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                <Phone className="text-blue-400 w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-neutral-300">Emergency</span>
                <br />
                <span className="font-medium text-neutral-300">Contact Assistant</span>
              </div>
              <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center">
                <span className="text-neutral-400 text-xs">📱</span>
              </div>
            </div>
          </Link>

          {/* Interactive First Aid Guide */}
          <Link href="/guide" className="block">
            <div className="card-base button-hover p-4 flex items-center">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-3">
                <BookOpen className="text-yellow-400 w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-neutral-300">Interactive</span>
                <br />
                <span className="font-medium text-neutral-300">First Aid Guide</span>
              </div>
              <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center">
                <span className="text-neutral-400 text-xs">📖</span>
              </div>
            </div>
          </Link>

          {/* Offline First Aid Library */}
          <Link href="/library" className="block">
            <div className="card-base button-hover p-4 flex items-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3">
                <Download className="text-purple-400 w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-neutral-300">Offline</span>
                <br />
                <span className="font-medium text-neutral-300">First Aid Library</span>
              </div>
              <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center">
                <span className="text-neutral-400 text-xs">🌐</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-neutral-500 pt-2">
          <Link href="/learn-more" className="hover:text-neutral-300 transition-colors">
            Learn more
          </Link> or{" "}
          <Link href="/settings" className="underline hover:text-neutral-300 transition-colors">
            change settings
          </Link>
        </div>
      </main>
    </div>
  );
}