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
import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header'; // Adjust the path as necessary

interface Language {
  name: string;
  description: string;
}

function LanguageSelector({ isOpen, onClose, onSelectLanguage }: {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage?: (language: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  const languages: Language[] = [
    { name: 'English', description: 'iPhone language' },
    { name: 'Español', description: 'Idioma del iPhone' },
    { name: 'Français', description: 'Langue de l\'iPhone' },
    { name: 'Deutsch', description: 'iPhone-Sprache' },
    { name: '中文', description: 'iPhone 语言' },
  ];

  // Set visibility based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    }

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLanguageSelect = (language: string) => {
    if (onSelectLanguage) {
      onSelectLanguage(language);
    }
    onClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop overlay for clicking outside */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Actual popup */}
      <div 
        ref={popupRef}
        className={`fixed inset-x-0 bottom-0 z-50 bg-neutral-800 rounded-t-xl shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-4 pb-8">
          <h2 className="text-center text-lg font-medium text-neutral-300 mb-4">
            Languages
          </h2>
          
          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => handleLanguageSelect(lang.name)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <div className="flex flex-col items-start">
                  <span className="text-neutral-200">{lang.name}</span>
                  <span className="text-sm text-neutral-400">{lang.description}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function PrivacySecurityPopup({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  const securityItems = [
    { label: 'Username', value: '@lucashu3' },
    { label: 'Password', value: '************' },
    { label: 'Phone Number', value: '+1 (732) 609 3389' },
    { label: 'Email', value: 'lucas.hu@gmail.com' },
    { label: 'Car Insurance', value: 'Lucas Hu, AAA' },
    { label: 'Health Insurance', value: 'Lucas Hu, Blue Cross Blue Shield' },
  ];

  // Set visibility based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    }

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop overlay for clicking outside */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Actual popup */}
      <div 
        ref={popupRef}
        className={`fixed inset-x-0 bottom-0 z-50 bg-neutral-800 rounded-t-xl shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-4 pb-8">
          <h2 className="text-center text-lg font-medium text-neutral-300 mb-4">
            Privacy and Security
          </h2>
          
          <div className="space-y-2">
            {securityItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <div className="flex flex-col items-start">
                  <span className="text-neutral-400 text-sm">{item.label}</span>
                  <span className="text-neutral-200">{item.value}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Settings() {
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

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
          <Link href="/chat_log" className="card-base button-hover p-4 flex items-center justify-between">
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

          {/* Language - Modified to open language selector */}
          <button 
            onClick={() => setIsLanguageSelectorOpen(true)} 
            className="card-base button-hover p-4 w-full flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-3">
                <Globe className="text-yellow-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Language</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </button>

          {/* Privacy & Security - Modified to open privacy popup */}
          <button 
            onClick={() => setIsPrivacyPopupOpen(true)}
            className="card-base button-hover p-4 w-full flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center mr-3">
                <Shield className="text-cyan-400 w-5 h-5" />
              </div>
              <span className="font-medium text-neutral-300">Privacy & Security</span>
            </div>
            <ChevronRight className="text-neutral-400 w-5 h-5" />
          </button>

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

      {/* Language Selector Popup */}
      <LanguageSelector 
        isOpen={isLanguageSelectorOpen} 
        onClose={() => setIsLanguageSelectorOpen(false)}
        onSelectLanguage={(language) => {
          setCurrentLanguage(language);
          console.log(`Selected language: ${language}`);
        }}
      />

      {/* Privacy and Security Popup */}
      <PrivacySecurityPopup
        isOpen={isPrivacyPopupOpen}
        onClose={() => setIsPrivacyPopupOpen(false)}
      />
    </div>
  );
}