import React, { useState } from "react";
import { Phone, MessageSquare, Compass, Calendar, Menu, X, Award, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface HeaderProps {
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Book Cabs", id: "booking-estimator" },
    { label: "Tour Packages", id: "tour-packages" },
    { label: "Fleet Showcase", id: "fleet" },
    { label: "AI Itinerary", id: "ai-planner" },
    { label: "Popular Destinations", id: "sightseeing" },
    { label: "Why Us", id: "why-choose-us" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Top micro bar representing Destination Management Company (DMC) Status */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-1.5 font-sans">
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold tracking-wide uppercase text-slate-300">
              Approved Destination Management Company (DMC) for Jharkhand
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-mono tracking-wider">
            <a href="https://wa.me/917004499684" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
              <span>24/7 WhatsApp: +91 70044 99684</span>
            </a>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand-amber" />
              <span>Head Office: Deoghar</span>
            </span>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex justify-between items-center">
          {/* Logo Brand area */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="flex items-center gap-3">
              <img 
                src="https://darshnam.com/wp-content/uploads/2022/05/logo.png" 
                alt="Darshnam Tours Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block border-l border-slate-200 pl-3 py-1">
                <p className="text-[10px] font-bold text-slate-850 uppercase tracking-widest font-sans">
                  DARSHNAM TOURS
                </p>
                <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  REG JH-DEO/2018/8871
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollToSection(item.id)}
                className="text-slate-600 hover:text-brand-teal font-sans font-medium text-sm transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Utility CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/917004499684?text=Hello%20Darshnam%20Tours,%20I'm%20interested%20in%20a%20taxi/tour%20package%20booking%20in%20Deoghar."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all font-sans font-medium text-xs shadow-sm hover:shadow"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Quick Inquiry CTA */}
            <button
              onClick={() => onScrollToSection("contact-section")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-teal hover:bg-brand-teal-hover text-white transition-all font-sans font-semibold text-xs shadow-sm shadow-teal-700/10 hover:shadow-teal-700/20"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Inquire & Reserve</span>
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="https://wa.me/917004499684?text=Hello%20Darshnam%20Tours"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-500/10"
              title="WhatsApp Chat"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-slate-800 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-4 space-y-2.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onScrollToSection(item.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-brand-teal font-sans font-medium text-sm transition-all"
              >
                {item.label}
              </button>
            ))}
            <hr className="border-slate-100 my-2" />
            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href="https://wa.me/917004499684?text=Hello%20Darshnam%20Tours"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all"
              >
                <WhatsAppIcon className="h-4 w-4 fill-white" />
                <span>Chat via WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  onScrollToSection("contact-section");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-brand-teal text-white font-semibold text-sm shadow-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Check Custom Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
