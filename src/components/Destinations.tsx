import React, { useState } from "react";
import { POPULAR_DESTINATIONS } from "../data";
import { Destination } from "../types";
import { MapPin, CheckCircle, Info, Landmark } from "lucide-react";

interface DestinationsProps {
  onSelectRoute: (destinationId: string) => void;
}

export const Destinations: React.FC<DestinationsProps> = ({ onSelectRoute }) => {
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);

  // Quick facts database for interactive popovers
  const routingDispatches: Record<string, { guide: string; bestTime: string }> = {
    "baidyanath-temple": {
      guide: "Dress code: Traditional attire recommended (Dhoti for Men, Saree/Suits for Women). It is custom to carry SultanGanj Ganga Water in copper pots for consecration.",
      bestTime: "Early Morning (04:30 AM - 08:00 AM) or after 07:00 PM Shringar Aarti."
    },
    "basukinath": {
      guide: "Highly spiritual secondary shrine. Pilgrims normally offer milk (Dugdhabhishek) to Baba Basukinath here. It is quieter than Deoghar.",
      bestTime: "06:00 AM to 02:00 PM. Takes about 50 minutes one way from Deoghar via NH-114A."
    },
    "trikut-hills": {
      guide: "Check local forestry guides. The ropeway allows rapid vertical ascent. Ideal scenery looking over the Santhal Pargana forests. Monkey warning: keep belongings close.",
      bestTime: "08:30 AM to 03:00 PM for ropeway safety."
    },
    "tapovan-caves": {
      guide: "Walk through giant boulder gaps. A local ascetic guide is suggested to crawl through the narrowest inner rock chamber where rishis meditated.",
      bestTime: "Winter months, afternoon 01:00 PM to 04:30 PM."
    },
    "ranchi-falls": {
      guide: "Our premium outstation multi-day package. Hundru falls drop from majestic heights of the Subarnarekha river, safe view platforms available. Ensure booking our Innova SUV for mountain curves.",
      bestTime: "Post-monsoon (September to February) for full water volume."
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100" id="sightseeing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest font-mono mb-2 block">
            Jharkhand Tourism Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Must-Visit Sightseeing Landmarks Around Deoghar
          </h2>
          <p className="mt-3 text-slate-500 text-xs sm:text-sm md:text-base font-sans">
            As your dedicated Destination Management Partner (DMC), we ensure you get comprehensive coverage of Jharkhand's natural wonders, major waterfalls, and highly charged spiritual power seats.
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_DESTINATIONS.map((dest) => {
            const extraFacts = routingDispatches[dest.id];
            const isOpened = selectedDestId === dest.id;

            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Aspect Card Thumbnail */}
                  <div className="h-48 relative">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover saturate-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent"></div>
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-xs font-bold font-mono tracking-wider">
                      <MapPin className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                      <span>{dest.distanceDeoghar}</span>
                    </div>
                  </div>

                  {/* Core detail summary */}
                  <div className="p-5 text-left space-y-3">
                    <h3 className="font-bold text-slate-900 text-base font-display">
                      {dest.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-normal h-24 overflow-y-auto">
                      {dest.description}
                    </p>

                    {/* Check item tags */}
                    <div className="flex flex-wrap gap-1 py-1.5">
                      {dest.highlights.map((tag, id) => (
                        <span key={id} className="text-[9px] font-bold text-slate-700 bg-slate-50 border border-slate-100 py-1 px-2 rounded-md font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expanding Tips guidelines */}
                    {isOpened && extraFacts && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-slate-700 space-y-1.5 font-sans animate-in slide-in-from-top-2 duration-205">
                        <p><strong>Local Guidelines:</strong> {extraFacts.guide}</p>
                        <p><strong>Optimal Time:</strong> <span className="font-semibold text-amber-800">{extraFacts.bestTime}</span></p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Operations links */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => setSelectedDestId(isOpened ? null : dest.id)}
                    className="flex-1 py-1.5 border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 font-sans font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer hover:bg-white bg-slate-100/50 transition-colors"
                  >
                    <Info className="h-3.5 w-3.5 text-slate-500" />
                    <span>{isOpened ? "Hide Info" : "Worship Tips"}</span>
                  </button>
                  <button
                    onClick={() => onSelectRoute(dest.id)}
                    className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm text-center"
                  >
                    <Landmark className="h-3.5 w-3.5" />
                    <span>Charter Taxi Here</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
