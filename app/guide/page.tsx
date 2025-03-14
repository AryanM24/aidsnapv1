'use client';
import { useState } from 'react';
import { 
  ChevronDown, 
  Badge, 
  Thermometer, 
  Scissors, 
  Heart,
  Droplet,
  Bone,
  Brain,
  Bug,
  Sun,
  Snowflake,
  Eye,
  Skull,
  Zap,
  AlertCircle
} from 'lucide-react';
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
    {
      title: 'Nosebleeds',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Sit up straight and lean forward slightly (do not tilt head back)</li>
            <li>Pinch your nostrils together for 10-15 minutes</li>
            <li>Breathe through your mouth while applying pressure</li>
            <li>Apply a cold compress to the bridge of your nose</li>
            <li>Avoid blowing your nose for a few hours after bleeding stops</li>
          </ol>
        </div>
      ),
      icon: Droplet,
    },
    {
      title: 'Fractures',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Keep the injured area still and do not try to realign the bone</li>
            <li>Cover any open wounds with a clean cloth</li>
            <li>Apply a splint if trained to do so</li>
            <li>Use ice packs (wrapped in cloth) to reduce swelling</li>
          </ol>
          <div className="mt-3 p-3 bg-red-100 rounded">
            <p className="text-red-800">🚨 Seek immediate medical attention</p>
          </div>
        </div>
      ),
      icon: Bone,
    },
    {
      title: 'Concussions',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Remove person from physical activity immediately</li>
            <li>Keep them awake and monitor for confusion, dizziness, or vomiting</li>
            <li>Apply a cold pack to any bumps or bruises</li>
            <li>Avoid bright screens and loud noises during recovery</li>
          </ol>
          <div className="mt-3 p-3 bg-yellow-100 rounded">
            <p className="text-yellow-800">⚠️ Seek medical attention if symptoms worsen or persist</p>
          </div>
        </div>
      ),
      icon: Brain,
    },
    {
      title: 'Insect Bites & Stings',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Remove stinger (if present) with tweezers or by scraping with a card</li>
            <li>Wash the area with soap and water</li>
            <li>Apply a cold compress to reduce swelling</li>
            <li>Take an antihistamine if swelling or itching is severe</li>
          </ol>
          <div className="mt-3 p-3 bg-red-100 rounded">
            <p className="text-red-800">🚨 Seek medical help if signs of allergic reaction appear</p>
          </div>
        </div>
      ),
      icon: Bug,
    },
    {
      title: 'Heat Exhaustion',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Move person to a cool, shaded area</li>
            <li>Have them drink cool water (not ice-cold)</li>
            <li>Apply cool, wet cloths to the skin or use a fan</li>
            <li>Loosen tight clothing</li>
          </ol>
          <div className="mt-3 p-3 bg-red-100 rounded">
            <p className="text-red-800">🚨 Call emergency services if person becomes confused or stops sweating</p>
          </div>
        </div>
      ),
      icon: Sun,
    },
    {
      title: 'Hypothermia',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Move person to a warm place and remove wet clothing</li>
            <li>Wrap them in blankets or use body heat</li>
            <li>Give warm (not hot) drinks if conscious</li>
            <li>Do not apply direct heat to the skin</li>
          </ol>
          <div className="mt-3 p-3 bg-red-100 rounded">
            <p className="text-red-800">🚨 Seek immediate medical help if disoriented or unconscious</p>
          </div>
        </div>
      ),
      icon: Snowflake,
    },
    {
      title: 'Eye Injuries',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Do not rub the eye</li>
            <li>Rinse the eye with clean water or saline</li>
            <li>Blink repeatedly to try to remove object naturally</li>
          </ol>
          <div className="mt-3 p-3 bg-red-100 rounded">
            <p className="text-red-800">🚨 If object is embedded, do not remove - seek medical attention</p>
          </div>
        </div>
      ),
      icon: Eye,
    },
    {
      title: 'Poisoning',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Call Poison Control or emergency services immediately</li>
            <li>Do not induce vomiting unless directed by professionals</li>
            <li>If poison is on skin, wash area with water</li>
            <li>If inhaled, move person to fresh air immediately</li>
          </ol>
        </div>
      ),
      icon: Skull,
    },
    {
      title: 'Electric Shock',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>Do not touch person while still in contact with electrical source</li>
            <li>Turn off power source if possible</li>
            <li>Call emergency services immediately</li>
            <li>If person is unconscious and not breathing, begin CPR</li>
            <li>Look for burns and treat accordingly</li>
          </ol>
        </div>
      ),
      icon: Zap,
    },
    {
      title: 'Allergic Reactions',
      content: (
        <div className="space-y-3">
          <ol className="list-decimal pl-5">
            <li>If person has an EpiPen, help them use it immediately</li>
            <li>Call emergency services even if symptoms improve</li>
            <li>Lay person down and elevate legs (if no breathing difficulty)</li>
            <li>Loosen tight clothing</li>
            <li>If breathing stops, begin CPR</li>
          </ol>
        </div>
      ),
      icon: AlertCircle,
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