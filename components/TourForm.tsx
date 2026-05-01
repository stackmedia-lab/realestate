'use client';
export default function TourForm({ address }: { address: string }) {
  return (
    <form onSubmit={e=>{e.preventDefault();alert('Thanks! An agent will reach out shortly.');}} className="bg-white border border-ink/5 rounded-2xl p-6 shadow-card">
      <h3 className="font-bold mb-3">Request a tour</h3>
      <input className="w-full px-3 py-2 border rounded-lg text-sm mb-2" placeholder="Your name" required/>
      <input className="w-full px-3 py-2 border rounded-lg text-sm mb-2" placeholder="Email" type="email" required/>
      <input className="w-full px-3 py-2 border rounded-lg text-sm mb-2" placeholder="Phone"/>
      <textarea className="w-full px-3 py-2 border rounded-lg text-sm mb-3" rows={3} defaultValue={`I'd like more information about ${address}.`}/>
      <button type="submit" className="btn-primary w-full">Contact agent</button>
    </form>
  );
}
