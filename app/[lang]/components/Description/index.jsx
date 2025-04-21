"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

export default function Index({translations}) {
  const phrases = [
    translations?.sectionhome?.description?.text1,
    translations?.sectionhome?.description?.text2,
    translations?.sectionhome?.description?.text3,
    translations?.sectionhome?.description?.text4,
    translations?.sectionhome?.description?.text5,
  ];
   
  return (
    <div className=" relative text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase mt-40 md:mt-60 lg:mt-80 ml-8 sm:ml-12 md:ml-16 lg:ml-24">
      {
        phrases.map((phrase, index) => {
          return <AnimatedText key={index}>{phrase}</AnimatedText>
        })
      }
    </div>
  );
}

function AnimatedText({children}) {
  const text = useRef(null);
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=400px bottom",
      },
      opacity: 0,
      left: "-200px",
      ease: "power3.Out"
    });
  }, []);
  
  return <p ref={text} className="relative m-0">{children}</p>;
}