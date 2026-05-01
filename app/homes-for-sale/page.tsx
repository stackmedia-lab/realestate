import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/data';

export const metadata = { title: 'Homes for Sale | Havenly' };

export default async function Listings({ searchParams }: { searchParams: Record<string,string> }) {
  const all = await getProperties();
  const q = (searchParams.q || '').toLowerCase();
  const status = searchParams.status || 'for-sale';
  const minPrice = Number(searchParams.minPrice || 0);
  const maxPrice = Number(searchParams.maxPrice || Infinity);
  const beds = Number(searchParams.beds || 0);
  const type = searchParams.type || '';

  const filtered = all.filter(p =>
    p.status === status &&
    (q ? `${p.city} ${p.state} ${p.zip} ${p.address} ${p.title}`.toLowerCase().includes(q) : true) &&
    p.price >= minPrice && p.price <= maxPrice &&
    (beds ? p.beds >= beds : true) &&
    (type ? p.propertyType === type : true)
  );

  return (
    <div className="container-x py-10">
      <div className="mb-8"><h1 className="text-3xl md:text-4xl font-extrabold">{status === 'for-rent' ? 'Rentals' : 'Homes for Sale'}</h1><p className="text-slate2 mt-2">{filtered.length} {filtered.length === 1 ? 'result' : 'results'}{q && ` for "${q}"`}</p></div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-20 self-start bg-white border border-ink/5 rounded-xl p-5 shadow-card">
          <form className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate2 uppercase">Status</label>
              <select name="status" defaultValue={status} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm">
                <option value="for-sale">For Sale</option><option value="for-rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate2 uppercase">Search</label>
              <input name="q" defaultValue={q} placeholder="City or ZIP" className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"/>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><label className="text-xs font-semibold text-slate2 uppercase">Min $</label><input name="minPrice" type="number" defaultValue={searchParams.minPrice||''} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"/></div>
              <div><label className="text-xs font-semibold text-slate2 uppercase">Max $</label><input name="maxPrice" type="number" defaultValue={searchParams.maxPrice||''} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"/></div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate2 uppercase">Beds (min)</label>
              <select name="beds" defaultValue={beds} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm">
                {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? 'Any' : `${n}+`}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate2 uppercase">Type</label>
              <select name="type" defaultValue={type} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">Any</option><option value="house">House</option><option value="condo">Condo</option><option value="townhouse">Townhouse</option><option value="apartment">Apartment</option><option value="land">Land</option>
              </select>
            </div>
            <button className="btn-primary w-full">Apply filters</button>
          </form>
        </aside>
        <div>
          {filtered.length === 0 ? <div className="text-center py-20 text-slate2">No properties match your filters.</div> : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">{filtered.map(p => <PropertyCard key={p._id} p={p}/>)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
