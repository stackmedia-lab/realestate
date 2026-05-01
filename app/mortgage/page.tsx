'use client';
import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

export default function MortgagePage() {
  const [price, setPrice] = useState(750000);
  const [down, setDown] = useState(150000);
  const [rate, setRate] = useState(6.75);
  const [years, setYears] = useState(30);

  const { monthly, total, interest } = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = years * 12;
    const m = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
    const t = m * n;
    return { monthly: m, total: t, interest: t - principal };
  }, [price, down, rate, years]);

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

  return (
    <div className="container-x py-12 max-w-4xl">
      <div className="text-center mb-10"><Calculator className="mx-auto text-brand" size={36}/><h1 className="mt-3 text-4xl font-extrabold">Mortgage Calculator</h1><p className="text-slate2 mt-2">Estimate your monthly payment.</p></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-ink/5 rounded-2xl p-6 shadow-card space-y-5">
          {[
            { label: 'Home Price', val: price, set: setPrice, min: 50000, max: 10000000, step: 5000, prefix: '$' },
            { label: 'Down Payment', val: down, set: setDown, min: 0, max: price, step: 5000, prefix: '$' },
            { label: 'Interest Rate', val: rate, set: setRate, min: 0.5, max: 15, step: 0.05, suffix: '%' },
            { label: 'Loan Term (years)', val: years, set: setYears, min: 5, max: 40, step: 1 }
          ].map((f: any) => (
            <div key={f.label}>
              <div className="flex justify-between text-sm font-semibold mb-2"><span>{f.label}</span><span className="text-brand">{f.prefix||''}{typeof f.val==='number' && f.val % 1 ? f.val.toFixed(2) : f.val.toLocaleString()}{f.suffix||''}</span></div>
              <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(Number(e.target.value))} className="w-full accent-brand"/>
              <input type="number" value={f.val} onChange={e => f.set(Number(e.target.value))} className="mt-2 w-full px-3 py-2 border rounded-lg text-sm"/>
            </div>
          ))}
        </div>
        <div className="bg-ink text-white rounded-2xl p-8 flex flex-col justify-center">
          <div className="text-white/70 text-sm">Estimated monthly payment</div>
          <div className="text-5xl font-extrabold mt-2 text-brand">{fmt(monthly)}</div>
          <div className="border-t border-white/10 mt-6 pt-6 space-y-3">
            <div className="flex justify-between"><span className="text-white/70">Loan amount</span><span className="font-semibold">{fmt(price - down)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Total interest</span><span className="font-semibold">{fmt(interest)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Total payment</span><span className="font-semibold">{fmt(total)}</span></div>
          </div>
          <p className="text-xs text-white/50 mt-6">Estimate excludes taxes, insurance, and HOA. Consult a lender for precise figures.</p>
        </div>
      </div>
    </div>
  );
}
