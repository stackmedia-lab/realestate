'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Home, Heart, Search } from 'lucide-react';

const links = [
  { href: '/homes-for-sale', label: 'Buy' },
  { href: '/homes-for-sale?status=for-rent', label: 'Rent' },
  { href: '/agents', label: 'Find Agents' },
  { href: '/mortgage', label: 'Mortgage' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-ink/5">
      <div className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl">
          <span className="w-8 h-8 rounded-lg bg-brand text-white grid place-items-center"><Home size={18}/></span>
          <span>Havenly</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => <Link key={l.href} href={l.href} className="text-sm font-medium text-slate2 hover:text-brand transition">{l.label}</Link>)}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/favorites" className="text-slate2 hover:text-brand transition" aria-label="Favorites"><Heart size={20}/></Link>
          <Link href="/contact" className="btn-primary !py-2 !px-4 text-sm">Sign In</Link>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X/> : <Menu/>}</button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-ink/5 bg-white">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium py-2">{l.label}</Link>)}
            <Link href="/favorites" className="text-sm font-medium py-2 flex items-center gap-2"><Heart size={16}/> Favorites</Link>
            <Link href="/contact" className="btn-primary text-sm">Sign In</Link>
          </div>
        </div>
      )}
    </header>
  );
}
