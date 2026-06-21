import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Define __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory store for user inquiries
interface Inquiry {
  id: string;
  type: "cab" | "tour" | "contact";
  name: string;
  phone: string;
  email?: string;
  date?: string;
  // Cab specific
  pickup?: string;
  dropoff?: string;
  tripType?: string;
  vehicleType?: string;
  // Tour specific
  packageId?: string;
  packageName?: string;
  guestsCount?: number;
  message?: string;
  createdAt: string;
  status: "Pending" | "Confirmed";
}

const inquiriesDb: Inquiry[] = [
  {
    id: "7281",
    type: "cab",
    name: "Aman Sharma",
    phone: "+91 98765 43210",
    email: "aman@example.com",
    date: "2026-06-25",
    pickup: "Deoghar Airport (AJL)",
    dropoff: "Baidyanath Temple Chowk",
    tripType: "Airport Transfer",
    vehicleType: "Sedan (Dzire/Etios)",
    createdAt: new Date().toISOString(),
    status: "Confirmed"
  },
  {
    id: "7282",
    type: "tour",
    name: "Rajesh Mishra",
    phone: "+91 99341 22841",
    email: "rajesh.mishra@example.com",
    date: "2026-07-02",
    packageName: "Holy Baidyanath & Basukinath Dham Darshan Special",
    guestsCount: 5,
    message: "Need VIP Darshan assistance for elderly parents.",
    createdAt: new Date().toISOString(),
    status: "Pending"
  }
];

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json());

  // API: Fetch inquiries (for live interaction confirmation in frontend)
  app.get("/api/inquiries", (req, res) => {
    res.json(inquiriesDb);
  });

  // API: Submit booking inquiry
  app.post("/api/inquiry", (req, res) => {
    const {
      type,
      name,
      phone,
      email,
      date,
      pickup,
      dropoff,
      tripType,
      vehicleType,
      packageId,
      packageName,
      guestsCount,
      message
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and Phone Number are required." });
    }

    const newInquiry: Inquiry = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      type: type || "contact",
      name,
      phone,
      email,
      date: date || new Date().toISOString().split("T")[0],
      pickup,
      dropoff,
      tripType,
      vehicleType,
      packageId,
      packageName,
      guestsCount: guestsCount ? parseInt(guestsCount, 10) : undefined,
      message,
      createdAt: new Date().toISOString(),
      status: "Pending"
    };

    inquiriesDb.unshift(newInquiry);
    console.log(`[DARSHNAM] New ${type} booking inquiries registered. ID: ${newInquiry.id}`);
    
    return res.json({
      success: true,
      message: "Your inquiry has been successfully transmitted. Our travel desktop in Deoghar will contact you shortly via Call or WhatsApp.",
      inquiry: newInquiry
    });
  });

  // API: AI Travel Planner (using Google GenAI gemini-3.5-flash)
  app.post("/api/plan-itinerary", async (req, res) => {
    const { durationDays, travelersCount, mainIntents, travelMonth, vehiclePref } = req.body;

    if (!durationDays || !travelersCount) {
      return res.status(400).json({ error: "Please provide both trip duration and number of travelers." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      console.warn("[DARSHNAM] GEMINI_API_KEY is not configured. Falling back to local offline tour planner.");
      // Provide an elegant fallback response mimicking the AI
      return res.json({
        plans: `### Your Custom Deoghar & Jharkhand Itinerary (Offline Mode)
Thank you for planning with **Darshnam Tours**. To unlock fully smart custom itineraries, please configure your **GEMINI_API_KEY** in the Secrets panel. Here is your structured local plan draft:

#### **Trip Overview**
* **Duration:** ${durationDays} Days
* **Travelers:** ${travelersCount} Pax
* **Focal Interest:** ${mainIntents || "Pilgrimage & Local Sightseeing"}
* **Month of Travel:** ${travelMonth || "June"}
* **Recommended Fleet:** ${vehiclePref || (parseInt(travelersCount, 10) > 5 ? "Innova SUV / Tempo Traveller" : "Sedan (Dezire)")}

---

#### **Day 1: Welcome to Deoghar & Jyotirlinga Abhishek**
* **Morning (08:00 AM - 12:00 PM):** Pickup from Deoghar Airport (AJL) or Jasidih Railway Station (JSME) in our clean executive ${vehiclePref || "Sedan"}. Check in to your hotel, freshen up, and head to **Baba Baidyanath Temple**. Enjoy a smooth VIP Shrishti/Sankalp Darshan.
* **Afternoon (01:00 PM - 03:30 PM):** Delightful local lunch (pure veg delicacies near Tower Chowk).
* **Late Afternoon (04:00 PM - 07:00 PM):** Scenic visit to **Naulakha Mandir** (a miniature replica of Belur Math with stunning architecture) followed by views from **Nandan Pahar** park. 
* **Evening:** Attend the holy **Shringar Puja** at Baidyanath Mandir. Overnight stay in Deoghar.

#### **Day 2: Basukinath Dham & Tapovan Adventure**
* **Morning (07:30 AM - 11:30 AM):** Ride to **Basukinath Dham** (43 km from Deoghar). Baba Basukinath is known as the "Court of Mahadev". Pilgrims must pay respects here to complete their pilgrimage.
* **Afternoon (12:30 PM - 03:00 PM):** Return to Deoghar. Stopover at **Tapovan Hills**, famous for its historic rock-cut caves and historical association with Sage Valmiki.
* **Evening (04:00 PM onwards):** Shopping for local sweets (the famous **Peda** of Deoghar) and sacred souvenirs. Drop off back to railway station/airport for departure.

---

*Need customization or want to book this itinerary? Simply submit our contact form below or call **+91 70044 99684**!*`
      });
    }

    try {
      // Lazy initialization of GoogleGenAI client (avoids platform crash at import time)
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are the lead travel planning expert for "Darshnam Tours & Cab Booking", the premium Destination Management Company (DMC) of Jharkhand and Deoghar.
Generate a professional, highly detailed, customized travel itinerary for a guest with the following requirements:
- Duration: ${durationDays} Days / Nights
- Number of Travelers: ${travelersCount} Persons
- Areas/Intent of Interest: ${mainIntents || "General Pilgrimage and Sightseeing (Baidyanath Dham, Basukinath Dham, Trikut Hills, Tapovan, Naulakha)"}
- Month of Travel: ${travelMonth || "Not specified (assume standard season)"}
- Preferred Vehicle requested: ${vehiclePref || "Best match vehicle based on travelers count"}

Provide a helpful, beautifully structured, day-by-day travel plan written in Markdown. Use bullet points, bold headers, and elegant styling.
Include:
1. An introductory warm welcome message acknowledging Deoghar as a land of spirituality.
2. A clear breakdown of each day's plan (Morning, Afternoon, Evening schedule). Highlight specific religious practices (such as VIP Abhishek, Shringar Aarti, Sankalp) and tourist attractions (Baidyanath Temple, Basukinath Temple, Trikut Hills Ropeway - check safety status, Nandan Pahar, Naulakha Mandir, Tapovan, Satsang Ashram, Dev Sangha, or Rajrappa/Parasnath if trip is longer than 2 days).
3. Practical advice on darshan queuing, dress codes, sweet delicacies (such as the famous Deoghar Peda and Tilkut), and local markets.
4. Professional vehicle recommendations matching the party size (e.g., recommend spacious Sedan for up to 3-4 pax, Innova Crysta for 5-7 pax, and Tempo Traveller or luxury Mini Bus for groups above 7). Mention how Darshnam's fleet provides clean cars and seasoned local drivers.
5. End with a clear Call to Action (CTA) instructing them to use Darshnam's Booking Portal or call their primary hotline (+91 70044 99684) to finalize travel arrangements.

Format the output strictly as markdown. Keep the tone warm, welcoming, polite, and highly cooperative to boost customer trust.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      return res.json({
        plans: response.text || "Failed to generate plan. Please try again."
      });
    } catch (err: any) {
      console.error("[DARSHNAM] Error with Gemini API call:", err);
      return res.status(500).json({
        error: "AI Generation experienced an issue. Fallback to contact hotline is recommended.",
        details: err.message
      });
    }
  });

  // Vite Integration for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DARSHNAM] Redesigned Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
