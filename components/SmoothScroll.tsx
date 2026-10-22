"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detect mobile touch devices: native touch scrolling is 120Hz hardware-accelerated
    // and prevents virtual scroll compositor lag or white blanking
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    if (isTouch) {
      // Expose a dummy scrollTo for mobile anchors
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // If an initial anchor hash exists in URL, scroll to it smoothly once layout is ready
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 0.9 });
        }
      }, 350);
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(rafId);
        (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    return () => {
      cancelAnimationFrame(rafId);
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
