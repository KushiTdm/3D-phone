'use client';

import { useEffect, useRef } from 'react';
import { ThreeScene } from '@/lib/threeScene';

interface PhoneCanvasProps {
  isLoaded: boolean;
}

export default function PhoneCanvas({ isLoaded }: PhoneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || sceneRef.current) return;

    const scene = new ThreeScene(containerRef.current);
    sceneRef.current = scene;

    scene.loadModel('/models/neuraweb-phone_video.glb', '/videos/scroll-video.mp4')
      .catch(console.error);

    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  );
}