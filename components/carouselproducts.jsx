"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

export default function CarouselProducts() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <>


      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="relative mt-8 sm:mt-12 lg:mt-16"
        >
          <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
            {[
              { bg: 'bg-agruline', title: 'AgruLine', desc:'PE piping systems'},
              { bg: 'bg-agruchem', title: 'Agruchem', desc:'Industrial piping systems'},
              { bg: 'bg-concreteprotection', title: 'Concrete protection', desc:'Concrete protective liners'},
              { bg: 'bg-ligningsystems', title: 'Ligning Systems', desc:'Geomembranes'},
              { bg: 'bg-purad', title: 'Purad', desc:'High-purity piping systems'},
              { bg: 'bg-semifinishedproducts', title: 'Semi-Finished Products' ,desc:'Sheets, round bars, wire, pipes'},
              { bg: 'bg-weldingsystems', title: 'Welding Systems' ,desc:'Premium welding machines'}
            ].map((item, index) => (
              <CarouselItem 
                key={index} 
                className="pl-1 sm:pl-2 md:pl-4 basis-4/5 sm:basis-2/3 md:basis-1/2 lg:basis-1/3 z-30"
              >
                <div className="flex justify-center items-center">
                  <div 
                    className={`w-64 sm:w-72 aspect-square ${item.bg} bg-cover object-cover object-center 
                      text-white text-center flex bg-center transition-transform duration-300 hover:scale-125`}
                  >
                    <div className="m-auto p-2 sm:p-4">
                      <h3 className="uppercase font-sans font-semibold text-xl sm:text-2xl md:text-3xl">
                        {item.title}
                      </h3>
                      <h5 className="text-sm sm:text-base md:text-xl mt-1 sm:mt-2">
                        {item.desc}
                      </h5>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Gradient overlays */}
          <div className="hidden sm:block bg-gradient-to-r from-white via-white/40 to-transparent 
            absolute left-0 top-0 w-16 sm:w-24 md:w-32 lg:w-48 h-full z-20" />
          <div className="hidden sm:block bg-gradient-to-l from-white via-white/40 to-transparent 
            absolute right-0 top-0 w-16 sm:w-24 md:w-32 lg:w-48 h-full z-20" />
          {/* Navigation buttons */}
          <CarouselPrevious className="hidden sm:flex absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30" />
          <CarouselNext className="hidden sm:flex absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30" />
        </Carousel>
      </div>
    </>
  )
}