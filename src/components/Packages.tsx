import React, { useState } from "react";
import { TOUR_PACKAGES } from "../data";
import { TourPackage } from "../types";
import { Clock, Tag, MapPin, CheckCircle, HelpCircle, X } from "lucide-react";

interface PackagesProps {
  onSelectPackage: (packageId: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onSelectPackage }) => {
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  return (
    <section className="py-16 bg-white" id="tour-packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest font-mono mb-2 block">
            Approved Tour Packages
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Darshnam Curated Pilgrimage & Sightseeing Yatras
          </h2>
          <p className="mt-3 text-slate-500 text-xs sm:text-sm md:text-base font-sans">
            Meticulously planned travel packages with complete local transport, VIP temple entry support, and comfortable boutique lodging. Perfect for family pilgrimages, temple rituals, and scenic tours.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOUR_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Photo top card */}
              <div className="h-56 relative opacity-95">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                {/* Duration Badge */}
                <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 font-mono uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{pkg.duration}</span>
                </span>
                {/* Start Price Tag */}
                <div className="absolute bottom-4 right-4 bg-slate-900 text-white border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 block font-mono uppercase">Starting at</span>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    ₹{pkg.priceStarting.toLocaleString("en-IN")}
                  </span>
                </div>
                {/* Destinations Overlay */}
                <div className="absolute bottom-4 left-4 text-white text-xs font-semibold flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{pkg.destinations.join(" → ")}</span>
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed font-sans font-normal">
                    {pkg.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider font-mono block">
                    Tour Key Perks
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-slate-700 text-xs font-medium font-sans">
                    {pkg.highlights.slice(0, 3).map((item, id) => (
                      <div key={id} className="flex items-start gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-slate-600 truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inner actions */}
                <div className="flex gap-3 pt-2">
                  {/* Detailed specs button */}
                  <button
                    onClick={() => setSelectedTour(pkg)}
                    className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-950 font-sans font-semibold text-xs transition-colors hover:bg-slate-50 text-center cursor-pointer"
                  >
                    View Full Itinerary
                  </button>
                  {/* Instant Book CTA */}
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-xs transition-colors shadow-sm text-center cursor-pointer"
                  >
                    Book Yatra
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay for Detailed Itinerary */}
        {selectedTour && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full flex flex-col max-h-[90vh] shadow-2xl border border-slate-100 overflow-hidden relative">
              
              {/* Header inside overlay */}
              <div className="p-5 border-b border-slate-100 bg-slate-900 text-white flex justify-between items-center text-left">
                <div>
                  <span className="text-amber-400 text-[10px] uppercase font-bold tracking-widest font-mono">
                    Sacred Itinerary Guide ({selectedTour.duration})
                  </span>
                  <h3 className="text-lg font-bold font-display tracking-tight text-white mt-0.5">
                    {selectedTour.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTour(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable specs */}
              <div className="p-6 overflow-y-auto space-y-6 text-left">
                {/* Mini cover illustration */}
                <div className="h-44 w-full rounded-xl overflow-hidden relative">
                  <img src={selectedTour.imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10"></div>
                  <div className="absolute bottom-4 left-4 text-white text-xs flex gap-4 font-semibold items-center">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      <span>{selectedTour.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      <span className="truncate max-w-[200px] sm:max-w-xs">{selectedTour.destinations.join(" • ")}</span>
                    </span>
                  </div>
                </div>

                {/* Day-by-day Itinerary tracker block */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b pb-1">
                    Day-By-Day Schedule Breakdown
                  </h4>
                  <div className="space-y-4">
                    {selectedTour.detailedItinerary.map((dayPlan) => (
                      <div key={dayPlan.day} className="flex gap-4">
                        <div className="shrink-0 flex flex-col items-center">
                          <span className="h-8 w-8 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-sm flex items-center justify-center border-2 border-white shadow shadow-amber-500/20 select-none">
                            {dayPlan.day}
                          </span>
                          <div className="w-0.5 flex-1 bg-slate-200 mt-2"></div>
                        </div>
                        <div className="pt-0.5">
                          <h5 className="font-bold text-slate-900 text-sm font-display">
                            {dayPlan.title}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed font-sans">
                            {dayPlan.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions and exclusions */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b pb-1">
                    Inclusions & Sacred Perks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedTour.inclusions.map((inc, id) => (
                      <div key={id} className="flex gap-2 items-start text-xs font-semibold text-slate-700">
                        <span className="text-emerald-500 shrink-0 text-base mt-[-2px]">✓</span>
                        <span className="font-sans font-medium text-slate-600">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Quote Alert */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 border-l-4 border-l-amber-500 flex gap-3">
                  <Tag className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs">All-Inclusive Transparent Booking</h5>
                    <p className="text-[11px] text-amber-800 font-sans mt-0.5">
                      Fares quoted online already encompass executive private vehicles with professional drivers, fuel prices, toll gate passes, state entry clearances, and customer coordination.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTAs inside overlay */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block tracking-widest font-mono uppercase text-left">Starting price</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">
                    ₹{selectedTour.priceStarting.toLocaleString("en-IN")}*
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedTour(null)}
                    className="px-4 py-2 border rounded-lg text-xs font-semibold text-slate-600 hover:bg-white cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onSelectPackage(selectedTour.id);
                      setSelectedTour(null);
                    }}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm shadow-amber-600/10"
                  >
                    Book Package Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
