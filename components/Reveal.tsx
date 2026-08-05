'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  once?: boolean;
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up': return { x: 0, y: distance };
    case 'down': return { x: 0, y: -distance };
    case 'left': return { x: distance, y: 0 };
    case 'right': return { x: -distance, y: 0 };
    default: return { x: 0, y: 0 };
  }
};

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 40,
  className = '',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { x, y } = offset(direction, distance);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: visible ? 'translate(0,0)' : `translate(${x}px, ${y}px)`,
        opacity: visible ? 1 : 0,
        transition: `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 0.8s ease ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
