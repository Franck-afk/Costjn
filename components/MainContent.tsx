import React, { useState, useRef, useLayoutEffect } from 'react';
import Menu from './Menu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MainContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animations
      const tl = gsap.timeline();
      
      tl.from(".hero-text-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5 // Wait for preloader
      })
      .from(".hero-image-reveal", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      }, "-=1");

      // 2. Scroll Animations for Sections
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out"
        });
      });

      // 3. Image Parallax
      const parallaxImages = gsap.utils.toArray('.parallax-img');
      parallaxImages.forEach((img: any) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          },
          y: -50,
          ease: "none"
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full min-h-screen flex flex-col bg-[#EFEEEE] text-[#1A1A1A]">
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 md:px-12 md:py-8 fixed top-0 w-full z-30 mix-blend-difference text-[#EFEEEE]">
        <div className="text-sm md:text-base font-medium tracking-wide uppercase">
          Jacob Grønberg
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="group flex flex-col items-end space-y-1.5 cursor-pointer p-2"
        >
          <span className="w-8 h-[2px] bg-[#EFEEEE] group-hover:w-10 transition-all duration-300"></span>
          <span className="w-6 h-[2px] bg-[#EFEEEE] group-hover:w-10 transition-all duration-300"></span>
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex flex-col md:flex-row pt-24 md:pt-0">
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pl-24 md:pr-12 z-10">
          <h1 className="text-[12vw] md:text-[7vw] leading-[0.9] font-light text-[#D66A63] mb-4">
            <div className="overflow-hidden"><span className="hero-text-line block">Jacob</span></div>
            <div className="overflow-hidden"><span className="hero-text-line block font-normal">Grønberg</span></div>
          </h1>
          <div className="overflow-hidden mb-12">
            <p className="hero-text-line text-lg md:text-xl tracking-[0.2em] uppercase text-[#1A1A1A]">
              Photographer <br /> & Visual Artist
            </p>
          </div>

          <div className="hero-text-line relative flex items-center mt-8 md:mt-16">
             <div className="relative w-24 h-32 md:w-32 md:h-40 overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" 
                  alt="Portrait" 
                  className="w-full h-full object-cover grayscale"
                />
             </div>
             <div className="text-xs uppercase tracking-wider font-medium mr-4">
               Hi, I'm Jacob
             </div>
             <button className="relative w-24 h-24 md:w-32 md:h-32 bg-[#D66A63] rounded-full text-white text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center hover:scale-110 transition-transform duration-300 ml-[-2rem] mt-12 shadow-xl z-20">
               Work <br/> With Me
             </button>
          </div>
        </div>

        {/* Right Column (Hero Image) */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80" 
            alt="Dancer" 
            className="hero-image-reveal w-full h-full object-cover grayscale contrast-110"
          />
          <div className="absolute bottom-12 left-12 flex flex-col items-center animate-bounce">
             <div className="h-16 w-[1px] bg-[#D66A63]"></div>
             <span className="text-[10px] uppercase tracking-widest mt-4 text-[#1A1A1A]">Scroll Down <br/> & Explore</span>
          </div>
        </div>
      </header>

      {/* SERVICES SECTION */}
      <section className="py-24 px-8 md:px-24 reveal-section">
        <div className="flex justify-center md:justify-start mb-16">
          <span className="text-xs uppercase tracking-widest text-gray-500">— Services</span>
        </div>
        
        <div className="space-y-16 max-w-4xl mx-auto">
          {[
            { id: '01', title: 'PHOTO SHOOTING', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: '02', title: 'VIDEO EDITING', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: '03', title: 'ART DIRECTION', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
          ].map((service) => (
            <div key={service.id} className="flex flex-col md:flex-row border-b border-gray-300 pb-12 group hover:border-[#D66A63] transition-colors duration-500">
               <div className="text-[#D66A63] text-xl md:text-2xl font-light font-mono mb-4 md:mb-0 md:w-32">{service.id}</div>
               <div className="md:w-1/3">
                  <h3 className="text-2xl md:text-3xl font-light uppercase mb-4">{service.title}</h3>
               </div>
               <div className="md:w-1/2">
                  <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base">{service.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST WORK */}
      <section className="py-24 px-8 md:px-12 bg-[#F5F5F5] reveal-section">
        <div className="flex justify-between items-end mb-24 md:px-12">
           <h2 className="text-4xl md:text-7xl uppercase font-light">
             Latest <span className="text-[#D66A63] font-serif-accent italic font-normal">Work</span>
           </h2>
           <button className="hidden md:flex items-center text-xs uppercase tracking-widest hover:text-[#D66A63] transition-colors">
             View All <span className="ml-2">→</span>
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12 md:px-12">
          {[
            { title: "DANCING IN", sub: "BLACK & White", img: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80", loc: "New York", date: "October 2021" },
            { title: "STYLE", sub: "& Fashion", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80", loc: "New York", date: "October 2021" },
            { title: "WEEK", sub: "Fashion", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", loc: "New York", date: "October 2021" },
            { title: "ONE", sub: "Eye", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80", loc: "New York", date: "October 2021" },
          ].map((work, idx) => (
             <div key={idx} className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}>
               <h3 className="text-xl md:text-2xl uppercase font-light mb-6">
                 {work.title} <span className="text-[#D66A63] font-serif-accent italic">{work.sub}</span>
               </h3>
               <div className="overflow-hidden mb-6 aspect-[3/4]">
                 <img 
                   src={work.img} 
                   alt={work.title} 
                   className="parallax-img w-full h-[115%] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                 />
               </div>
               <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wide border-t border-gray-300 pt-4">
                  <span>{work.loc}</span>
                  <span>{work.date}</span>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* EXHIBITIONS */}
      <section className="py-24 px-8 md:px-24 reveal-section">
        <div className="flex justify-between items-end mb-16 border-b border-black pb-8">
           <h2 className="text-4xl md:text-6xl uppercase font-light">
             Exhibitions <span className="text-[#D66A63] font-serif-accent italic">'22</span>
           </h2>
           <button className="hidden md:flex items-center text-xs uppercase tracking-widest hover:text-[#D66A63] transition-colors">
             View All <span className="ml-2">→</span>
           </button>
        </div>

        <div className="space-y-4">
          {[
            { 
              city: "New York", venue: "Town Hall", year: "2022",
              title: "INDEPENDENT", sub: "Beauty",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt.",
              month: "Jun", day: "16" 
            },
            { 
              city: "Berlin", venue: "Kunsthalle", year: "2022",
              title: "IN HUMANITY WE", sub: "Trust",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod.",
              month: "Mar", day: "02" 
            },
            { 
              city: "Berlin", venue: "Kunsthalle", year: "2022",
              title: "BERLIN AT", sub: "Night",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor.",
              month: "Feb", day: "01" 
            },
          ].map((ex, i) => (
            <div key={i} className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-12 border-b border-gray-200 hover:bg-white transition-colors duration-300 md:px-8 -mx-8 px-8">
              {/* Image Preview on Hover (Desktop only logic could be added) */}
              <div className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <img src={`https://images.unsplash.com/photo-151${i}834107812-67b0b7c58434?auto=format&fit=crop&w=200&q=80`} className="w-full h-full object-cover grayscale rounded-full" />
              </div>

              <div className="md:pl-32 flex-1">
                 <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                   {ex.city} — {ex.venue} — {ex.year}
                 </div>
                 <h3 className="text-2xl md:text-4xl uppercase font-light mb-4">
                   {ex.title} <span className="text-[#D66A63] font-serif-accent italic">{ex.sub}</span>
                 </h3>
                 <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                   {ex.desc}
                 </p>
              </div>

              <div className="flex items-center mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                 <a href="#" className="text-[10px] uppercase tracking-widest text-[#D66A63] border border-[#D66A63]/30 px-4 py-2 rounded-full mr-8 hover:bg-[#D66A63] hover:text-white transition-all">
                   Buy Ticket ↗
                 </a>
                 <div className="text-right">
                    <div className="text-[#D66A63] text-sm md:text-base font-serif-accent">{ex.month}</div>
                    <div className="text-[#D66A63] text-4xl md:text-5xl font-light">{ex.day}</div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-8 md:px-24 bg-[#F2F2F2] reveal-section">
         <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-12 md:mb-0">
              <h2 className="text-4xl md:text-6xl uppercase font-light leading-tight">
                What My <br/> Clients <span className="text-[#D66A63] font-serif-accent italic font-normal">Say</span>
              </h2>
              <div className="mt-8 text-xs uppercase tracking-widest text-gray-500">
                Worked with over <span className="text-[#D66A63]">50 Clients</span> <br/> Around the world
              </div>
              <button className="mt-8 px-6 py-3 border border-[#D66A63] text-[#D66A63] rounded-full text-[10px] uppercase tracking-widest hover:bg-[#D66A63] hover:text-white transition-all">
                Work With Me →
              </button>
            </div>

            <div className="md:w-2/3 space-y-16">
              {[
                { name: "Michelle Lindstrom", role: "Photoshoot", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim lobortis scelerisque fermentum.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" },
                { name: "Jannis Jackson", role: "Art Direction", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
                { name: "Daniela Berg", role: "Video Editing", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
              ].map((client, i) => (
                <div key={i} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
                   <img src={client.img} alt={client.name} className="w-16 h-16 grayscale object-cover" />
                   <div>
                      <div className="text-[#D66A63] text-4xl font-serif-accent mb-4">“</div>
                      <h4 className="text-xl font-light mb-1">I Really Enjoyed Working With Jacob</h4>
                      <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 max-w-lg">
                        {client.quote}
                      </p>
                      <div className="text-[10px] uppercase tracking-widest text-gray-400">
                        {client.name} — {client.role}
                      </div>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-32 px-8 text-center bg-[#EFEEEE] relative overflow-hidden reveal-section">
         <div className="relative inline-block">
             <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D66A63] rounded-full flex items-center justify-center text-white text-xs uppercase tracking-widest text-center leading-relaxed cursor-pointer hover:scale-110 transition-transform duration-300 z-10 shadow-2xl">
               Get In <br/> Touch
             </div>
             <h2 className="text-5xl md:text-8xl uppercase font-light leading-none pl-24">
               Let's Work <br/> <span className="text-[#D66A63] font-serif-accent italic font-normal">Together</span>
             </h2>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EFEEEE] pt-12 pb-8 px-8 md:px-24 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
           <div className="mb-12 md:mb-0">
             <h3 className="text-[#D66A63] text-4xl md:text-5xl uppercase leading-none mb-2">
               Jacob <br/> Grønberg
             </h3>
             <span className="text-[10px] uppercase tracking-widest text-gray-500">Photograph & Visual Artist</span>
           </div>

           <div className="flex space-x-16 md:space-x-32 text-xs uppercase tracking-widest text-[#1A1A1A]">
              <div className="flex flex-col space-y-4">
                 <h4 className="text-[#D66A63] mb-2">Menu</h4>
                 <a href="#" className="hover:text-[#D66A63]">Home</a>
                 <a href="#" className="hover:text-[#D66A63]">Projects</a>
                 <a href="#" className="hover:text-[#D66A63]">Exhibitions</a>
                 <a href="#" className="hover:text-[#D66A63]">About</a>
                 <a href="#" className="hover:text-[#D66A63]">Contact</a>
              </div>
              <div className="flex flex-col space-y-4">
                 <h4 className="text-[#D66A63] mb-2">Info</h4>
                 <a href="#" className="hover:text-[#D66A63]">Styleguide</a>
                 <a href="#" className="hover:text-[#D66A63]">Licensing</a>
                 <a href="#" className="hover:text-[#D66A63]">Changelog</a>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-widest text-gray-400 border-t border-gray-300 pt-8">
           <div className="mb-4 md:mb-0">&copy; Made by Pawel Gola — Powered by Webflow</div>
           <div className="flex space-x-8">
              <a href="#" className="hover:text-[#D66A63]">Twitter</a>
              <a href="#" className="hover:text-[#D66A63]">Instagram</a>
              <a href="#" className="hover:text-[#D66A63]">Facebook</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default MainContent;