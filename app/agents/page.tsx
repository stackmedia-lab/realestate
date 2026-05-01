import Link from 'next/link';
import { Phone, Mail, Award } from 'lucide-react';
import { getAgents } from '@/lib/data';

export const metadata = { title: 'Find an Agent | Havenly' };

export default async function AgentsPage() {
  const agents = await getAgents();
  return (
    <div className="container-x py-12">
      <div className="text-center max-w-2xl mx-auto mb-12"><span className="chip">Agents</span><h1 className="mt-3 text-4xl md:text-5xl font-extrabold">Meet our top agents</h1><p className="text-slate2 mt-3">Local experts ready to guide you home.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map(a => (
          <Link key={a._id} href={`/agents/${a.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100"><img src={a.photo} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div>
            <div className="p-5">
              <div className="font-bold text-lg">{a.name}</div>
              <div className="text-sm text-slate2">{a.title}</div>
              <div className="flex items-center gap-1 text-xs text-slate2 mt-2"><Award size={12}/> {a.yearsExperience} yrs experience</div>
              <div className="flex flex-wrap gap-1 mt-3">{a.specialties.slice(0,2).map(s => <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 rounded-full">{s}</span>)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
