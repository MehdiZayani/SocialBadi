"use client";
// components/ScrollingButton.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScrollingButton = ({ text = "Contact Us", repeatCount = 10, className = "" }) => {
  const scrollerRef = useRef(null);
  const textRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const scroller = scrollerRef.current;
    const textElement = textRef.current;
    
    if (!scroller || !textElement) return;
    
    // Duplicate text to create seamless scrolling effect
    const repeatedText = text.repeat(repeatCount);
    textElement.innerText = repeatedText + repeatedText; // Double it to make loop seamless
    
    // Set up GSAP animation (paused by default)
    const textWidth = textElement.offsetWidth / 2;
    
    animationRef.current = gsap.to(textElement, {
      x: -textWidth,
      duration: 10, // Plus rapide que 10 secondes
      ease: "none",
      repeat: -1, // Infinite loop
      paused: true // Démarré en pause
    });
    
    // Cleanup
    return () => {
      animationRef.current?.kill();
    };
  }, [text, repeatCount]);
  
  // Gestion des événements hover
  const handleMouseEnter = () => {
    animationRef.current?.play();
  };
  
  const handleMouseLeave = () => {
    animationRef.current?.pause();
    gsap.to(textRef.current, { 
      x: 0, 
      duration: 0.5,
      ease: "power2.out" 
    });
  };
  
  return (
    <button 
      ref={scrollerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-52 relative overflow-hidden bg-black text-white py-4  rounded-full hover:bg-gray-800 transition-colors focus:outline-none ${className}`}
    >
      <div className="whitespace-nowrap overflow-hidden w-full">
        <div ref={textRef} className="inline-block"></div>
      </div>
    </button>
  );
};

export default ScrollingButton;