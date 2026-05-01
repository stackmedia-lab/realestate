'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-x py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <span className="chip">Contact</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">Let's talk.</h1>
          <p className="text-slate2 mt-3 text-lg">Whether you're buying, selling, or just exploring, we're here to help.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-brand-light text-brand grid place-items-center"><Phone size={18}/></div><div><div className="text-sm text-slate2">Call</div><div className="font-semibold">(800) 555-HOME</div></div></div>
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-brand-light text-brand grid place-items-center"><Mail size={18}/></div><div><div className="text-sm text-slate2">Email</div><div className="font-semibold">hello@havenly.com</div></div></div>
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-brand-light text-brand grid place-items-center"><MapPin size={18}/></div><div><div className="text-sm text-slate2">Office</div><div className="font-semibold">555 Market St, San Francisco, CA</div></div></div>
          </div>
        </div>
        <form onSubmit={e=>{e.preventDefault();setSent(true);}} className="bg-white border border-ink/5 rounded-2xl p-8 shadow-card">
          {sent ? <div className="text-center py-10"><div className="text-5xl">✅</div><div className="text-2xl font-extrabold mt-4">Message sent</div><p className="text-slate2 mt-2">We'll be in touch within one business day.</p></div> : (
            <>
              <h2 className="text-2xl font-bold mb-5">Send a message</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-3"><input required placeholder="First name" className="px-3 py-2 border rounded-lg text-sm"/><input required placeholder="Last name" className="px-3 py-2 border rounded-lg text-sm"/></div>
              <input required type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg text-sm mb-3"/>
              <input placeholder="Phone" className="w-full px-3 py-2 border rounded-lg text-sm mb-3"/>
              <select className="w-full px-3 py-2 border rounded-lg text-sm mb-3"><option>I'm buying</option><option>I'm selling</option><option>I'm renting</option><option>General inquiry</option></select>
              <textarea required rows={5} placeholder="How can we help?" className="w-full px-3 py-2 border rounded-lg text-sm mb-4"/>
              <button className="btn-primary w-full">Send message</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
