import Link from 'next/link';
import { ArrowRight, Award, Shield, TrendingUp, Users } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import Reveal from '@/components/Reveal';
import { getProperties, getPosts } from '@/lib/data';
import { cities } from '@/lib/mock-data';

export default async function Home() {
  const props = await getProperties();
  const featured = props.filter(p => p.featured).slice(0, 6);
  const posts = (await getPosts()).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent"/>
        </div>
        <div className="relative container-x py-24 md:py-36">
          <div className="max-w-2xl text-white">
            <span className="chip bg-white/15 text-white border border-white/20">Trusted by 5M+ home seekers</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">Find the place you'll love to call home.</h1>
            <p className="mt-4 text-lg text-white/85">Search homes for sale and rent across thousands of neighborhoods. Backed by real-time data and the agents who know them best.</p>
          </div>
          <div className="relative mt-10 max-w-3xl"><SearchBar/></div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-white max-w-3xl">
            {[['1.2M+','Listings'],['25K+','Agents'],['98%','Satisfied'],['50','States covered']].map(([n,l]) => (
              <div key={l}><div className="text-3xl font-extrabold">{n}</div><div className="text-sm text-white/70">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="chip">Featured</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">Handpicked homes for you</h2>
              <p className="text-slate2 mt-2">Curated listings from our top-rated agents this week.</p>
            </div>
            <Link href="/homes-for-sale" className="text-brand font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight size={16}/></Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => <Reveal key={p._id} delay={i * 0.05}><PropertyCard p={p}/></Reveal>)}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-x">
          <Reveal><div className="text-center max-w-2xl mx-auto mb-12"><span className="chip">Explore</span><h2 className="mt-3 text-3xl md:text-4xl font-extrabold">Popular neighborhoods</h2><p className="text-slate2 mt-2">Browse homes in cities people love.</p></div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.04}>
                <Link href={`/homes-for-sale?q=${encodeURIComponent(c.name)}`} className="group relative block overflow-hidden rounded-2xl aspect-[4/3]">
                  <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"/>
                  <div className="absolute bottom-0 p-5 text-white">
                    <div className="text-2xl font-extrabold">{c.name}</div>
                    <div className="text-sm text-white/80">{c.listings.toLocaleString()} listings · {c.state}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="chip">Why Havenly</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">A smarter way to move.</h2>
            <p className="text-slate2 mt-3 text-lg">From search to signing, we pair powerful tools with vetted agents who advocate for you at every step.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                [Shield,'Verified listings','Every home is verified by licensed professionals.'],
                [Award,'Top-rated agents','Work with the highest-reviewed local experts.'],
                [TrendingUp,'Real-time data','Live pricing, market trends, and comps.'],
                [Users,'White-glove service','Concierge support throughout your journey.']
              ].map(([Icon, t, d]: any) => (
                <div key={t} className="flex gap-3"><div className="w-10 h-10 rounded-lg bg-brand-light text-brand grid place-items-center flex-shrink-0"><Icon size={18}/></div><div><div className="font-semibold">{t}</div><div className="text-sm text-slate2 mt-1">{d}</div></div></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="" className="rounded-2xl shadow-2xl"/>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-2xl max-w-[220px] hidden md:block">
                <div className="text-3xl font-extrabold text-brand">4.9★</div>
                <div className="text-sm text-slate2">Average rating from 12,400+ verified clients</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div><span className="chip">Insights</span><h2 className="mt-3 text-3xl md:text-4xl font-extrabold">From the blog</h2></div>
              <Link href="/blog" className="text-brand font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Read all <ArrowRight size={16}/></Link>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <Reveal key={p._id} delay={i * 0.05}>
                <Link href={`/blog/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition">
                  <div className="aspect-[16/10] overflow-hidden"><img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div>
                  <div className="p-5"><span className="chip">{p.category}</span><h3 className="mt-3 font-bold text-lg leading-snug">{p.title}</h3><p className="text-sm text-slate2 mt-2 line-clamp-2">{p.excerpt}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink text-white p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-20"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover"/></div>
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold">Ready to find your home?</h2>
            <p className="mt-4 text-white/80 text-lg">Talk with an agent today. No pressure, just expert guidance.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/agents" className="btn-primary">Find an agent</Link><Link href="/homes-for-sale" className="btn-outline !text-white !border-white/30 hover:!bg-white hover:!text-ink">Browse homes</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
