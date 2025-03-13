"use client"

import { 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Settings,
  MessageCircle,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from '../components/Header'; // Adjust the path as necessary

// Type for downloaded items
interface DownloadedItem {
  id: string;
  title: string;
  date: Date;
}

export default function DownloadedContent() {
  const downloadedItems: DownloadedItem[] = [
    { id: '1', title: 'How to be a better person?', date: new Date('2024-01-10T14:30:00') },
    { id: '2', title: 'Hacking FBI server with linux', date: new Date('2024-01-10T12:15:00') },
    { id: '3', title: 'How to get rich from youtube as an influencer', date: new Date('2024-01-09T16:45:00') },
    { id: '4', title: 'Help me with web development tasks from clients', date: new Date('2024-01-09T10:20:00') },
    { id: '5', title: 'REACT NEXTJS Tutorial', date: new Date('2024-01-08T18:30:00') },
    { id: '6', title: 'Mobile app prototypes library', date: new Date('2024-01-07T09:15:00') },
    { id: '7', title: 'ROM Types and uses', date: new Date('2024-01-06T11:45:00') },
    { id: '8', title: 'Fix SSL/TLS Error', date: new Date('2024-01-05T13:20:00') },
    { id: '9', title: 'Platform template for developers', date: new Date('2024-01-04T15:10:00') },
  ];

  const [isChatsExpanded, setIsChatsExpanded] = useState(true);
  const sortedItems = [...downloadedItems].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <main className="flex-1 overflow-y-auto">
          {/* Explore */}
          <Link href="/explore" className="p-4 flex items-center border-b border-neutral-700/50">
            <Settings className="w-6 h-6 text-neutral-400 mr-2" />
            <h2 className="text-lg font-medium text-neutral-300">Explore</h2>
          </Link>

          {/* My Downloaded Guides */}
          <Link href="/downloaded_guides" className="p-4 flex items-center border-b border-neutral-700/50">
            <Download className="w-6 h-6 text-neutral-400 mr-2" />
            <h2 className="text-lg font-medium text-neutral-300">My Downloaded Guides</h2>
          </Link>

          {/* Downloaded Chats with Dropdown */}
          <div className="border-b border-neutral-700/50">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setIsChatsExpanded(!isChatsExpanded)}
            >
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-neutral-400 mr-2" />
                <h2 className="text-lg font-medium text-neutral-300">Downloaded Chats</h2>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-neutral-400">{sortedItems.length} Total</span>
                <ChevronDown 
                  className={`w-6 h-6 text-neutral-400 transition-transform ${
                    isChatsExpanded ? 'transform rotate-180' : ''
                  }`} 
                />
              </div>
            </div>

            {isChatsExpanded && (
              <div className="px-4 pb-4 space-y-2">
                {sortedItems.map((item) => (
                  <div 
                    key={item.id}
                    className="py-3 cursor-pointer hover:bg-neutral-800/30 p-2 rounded"
                  >
                    <div className="text-neutral-300">{item.title}</div>
                    <div className="text-neutral-500 text-sm">
                      {item.date.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          
        </main>
      </div>
    </div>
  );
}