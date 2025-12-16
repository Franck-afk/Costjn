import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize timeline paused
      tl.current = gsap.timeline({ paused: true });

      tl.current
        // 1. Menu Slide Down
        .to(menuRef.current, {
          y: '0%',
          duration: 1.0,
          ease: 'power4.inOut',
        })
        // 2. Stagger in Navigation Items
        .from('.menu-item', {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.6')
        // 3. Fade in Footer/Header elements
        .from('.menu-peripheral', {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.8');
        
    }, menuRef);

    return () => ctx.revert();
  }, []);

  // Control animation based on isOpen prop
  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  const menuItems = [
    { id: '01', label: 'HOME', active: false },
    { id: '02', label: 'PROJECTS', active: false },
    { id: '03', label: 'EXHIBITIONS', active: true },
    { id: '04', label: 'ABOUT', active: false },
    { id: '05', label: 'CONTACT', active: false },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-40 bg-[#EFEEEE] w-full h-screen -translate-y-full flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-start p-8 md:p-12 menu-peripheral">
        <div className="text-xl font-medium tracking-wide text-[#1A1A1A] uppercase">
          Jacob Grønberg
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="group relative w-16 h-16 md:w-24 md:h-24 border border-[#D66A63] rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300"
        >
          <div className="relative w-6 h-6 md:w-8 md:h-8">
             <span className="absolute top-1/2 left-0 w-full h-[1px] bg-[#1A1A1A] rotate-45 transform origin-center"></span>
             <span className="absolute top-1/2 left-0 w-full h-[1px] bg-[#1A1A1A] -rotate-45 transform origin-center"></span>
          </div>
        </button>
      </div>

      {/* Center Navigation */}
      <nav className="flex-grow flex flex-col items-center justify-center space-y-2 md:space-y-6">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="menu-item flex items-baseline space-x-4 md:space-x-8 cursor-pointer group"
          >
            <span className="text-[#D66A63] text-lg md:text-2xl font-light font-mono">
              {item.id}
            </span>
            <span 
              className={`text-5xl md:text-8xl font-medium tracking-tight uppercase transition-colors duration-300 ${
                item.active 
                  ? 'text-[#D66A63]' 
                  : 'text-[#1A1A1A] group-hover:text-[#D66A63]/70'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="w-full flex flex-col md:flex-row justify-between items-end p-8 md:p-12 text-xs md:text-sm text-[#1A1A1A] uppercase tracking-wide menu-peripheral space-y-4 md:space-y-0">
        <div className="text-gray-500">
          &copy; Made by Pawel Gola — Powered by Webflow
        </div>
        <div className="flex space-x-6 md:space-x-12">
          <a href="#" className="hover:text-[#D66A63] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#D66A63] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#D66A63] transition-colors">Facebook</a>
        </div>
      </div>
    </div>
  );
};

export default Menu;