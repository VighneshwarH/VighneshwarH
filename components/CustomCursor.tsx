'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [data-cursor]');
      setHovering(!!interactive);
      const cursorLabel = interactive?.getAttribute('data-cursor-label');
      setLabel(cursorLabel || null);
    };

    const onLeave = () => setHidden(true);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s' }}
    >
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white mix-blend-difference"
        style={{ transition: 'width 0.2s, height 0.2s' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-white/70 mix-blend-difference"
        style={{
          width: hovering ? 56 : 40,
          height: hovering ? 56 : 40,
          marginLeft: hovering ? -8 : 0,
          marginTop: hovering ? -8 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, background-color 0.25s',
          backgroundColor: hovering ? 'rgba(255,255,255,0.08)' : 'transparent',
        }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
