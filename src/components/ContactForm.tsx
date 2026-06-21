import React, { useState, useEffect } from "react";
import { TOUR_PACKAGES, VECHICLES_DATA } from "../data";
import { Phone, Mail, MapPin, CheckSquare, Clock, Send, ShieldCheck, AlertCircle, RefreshCw, Smartphone, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface ContactFormProps {
  preFilledContent?: string;
  onNewInquiryAdded: () => void;
  inquiries: any[];
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  preFilledContent = "", 
  onNewInquiryAdded,
  inquiries
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [serviceType, setServiceType] = useState<string>("local_cab");
  const [vehiclePref, setVehiclePref] = useState("dzire");
  const [tourPref, setTourPref] = useState("deoghar-darshan");
  const [message, setMessage] = useState("");
  
  const [submitStatus, setSubmitStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync pre-filled messages from AI planner
  useEffect(() => {
    if (preFilledContent) {
      setMessage((prev) => (prev ? prev + "\n" + preFilledContent : preFilledContent));
      setServiceType("custom_plan");
      
      // Auto scroll to contact form smoothly when prefilled
      const element = document.getElementById("contact-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [preFilledContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setSubmitStatus("error:Please enter your name and phone number to request a booking.");
      return;
    }

    setLoading(true);
    setSubmitStatus("");

    const vehicleObj = VECHICLES_DATA.find((v) => v.id === vehiclePref);
    const tourObj = TOUR_PACKAGES.find((t) => t.id === tourPref);

    const payload = {
      type: serviceType.includes("tour") ? "tour" : "cab",
      name,
      phone,
      email,
      date,
      pickup: serviceType === "airport_transfer" ? "Deoghar Airport AJL" : "Hotel / Jasidih Junction",
      dropoff: serviceType === "outstation_cab" ? "Outstation Route" : "Local Sightseeing",
      tripType: serviceType,
      vehicleType: vehicleObj?.name || "Sedan (Dzire)",
      packageName: serviceType === "tour_package" ? tourObj?.name : undefined,
      message: message
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus(`success:Booking registered successfully! Reference ID: #${data.inquiry.id}. A Darshnam coordinator will Call or WhatsApp you within 15 minutes.`);
        
        // Reset local States
        setName("");
        setPhone("");
        setEmail("");
        setDate("");
        setMessage("");
        
        // Notify parent to refresh inquiries list!
        onNewInquiryAdded();
      } else {
        setSubmitStatus(`error:Error: ${data.error}`);
      }
    } catch (err) {
      setSubmitStatus("offline:Submission error. Our network is experiencing high devotion load. Please dial directly: +91 70044 99684.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest font-mono mb-2 block font-display">
            Darshnam Reservation Central
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Secure Your Journey & VIP Darshans Instantly
          </h2>
          <p className="mt-3 text-slate-500 text-xs sm:text-sm font-sans">
            Have custom travel dates or need specific group combinations? Fill in our secure dispatch slip below. Our customer desk will analyze fleet spacing and secure your transport reservation immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: General booking slip */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                <CheckSquare className="h-5 w-5 text-amber-500" />
                <span>Digital Dispatch reservation Slip</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold font-sans">
                
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 uppercase mb-1.5 font-bold">Your Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 uppercase mb-1.5 font-bold">WhatsApp calling Mobile <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 70044 99684"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Email and Target Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 uppercase mb-1.5">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 uppercase mb-1.5 font-bold">Journey Date <span className="text-rose-500">*</span></label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-amber-500 outline-none"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Row 3: Service Type selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 uppercase mb-1.5 font-bold">Required Travel Type</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                    >
                      <option value="local_cab">Local Cab Sightseeing (8 hr/80 km)</option>
                      <option value="outstation_cab">Outstation Intercity Taxi</option>
                      <option value="airport_transfer">Airport Shuttle / Drop-off</option>
                      <option value="tour_package">Approved Tour Package Booking</option>
                      <option value="custom_plan">Custom AI Tailored Plan</option>
                    </select>
                  </div>

                {serviceType === "tour_package" ? (
                  <div>
                    <label className="block text-slate-500 uppercase mb-1.5 font-bold">Select Tour Package</label>
                    <select
                      value={tourPref}
                      onChange={(e) => setTourPref(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                    >
                      {TOUR_PACKAGES.map((t) => (
                        <option key={t.id} value={t.id}>{t.name} ({t.duration})</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-slate-500 uppercase mb-1.5 font-bold">Preferred Vehicle Class</label>
                    <select
                      value={vehiclePref}
                      onChange={(e) => setVehiclePref(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                    >
                      {VECHICLES_DATA.map((v) => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Message / Special Instructions area */}
              <div>
                <label className="block text-slate-500 uppercase mb-1.5">Special Ritual Requests / Notes</label>
                <textarea
                  rows={4}
                  placeholder="Need elder-friendly transfers, wheelchair support, Sanskrit VIP Jal Abhishek panda coordination, or specific hotels?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-sans outline-none font-normal"
                />
              </div>

              {/* Status block feedback */}
              {submitStatus && (
                <div className={`p-3.5 rounded-lg text-xs font-semibold border flex items-start gap-2 ${
                  submitStatus.startsWith("success:") 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                    : submitStatus.startsWith("error:")
                      ? "bg-amber-50 border-amber-200 text-amber-800"
                      : "bg-rose-50 border-rose-200 text-rose-850"
                }`}>
                  {submitStatus.startsWith("success:") ? (
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : submitStatus.startsWith("error:") ? (
                    <AlertCircle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{submitStatus.split(/:(.*)/s)[1] || submitStatus}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-600/50 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow shadow-amber-600/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? <RefreshCw className="h-4.5 w-4.5 animate-spin" /> : <Send className="h-4 w-4" />}
                <span>Secure Taxi / Tour Booking Request</span>
              </button>
            </form>
          </div>
        </div>

          {/* Right panel: Unified Sidebar Contact & Dispatch Ledger */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 text-left h-full flex flex-col justify-between space-y-6">
              
              {/* Hotlines Content */}
              <div>
                <h4 className="font-bold font-display text-xs uppercase text-slate-900 tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>Direct Travel Office Hotlines</span>
                </h4>
                <p className="text-slate-500 text-[11px] font-sans mt-3 leading-relaxed">
                  Prefer human voices to digital slips? Reach out to our primary travel bureau in Deoghar directly.
                </p>
                <div className="mt-4 space-y-2.5">
                  <a 
                    href="tel:+917004499684" 
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group"
                  >
                    <div className="h-8 w-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800 tracking-tight">+91 70044 99684</span>
                      <span className="block text-[9px] text-slate-400 font-semibold uppercase">Calling Support (24/7)</span>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/917004499684" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all group"
                  >
                    <div className="h-8 w-8 rounded bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#25D366]/20">
                      <WhatsAppIcon className="h-4.5 w-4.5 fill-white text-white" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#128C7E] tracking-tight">+91 70044 99684</span>
                      <span className="block text-[9px] text-[#25D366] font-bold uppercase tracking-wider">WhatsApp Reservation</span>
                    </div>
                  </a>

                  <a 
                    href="mailto:darshnam.tours@gmail.com" 
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/20 transition-all group"
                  >
                    <div className="h-8 w-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800 tracking-tight">darshnam.tours@gmail.com</span>
                      <span className="block text-[9px] text-slate-400 font-semibold uppercase">Official Email Desk</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Live Ledger Content */}
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex justify-between items-center pb-1">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-display">
                    Live Dispatch Ledger
                  </h4>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] font-bold text-slate-400 font-mono">LIVE UPDATE</span>
                  </span>
                </div>
                
                <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                  {inquiries.length === 0 ? (
                    <p className="text-[10px] text-slate-400 text-center font-sans font-medium py-3.5">
                      No active dispatches register in current session.
                    </p>
                  ) : (
                    inquiries.map((inq, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] space-y-1 relative font-sans">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-slate-800 truncate max-w-[120px]">{inq.name}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] tracking-wide uppercase ${
                            inq.status === "Confirmed" 
                              ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-600 border border-amber-500/25"
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-slate-500 text-[9px] flex justify-between font-mono">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <span>{inq.phone.substring(0, 9)}xxxx</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400 font-mono" />
                            <span>{inq.date}</span>
                          </span>
                        </div>
                        <p className="text-slate-600 font-medium border-t border-slate-200/50 pt-1 border-dashed mt-1 truncate">
                          {inq.packageName || inq.tripType || "General Quote inquiry"}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <p className="text-[9.5px] text-slate-400 text-center leading-normal pt-2 border-t border-slate-100 text-slate-400">
                  🔒 Registered clients can view their transit confirmation alerts on WhatsApp or direct cellular SMS calls directly within minutes of filing.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
