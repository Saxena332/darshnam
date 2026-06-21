import React from "react";
import { TESTIMONIALS } from "../data";
import { Star, Quote, Shield } from "lucide-react";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-100" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest font-mono mb-2 block">
            Customer Feedback & Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            What Devotees & Travelers Say About Darshnam
          </h2>
          <p className="mt-3 text-slate-500 text-xs sm:text-sm md:text-base font-sans">
            Genuine experiences narrated by families, elderly pilgrims, and companies who leased our cabs, mini-buses, and custom tour structures.
          </p>
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 relative shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Five star rating metrics */}
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-500 text-amber-500 shrink-0" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans italic relative z-10">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer signature */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center font-sans">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-display">
                    {review.author}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {review.location} • {review.date}
                  </span>
                </div>
                <div className="h-8 w-8 bg-slate-200/50 text-slate-400 rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Trust Badge */}
        <div className="mt-12 p-4 bg-slate-900 rounded-xl border border-white/5 max-w-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-white">
          <div className="flex items-center gap-3 text-left">
            <div className="h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center font-display text-white font-extrabold text-lg">
              ★
            </div>
            <div>
              <h4 className="font-bold text-sm">Highly Rated on Google Business</h4>
              <p className="text-[10px] text-slate-400 font-sans">Based on 350+ verified local traveler reviews.</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 font-bold font-mono text-xs sm:text-sm text-amber-400">
            <span>4.9 / 5.0 Google Score</span>
          </div>
        </div>

      </div>
    </section>
  );
};
