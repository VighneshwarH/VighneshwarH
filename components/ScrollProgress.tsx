'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-1 bg-transparent">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
        style={{ transition: 'width 0.1s linear' }}
      />
    </div>
  );
}
