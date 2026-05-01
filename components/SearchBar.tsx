'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [tab, setTab] = useState<'buy'|'rent'>('buy');
  const [q, setQ] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (tab === 'rent') params.set('status', 'for-rent');
    router.push(`/homes-for-sale?${params.toString()}`);
  };
  return (
    <div className={`bg-white rounded-2xl shadow-2xl ${compact ? 'p-3' : 'p-4 md:p-6'}`}>
      {!compact && (
        <div className="flex gap-1 mb-4 border-b border-ink/10">
          {(['buy','rent'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 text-sm font-semibold capitalize border-b-2 -mb-px transition ${tab===t ? 'border-brand text-brand' : 'border-transparent text-slate2 hover:text-ink'}`}>{t}</button>
          ))}
        </div>
      )}
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl">
          <Search size={18} className="text-slate2"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="City, neighborhood, ZIP, or address" className="flex-1 bg-transparent outline-none text-sm"/>
        </div>
        <button type="submit" className="btn-primary !rounded-xl">Search</button>
      </form>
    </div>
  );
}
