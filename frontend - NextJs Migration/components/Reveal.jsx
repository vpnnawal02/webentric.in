'use client';
import { useEffect, useRef } from 'react';

export default function Reveal({ children, delay = 0, className = '', y = 28 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rv-y', `${y}px`);
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('rv-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y]);
  return (
    <div ref={ref} className={`rv ${className}`}>
      {children}
    </div>
  );
}
