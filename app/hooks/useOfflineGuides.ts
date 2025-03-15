import { useState, useEffect } from 'react';

export interface OfflineGuide {
  title: string;
  content: string;
  icon: string;
}

export function useOfflineGuides() {
  const [offlineGuides, setOfflineGuides] = useState<Record<string, OfflineGuide>>({});

  useEffect(() => {
    const saved = localStorage.getItem('offlineGuides');
    if (saved) {
      setOfflineGuides(JSON.parse(saved));
    }
  }, []);

  const saveGuide = (title: string, content: string, icon: string) => {
    const newGuides = {
      ...offlineGuides,
      [title]: { title, content, icon }
    };
    localStorage.setItem('offlineGuides', JSON.stringify(newGuides));
    setOfflineGuides(newGuides);
  };

  const removeGuide = (title: string) => {
    const newGuides = { ...offlineGuides };
    delete newGuides[title];
    localStorage.setItem('offlineGuides', JSON.stringify(newGuides));
    setOfflineGuides(newGuides);
  };

  const isGuideSaved = (title: string) => {
    return !!offlineGuides[title];
  };

  return { offlineGuides, saveGuide, removeGuide, isGuideSaved };
}
