"use client";

import React, { useState, useEffect, useRef } from "react";

const GLYPHS = "01_/*$#&%><{}~^ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnHover?: boolean;
}

export default function TextScramble({
  text,
  className = "",
  speed = 30,
  triggerOnHover = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let iteration = 0;
    const maxIterations = text.length * 2.5;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2.5) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScrambling.current = false;
      }

      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    scramble();
  }, [text]);

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) scramble();
      }}
      className={`inline-block font-mono cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
}
