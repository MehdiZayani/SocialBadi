"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image1 from "@/images/salar_de_atacama.jpg";
import Image2 from "@/images/valle_de_la_muerte.jpeg";
import Image3 from "@/images/miscani_lake.jpeg";
import Image4 from "@/images/miniques_lagoon.jpg";

const projects = [
    { title: "Salar de Atacama", src: Image1 },
    { title: "Valle de la luna", src: Image2 },
    { title: "Miscanti Lake", src: Image3 },
    { title: "Miniques Lagoons", src: Image4 },
];

export default function Index() {
    const [selectedProject, setSelectedProject] = useState(0);
    const container = useRef(null);
    const imageContainer = useRef(null);
    const projectListRef = useRef(null);
    const projectRefs = useRef([]);
    
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Make sure elements exist
        if (!imageContainer.current || !container.current) return;

        // Get the actual height of your content
        const contentHeight = container.current.offsetHeight;
        const imageHeight = imageContainer.current.offsetHeight;

        ScrollTrigger.create({
            trigger: container.current,
            pin: imageContainer.current,
            start: "top top",
            end: () => `+=${contentHeight - imageHeight - 300}`,
            invalidateOnRefresh: true
        });

        // Set up scroll triggers for each project to change the image
        if (projectRefs.current.length > 0 && projectListRef.current) {
            projectRefs.current.forEach((project, index) => {
                if (!project) return;
                
                ScrollTrigger.create({
                    trigger: project,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setSelectedProject(index),
                    onEnterBack: () => setSelectedProject(index)
                });
            });
        }

        // If using Locomotive Scroll
        const locomotiveScroll = document.querySelector('[data-scroll-container]');
        if (locomotiveScroll) {
            ScrollTrigger.scrollerProxy(locomotiveScroll, {
                scrollTop(value) {
                    return arguments.length ? 
                        locomotiveScroll.scrollTo(value, 0, 0) : 
                        locomotiveScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return { 
                        top: 0, 
                        left: 0, 
                        width: window.innerWidth, 
                        height: window.innerHeight 
                    };
                }
            });

            ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
            ScrollTrigger.refresh();
        }

        return () => {
            ScrollTrigger.killAll();
            if (locomotiveScroll) {
                ScrollTrigger.removeEventListener('refresh', () => locomotiveScroll.update());
            }
        };
    }, []);

    // Initialize project refs array when component mounts
    useEffect(() => {
        projectRefs.current = projectRefs.current.slice(0, projects.length);
    }, []);

    return (
        <div ref={container} className="relative text-white p-5 md:p-8 lg:p-10 bg-black" data-scroll-section>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-5 lg:gap-8 h-auto md:h-96 lg:h-[700px]">
                <div ref={imageContainer} className="relative w-full md:w-1/2 lg:w-2/5 h-64 md:h-full">
                    <Image 
                        src={projects[selectedProject].src}
                        fill={true}
                        alt="project image"
                        priority={true}
                        className="object-cover"
                    />
                </div>
                <div className="w-full md:w-1/4 lg:w-1/5 flex items-start text-sm md:text-base lg:text-lg">
                    <p>Create Voice Agents for your business available 24/7 to answer questions, schedule an appointment, or complete a purchase.</p>
                </div>
                <div className="w-full md:w-1/4 lg:w-1/5 flex items-end text-xs md:text-sm lg:text-base">
                    <p>Meet your AI-powered growth partner—always on, always converting. Our hyper-responsive chatbot engages visitors with human-like conversations, instantly qualifies leads, and books discovery calls while you sleep. Powered by Mistral-7B AI running locally on military-grade encryption, it learns your unique sales playbook to deliver.</p>
                </div>
            </div>

            <div ref={projectListRef} className="flex flex-col relative mt-16 md:mt-32 lg:mt-48">
                {projects.map((project, index) => (
                    <div 
                        key={index} 
                        ref={el => projectRefs.current[index] = el}
                        onMouseOver={() => setSelectedProject(index)} 
                        className="w-full text-white uppercase text-xl md:text-2xl lg:text-4xl border-b border-white flex justify-end"
                    >
                        <h2 className="my-3 md:my-5 lg:mt-10 lg:mb-5 cursor-default">{project.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}