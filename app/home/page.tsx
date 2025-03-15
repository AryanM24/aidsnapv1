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
import {Header} from '../components/Header'; // Adjust the path as necessary
import { useState } from 'react';

// Define the widgets data structure
const widgets = [
  {
    id: 'analyze',
    title: 'Analyze an injury',
    icon: Camera,
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    href: '/',
    badge: '✓',
    keywords: ['analyze', 'injury', 'camera', 'photo', 'scan', 'check']
  },
  {
    id: 'scan',
    title: 'Scan for Resources',
    icon: ScanLine,
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    href: '/scan',
    badge: '🔎',
    keywords: ['scan', 'resources', 'find', 'locate', 'search']
  },
  {
    id: 'emergency',
    title: 'Emergency Contact Assistant',
    icon: Phone,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    href: '/call_log',
    badge: '📱',
    description: 'Contact Assistant',
    keywords: ['emergency', 'contact', 'phone', 'call', 'help', 'assistance']
  },
  {
    id: 'guide',
    title: 'Interactive First Aid Guide',
    icon: BookOpen,
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
    href: '/guide',
    badge: '📖',
    description: 'First Aid Guide',
    keywords: ['guide', 'interactive', 'first aid', 'help', 'instructions']
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredWidgets = widgets.filter(widget => {
    if (!searchQuery) return true;
    const searchTerms = searchQuery.toLowerCase().split(' ');
    return searchTerms.every(term =>
      widget.keywords.some(keyword => keyword.toLowerCase().includes(term)) ||
      widget.title.toLowerCase().includes(term) ||
      (widget.description && widget.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />

      <main className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="card-base button-hover p-3 flex items-center">
            <Search className="text-neutral-400 w-5 h-5 mr-2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="w-full bg-transparent text-neutral-300 focus:outline-none placeholder:text-neutral-500"
            />
          </div>
        </div>

        {/* Tagline with Dropdown */}
        {!searchQuery && (
          <div className="space-y-3">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="card-base button-hover p-4 flex justify-between items-center w-full"
            >
              <h2 className="text-lg font-medium text-neutral-200">Be Prepared, Anywhere, Anytime</h2>
              <ChevronRight className={`text-neutral-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>

            {isExpanded && (
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
            )}
          </div>
        )}

        {/* Quick Action Widgets */}
        <div className="space-y-3">
          {filteredWidgets.map(widget => (
            <Link key={widget.id} href={widget.href} className="block">
              <div className="card-base button-hover p-4 flex items-center">
                <div className={`w-10 h-10 ${widget.iconBg} rounded-xl flex items-center justify-center mr-3`}>
                  <widget.icon className={`${widget.iconColor} w-5 h-5`} />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-neutral-300">{widget.title}</span>
                  {widget.description && (
                    <div className="text-sm text-neutral-400">{widget.description}</div>
                  )}
                </div>
                <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center">
                  <span className="text-neutral-400 text-xs">{widget.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        {!searchQuery && (
          <div className="text-center text-sm text-neutral-500 pt-2">
            <Link href="/learn-more" className="hover:text-neutral-300 transition-colors">
              Learn more
            </Link> or{" "}
            <Link href="/settings" className="underline hover:text-neutral-300 transition-colors">
              change settings
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}