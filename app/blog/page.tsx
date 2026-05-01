import Link from 'next/link';
import { getPosts } from '@/lib/data';

export const metadata = { title: 'Blog & Insights | Havenly' };

export default async function BlogPage() {
  const posts = await getPosts();
  const [hero, ...rest] = posts;
  return (
    <div className="container-x py-12">
      <div className="mb-10"><span className="chip">Insights</span><h1 className="mt-3 text-4xl md:text-5xl font-extrabold">Real estate, demystified</h1><p className="text-slate2 mt-3 max-w-xl">Market trends, buying tips, and stories from the field.</p></div>
      {hero && (
        <Link href={`/blog/${hero.slug}`} className="group block grid md:grid-cols-2 gap-8 mb-14 bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition">
          <div className="aspect-[16/10] md:aspect-auto overflow-hidden"><img src={hero.coverImage} alt={hero.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div>
          <div className="p-8 flex flex-col justify-center"><span className="chip self-start">{hero.category}</span><h2 className="mt-4 text-3xl font-extrabold">{hero.title}</h2><p className="text-slate2 mt-3">{hero.excerpt}</p><div className="text-sm text-slate2 mt-4">By {hero.authorName} · {new Date(hero.publishedAt).toLocaleDateString()}</div></div>
        </Link>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map(p => (
          <Link key={p._id} href={`/blog/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition">
            <div className="aspect-[16/10] overflow-hidden"><img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div>
            <div className="p-5"><span className="chip">{p.category}</span><h3 className="mt-3 font-bold text-lg leading-snug">{p.title}</h3><p className="text-sm text-slate2 mt-2 line-clamp-2">{p.excerpt}</p><div className="text-xs text-slate2 mt-3">{new Date(p.publishedAt).toLocaleDateString()}</div></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
