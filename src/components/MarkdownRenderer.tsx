import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split content by lines
  const lines = content.split("\n");

  return (
    <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
      {lines.map((line, idx) => {
        let trimmed = line.trim();

        // Handle empty lines
        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // Handle Horizontal Rules
        if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
          return <hr key={idx} className="my-4 border-slate-200" />;
        }

        // Handle Headings (###, ####, ##, #)
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={idx} className="text-sm font-bold text-amber-700 mt-4 uppercase tracking-wider font-display">
              {formatBold(trimmed.substring(5))}
            </h4>
          );
        }
        if (trimmed.startsWith("### ")) {
          const text = trimmed.substring(4);
          return (
            <h3 key={idx} className="text-base font-bold text-slate-800 mt-5 border-l-4 border-amber-500 pl-2.5 font-display">
              {formatBold(text)}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-lg font-bold text-slate-900 mt-6 border-b pb-1 font-display">
              {formatBold(trimmed.substring(3))}
            </h2>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-xl font-extrabold text-slate-900 mt-6 font-display">
              {formatBold(trimmed.substring(2))}
            </h1>
          );
        }

        // Handle Bullet Lists (*, -)
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          // Check if it looks like a bold key-value bullet (e.g. "* **Morning:** visit here")
          const cleanText = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 ml-4 my-1">
              <span className="text-amber-500 mt-1.5 shrink-0 select-none text-[8px]">●</span>
              <span className="text-slate-600">{formatBold(cleanText)}</span>
            </div>
          );
        }

        // Handle Numbered Lists (e.g. "1. Welcome")
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          const num = numMatch[1];
          const text = numMatch[2];
          return (
            <div key={idx} className="flex items-start gap-2 ml-4 my-1">
              <span className="text-amber-600 font-bold font-mono text-sm shrink-0">{num}.</span>
              <span className="text-slate-600">{formatBold(text)}</span>
            </div>
          );
        }

        // Default Paragraph
        return (
          <p key={idx} className="text-slate-600">
            {formatBold(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

// Helper function to format bold markdown syntax (**text**) within a line
function formatBold(text: string) {
  const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
  if (parts.length === 1) return text;
  
  return parts.map((part, i) => {
    // Odd indexes are wrapped in bold
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part}
        </strong>
      );
    }
    return part;
  });
}
