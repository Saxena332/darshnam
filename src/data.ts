import { Vehicle, TourPackage, Destination, Review } from "./types";

export const VECHICLES_DATA: Vehicle[] = [
  {
    id: "dzire",
    name: "Maruti Suzuki Dzire / Toyota Etios",
    category: "Sedan",
    seatCount: 4,
    luggageCount: 2,
    ac: true,
    pricePerKm: 12,
    local8hr80kmRate: 2200,
    airportTransferRate: 800,
    features: ["Ample Legroom", "Air Conditioning", "USB Charger", "Bluetooth Audio", "Clean Seat Covers", "Experienced Local Driver"],
    imageUrl: "https://stimg.cardekho.com/car-images/carexteriorimages/630x420/Toyota/Toyota-Etios-Liva/front-left-side-047.jpg"
  },
  {
    id: "ertiga",
    name: "Maruti Suzuki Ertiga",
    category: "SUV",
    seatCount: 6,
    luggageCount: 3,
    ac: true,
    pricePerKm: 15,
    local8hr80kmRate: 2800,
    airportTransferRate: 1200,
    features: ["Flexible 7-Seater", "Roof AC Vents", "Comfortable Family Ride", "Carrier for extra luggage", "Eco-friendly option"],
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600" // Family SUV
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    category: "MUV",
    seatCount: 7,
    luggageCount: 4,
    ac: true,
    pricePerKm: 18,
    local8hr80kmRate: 3800,
    airportTransferRate: 1500,
    features: ["Premium Captain Seats", "VIP Travel Seating", "Advanced Safety Airbags", "Spacious Dual AC", "Perfect for long outstation rides"],
    imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600" // Premium MPV
  },
  {
    id: "tempo",
    name: "Tempo Traveller (Luxury 12/17 Seater)",
    category: "Tempo Traveller",
    seatCount: 17,
    luggageCount: 8,
    ac: true,
    pricePerKm: 24,
    local8hr80kmRate: 5500,
    airportTransferRate: 2500,
    features: ["Pushback seats", "LED Television on board", "Spacious aisle", "High Roof Clearance", "Ideal for Joint Families & Pilgrimage Groups"],
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/1/EW/LE/SD/107055792/9-seater-tempo-traveller-rental-service.jpg"
  },
  {
    id: "minibus",
    name: "Luxury Mini Bus / Coach",
    category: "Coobus",
    seatCount: 26,
    luggageCount: 15,
    ac: true,
    pricePerKm: 35,
    local8hr80kmRate: 7500,
    airportTransferRate: 4500,
    features: ["Luxury Suspensions", "Integrated Mic & Sound System", "Spacious Under-bus Luggage", "Semi-Sleeper Leather Seats"],
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600" // Premium Bus
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "deoghar-darshan",
    name: "Baidyanath Dham VIP Darshan Special",
    duration: "1 Day / Same Day",
    destinations: ["Baidyanath Jyotirlinga Temple", "Naulakha Mandir", "Satsang Ashram", "Nandan Pahar"],
    priceStarting: 1500,
    highlights: [
      "VIP Shrishti/Sankalp Darshan assistance at Baba Mandir",
      "Dedicated local tour coordinator to guide through rituals",
      "Pure vegetarian celebratory lunch",
      "AC Sedan cab pickup & drop-off from hotel or railway station"
    ],
    inclusions: [
      "Private AC vehicle at disposal",
      "Expert driver guide",
      "Fast-track entry (VIP pass arrangement support)",
      "Complimentary mineral water & local sweets box (Peda)"
    ],
    description: "Experience absolute peace and hassle-free spirituality at the holy Baidyanath Jyotirlinga, Deoghar. Specially designed for families and elderly travelers needing fast-track, respectful temple arrangements.",
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/09/7f/87/bol-bam.jpg?w=700&h=400&s=1",
    detailedItinerary: [
      { day: 1, title: "Tirthayatra & Local Heritage", desc: "Start with morning pick-up. Enjoy arranged assistance for worship and Jal-Abhishek at the main shrine. Afternoon sightseeing including beautiful Naulakha Temple, Satsang Ashram, and scenic sunset overlooking the city from Nandan Pahar." }
    ]
  },
  {
    id: "twin-dhams",
    name: "Baidyanath & Basukinath Twin Dham Yatra",
    duration: "2 Days / 1 Night",
    destinations: ["Deoghar", "Basukinath Temple", "Tapovan Caves", "Trikut Hills"],
    priceStarting: 3499,
    highlights: [
      "Both major religious power centers of Jharkhand covered",
      "Ropeway ride at Trikut Hills (subject to clearance)",
      "Explore historical Valmiki Tapovan rock caves",
      "Stately comfortable overnight hotel coordination"
    ],
    inclusions: [
      "Complete AC SUV / Sedan transit for 2 days",
      "Hotel pickup, drop-off and Basukinath highway transit",
      "Toll taxes, driver allowance, and parking fees included",
      "Experienced local pilgrimage navigator"
    ],
    description: "No pilgrimage to Deoghar is complete without paying homage at Basukinath Dham (43 km away), considered the judicial court of Lord Shiva. This twin-dham tour guarantees absolute coverage of all holy rites.",
    imageUrl: "https://images.bhaskarassets.com/web2images/521/2018/10/24/saivalainga.jpg",
    detailedItinerary: [
      { day: 1, title: "Arrive in Deoghar & Fast-Track Darshan", desc: "Pickup from Jasidih Station. Embark on the holy Baba Baidyanath temple rituals. Afternoon trip to Naulakha Mandir and sunset views. Overnight at pre-booked certified hygiene hotel." },
      { day: 2, title: "Transit to Basukinath Court & Tapovan Hills", desc: "After breakfast, a scenic 1-hour highway drive to the beautiful Basukinath Dham. Perform special prayers. On return, explore the peaceful rock chambers of Tapovan Hills where sages meditated. Evening sweet-market tour and drop-off." }
    ]
  },
  {
    id: "parasnath-holy",
    name: "Parasnath Shikharji Jain Pilgrimage Special",
    duration: "3 Days / 2 Nights",
    destinations: ["Deoghar", "Parasnath Hills (Madhuban)", "Basukinath"],
    priceStarting: 8499,
    highlights: [
      "Ascend the sacred Parasnath Hill (Sammed Shikharji)",
      "20 out of 24 Jain Tirthankaras attained salvation here",
      "Premium luxury stay at Madhuban foothills",
      "Coordinated doli (palanquin) or guide booking support"
    ],
    inclusions: [
      "Spacious vehicle (Innova Crysta or Dzire) at disposal for 3 days",
      "Experienced mountain-route driver",
      "Traditional vegetarian satvik meals",
      "Round-the-clock service backup"
    ],
    description: "Sammed Shikharji on Parasnath Hills is the most sacred pilgrimage site for Jainism in Jharkhand. Combined with Deoghar's spiritual power, this is a premium holy tour of a lifetime.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCh2rqawKZAT5SU5FNVoFa19K9CQVvr1uld1RbPEwIfJmFR6ZbZSEyJI&s=10",
    detailedItinerary: [
      { day: 1, title: "Deoghar Arrival & Local Sightseeing", desc: "Airport pick up. Visit Baidyanath Mandir and local spiritual spots. Prepare for the mountain hike. Travel to Madhuban base in the evening." },
      { day: 2, title: "Parasnath Hill Sacred Climb", desc: "Early morning start (04:00 AM) to ascend Shikharji hill (trek or doli support). Return by afternoon. Take rest and absorb the absolute quietude of Madhuban Jain Temples." },
      { day: 3, title: "Highway to Basukinath & Return", desc: "Return route via Basukinath Dham. Final prayer offerings and souvenir collection. Drop-off at Jasidih or Ranchi Airport." }
    ]
  },
  {
    id: "jharkhand-heritage",
    name: "Jharkhand Explorer: Ranchi, Rajrappa & Deoghar",
    duration: "4 Days / 3 Nights",
    destinations: ["Ranchi", "Rajrappa Chhinnamasta Mandir", "Baidyanath Dham", "Basukinath"],
    priceStarting: 12999,
    highlights: [
      "Explore Ranchi's majestic waterfalls (Hundru & Jonha Falls)",
      "Visit the powerful Shakti-peeth of Rajrappa Temple",
      "Complete Baba Baidyanath Jyotirlinga and Basukinath Darshan",
      "Scenic cross-state ghat-roads drive"
    ],
    inclusions: [
      "Intercity private vehicle for 4 entire days (Innova or Sedan)",
      "Toll charges, state taxes, driver overnight allowance",
      "Assistance at all major pilgrimage centers",
      "Reliable customer concierge support"
    ],
    description: "A comprehensive Destination Management Package covering Jharkhand's breathtaking natural waterfalls, massive scenic dams, intense religious energy at Rajrappa Shakti-peeth, and the Mahadev pilgrimage.",
    imageUrl: "https://3.imimg.com/data3/QL/MF/GLADMIN-14674645/54c92277b279e.jpg",
    detailedItinerary: [
      { day: 1, title: "Ranchi Waterfalls & City Tour", desc: "Pickup from Ranchi Airport (IXR). Head towards majestic Hundru and Jonha waterfalls. Evening visit to ancient Jagannath Temple in Ranchi." },
      { day: 2, title: "Rajrappa Shakti-peeth & Drive to Deoghar", desc: "Drive to Rajrappa to worship Goddess Chhinnamasta, sitting at the scenic confluence of Damodar & Bhera rivers. Evening highway drive to Deoghar." },
      { day: 3, title: "Baidyanath & Basukinath Dham Special", desc: "Complete early morning worship rituals at Deoghar. Post lunch, visit the serene Basukinath Dham court and Tapovan caves." },
      { day: 4, title: "Nandan Pahar Sunset & Departure", desc: "Morning shopping for native items (Deoghar Peda, handicrafts). Drive back to Ranchi or local drop off at Deoghar Airport (AJL)." }
    ]
  }
];

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: "baidyanath-temple",
    name: "Baba Baidyanath Jyotirlinga Temple",
    description: "One of the 12 sacred Jyotirlingas in India and a critical Shakti-Peeth. Millions of saffron-clad pilgrims (Kanwariyas) walk 105 km from Sultanganj in Shravan month to pour holy Ganges water on Lord Shiva.",
    distanceDeoghar: "Centrally Located (0 km)",
    highlights: ["Chandra Kanta Mani Shrine", "Holy Alliance of Shiva & Shakti represented by red threads connecting Temples", "Shrigar Aarti at 07:30 PM"],
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/09/7f/87/bol-bam.jpg?w=700&h=400&s=1"
  },
  {
    id: "basukinath",
    name: "Basukinath Temple (Basukinath Dham)",
    description: "Located on the Deoghar-Dumka state highway, Basukinath is the judicial court of Lord Shiva. It is believed that while Baba Baidyanath hears petitions, Baba Basukinath passes the final judgements.",
    distanceDeoghar: "43 km from Deoghar",
    highlights: ["Beautiful rural backdrop", "Peaceful temple ponds", "Direct highway connectivity"],
    imageUrl: "https://images.bhaskarassets.com/web2images/521/2018/10/24/saivalainga.jpg"
  },
  {
    id: "trikut-hills",
    name: "Trikut Pahar (Trikut Hills)",
    description: "Famous for three distinct peaks (representing Brahma, Vishnu, Mahesh) and Jharkhand's highest ropeway adventure. Surrounded by pristine forest and home to wild langurs and natural hermitages.",
    distanceDeoghar: "18 km on Deoghar-Dumka Road",
    highlights: ["Ropeway ride to top peak", "Spectacular panoramic photography", "Historic sage cottages"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7izNWEmsS7CVG9nfXiFf3wM2TXF7mfFhhinQbT1AgxW6czGOBdfKV4qNY&s=10"
  },
  {
    id: "tapovan-caves",
    name: "Tapovan Hills & Valmiki Caves",
    description: "A tranquil sacred hillock studded with giant natural boulders and internal rock cavities. Sage Valmiki lived and performed penance here, making it an extraordinary center of calm.",
    distanceDeoghar: "10 km from Deoghar Town",
    highlights: ["Valmiki Cave exploration", "Holy Hanuman temple atop the boulder", "Sanskrit meditation center"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1--oyA-VZ-Wfy2BndBunHWcNo7SHK9R68aUPJl9doL1JOsbOgresjt8x6&s=10"
  },
  {
    id: "ranchi-falls",
    name: "Ranchi Hills & Waterfall Circuit",
    description: "The capital city of Ranchi features high altitude visual plateaus, the gorgeous concrete-ringed Maithon Dam, and breathtaking waterfalls like Hundru Falls dropping from 320 feet height.",
    distanceDeoghar: "250 km from Deoghar",
    highlights: ["Hundru Waterfalls", "Dassam and Jonha serene viewpoints", "Patratu Valley hairpin curves"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nM2JHmGGeqqjWo4-1qaHaPONlvWGnAi4CS07EHu5HJqwy-imiG-nQh4&s=10"
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: "1",
    author: "Shashi Kant Tiwari",
    location: "Varanasi, UP",
    rating: 5,
    comment: "Excellent service! We booked an Innova Crysta for our family of 6 from Jasidih Station. The car was spotless, smells clean, and the driver Rajesh was extremely respectful. He knew exactly where the bypass roads were to avoid congestion and even helped my elderly father get a comfortable entry for the Baidyanath darshan.",
    date: "May 14, 2026"
  },
  {
    id: "2",
    author: "Priyamvada Sen",
    location: "Kolkata, WB",
    rating: 5,
    comment: "This was our first time booking a customized package for Deoghar and Basukinath tours. Darshnam Tours planned the entire yatra flawlessly. From Deoghar Airport pickup to Basukinath highway drop-off, the pricing was very transparent with no hidden charges whatsoever. Strongly recommended DMC for Jharkhand!",
    date: "June 03, 2026"
  },
  {
    id: "3",
    author: "Deepak Jain",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    comment: "We used Darshnam for a 3-day pilgrimage covering Deoghar and Sammed Shikharji (Parasnath). For a group of 12, the 17-Seater Tempo Traveller was perfect. Reliable seat pushbacks, fantastic AC, and a highly experienced driver who drove so safely on mountain roads. Highly professional travel agency.",
    date: "June 18, 2026"
  }
];
