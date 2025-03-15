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
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <main className="flex-1 overflow-y-auto p-4">
          <div className="bg-neutral-800/30 rounded-2xl overflow-hidden">
            {/* Explore */}
            <Link href="/explore" className="p-5 flex items-center border-b border-neutral-700/30 hover:bg-neutral-700/30 transition-colors">
              <Settings className="w-5 h-5 text-neutral-400 mr-3" />
              <h2 className="text-base font-medium text-neutral-200">Explore</h2>
            </Link>

            {/* My Downloaded Guides */}
            <Link href="/downloaded_guides" className="p-5 flex items-center border-b border-neutral-700/30 hover:bg-neutral-700/30 transition-colors">
              <Download className="w-5 h-5 text-neutral-400 mr-3" />
              <h2 className="text-base font-medium text-neutral-200">My Downloaded Guides</h2>
            </Link>

            {/* Downloaded Chats */}
            <Link href="/chat_log" className="p-5 flex items-center border-b border-neutral-700/30 hover:bg-neutral-700/30 transition-colors">
              <MessageCircle className="w-5 h-5 text-neutral-400 mr-3" />
              <h2 className="text-base font-medium text-neutral-200">Downloaded Chats</h2>
            </Link>

            {/* Call List Header */}
            <Link href="/call_list" className="p-5 flex justify-between items-center border-b border-neutral-700/30 hover:bg-neutral-700/30 transition-colors">
              <h2 className="text-base font-medium text-neutral-200">Call List</h2>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </Link>

            {/* Previous 3 Year Section */}
            <div>
              <div 
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-neutral-700/30 transition-colors"
                onClick={() => toggleSection('Previous 3 Year')}
              >
                <h3 className="text-base font-medium text-neutral-200">Previous 3 Year</h3>
                <div className="flex items-center">
                  <span className="mr-3 text-neutral-400 text-sm">{emergencyContacts.length} calls</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ease-in-out ${
                      expandedSections['Previous 3 Year'] ? 'transform rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>

              {expandedSections['Previous 3 Year'] && (
                <div className="px-3 pb-3 space-y-2">
                  {emergencyContacts.map((contact) => (
                    <div 
                      key={contact.id}
                      className="flex flex-col cursor-pointer bg-neutral-700/20 hover:bg-neutral-700/30 p-4 rounded-xl transition-all duration-200 ease-in-out"
                      onClick={() => handleCall(contact.number)}
                    >
                      <div className="text-neutral-200 font-medium text-base">{contact.number}</div>
                      <div className="text-neutral-400 text-sm mt-1">{contact.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}