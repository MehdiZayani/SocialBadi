"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

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
        gsap.ticker.remove(updateTicker);
        (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    return () => {
      gsap.ticker.remove(updateTicker);
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
