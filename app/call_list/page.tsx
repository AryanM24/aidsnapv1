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
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <main className="flex-1 overflow-y-auto p-4">
          {/* Call List Section */}
          <div className="bg-neutral-800/30 rounded-2xl overflow-hidden">
            <div 
              className="p-5 flex justify-between items-center cursor-pointer hover:bg-neutral-700/30 transition-colors"
              onClick={() => toggleSection('Emergency Services')}
            >
              <h3 className="text-lg font-semibold text-neutral-200">Call List</h3>
              <div className="flex items-center">
                <span className="mr-3 text-neutral-400 text-sm">{emergencyContacts.length} contacts</span>
                <ChevronDown 
                  className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ease-in-out ${
                    expandedSections['Emergency Services'] ? 'transform rotate-180' : ''
                  }`} 
                />
              </div>
            </div>

            {expandedSections['Emergency Services'] && (
              <div className="px-3 pb-3 space-y-2">
                {emergencyContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className="flex flex-col cursor-pointer bg-neutral-700/20 hover:bg-neutral-700/30 p-4 rounded-xl transition-all duration-200 ease-in-out"
                    onClick={() => handleCall(contact.number)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-neutral-200 font-medium text-base mb-1">{contact.name}</div>
                        <div className="text-neutral-400 text-sm">{contact.number}</div>
                      </div>
                      <Phone className="w-5 h-5 text-neutral-400" />
                    </div>
                    {contact.description && (
                      <div className="text-sm text-neutral-500 mt-2">{contact.description}</div>
                    )}
                    {contact.id === "roadside" && (
                      <div className="text-sm text-neutral-500 mt-2">
                        (change in <span className="text-red-400 hover:text-red-300 transition-colors">privacy settings</span>)
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