import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // 1. Initial State: Text is hidden "below" the visible area of its parent
      // using translate-y-full logic via CSS, but we ensure it here GSAP-wise.
      
      // 2. Entrance Animation: Text slides up
      tl.to([firstNameRef.current, lastNameRef.current], {
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15, // Delay between first and last name
        delay: 0.5
      });

      // 3. Hold/Pause
      tl.to({}, { duration: 1.0 });

      // 4. Exit Animation: Text slides further up and disappears
      tl.to([firstNameRef.current, lastNameRef.current], {
        y: "-100%",
        duration: 0.8,
        ease: "power3.in",
        stagger: 0.1
      });

      // 5. Container wipes away (Curtain reveal effect)
      tl.to(containerRef.current, {
        height: 0,
        duration: 1,
        ease: "power4.inOut",
        delay: -0.2 // Start slightly before text is fully gone
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#EFEEEE] overflow-hidden"
    >
      <div 
        ref={textContainerRef}
        className="flex flex-col items-center justify-center text-[#D66A63] font-medium"
      >
        {/* 
          Mask Container for "JACOB".
          overflow-hidden is crucial here to create the "reveal" effect.
        */}
        <div className="overflow-hidden mb-1">
          <div 
            ref={firstNameRef} 
            className="translate-y-[110%] text-2xl md:text-3xl tracking-[0.2em] uppercase leading-tight"
          >
            Jacob
          </div>
        </div>

        {/* Mask Container for "GRØNBERG" */}
        <div className="overflow-hidden">
          <div 
            ref={lastNameRef} 
            className="translate-y-[110%] text-2xl md:text-3xl tracking-[0.2em] uppercase leading-tight"
          >
            Grønberg
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;