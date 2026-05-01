import Link from 'next/link';
import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-20">
      <div className="container-x py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-extrabold text-white text-xl">
            <span className="w-8 h-8 rounded-lg bg-brand grid place-items-center"><Home size={18}/></span>
            Havenly
          </div>
          <p className="mt-4 text-sm">Find your next home with confidence. Trusted by millions of buyers, renters, and sellers nationwide.</p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand grid place-items-center transition"><I size={16}/></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Discover</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/homes-for-sale">Homes for Sale</Link></li>
            <li><Link href="/homes-for-sale?status=for-rent">Rentals</Link></li>
            <li><Link href="/agents">Find an Agent</Link></li>
            <li><Link href="/mortgage">Mortgage Calculator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/studio">Studio (CMS)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Newsletter</h4>
          <p className="text-sm mb-3">Weekly market insights to your inbox.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Email" className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm placeholder:text-white/50"/>
            <button className="px-4 py-2 bg-brand rounded-lg text-sm font-semibold">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">© 2026 Havenly. All rights reserved.</div>
    </footer>
  );
}
