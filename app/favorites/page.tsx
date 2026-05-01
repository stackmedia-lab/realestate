'use client';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/lib/mock-data';
import type { Property } from '@/lib/types';

export default function FavoritesPage() {
  const [favs, setFavs] = useState<Property[]>([]);
  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem('havenly:favs') || '[]');
      setFavs(properties.filter(p => ids.includes(p._id)));
    } catch {}
  }, []);
  return (
    <div className="container-x py-12">
      <div className="mb-8 flex items-center gap-3"><Heart className="text-brand fill-brand"/><h1 className="text-3xl md:text-4xl font-extrabold">Saved homes</h1></div>
      {favs.length === 0 ? (
        <div className="text-center py-20 text-slate2">No saved homes yet. Tap the heart on any listing to save it.</div>
      ) : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{favs.map(p => <PropertyCard key={p._id} p={p}/>)}</div>}
    </div>
  );
}
