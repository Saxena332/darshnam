import React, { useState, useEffect } from "react";
import { VECHICLES_DATA, TOUR_PACKAGES } from "../data";
import { MessageSquare, ShieldCheck, HelpCircle, Landmark, Star, ArrowRight, Car, Compass, AlertCircle, CheckCircle, XCircle, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface HeroProps {
  onNewInquiry: (inquiry: any) => void;
  onScrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNewInquiry, onScrollToSection }) => {
  const [activeTab, setActiveTab] = useState<"cab" | "tour">("cab");
  
  // Cab state
  const [cabServiceType, setCabServiceType] = useState<"airport_transfer" | "local_cab" | "outstation_cab">("airport_transfer");
  const [selectedVehicleId, setSelectedVehicleId] = useState(VECHICLES_DATA[0].id);
  const [outstationDest, setOutstationDest] = useState<"basukinath" | "ranchi" | "giridih" | "rajrappa" | "custom">("basukinath");
  const [customDistance, setCustomDistance] = useState("100");
  const [tripWay, setTripWay] = useState<"one_way" | "round_trip">("round_trip");
  
  // Booking Info
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderDate, setSenderDate] = useState("");
  const [bookingStatusMsg, setBookingStatusMsg] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Tour State
  const [selectedTourId, setSelectedTourId] = useState(TOUR_PACKAGES[0].id);
  const [tourGuests, setTourGuests] = useState("4");

  // Destination Distances
  const destinationDistances = {
    basukinath: 43,
    ranchi: 250,
    giridih: 85,
    rajrappa: 210,
    custom: 100
  };

  // Re-calculate price estimate
  useEffect(() => {
    const vehicle = VECHICLES_DATA.find((v) => v.id === selectedVehicleId);
    if (!vehicle) return;

    if (cabServiceType === "airport_transfer") {
      setEstimatedPrice(vehicle.airportTransferRate);
    } else if (cabServiceType === "local_cab") {
      setEstimatedPrice(vehicle.local8hr80kmRate);
    } else {
      // Outstation
      const selectedDistance = outstationDest === "custom" 
        ? Math.max(20, parseInt(customDistance, 10) || 100)
        : destinationDistances[outstationDest];
      
      const factor = tripWay === "round_trip" ? 2 : 1.3; // 1.3 factor for single side
      const baseFare = selectedDistance * vehicle.pricePerKm * factor;
      const driverAllowance = 400; // standard allowance per day
      setEstimatedPrice(Math.round(baseFare + driverAllowance));
    }
  }, [cabServiceType, selectedVehicleId, outstationDest, customDistance, tripWay]);

  // Submit Cab Booking Action
  const handleCabSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderPhone.trim()) {
      setBookingStatusMsg("error:Please enter your name and phone number to secure an estimate.");
      return;
    }

    const vehicleObj = VECHICLES_DATA.find((v) => v.id === selectedVehicleId);
    const serviceLabels = {
      airport_transfer: "Airport Transfer (AJL to Town)",
      local_cab: "Local Sightseeing (Full Day 8hr/80km)",
      outstation_cab: "Outstation Intercity Trip"
    };

    const outstationDestLabels = {
      basukinath: "Basukinath (43km)",
      ranchi: "Ranchi (250km)",
      giridih: "Giridih/Parasnath (85km)",
      rajrappa: "Rajrappa Shakti-peeth (210km)",
      custom: `Custom Destination (${customDistance} km)`
    };

    const pickupLocation = cabServiceType === "airport_transfer" ? "Deoghar Airport AJL" : "Hotel / Station, Deoghar";
    const dropoffLocation = cabServiceType === "airport_transfer" 
      ? "Deoghar City center/Baidyanath Temple" 
      : cabServiceType === "outstation_cab" 
        ? outstationDestLabels[outstationDest] 
        : "Local Sightseeing points";

    const payload = {
      type: "cab",
      name: senderName,
      phone: senderPhone,
      date: senderDate,
      tripType: serviceLabels[cabServiceType],
      vehicleType: vehicleObj?.name || "Sedan",
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      message: `Calculated estimate online: ₹${estimatedPrice}. Code: ${tripWay === "one_way" ? "One Way" : "Round Trip"}`
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        onNewInquiry(data.inquiry);
        setBookingStatusMsg(`success:Success! Reference ID: #${data.inquiry.id}. A booking coordinator will contact you immediately.`);
        // Reset inputs
        setSenderName("");
        setSenderPhone("");
        setSenderDate("");
      }
    } catch (err) {
      setBookingStatusMsg("offline:Submission offline. Please call directly.");
    }
  };

  // Submit Tour Booking Action
  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderPhone.trim()) {
      setBookingStatusMsg("error:Please input your name and contact details to book tour.");
      return;
    }

    const tourObj = TOUR_PACKAGES.find((t) => t.id === selectedTourId);
    const payload = {
      type: "tour",
      name: senderName,
      phone: senderPhone,
      date: senderDate,
      packageName: tourObj?.name,
      guestsCount: parseInt(tourGuests, 10),
      message: `Interested in tour starting starting from ${senderDate || "Soon"}. Party count: ${tourGuests} travelers.`
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        onNewInquiry(data.inquiry);
        setBookingStatusMsg(`success:Sacred Tour booked! Code #${data.inquiry.id}. Our temple coordinator will reach out to schedule your VIP Abhishek assistance.`);
        setSenderName("");
        setSenderPhone("");
        setSenderDate("");
      }
    } catch (err) {
      setBookingStatusMsg("offline:System offline. Please dial our travel desk.");
    }
  };

  return (
    <section className="relative bg-slate-900 overflow-hidden py-12 lg:py-20 min-h-[85vh] flex items-center">
      {/* Decorative background image overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=1600"
          alt="Sacred landscape background"
          className="w-full h-full object-cover saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Brand introduction to Darshnam */}
        <div className="lg:col-span-7 space-y-6 text-white text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/30 text-brand-teal">
            <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wider font-mono uppercase">
              Corporate DMC & Luxury Fleet Operator
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.1]">
            Experience Jharkhand's Sacred Trust with{" "}
            <span className="text-brand-coral block sm:inline font-black">Darshnam Tours</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans font-normal leading-relaxed">
            The pioneer of travel hospitality and cab leasing in Deoghar. Hosting VIP temple
            darshans, elite airport transfers from Deoghar Airport (AJL), customized group pilgrim tours,
            and reliable local/outstation tourist cabs operated by trained, humble local chauffeurs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
              <ShieldCheck className="h-8 w-8 text-brand-teal shrink-0" />
              <div>
                <h4 className="font-semibold text-xs text-slate-100">Zero Cancellation Penalties</h4>
                <p className="text-[11px] text-slate-400">Flexibility to alter plans anytime with no fees.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
              <Landmark className="h-8 w-8 text-brand-teal shrink-0" />
              <div>
                <h4 className="font-semibold text-xs text-slate-100">Official DMC Accreditation</h4>
                <p className="text-[11px] text-slate-400">Trusted partner for Baidyanath Jyotirlinga arrangements.</p>
              </div>
            </div>
          </div>

          {/* Saffron accent banner highlighting trust */}
          <div className="p-4 bg-brand-coral/10 border-l-4 border-brand-coral rounded-r-lg max-w-2xl">
            <p className="text-xs text-brand-coral font-sans italic">
              "We coordinate entire logistics for Basukinath Dham pilgrim fleets, Rajrappa Shakti-peeth rides, and mountain-tested coaches for Parasnath Shikharji treks."
            </p>
          </div>

          {/* Quick scroll action */}
          <div className="flex gap-4">
            <button
              onClick={() => onScrollToSection("tour-packages")}
              className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-hover transition-colors text-white font-bold text-sm rounded-full flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Holy Tour Packs</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onScrollToSection("ai-planner")}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 transition-colors text-white font-semibold text-sm rounded-full border border-slate-700 cursor-pointer"
            >
              Try AI Travel Planner
            </button>
          </div>
        </div>

        {/* Right column: Interactive Booking Form Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-slate-900 border border-slate-100 relative" id="booking-estimator">
          {/* Saffron Ribbons representing authenticity */}
          <div className="absolute top-0 right-6 -translate-y-1/2 bg-slate-900 text-brand-amber text-[10px] font-bold py-1.5 px-3 rounded-full border border-teal-500/20 shadow flex items-center gap-1 font-mono tracking-wider">
            <Star className="h-3 w-3 fill-brand-amber text-brand-amber" />
            <span>INSTANT DEOGHAR TAXI ESTIMATOR</span>
          </div>

          <div className="flex border-b border-slate-100 mb-5">
            <button
              onClick={() => { setActiveTab("cab"); setBookingStatusMsg(""); }}
              className={`flex-1 text-center pb-3 font-display font-bold text-xs sm:text-sm tracking-wide border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === "cab" ? "border-brand-teal text-brand-teal" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <Car className="h-4 w-4" />
              <span>Cab Booking & Estimate</span>
            </button>
            <button
              onClick={() => { setActiveTab("tour"); setBookingStatusMsg(""); }}
              className={`flex-1 text-center pb-3 font-display font-bold text-xs sm:text-sm tracking-wide border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === "tour" ? "border-brand-teal text-brand-teal" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Pilgrimage Tours</span>
            </button>
          </div>

          {activeTab === "cab" ? (
            <form onSubmit={handleCabSubmit} className="space-y-4">
              {/* Service Type Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 font-sans">
                  Select Cab Service Requirement
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setCabServiceType("airport_transfer")}
                    className={`py-1.5 text-[10px] sm:text-xs font-bold rounded transition-all cursor-pointer ${
                      cabServiceType === "airport_transfer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    AJL Airport
                  </button>
                  <button
                    type="button"
                    onClick={() => setCabServiceType("local_cab")}
                    className={`py-1.5 text-[10px] sm:text-xs font-bold rounded transition-all cursor-pointer ${
                      cabServiceType === "local_cab" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Local Day 8hr
                  </button>
                  <button
                    type="button"
                    onClick={() => setCabServiceType("outstation_cab")}
                    className={`py-1.5 text-[10px] sm:text-xs font-bold rounded transition-all cursor-pointer ${
                      cabServiceType === "outstation_cab" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Outstation
                  </button>
                </div>
              </div>

              {/* Dynamic Subsections based on service type */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Vehicle Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-sans">
                    Preferred Vehicle Fleet
                  </label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:ring-1 focus:ring-brand-teal focus:border-brand-teal outline-none"
                  >
                    {VECHICLES_DATA.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.category} ({v.name.split(" ")[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {cabServiceType === "outstation_cab" ? (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-sans">
                      Select Destination
                    </label>
                    <select
                      value={outstationDest}
                      onChange={(e: any) => setOutstationDest(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:ring-1 focus:ring-brand-teal outline-none"
                    >
                      <option value="basukinath">Basukinath Dham (43 km)</option>
                      <option value="giridih">Giridih/Parasnath (85 km)</option>
                      <option value="rajrappa">Rajrappa Temple (210 km)</option>
                      <option value="ranchi font-medium">Ranchi Capital (250 km)</option>
                      <option value="custom">Other Custom Route</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-sans">
                      Reporting Date
                    </label>
                    <input
                      type="date"
                      required
                      value={senderDate}
                      onChange={(e) => setSenderDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:ring-1 focus:ring-brand-teal outline-none"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                )}
              </div>

              {/* More dynamic widgets for outstation */}
              {cabServiceType === "outstation_cab" && (
                <div className="grid grid-cols-2 gap-3.5 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  {/* Trip way */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Route Option
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setTripWay("round_trip")}
                        className={`text-[10px] flex-1 py-1 px-2 border rounded font-semibold ${
                          tripWay === "round_trip" ? "bg-brand-teal border-brand-teal text-white" : "border-slate-300 text-slate-600"
                        }`}
                      >
                        Round Trip
                      </button>
                      <button
                        type="button"
                        onClick={() => setTripWay("one_way")}
                        className={`text-[10px] flex-1 py-1 px-2 border rounded font-semibold ${
                          tripWay === "one_way" ? "bg-brand-teal border-brand-teal text-white" : "border-slate-300 text-slate-600"
                        }`}
                      >
                        One Way
                      </button>
                    </div>
                  </div>

                  {outstationDest === "custom" ? (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Est. One Way (Km)
                      </label>
                      <input
                        type="number"
                        min="20"
                        max="1000"
                        value={customDistance}
                        onChange={(e) => setCustomDistance(e.target.value)}
                        className="w-full p-1.5 border border-slate-200 rounded text-xs text-center"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        required
                        value={senderDate}
                        onChange={(e) => setSenderDate(e.target.value)}
                        className="w-full p-1 border border-slate-200 bg-white text-xs text-center rounded animate-none"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Estimated Pricing Badge */}
              <div className="p-3 bg-slate-900 text-white rounded-xl flex justify-between items-center shadow-lg border border-teal-500/10">
                <div>
                  <span className="text-[10px] text-slate-400 block tracking-widest font-mono uppercase">
                    Estimated Transit Price
                  </span>
                  <span className="text-xl font-extrabold text-brand-amber tracking-tight font-mono">
                    ₹{estimatedPrice.toLocaleString("en-IN")}*
                  </span>
                </div>
                <div className="text-right text-[10px] text-slate-300 font-sans">
                  <span>Includes Driver & Fuel</span>
                  <span className="block text-slate-500 text-[8px]">*Toll/State entry extra based on route</span>
                </div>
              </div>

              {/* Core contact details */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1 font-sans">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1 font-sans">WhatsApp Mobile</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 70044 99684"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>
              </div>

              {/* Response Messages */}
              {bookingStatusMsg && (
                <div className={`p-3 rounded-lg text-xs font-medium border flex items-start gap-2 ${
                  bookingStatusMsg.startsWith("success:") 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                    : "bg-rose-50 text-rose-900 border-rose-200"
                }`}>
                  {bookingStatusMsg.startsWith("success:") ? (
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : bookingStatusMsg.startsWith("error:") ? (
                    <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{bookingStatusMsg.split(/:(.*)/s)[1] || bookingStatusMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-brand-teal hover:bg-brand-teal-hover text-white font-bold rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-md shadow-brand-teal/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Cab & Request Driver</span>
              </button>
            </form>
          ) : (
            // Tour package simple booking
            <form onSubmit={handleTourSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 font-sans">
                  Select Sacred Pilgrimage Package
                </label>
                <select
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:ring-1 focus:ring-brand-teal outline-none"
                >
                  {TOUR_PACKAGES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.duration}) - Starting ₹{t.priceStarting}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-sans">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={tourGuests}
                    onChange={(e) => setTourGuests(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs text-center font-semibold focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-sans">
                    Target Journey Date
                  </label>
                  <input
                    type="date"
                    required
                    value={senderDate}
                    onChange={(e) => setSenderDate(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs font-semibold focus:ring-1 focus:ring-brand-teal outline-none"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Core contact details */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1 font-sans">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1 font-sans">WhatsApp Calling / Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 70044 99684"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>

              {/* Package specifications showcase */}
              <div className="p-3.5 bg-teal-50/50 border border-teal-100 rounded-lg space-y-1.5 text-left">
                <h5 className="text-[10px] font-bold text-brand-teal uppercase tracking-wider">
                  Includes Darshnam VIP Perks:
                </h5>
                <ul className="text-[10px] text-slate-700 list-disc list-inside space-y-0.5 font-sans font-medium">
                  <li>Sanitized Air-Conditioned vehicle with high driver hygiene</li>
                  <li>Sankalp puja assist with certified local pandit guides</li>
                  <li>Authentic Deoghar Peda souvenir pack complimentary</li>
                </ul>
              </div>

              {bookingStatusMsg && (
                <div className={`p-3 rounded-lg text-xs font-medium border flex items-start gap-2 ${
                  bookingStatusMsg.startsWith("success:") 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                    : "bg-rose-50 text-rose-950 border-rose-200"
                }`}>
                  {bookingStatusMsg.startsWith("success:") ? (
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : bookingStatusMsg.startsWith("error:") ? (
                    <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{bookingStatusMsg.split(/:(.*)/s)[1] || bookingStatusMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Express Tour Booking Request</span>
              </button>
            </form>
          )}

          {/* Hotline security note */}
          <p className="text-[10px] text-slate-400 text-center mt-3 font-sans flex items-center justify-center gap-1.5">
            <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500" />
            <span>Secure Inquiries. Or coordinate instantly on WhatsApp: </span>
            <a href="https://wa.me/917004499684" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-bold font-mono">
              +91 70044 99684
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
