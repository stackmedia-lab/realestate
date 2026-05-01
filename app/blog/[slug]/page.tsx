import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getPosts } from '@/lib/data';
import { PortableText } from '@portabletext/react';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return (
    <article className="container-x py-12 max-w-3xl">
      <Link href="/blog" className="text-sm text-slate2 hover:text-brand">← All articles</Link>
      <span className="chip mt-4 inline-flex">{post.category}</span>
      <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">{post.title}</h1>
      <div className="text-sm text-slate2 mt-3">By {post.authorName} · {new Date(post.publishedAt).toLocaleDateString()}</div>
      <img src={post.coverImage} alt={post.title} className="rounded-2xl mt-6 w-full aspect-[16/9] object-cover"/>
      <div className="prose prose-slate mt-8 max-w-none text-slate2 leading-relaxed text-lg">
        {post.body ? <PortableText value={post.body}/> : (
          <>
            <p className="text-xl font-medium text-ink">{post.excerpt}</p>
            <p>The real estate landscape continues to evolve rapidly. In this piece we dig into what buyers, sellers, and investors should keep in mind as they navigate the months ahead.</p>
            <p>Whether you're entering the market for the first time or refining a long-term strategy, understanding local dynamics is key. Connect with one of our agents for tailored guidance.</p>
            <h2 className="text-2xl font-bold text-ink mt-8">Key takeaways</h2>
            <ul className="list-disc pl-6"><li>Watch inventory levels in your target neighborhoods.</li><li>Get pre-approved before touring homes.</li><li>Lean on local data, not national headlines.</li></ul>
          </>
        )}
      </div>
    </article>
  );
}
