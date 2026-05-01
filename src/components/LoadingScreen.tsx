'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen({ onLoad }: { onLoad: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Timeout court pour test - remplacer par vrai chargement plus tard
    const timer = setTimeout(() => {
      setHidden(true);
      onLoad();
    }, 500); // ← 500ms pour test rapide

    return () => clearTimeout(timer);
  }, [onLoad]);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Neuraweb
        </h1>
        <div className="loading-bar">
          <div className="loading-bar-fill" style={{ animation: 'none', width: '100%' }} />
        </div>
      </div>
    </div>
  );
}