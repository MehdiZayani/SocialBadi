"use client";

import React, { useEffect, useRef } from "react";

export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Floating subtle particles for light theme (fewer on mobile to prevent TBT)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 14 : 26;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ["#3b82f6", "#6366f1", "#0284c7", "#8b5cf6"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.25 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles without expensive shadowBlur
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // 100px max distance squared (avoids Math.sqrt)
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.06;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    // Defer start slightly so initial page paint and critical hydration aren't blocked
    let startTimeout: NodeJS.Timeout;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => {
        animationFrameId = requestAnimationFrame(render);
      });
    } else {
      startTimeout = setTimeout(() => {
        animationFrameId = requestAnimationFrame(render);
      }, 300);
    }

    return () => {
      if (startTimeout) clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Light Theme Pastel Radial Ambient Glows */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[35%] -left-[10%] w-[700px] h-[700px] bg-gradient-to-tr from-sky-100/50 via-purple-100/30 to-transparent blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[5%] -right-[10%] w-[750px] h-[750px] bg-gradient-to-tl from-indigo-100/50 via-blue-100/30 to-transparent blur-[160px] rounded-full pointer-events-none" />

      {/* Modern Light Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
        }}
      />

      {/* Interactive Canvas for constellation nodes */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
