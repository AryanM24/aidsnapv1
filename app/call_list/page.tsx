"use client"

import { 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Menu,
  Camera,
  Home as HomeIcon,
  MessageCircle,
  Phone,
  Download,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getEmergencyContacts, EmergencyContact } from '../../lib/emergencyContacts';
import {Header} from '../components/Header'; // Adjust the path as necessary


export default function EmergencyCallList() {
  // State to manage which sections are expanded
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'Emergency Services': true
  });

  // State for emergency contacts loaded from the library
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

  // Additional hard-coded emergency contacts to complement the library data
  const additionalContacts: EmergencyContact[] = [
    {
      id: "911",
      name: "United States National Emergency Services",
      number: "#911",
      description: "National emergency services"
    },
    {
      id: "gas",
      name: "National Gas Emergency Hotline",
      number: "#811",
      description: "For gas leaks and emergencies"
    },
    {
      id: "roadside",
      name: "AAA Roadside Assistance",
      number: "+1-800-222-4357",
      description: "change in privacy settings"
    },
    {
      id: "disaster",
      name: "Disaster Distress Helpline",
      number: "+1-800-985-5990",
      description: "For emotional distress related to disasters"
    },
    {
      id: "cdc",
      name: "CDC Information Hotline",
      number: "+1-800-232-4636",
      description: "Health information and guidance"
    }
  ];

  // Load emergency contacts on component mount
  useEffect(() => {
    // Get contacts from the library
    const libraryContacts = getEmergencyContacts();
    
    // Combine with additional contacts
    const allContacts = [...libraryContacts, ...additionalContacts];
    
    // Sort by ID for consistency
    allContacts.sort((a, b) => a.id.localeCompare(b.id));
    
    setEmergencyContacts(allContacts);
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
          {/* Call List Section */}
          <div className="border-b border-neutral-700/50">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-neutral-800/30 transition-colors"
              onClick={() => toggleSection('Emergency Services')}
            >
              <h3 className="text-lg font-medium text-neutral-300">Call List</h3>
              <div className="flex items-center">
                <span className="mr-2 text-neutral-400">{emergencyContacts.length}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-neutral-400 transition-transform ${
                    expandedSections['Emergency Services'] ? 'transform rotate-180' : ''
                  }`} 
                />
              </div>
            </div>

            {expandedSections['Emergency Services'] && (
              <div className="px-4 pb-4 space-y-4">
                {emergencyContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className="flex flex-col cursor-pointer hover:bg-neutral-800/30 p-2 rounded transition-colors"
                    onClick={() => handleCall(contact.number)}
                  >
                    <div className="text-neutral-300 font-medium">{contact.number}</div>
                    <div className="text-neutral-500 italic">{contact.name}</div>
                    {contact.id === "roadside" && (
                      <div className="text-sm text-neutral-500 mt-1">
                        (change in <span className="text-red-400 hover:text-red-300">privacy settings</span>)
                      </div>
                    )}
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