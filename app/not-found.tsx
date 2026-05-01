import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <div className="text-7xl font-extrabold text-brand">404</div>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="text-slate2 mt-2">The page you're looking for doesn't exist.</p>
      <Link href="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
