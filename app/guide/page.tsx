'use client';
import { useState } from 'react';
import { ChevronDown, Badge, Thermometer, Scissors, Heart } from 'lucide-react';
import {Header} from '../components/Header'; // Adjust the path as necessary

interface GuideSectionProps {
  title: string;
  content: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const GuideSection: React.FC<GuideSectionProps> = ({ title, content, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full flex items-center justify-between p-4 card-base button-hover"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-300">{title}</h3>
        </div>
        <ChevronDown
          className={`transform transition-transform text-neutral-400 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 card-base mt-1 text-neutral-300">{content}</div>
      </div>
    </div>
  );
};

export default function GuidePage() {
  const guideData = [
    {
      title: 'Minor Cuts and Scrapes',
      content: (
        <div className="space-y-3">
          <p>1. Clean the wound with soap and water</p>
          <p>2. Apply antibiotic ointment</p>
          <p>3. Cover with a sterile bandage</p>
          <p>4. Change bandage daily or when wet</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Watch Demo
          </button>
        </div>
      ),
      icon: Scissors,
    },
    {
      title: 'Burns',
      content: (
        <div className="space-y-3">
          <p>1. Cool the burn under cold running water</p>
          <p>2. Remove any jewelry or tight items</p>
          <p>3. Cover with a sterile gauze bandage</p>
          <p>4. Do not pop blisters</p>
          <div className="mt-3 p-3 bg-yellow-100 rounded">
            <p className="text-yellow-800">⚠️ Seek medical help if burn is severe</p>
          </div>
        </div>
      ),
      icon: Thermometer,
    },
    {
      title: 'Sprains',
      content: (
        <div className="space-y-3">
          <p>Remember RICE:</p>
          <ul className="list-disc pl-5">
            <li>Rest the injured area</li>
            <li>Ice for 20 minutes at a time</li>
            <li>Compress with an elastic bandage</li>
            <li>Elevate above heart level</li>
          </ul>
        </div>
      ),
      icon: Badge,
    },
    {
      title: 'Choking',
      content: (
        <div className="space-y-3">
          <p>For conscious person:</p>
          <ol className="list-decimal pl-5">
            <li>Stand behind the person</li>
            <li>Lean them forward</li>
            <li>Give 5 back blows</li>
            <li>Perform abdominal thrusts</li>
          </ol>
          <div className="mt-3 p-3 bg-red-100 rounded">
            <p className="text-red-800">🚨 Call emergency services if person loses consciousness</p>
          </div>
        </div>
      ),
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />
      <div className="max-w-3xl mx-auto p-6 pt-8">
        <h1 className="text-3xl font-bold mb-6 text-neutral-200">Quick First Aid Guide</h1>
        <div className="mb-6 p-4 bg-red-500/20 rounded-xl">
          <p className="text-red-400 font-medium">
            For emergencies, always call your local emergency services immediately.
          </p>
        </div>
        {guideData.map((section, index) => (
          <GuideSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
}