import React, { useState } from "react";
import { VECHICLES_DATA } from "../data";
import { User, Briefcase, Snowflake, Check, MapPin, Gauge } from "lucide-react";

interface FleetProps {
  onSelectVehicle: (vehicleId: string) => void;
}

type FilterCategory = "all" | "Sedan" | "SUV_MUV" | "group";

export const Fleet: React.FC<FleetProps> = ({ onSelectVehicle }) => {
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filteredVehicles = VECHICLES_DATA.filter((v) => {
    if (filter === "all") return true;
    if (filter === "Sedan") return v.category === "Sedan";
    if (filter === "SUV_MUV") return v.category === "SUV" || v.category === "MUV";
    if (filter === "group") return v.category === "Tempo Traveller" || v.category === "Coobus";
    return true;
  });

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest font-mono mb-2 block">
            Executive Fleet Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Impeccably Sanitized Vehicles For Every Group Size
          </h2>
          <p className="mt-3 text-slate-500 text-xs sm:text-sm md:text-base font-sans">
            Whether traveling as a solo devotee, a family looking for premium captain seats, or a large joint family on pilgrimage, Darshnam features mountain-ready custom leisure cars.
          </p>
        </div>

        {/* Horizontal Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              filter === "all" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Fleet
          </button>
          <button
            onClick={() => setFilter("Sedan")}
            className={`px-5 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              filter === "Sedan" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Elite Sedans
          </button>
          <button
            onClick={() => setFilter("SUV_MUV")}
            className={`px-5 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              filter === "SUV_MUV" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Family SUVs & MUVs
          </button>
          <button
            onClick={() => setFilter("group")}
            className={`px-5 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              filter === "group" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Tempo & Mini Bus
          </button>
        </div>

        {/* Fleet Inventory Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl border border-slate-100 hover:border-amber-500/20 shadow-md hover:shadow-xl hover:translate-y-[-2.5px] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image container */}
              <div className="h-48 relative">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                  {vehicle.category} Class
                </div>
              </div>

              {/* Vehicle specs and perks details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    {vehicle.name}
                  </h3>
                  
                  {/* Micro specs bullet row */}
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 py-1 border-y border-slate-100 font-sans">
                    <span className="flex items-center gap-1.5 shrink-0">
                      <User className="h-3.5 w-3.5 text-amber-600" />
                      <span>{vehicle.seatCount} Seater</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Briefcase className="h-3.5 w-3.5 text-amber-600" />
                      <span>{vehicle.luggageCount} Bags</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Snowflake className="h-3.5 w-3.5 text-amber-600" />
                      <span>{vehicle.ac ? "Dual AC" : "Non-AC"}</span>
                    </span>
                  </div>
                </div>

                {/* Pricing indices */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-semibold font-mono">
                  <div className="border-r border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-sans">Outstation rate</span>
                    <span className="text-slate-800 text-xs font-bold">₹{vehicle.pricePerKm}/km</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-sans">Local daily bundle</span>
                    <span className="text-slate-800 text-xs font-bold">₹{vehicle.local8hr80kmRate}</span>
                  </div>
                </div>

                {/* Features checklist */}
                <div className="grid grid-cols-2 gap-1.5 text-slate-600 text-[11px] font-medium font-sans">
                  {vehicle.features.slice(0, 4).map((f, id) => (
                    <div key={id} className="flex gap-1.5 items-start">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Card footer dynamic estimate hook */}
                <button
                  onClick={() => onSelectVehicle(vehicle.id)}
                  className="w-full py-2.5 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs tracking-wide uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Gauge className="h-4 w-4 text-amber-400" />
                  <span>Estimate Fares for {vehicle.category}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet guidelines note */}
        <div className="mt-8 text-center max-w-2xl mx-auto p-4 bg-slate-100 rounded-xl text-slate-500 text-xs leading-relaxed font-sans font-medium">
          <strong>Corporate Fleet Leasing Note:</strong> Need massive coaches or luxury transport? We feature 26 & 40 seater multi-bus packages and customized wedding fleets on lease. Connect directly with our dispatch department at <strong>+91 70044 99684</strong> for corporate contracting.
        </div>

      </div>
    </section>
  );
};
