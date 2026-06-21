import React, { useState } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Compass, Sparkles, AlertCircle, RefreshCw, Calendar, Users, HelpCircle } from "lucide-react";

interface AIPlannerProps {
  onPreFillInquiry: (details: string) => void;
}

export const AIPlanner: React.FC<AIPlannerProps> = ({ onPreFillInquiry }) => {
  const [days, setDays] = useState("2");
  const [travelers, setTravelers] = useState("4");
  const [intent, setIntent] = useState("Pilgrimage and twin Dham (Baidyanath & Basukinath)");
  const [month, setMonth] = useState("June");
  const [vehicle, setVehicle] = useState("Sedan (Dzire/Etios)");
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [planResult, setPlanResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const loadingMessages = [
    "Initiating Darshnam AI engine...",
    "Consulting local Deoghar Destination Management charts...",
    "Arranging distances & calculating highway driving timelines...",
    "Checking VIP Sankalp Darshan and Abhishek schedules...",
    "Assembling sweet-market maps (Peda guidelines)...",
    "Optimizing executive vehicle fleet recommendations...",
    "Finalizing custom spiritual itinerary..."
  ];

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setPlanResult(null);
    setLoadingStep(0);

    // Set up step-wise loader ticking to keep user engaged
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch("/api/plan-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          durationDays: days,
          travelersCount: travelers,
          mainIntents: intent,
          travelMonth: month,
          vehiclePref: vehicle
        }),
      });
      
      const data = await response.json();
      if (response.ok && data.plans) {
        setPlanResult(data.plans);
      } else {
        setErrorMsg(data.error || "Generation error. Please check again.");
      }
    } catch (err: any) {
      setErrorMsg("Offline threshold. Please dial our travel desk to plan your custom pilgrimage package.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleApprovePlan = () => {
    if (!planResult) return;
    const contentToPost = `AI Planned Trip: ${days} Days for ${travelers} Pax in ${month} month. Vehicle interest: ${vehicle}. Selected themes: ${intent}`;
    onPreFillInquiry(contentToPost);
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100" id="ai-planner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Accent Shield Representing AI Capability */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 font-mono text-xs font-bold uppercase tracking-wider shadow shadow-amber-500/5">
            <Sparkles className="h-4 w-4 text-amber-500 animate-spin" />
            <span>GEMINI INTELLIGENCE PLATFORM</span>
          </div>
        </div>

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Smarter Itinerary Engine: Dynamic Jharkhand Travel Drafts
          </h2>
          <p className="mt-2 text-slate-500 text-xs sm:text-sm md:text-base font-sans">
            Don't waste hours scrolling generic blogs. Enter your travel parameters below, and Darshnam's AI Planner will curate a custom day-by-day spiritual and sightseeing schedule instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Form parameters */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-white/5 text-left">
            <h3 className="text-lg font-bold font-display tracking-tight text-white mb-6 flex items-center gap-2">
              <Compass className="h-5 w-5 text-amber-400" />
              <span>Tailor Your Journey Draft</span>
            </h3>

            <form onSubmit={handleGeneratePlan} className="space-y-4 font-sans">
              
              {/* Row 1: Duration & Travelers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                    Total Duration (Days)
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                  >
                    <option value="1" className="bg-slate-900 text-white">1 Day (Same Day)</option>
                    <option value="2" className="bg-slate-900 text-white">2 Days / 1 Night</option>
                    <option value="3" className="bg-slate-900 text-white">3 Days / 2 Nights</option>
                    <option value="4" className="bg-slate-900 text-white">4 Days / 3 Nights</option>
                    <option value="5" className="bg-slate-900 text-white">5+ Days Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                    No of Travelers (Pax)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none text-center"
                    required
                  />
                </div>
              </div>

              {/* Theme Focus selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                  Spiritual and Sightseeing Themes
                </label>
                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                >
                  <option value="Pure Pilgrimage: Baba Baidyanath Mandir & Basukinath Dham" className="bg-slate-900 text-white">Spiritual (Jyotirlinga & Basukinath)</option>
                  <option value="Jain Holy Tour: Shikharji Parasnath Peak & Deoghar" className="bg-slate-900 text-white">Jain Special (Sammed Shikharji)</option>
                  <option value="Scenic Nature & Waterfalls: Trikut Hills, Tapovan, & Ranchi Waterfalls" className="bg-slate-900 text-white">Nature focus (Waterfalls & Hills)</option>
                  <option value="Complete Jharkhand Heritage including Rajrappa, Deoghar, and Basukinath" className="bg-slate-900 text-white">All-Round Heritage Explorer</option>
                </select>
              </div>

              {/* Month of Travel & Vehicle Choice */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                    Month of Yatra
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                  >
                    {[
                      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ].map((m) => (
                      <option key={m} value={m} className="bg-slate-900 text-white">{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                    Preferred Fleet Class
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                  >
                    <option value="Sedan (Dzire/Etios)" className="bg-slate-900 text-white">Sedan (Dzire/Etios)</option>
                    <option value="SUV (Ertiga)" className="bg-slate-900 text-white">SUV (Ertiga)</option>
                    <option value="Premium SUV (Innova Crysta)" className="bg-slate-900 text-white">Premium SUV (Innova)</option>
                    <option value="Tempo Traveller (12-17 seats)" className="bg-slate-900 text-white">Tempo Traveller</option>
                  </select>
                </div>
              </div>

              {/* Helpful quick guide details */}
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-[10px] text-slate-300 leading-normal font-sans italic">
                * Note: Shravan season (July-August) sees extreme rush in Deoghar due to Kanwar Mela. If traveling then, our planner optimizes queue times automatically.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-slate-950 font-bold font-sans text-xs tracking-wider uppercase rounded-xl transition-all shadow shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Analyzing Route Timelines...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Generate Sacred Travel Plan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right panel: Active Output Render Block */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 min-h-[460px] flex flex-col justify-between shadow-sm relative">
            
            {/* Conditional state rendering */}
            {!loading && !planResult && !errorMsg && (
              <div className="my-auto space-y-4 text-center max-w-sm mx-auto py-12">
                <div className="h-14 w-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
                  <Compass className="h-7 w-7 animate-pulse" />
                </div>
                <h4 className="text-slate-800 font-bold text-base font-display">
                  Your Custom Itinerary Draft Is Ready To Compile
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Enter your exact vacation specifications on the left, click generate, and let our systems model your complete highway transit schedule and sightseeing maps.
                </p>
              </div>
            )}

            {/* Loading placeholder */}
            {loading && (
              <div className="my-auto space-y-5 text-center max-w-xs mx-auto py-12 animate-pulse">
                <SpinnerCircle />
                <h4 className="text-slate-800 font-bold text-sm tracking-wider uppercase font-mono text-amber-700">
                  Compiling Destination Data
                </h4>
                <p className="text-xs text-slate-500 font-sans font-medium h-8 flex items-center justify-center italic">
                  "{loadingMessages[loadingStep]}"
                </p>
              </div>
            )}

            {/* Error output */}
            {errorMsg && (
              <div className="my-auto space-y-3 text-center max-w-sm mx-auto py-12">
                <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
                <h4 className="text-slate-800 font-bold text-sm font-sans tracking-wide">
                  Generation Intermission
                </h4>
                <p className="text-xs text-rose-600 font-sans font-medium">
                  {errorMsg}
                </p>
                <p className="text-[11px] text-slate-400 font-sans">
                  Don't worry! Connect directly to our Deoghar dispatch team at <strong>+91 70044 99684</strong> and we'll immediately organize your custom plan via phone call.
                </p>
              </div>
            )}

            {/* True Plan Result Output */}
            {planResult && !loading && (
              <div className="space-y-6 flex-1 flex flex-col justify-between text-left">
                {/* Scrollable results */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-inner max-h-[360px] overflow-y-auto">
                  <MarkdownRenderer content={planResult} />
                </div>

                {/* Confirm & pipe actions */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-left space-y-0.5 sm:max-w-md">
                    <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                      Like this automated itinerary?
                    </span>
                    <p className="text-[11px] text-slate-600 font-sans">
                      Click the book key to autofill your contact details and receive manual vehicle quotes from Darshnam operators.
                    </p>
                  </div>
                  <button
                    onClick={handleApprovePlan}
                    className="px-5 py-2.5 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-lg shrink-0 cursor-pointer transition-all shadow-sm"
                  >
                    Book This Plan
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

// Subtle vector vector spinner for beautiful UI
const SpinnerCircle = () => (
  <div className="relative h-14 w-14 mx-auto mb-4">
    <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
    <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
  </div>
);
