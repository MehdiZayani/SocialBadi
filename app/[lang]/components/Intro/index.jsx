'use client';
import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroImage from "@/images/iconAi.gif";

export default function Index({ translations }) {
  const background = useRef(null);
  const introImage = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: background.current,
        scrub: true,
        start: "top 50%",
        end: "+=500px",
      },
    });
    
    timeline
      .from(background.current, { clipPath: `inset(15%)` })
      .to(introImage.current, { height: "12rem" }, 0); // Using rem for better responsiveness
      
    return () => {
      timeline.kill(); // Clean up
    };
  }, []);

  return (
    <div className="relative flex w-full justify-center">
      <div 
        ref={background}
        className="absolute w-full h-[140vh] brightness-[0.6] bg-black"
      >
      </div>
      <div className="relative flex justify-center mt-[35vh]">
        <div 
          ref={introImage}
          data-scroll 
          data-scroll-speed="0.3"
          className="absolute w-64 h-96 md:w-80 lg:w-96 brightness-[0.7]"
        >
          <Image
            src={IntroImage}
            alt="intro image"
            fill={true}
            priority={true}
            className="object-cover object-top"
          />
        </div>
        <h1 
          data-scroll 
          data-scroll-speed="0.7"
          className="text-4xl md:text-5xl lg:text-7xl text-white z-10 text-center whitespace-nowrap"
        >
          {translations?.sectionhome?.intro?.title || "Welcome"}
        </h1>
      </div>
    </div>
  );
}