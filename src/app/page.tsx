'use client';

import { useState, useCallback } from 'react';
import PhoneCanvas from '@/components/PhoneCanvas';
import ScrollSequence from '@/components/ScrollSequence';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative bg-[#0a0a0a] min-h-screen">
      <LoadingScreen onLoad={handleLoad} />
      <PhoneCanvas isLoaded={isLoaded} />
      
      <div id="scroll-container" className="relative z-20" style={{ minHeight: '400vh' }}>
        <ScrollSequence />
      </div>
      
      <footer className="fixed bottom-6 left-0 right-0 text-center z-30 pointer-events-none">
        <p className="text-xs text-gray-600 font-mono tracking-widest uppercase">
          Scroll pour explorer • Neuraweb 2024
        </p>
      </footer>
    </main>
  );
}