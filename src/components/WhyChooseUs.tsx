import React from "react";
import { UserCheck, Shield, HelpCircle, Receipt, Compass, Award } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: UserCheck,
      title: "Humble, Local Driver-Guides",
      desc: "Our operators aren't just chauffeurs; they are certified local guides born in Jharkhand. They know Baidyanath temple queue systems, Basukinath customs, the best local sweet stores, and secure mountain driving paths."
    },
    {
      icon: Shield,
      title: "Pristine Executive Vehicles",
      desc: "We operate a privately owned, highly inspected fleet. Every car undergoes mandatory chemical sanitization, AC deep blows, and oil checks before a spiritual or wedding assignment. Seat covers are replaced daily."
    },
    {
      icon: Receipt,
      title: "Absolute Pricing Transparency",
      desc: "Hate hidden tolls or unannounced driver breakfast charges? At Darshnam, your quotation covers driver lodging, fuel indexes, and state road carriage taxes. You see exactly what you pay from the outset."
    },
    {
      icon: Compass,
      title: "Pilgrimage Assistance (VIP Sankalp)",
      desc: "As the accredited DMC of Jharkhand, we can easily coordinate VIP Shrishti entrance tokens, organize premium family pandits for special sankalps, and secure safe, close-proximity parking slots near Baba Mandir."
    }
  ];

  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-6 text-left space-y-3">
            <div className="inline-flex gap-1 items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5" />
              <span>THE DARSHNAM ASSURANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Why Deoghar Mandir Tourists Trust Darshnam Tours
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-lg leading-relaxed">
              We understand that a pilgrimage trip requires more than basic transit - it demands respect, quietude, hygiene, and local expertise. That's why we have built Jharkhand's gold standard yatra consultancy.
            </p>
          </div>
          
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-3xl font-extrabold text-amber-500 font-mono block">10,000+</span>
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Devotees Served</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-3xl font-extrabold text-amber-500 font-mono block">99.8%</span>
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Punctuality Score</p>
            </div>
          </div>
        </div>

        {/* Feature Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 flex gap-4 items-start hover:border-amber-500/10 transition-colors"
              >
                <div className="h-10 w-10 shrink-0 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <div className="space-y-1.5 font-sans">
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base font-display">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {point.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
