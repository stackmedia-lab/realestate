import { Award, Users, Home, TrendingUp } from 'lucide-react';
export const metadata = { title: 'About | Havenly' };
export default function AboutPage() {
  return (
    <div className="container-x py-16">
      <div className="max-w-3xl"><span className="chip">About</span><h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">We help people find places they love.</h1><p className="text-slate2 mt-5 text-lg">Havenly was founded with one mission: to make finding a home feel less like paperwork and more like coming home. We pair powerful technology with the human expertise of vetted local agents.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {[[Home,'1.2M+','Homes listed'],[Users,'25K+','Active agents'],[Award,'4.9★','Average rating'],[TrendingUp,'12 yrs','Building trust']].map(([I,n,l]: any) => (
          <div key={l} className="bg-white border border-ink/5 rounded-2xl p-6 shadow-card"><div className="w-10 h-10 rounded-lg bg-brand-light text-brand grid place-items-center"><I size={18}/></div><div className="text-3xl font-extrabold mt-4">{n}</div><div className="text-slate2">{l}</div></div>
        ))}
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" alt="" className="rounded-2xl shadow-card"/>
        <div>
          <h2 className="text-3xl font-extrabold">Our values</h2>
          <ul className="mt-5 space-y-4 text-slate2">
            <li><strong className="text-ink">Transparency.</strong> No hidden fees, no inflated estimates. The numbers are the numbers.</li>
            <li><strong className="text-ink">Local expertise.</strong> Every agent is vetted and rated by real clients.</li>
            <li><strong className="text-ink">Modern tools.</strong> Search, save, tour, finance — all in one place.</li>
            <li><strong className="text-ink">Human first.</strong> Tech assists; people decide.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
