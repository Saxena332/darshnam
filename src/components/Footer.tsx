import React from "react";
import { Award, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  return (
    <footer className="bg-slate-950 text-white pt-12 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-left pb-10 border-b border-white/5">
        
        {/* Brand Block */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://darshnam.com/wp-content/uploads/2022/05/logo.png" 
              alt="Darshnam Tours Logo" 
              className="h-10 w-auto object-contain brightness-105"
              referrerPolicy="no-referrer"
            />
            <div className="border-l border-slate-800 pl-3 py-0.5">
              <h3 className="text-xs font-bold tracking-widest text-slate-100 font-sans uppercase">
                DARSHNAM TOURS
              </h3>
              <p className="text-[9px] text-slate-500 tracking-wider font-mono">
                REG JH-DEO/2018/8871
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm font-sans font-normal leading-relaxed max-w-sm">
            Jharkhand's accredited Destination Management Company (DMC). Specializing in VIP darshan packages, highway-tested fleets, and seamless intercity tourist cabs in Deoghar and Ranchi.
          </p>

          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-sans">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Official tourism accredited DMC transport vendor.</span>
          </div>
        </div>

        {/* Quick Links Blocks */}
        <div className="md:col-span-3 space-y-4 font-sans text-xs">
          <h4 className="font-bold text-brand-amber uppercase tracking-widest font-mono text-[10px]">
            Sacred Services
          </h4>
          <ul className="space-y-2 text-slate-300 font-medium font-sans">
            <li>
              <button onClick={() => onScrollToSection("booking-estimator")} className="hover:text-brand-teal transition-colors text-left cursor-pointer">
                Fare Calculator & estimator
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("tour-packages")} className="hover:text-brand-teal transition-colors text-left cursor-pointer">
                Holy Pilgrimage Tour Plans
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("fleet")} className="hover:text-brand-teal transition-colors text-left cursor-pointer">
                Sedan, SUV & Bus Fleets
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("ai-planner")} className="hover:text-brand-teal transition-colors text-slate-200 text-left flex items-center gap-1 cursor-pointer">
                AI Itinerary Planner
              </button>
            </li>
          </ul>
        </div>

        {/* Head Office contact block */}
        <div className="md:col-span-4 space-y-4 font-sans text-xs">
          <h4 className="font-bold text-slate-300 uppercase tracking-widest font-mono text-[10px]">
            Registrations & Head Office
          </h4>
          <div className="space-y-2.5 text-slate-400">
            <div className="flex gap-2 items-start">
              <MapPin className="h-4 w-3.5 text-brand-teal shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Darshnam Towers, Near Tower Chowk, opposite Satsang Ashram main gate block, Deoghar, Jharkhand, PIN - 814112, India.
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <a href="https://wa.me/917004499684" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                Hotline/WhatsApp: +91 70044 99684 (24/7 Available)
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <Mail className="h-3.5 w-3.5 text-brand-teal shrink-0" />
              <span>Email: darshnam.tours@gmail.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* SEO Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4 font-sans">
        <p className="max-w-2xl text-center md:text-left leading-relaxed">
          Popular Searches: Deoghar Airport taxi services • Jasidih Junction station drop codes • Baidyanath Jyotirlinga VIP Entry • Basukinath Dham travel guides • Parasnath Shikharji doli bookings • Rajrappa Chhinnamasta temple transport • Deoghar to Ranchi tour cabs • Jharkhand Destination Management Partner templates.
        </p>
        <p className="shrink-0 text-slate-400 font-medium">
          © {new Date().getFullYear()} Darshnam Tours. Designed & Built flawlessly.
        </p>
      </div>

    </footer>
  );
};
