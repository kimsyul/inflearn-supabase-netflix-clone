'use client';

import { useSearchStore } from 'store/useSearchStore';
import Logo from './Logo';

export default function Header() {
  const { search, setSearch } = useSearchStore();

  return (
    <header className="fixed top-0 left-0 right-0 px-4 py-2 bg-gray-900 flex items-center justify-between z-50">
      <nav className="flex gap-4">
        <Logo />
        <ul className="flex gap-2 mr-2 text-white">
          <li>Movies</li>
          <li>Dramas</li>
        </ul>
      </nav>
      <div className="flex w-full max-w-72 gap-2 items-center border border-white rounded-md text-white p-2">
        <i className="fas fa-search" />
        <input placeholder="Search Movies" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
    </header>
  );
}
