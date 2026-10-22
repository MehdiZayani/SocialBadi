"use client";

import React, { useRef, useEffect } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number; // Distance multiplier
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    let rafId: number;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        el.style.transition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)";
        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center transition-shadow cursor-pointer select-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
