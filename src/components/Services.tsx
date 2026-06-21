import React from "react";
import { Plane, Compass, Car, Briefcase, ChevronRight, GraduationCap } from "lucide-react";

interface ServicesProps {
  onScrollToSection: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onScrollToSection }) => {
  const serviceCards = [
    {
      icon: Plane,
      title: "Airport Transfer Services",
      desc: "Instant pickup and dropped-off facilities connection Deoghar Airport (AJL) with Baidyanath Mandir city hotels and Jasidih Railway Station. Savor our guaranteed fixed pricing with zero surging.",
      highlight: "Fixed Fares starting from ₹800"
    },
    {
      icon: Car,
      title: "Local & Outstation Cabs",
      desc: "Choose flexible hour-based local sightseeing bookings (8 hours / 80 Km) or outstation cross-state taxis to Patna, Ranchi, Sultanganj and Bhagalpur. Includes sanitized cars and mountain-tested drivers.",
      highlight: "Over 500+ verified routes covered"
    },
    {
      icon: Compass,
      title: "Sacred Pilgrimage Tours (DMC)",
      desc: "Specialized Destination Management services for Jharkhand. We arrange end-to-end pilgrim transit, pure satvik food, high-hygiene hotel check-ins, and local pandit coordination at prominent dhams.",
      highlight: "Baidyanath, Basukinath & Rajrappa"
    },
    {
      icon: Briefcase,
      title: "Fleet Rental & Wedding leasing",
      desc: "Offering customized group transportation using clean Tempo Travellers (12-17 seats) and executive Mini Buses for grand wedding families, corporate teams, and long-route tourist journeys.",
      highlight: "Dzire, Innova & Coaches on lease"
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with subtle spiritual subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-amber-600 font-bold text-xs uppercase tracking-widest font-mono mb-2">
            Professional Fleet Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Premium Transport Solutions Tailored For Your Comfort
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base font-sans">
            As Jharkhand's local experts, we combine standard pricing mechanics with top-tier driver etiquette to provide absolute safety for pilgrims, families, and corporates.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCards.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 sm:p-8 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center transition-colors group-hover:bg-amber-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold">
                  <span className="text-amber-700 bg-amber-50 py-1 px-2.5 rounded-full uppercase tracking-wider text-[10px] font-mono">
                    {service.highlight}
                  </span>
                  <button
                    onClick={() => onScrollToSection("booking-estimator")}
                    className="text-slate-600 hover:text-amber-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Check Fares</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Airport Booking Prominent Banner */}
        <div className="mt-12 bg-slate-900 rounded-xl p-6 sm:p-8 text-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-amber-500/10 shadow-lg">
          <div className="lg:col-span-8 text-left space-y-2">
            <div className="inline-block bg-amber-500 text-slate-950 font-bold text-[9px] uppercase px-2.5 py-0.5 rounded tracking-widest font-mono">
              DEOGHAR AIRPORT SPECIAL
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Touch Down at AJL Airport? We've Got You Covered
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-2xl">
              Skip airport queue hassles and local price haggling. Your dedicated Darshnam chauffeur will track your flight timing, greet you near the arrival gate, retrieve luggage, and transport you straight to the temple premises cleanly.
            </p>
          </div>
          <div className="lg:col-span-4 text-center lg:text-right">
            <button
              onClick={() => onScrollToSection("booking-estimator")}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-full transition-all tracking-wider uppercase inline-flex items-center gap-1.5 cursor-pointer shadow shadow-amber-500/10"
            >
              <span>Instant Airport Cab Booking</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
