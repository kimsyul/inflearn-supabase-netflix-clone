import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed text-center text-white font-bold bottom-0 left-0 right-0 z-50 p-4 bg-gray-900">
      <p>
        Movie Database Scraped from
        <Link className="text-blue-600" href="https://www.themoviedb.org/">
          TMDB
        </Link>
      </p>
    </footer>
  );
}
