import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Bed, Bath, Maximize, MapPin, Calendar, Home as HomeIcon, Check, Phone, Mail } from 'lucide-react';
import { getProperty, getProperties, getAgents } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import TourForm from '@/components/TourForm';

export async function generateStaticParams() {
  const props = await getProperties();
  return props.map(p => ({ slug: p.slug }));
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const p = await getProperty(params.slug);
  if (!p) notFound();
  const agents = await getAgents();
  const agent = agents.find(a => a._id === p.agentId);
  const others = (await getProperties()).filter(x => x._id !== p._id).slice(0, 3);
  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div className="container-x py-8">
      <Link href="/homes-for-sale" className="text-sm text-slate2 hover:text-brand">← Back to listings</Link>
      <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-2 h-[280px] md:h-[480px] rounded-2xl overflow-hidden">
        <img src={p.mainImage} alt={p.title} className="col-span-4 md:col-span-2 row-span-2 w-full h-full object-cover"/>
        {[0,1,2,3].map(i => p.gallery[i] && <img key={i} src={p.gallery[i]} alt="" className="hidden md:block w-full h-full object-cover"/>)}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10 mt-8">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="chip">{p.status === 'for-rent' ? 'For Rent' : 'For Sale'}</span>
            <span className="chip bg-slate-100 text-slate2 capitalize">{p.propertyType}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">{p.title}</h1>
          <div className="flex items-center gap-1 text-slate2 mt-2"><MapPin size={16}/> {p.address}, {p.city}, {p.state} {p.zip}</div>
          <div className="text-4xl font-extrabold text-brand mt-4">{fmt(p.price)}{p.status==='for-rent' && <span className="text-lg font-medium text-slate2">/mo</span>}</div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-5 bg-slate-50 rounded-xl">
            <div className="text-center"><Bed className="mx-auto text-brand" size={22}/><div className="font-bold mt-1">{p.beds}</div><div className="text-xs text-slate2">Bedrooms</div></div>
            <div className="text-center"><Bath className="mx-auto text-brand" size={22}/><div className="font-bold mt-1">{p.baths}</div><div className="text-xs text-slate2">Bathrooms</div></div>
            <div className="text-center"><Maximize className="mx-auto text-brand" size={22}/><div className="font-bold mt-1">{p.sqft.toLocaleString()}</div><div className="text-xs text-slate2">Sq Ft</div></div>
            <div className="text-center"><Calendar className="mx-auto text-brand" size={22}/><div className="font-bold mt-1">{p.yearBuilt || '—'}</div><div className="text-xs text-slate2">Built</div></div>
          </div>

          <section className="mt-8"><h2 className="text-2xl font-bold mb-3">About this home</h2><p className="text-slate2 leading-relaxed">{p.description}</p></section>

          <section className="mt-8"><h2 className="text-2xl font-bold mb-4">Features & amenities</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {p.features.map(f => <div key={f} className="flex items-center gap-2 text-sm"><Check size={16} className="text-brand"/> {f}</div>)}
            </div>
          </section>

          <section className="mt-8"><h2 className="text-2xl font-bold mb-3">Location</h2>
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
              <iframe title="map" className="w-full h-full border-0" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(p.address+', '+p.city+', '+p.state)}&output=embed`}/>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-20 self-start space-y-5">
          {agent && (
            <div className="bg-white border border-ink/5 rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-3"><img src={agent.photo} alt={agent.name} className="w-14 h-14 rounded-full object-cover"/><div><div className="font-bold">{agent.name}</div><div className="text-sm text-slate2">{agent.title}</div></div></div>
              <div className="mt-4 space-y-2 text-sm">
                <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-slate2 hover:text-brand"><Phone size={14}/> {agent.phone}</a>
                <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-slate2 hover:text-brand"><Mail size={14}/> {agent.email}</a>
              </div>
              <Link href={`/agents/${agent.slug}`} className="btn-outline w-full mt-4 !py-2 text-sm">View agent</Link>
            </div>
          )}
          <TourForm address={`${p.address}, ${p.city}`}/>
        </aside>
      </div>

      <section className="mt-16"><h2 className="text-2xl font-bold mb-6">Similar homes</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{others.map(o => <PropertyCard key={o._id} p={o}/>)}</div></section>
    </div>
  );
}
