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
import { useState, useEffect } from 'react';
import { getEmergencyContacts, EmergencyContact } from '../../lib/emergencyContacts';
import {Header} from '../components/Header'; // Adjust the path as necessary



export default function CallList() {
  // State to manage which sections are expanded
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'Previous 3 Year': true
  });

  // State for emergency contacts loaded from the library
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

  // Load emergency contacts on component mount
  useEffect(() => {
    setEmergencyContacts(getEmergencyContacts());
  }, []);

  // Function to toggle section expansion
  const toggleSection = (sectionName: string) => {
    setExpandedSections({
      ...expandedSections,
      [sectionName]: !expandedSections[sectionName]
    });
  };

  // Function to handle calling a number
  const handleCall = (number: string) => {
    // In a real app, you would use a proper phone API
    window.location.href = `tel:${number.replace(/[^\d+]/g, '')}`;
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Content */}
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

          {/* Downloaded Chats */}
          <Link href="/chat_log" className="p-4 flex items-center border-b border-neutral-700/50">
            <MessageCircle className="w-6 h-6 text-neutral-400 mr-2" />
            <h2 className="text-lg font-medium text-neutral-300">Downloaded Chats</h2>
          </Link>

          {/* Call List Header */}
          <Link href="/call_list" className="p-4 flex justify-between items-center border-b border-neutral-700/50">
            <h2 className="text-lg font-medium text-neutral-300">Call List</h2>
            <ChevronRight className="w-6 h-6 text-neutral-400" />
          </Link>

          {/* Previous 3 Year Section */}
          <div className="border-b border-neutral-700/50">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('Previous 3 Year')}
            >
              <h3 className="text-lg font-medium text-neutral-300">Previous 3 Year</h3>
              <div className="flex items-center">
                <span className="mr-2 text-neutral-400">{emergencyContacts.length}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-neutral-400 transition-transform ${
                    expandedSections['Previous 3 Year'] ? 'transform rotate-180' : ''
                  }`} 
                />
              </div>
            </div>

            {expandedSections['Previous 3 Year'] && (
              <div className="px-4 pb-4 space-y-4">
                {emergencyContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className="flex flex-col cursor-pointer hover:bg-neutral-800/30 p-2 rounded"
                    onClick={() => handleCall(contact.number)}
                  >
                    <div className="text-neutral-300 font-medium">{contact.number}</div>
                    <div className="text-neutral-500 italic">({contact.name})</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* You can add more sections here following the same pattern */}
        </main>
      </div>
    </div>
  );
}