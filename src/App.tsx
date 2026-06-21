import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Packages } from "./components/Packages";
import { Fleet } from "./components/Fleet";
import { AIPlanner } from "./components/AIPlanner";
import { Destinations } from "./components/Destinations";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Testimonials } from "./components/Testimonials";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./components/WhatsAppIcon";

export default function App() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [preFilledMessage, setPreFilledMessage] = useState<string>("");
  const [triggerCount, setTriggerCount] = useState(0);

  // Fetch inquiries ledger from the Express server
  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.warn("Failed to retrieve live inquiries from express server. Running in offline UI mode.");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [triggerCount]);

  // Handle high-precision scroll mapping to anchors
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Cross-widget Action 1: Fleet check availability scrolls up, binds tab & sets vehicle category
  const handleSelectVehicleForEstimation = (vehicleId: string) => {
    handleScrollToSection("booking-estimator");
    // Dispatch a virtual change to the Hero widget
    const selectEl = document.querySelector("#booking-estimator select") as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = vehicleId;
      // Trigger native event
      const event = new Event("change", { bubbles: true });
      selectEl.dispatchEvent(event);
    }
  };

  // Cross-widget Action 2: Destinations quick taxi anchor
  const handleSelectRouteForTransit = (destinationId: string) => {
    handleScrollToSection("booking-estimator");
    
    // Auto toggle tab option inside Hero
    const mapRouteToDestKey: Record<string, string> = {
      "baidyanath-temple": "custom",
      "basukinath": "basukinath",
      "trikut-hills": "custom",
      "tapovan-caves": "custom",
      "ranchi-falls": "ranchi"
    };

    const targetKey = mapRouteToDestKey[destinationId] || "custom";
    setTimeout(() => {
      // Set service type to outstation
      const buttons = document.querySelectorAll("#booking-estimator button");
      buttons.forEach((btn) => {
        if (btn.textContent?.toLowerCase().includes("outstation")) {
          (btn as HTMLButtonElement).click();
        }
      });
      
      // Attempt setting drop-off dropdown value
      setTimeout(() => {
        const selects = document.querySelectorAll("#booking-estimator select");
        selects.forEach((sel) => {
          const select = sel as HTMLSelectElement;
          if (select.innerHTML.includes("basukinath") || select.innerHTML.includes("ranchi")) {
            select.value = targetKey;
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
      }, 100);
    }, 100);
  };

  // Cross-widget Action 3: Tour pre-selection scrolling down directly to Contact Card
  const handleSelectTourPackage = (packageId: string) => {
    handleScrollToSection("contact-section");
    
    // Auto-pre-select package dropdown inside Contact central
    setTimeout(() => {
      // Find required elements
      const selects = document.querySelectorAll("#contact-section select");
      selects.forEach((sel) => {
        const select = sel as HTMLSelectElement;
        
        // Adjust main service dropdown to package
        if (select.innerHTML.includes("local_cab") || select.innerHTML.includes("tour_package")) {
          select.value = "tour_package";
          select.dispatchEvent(new Event("change", { bubbles: true }));
          
          // Next tick, update exact package identifier
          setTimeout(() => {
            const innerSelects = document.querySelectorAll("#contact-section select");
            innerSelects.forEach((inner) => {
              const innerSelect = inner as HTMLSelectElement;
              if (innerSelect.innerHTML.includes("deoghar-darshan")) {
                innerSelect.value = packageId;
                innerSelect.dispatchEvent(new Event("change", { bubbles: true }));
              }
            });
          }, 100);
        }
      });
    }, 100);
  };

  // Cross-widget Action 4: Stream custom AI Itinerary parameter to final contact slip
  const handlePreFillContactSlip = (aiMessage: string) => {
    setPreFilledMessage(aiMessage);
    handleScrollToSection("contact-section");
  };

  const notifyNewSubmission = () => {
    setTriggerCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-teal/20 selection:text-brand-teal">
      
      {/* Primary header bar */}
      <Header onScrollToSection={handleScrollToSection} />

      {/* Main spiritual and transit banner area with dynamic tab calculator */}
      <Hero 
        onNewInquiry={notifyNewSubmission} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Core values bento spotlight */}
      <Services onScrollToSection={handleScrollToSection} />

      {/* Curated tour packages section with detailed overlays */}
      <Packages onSelectPackage={handleSelectTourPackage} />

      {/* Dynamic premium vehicle categories & specifications */}
      <Fleet onSelectVehicle={handleSelectVehicleForEstimation} />

      {/* Gemini AI personalized travel planner */}
      <AIPlanner onPreFillInquiry={handlePreFillContactSlip} />

      {/* Tourist sights of Deoghar & Jharkhand */}
      <Destinations onSelectRoute={handleSelectRouteForTransit} />

      {/* Trust indexes and metrics */}
      <WhyChooseUs />

      {/* Google and Pilgrim reviews */}
      <Testimonials />

      {/* Interactive Reservation Contact Slip with live ledger tracking */}
      <ContactForm 
        preFilledContent={preFilledMessage} 
        onNewInquiryAdded={notifyNewSubmission}
        inquiries={inquiries}
      />

      {/* Legal & Anchor responsive footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Dynamic Floating Quick-Action Triggers for Desktop and Mobile */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/917004499684?text=Hello%20Darshnam%20Tours,%20I%20am%20interested%20in%20booking%20a%20cab%20/%20tour%20package."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative h-13 w-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          title="WhatsApp Support"
        >
          <span className="absolute right-14 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 shadow-md">
            WhatsApp Live Support
          </span>
          <WhatsAppIcon className="h-6 w-6 text-white text-emerald-50 fill-white" />
        </a>
        <a
          href="tel:+917004499684"
          className="group relative h-12 w-12 rounded-full bg-brand-teal hover:bg-brand-teal-hover text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse-slow"
          title="Call Dispatch"
        >
          <span className="absolute right-14 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 shadow-md">
            Call Live Hotline
          </span>
          <Phone className="h-5 w-5 fill-current" />
        </a>
      </div>

    </div>
  );
}
