'use client';
import Link from 'next/link';
import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Property } from '@/lib/types';

const fmt = (n: number) => '$' + n.toLocaleString();

export default function PropertyCard({ p }: { p: Property }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    try { const f = JSON.parse(localStorage.getItem('havenly:favs') || '[]'); setFav(f.includes(p._id)); } catch {}
  }, [p._id]);
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const f: string[] = JSON.parse(localStorage.getItem('havenly:favs') || '[]');
      const next = f.includes(p._id) ? f.filter(x => x !== p._id) : [...f, p._id];
      localStorage.setItem('havenly:favs', JSON.stringify(next));
      setFav(!fav);
    } catch {}
  };
  return (
    <Link href={`/property/${p.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={p.mainImage} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="chip bg-white text-brand-dark">{p.status === 'for-rent' ? 'For Rent' : p.status === 'sold' ? 'Sold' : 'For Sale'}</span>
          {p.featured && <span className="chip bg-ink text-white">Featured</span>}
        </div>
        <button onClick={toggle} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 grid place-items-center hover:scale-110 transition" aria-label="Favorite">
          <Heart size={16} className={fav ? 'fill-brand text-brand' : 'text-ink'}/>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-extrabold text-ink">{fmt(p.price)}{p.status==='for-rent' && <span className="text-sm font-medium text-slate2">/mo</span>}</div>
        </div>
        <div className="flex gap-4 text-sm text-slate2 mt-2">
          <span className="flex items-center gap-1"><Bed size={14}/> {p.beds} bd</span>
          <span className="flex items-center gap-1"><Bath size={14}/> {p.baths} ba</span>
          <span className="flex items-center gap-1"><Maximize size={14}/> {p.sqft.toLocaleString()} sqft</span>
        </div>
        <div className="mt-2 text-sm text-slate2 flex items-start gap-1 line-clamp-2"><MapPin size={14} className="mt-0.5 flex-shrink-0"/> {p.address}, {p.city}, {p.state} {p.zip}</div>
      </div>
    </Link>
  );
}
