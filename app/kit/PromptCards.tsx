"use client";

import { useState } from "react";

const PROMPTS = [
  {
    label: "Career productivity",
    color: "blue",
    text: `I am a [YOUR ROLE] at a [COMPANY TYPE]. Give me 5 specific ways I could use AI to save time in my work this week. Be concrete, not generic.`,
  },
  {
    label: "Business social media",
    color: "cyan",
    text: `I run a [DESCRIBE YOUR BUSINESS] in [CITY/AREA]. Write 3 Instagram captions: a weekend special, a behind-the-scenes moment, and a community post. Each under 150 characters.`,
  },
  {
    label: "Resume rewrite",
    color: "teal",
    text: `Here is one of my resume bullets: [PASTE YOUR BULLET]. Rewrite it to focus on measurable outcomes, not just duties. Give me 3 different versions.`,
  },
  {
    label: "Meeting follow-up email",
    color: "amber",
    text: `Write a professional follow-up email after a meeting with [CLIENT / MANAGER]. Include key decisions, next steps, and owners. Tone: warm and direct. Max 120 words.`,
  },
  {
    label: "Stock Analysis Framework",
    color: "purple",
    advanced: true,
    text: `Act as a professional equity analyst. Analyze [TICKER SYMBOL, e.g. AAPL] using the following framework:

1. Business overview — What does the company do, who are its customers, and what is its competitive moat?
2. Recent financials — Revenue growth rate, gross margin trend, and free cash flow over the last 3 years.
3. Valuation — Current P/E, forward P/E, and EV/EBITDA versus sector peers. Is the stock cheap or expensive?
4. Key risks — Top 3 risks that could hurt the stock price over the next 12 months.
5. Bull case vs. bear case — One paragraph for each scenario — the optimistic and the pessimistic outlook.
6. Verdict — Buy, Hold, or Avoid — with a one-sentence rationale and a suggested entry price range.

Use publicly available data only. Be specific with numbers. Flag any figures you are uncertain about.`,
  },
];

export default function PromptCards() {
  const [copied, setCopied] = useState<number | null>(null);

  async function copyPrompt(text: string, idx: number) {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="prompt-cards">
      {PROMPTS.map((p, i) => (
        <div key={i} className={`prompt-card prompt-${p.color}${p.advanced ? " prompt-advanced" : ""}`}>
          <div className="prompt-card-header">
            <span className={`prompt-label prompt-label-${p.color}`}>
              {p.advanced ? "⭐ " : ""}{p.label}
            </span>
            <button
              className="prompt-copy-btn"
              onClick={() => copyPrompt(p.text, i)}
            >
              {copied === i ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="prompt-text">{p.text}</pre>
        </div>
      ))}

      <style>{`
        .prompt-cards { display: flex; flex-direction: column; gap: 1rem; }
        .prompt-card {
          border-radius: 12px;
          border: 1px solid;
          overflow: hidden;
        }
        .prompt-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .prompt-label {
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .prompt-label-blue  { color: var(--blue); }
        .prompt-label-cyan  { color: var(--cyan); }
        .prompt-label-teal  { color: var(--teal); }
        .prompt-label-amber { color: var(--amber); }
        .prompt-label-purple { color: var(--purple); }

        .prompt-copy-btn {
          font-size: 0.8rem;
          font-weight: 600;
          font-family: inherit;
          padding: 0.3rem 0.875rem;
          border-radius: 6px;
          cursor: pointer;
          border: 1px solid;
          background: rgba(255,255,255,0.6);
          transition: background 0.15s;
        }
        .prompt-copy-btn:hover { background: rgba(255,255,255,0.9); }

        .prompt-blue   { background: var(--blue-bg);   border-color: var(--blue-bd); }
        .prompt-cyan   { background: var(--cyan-bg);   border-color: var(--cyan-bd); }
        .prompt-teal   { background: var(--teal-bg);   border-color: var(--teal-bd); }
        .prompt-amber  { background: var(--amber-bg);  border-color: var(--amber-bd); }
        .prompt-purple { background: var(--purple-bg); border-color: var(--purple-bd); }
        .prompt-advanced { border-width: 2px; }

        .prompt-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8125rem;
          line-height: 1.65;
          padding: 1rem;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--ink);
        }
      `}</style>
    </div>
  );
}
