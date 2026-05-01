import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, Mail, Award, Check } from 'lucide-react';
import { getAgent, getAgents, getProperties } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';

export async function generateStaticParams() {
  const agents = await getAgents();
  return agents.map(a => ({ slug: a.slug }));
}

export default async function AgentPage({ params }: { params: { slug: string } }) {
  const agent = await getAgent(params.slug);
  if (!agent) notFound();
  const props = (await getProperties()).filter(p => p.agentId === agent._id);

  return (
    <div className="container-x py-10">
      <div className="grid lg:grid-cols-[360px_1fr] gap-10">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <img src={agent.photo} alt={agent.name} className="w-full aspect-square object-cover"/>
          <div className="p-6">
            <h1 className="text-2xl font-extrabold">{agent.name}</h1>
            <div className="text-slate2">{agent.title}</div>
            <div className="mt-4 space-y-2 text-sm">
              <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-brand"><Phone size={14}/> {agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-brand"><Mail size={14}/> {agent.email}</a>
              <div className="flex items-center gap-2"><Award size={14}/> {agent.yearsExperience} years experience</div>
              {agent.license && <div className="text-xs text-slate2">License: {agent.license}</div>}
            </div>
            <button className="btn-primary w-full mt-5">Contact {agent.name.split(' ')[0]}</button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">About</h2>
          <p className="text-slate2 mt-3 leading-relaxed">{agent.bio}</p>
          <h3 className="text-lg font-bold mt-8 mb-3">Specialties</h3>
          <div className="flex flex-wrap gap-2">{agent.specialties.map(s => <span key={s} className="chip"><Check size={12}/> {s}</span>)}</div>
          {props.length > 0 && (
            <>
              <h3 className="text-lg font-bold mt-10 mb-4">{agent.name.split(' ')[0]}'s listings</h3>
              <div className="grid sm:grid-cols-2 gap-5">{props.map(p => <PropertyCard key={p._id} p={p}/>)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
