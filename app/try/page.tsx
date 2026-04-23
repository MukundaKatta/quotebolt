"use client";

import { useState } from "react";
import Link from "next/link";

interface LineItem {
  description: string;
  amount: number;
}

interface Quote {
  jobTitle: string;
  laborHours: number;
  laborRate: number;
  materials: LineItem[];
  markup: number;
}

type JobCategory = "tile" | "paint" | "electrical" | "general";

const QUOTE_BANDS: Record<JobCategory, Quote> = {
  tile: {
    jobTitle: "Tile Installation",
    laborHours: 16,
    laborRate: 65,
    materials: [
      { description: "Porcelain tile, 200 sqft", amount: 1200 },
      { description: "Thinset mortar, 4 bags", amount: 120 },
      { description: "Grout (sanded), 2 bags", amount: 60 },
      { description: "Backer board, 10 sheets", amount: 250 },
      { description: "Tile spacers & leveling clips", amount: 45 },
    ],
    markup: 0.15,
  },
  paint: {
    jobTitle: "Interior Painting",
    laborHours: 12,
    laborRate: 55,
    materials: [
      { description: "Premium latex paint, 5 gal", amount: 275 },
      { description: "Primer, 2 gal", amount: 90 },
      { description: "Painter's tape, rollers, brushes", amount: 65 },
      { description: "Drop cloths & plastic sheeting", amount: 40 },
      { description: "Caulk & patch compound", amount: 30 },
    ],
    markup: 0.15,
  },
  electrical: {
    jobTitle: "Electrical Work",
    laborHours: 10,
    laborRate: 85,
    materials: [
      { description: "Romex wire (12/2), 250 ft", amount: 180 },
      { description: "Outlets & switches, 12 pcs", amount: 96 },
      { description: "Junction boxes, 12 pcs", amount: 72 },
      { description: "Circuit breaker, 20A", amount: 45 },
      { description: "Wire nuts, connectors, staples", amount: 35 },
    ],
    markup: 0.15,
  },
  general: {
    jobTitle: "General Contracting",
    laborHours: 14,
    laborRate: 60,
    materials: [
      { description: "Lumber & framing materials", amount: 800 },
      { description: "Fasteners & hardware", amount: 120 },
      { description: "Finish materials", amount: 350 },
      { description: "Miscellaneous supplies", amount: 150 },
    ],
    markup: 0.15,
  },
};

function detectCategory(text: string): JobCategory {
  const lower = text.toLowerCase();
  if (/\btile|tiling|grout|backsplash|floor(ing)?\b/.test(lower)) return "tile";
  if (/\bpaint(ing)?|primer|wall\s*color|repaint\b/.test(lower)) return "paint";
  if (/\belectrical|wiring|outlet|switch|circuit|panel\b/.test(lower)) return "electrical";
  return "general";
}

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function TryPage() {
  const [description, setDescription] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    const category = detectCategory(description);
    setQuote(QUOTE_BANDS[category]);
  }

  function handleReset() {
    setDescription("");
    setQuote(null);
  }

  const laborTotal = quote ? quote.laborHours * quote.laborRate : 0;
  const materialsTotal = quote
    ? quote.materials.reduce((sum, m) => sum + m.amount, 0)
    : 0;
  const subtotal = laborTotal + materialsTotal;
  const markupAmount = quote ? Math.round(subtotal * quote.markup) : 0;
  const total = subtotal + markupAmount;

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-500" />
          Quotebolt
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:opacity-70">
            Home
          </Link>
          <a
            href="/#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-6 pt-12 pb-28">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-yellow-600">
          Try it
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Describe the job. Get a quote.
        </h1>
        <p className="mt-3 text-neutral-600">
          Type a plain-English description of the work. We&#39;ll generate an itemized quote with
          labor hours, materials, and markup.
        </p>

        {!quote ? (
          <form onSubmit={handleSubmit} className="mt-8">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Tile a 120 sqft bathroom floor with porcelain tile, remove old vinyl first."
              rows={5}
              className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
            <button
              type="submit"
              disabled={!description.trim()}
              className="mt-4 rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-40"
            >
              Generate quote
            </button>
          </form>
        ) : (
          <div className="mt-8">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
                Quote &middot; {quote.jobTitle}
              </div>

              {/* Labor */}
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Labor
                </h3>
                <div className="mt-2 flex items-baseline justify-between border-b border-neutral-200 pb-2 text-sm">
                  <span>
                    {quote.laborHours} hours @ {formatCurrency(quote.laborRate)}/hr
                  </span>
                  <span className="font-medium">{formatCurrency(laborTotal)}</span>
                </div>
              </div>

              {/* Materials */}
              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Materials
                </h3>
                <div className="mt-2 space-y-2 text-sm">
                  {quote.materials.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-baseline justify-between border-b border-neutral-200 pb-2"
                    >
                      <span>{m.description}</span>
                      <span className="font-medium">{formatCurrency(m.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Markup & Total */}
              <div className="mt-5 space-y-2 text-sm">
                <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2">
                  <span>Markup ({Math.round(quote.markup * 100)}%)</span>
                  <span className="font-medium">{formatCurrency(markupAmount)}</span>
                </div>
                <div className="flex items-baseline justify-between pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-yellow-700">{formatCurrency(total)}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Mocked quote &middot; v0 skeleton &middot; real AI pricing coming soon
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleReset}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition hover:border-neutral-900"
              >
                New quote
              </button>
              <a
                href="/#waitlist"
                className="rounded-full bg-yellow-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-yellow-700"
              >
                Get early access
              </a>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
            Quotebolt
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </>
  );
}
