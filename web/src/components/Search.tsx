'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import SearchIcon from '@/components/icons/SearchIcon';
import XIcon from '@/components/icons/XIcon';

type SearchProps = {
  onSearch: (type: string, value: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    onSearch('search', debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleReset = useCallback(() => {
    setSearchTerm('');
    onSearch('reset', '');
  }, [onSearch]);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  return (
    <div className="flex items-center justify-end">
      <div className="relative flex items-center">
        {showSearch && (
          <input
            className="absolute right-9 w-40 md:w-56 px-2 py-1 text-sm bg-amber-200 text-zinc-900 border rounded-md"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            ref={searchRef}
          />
        )}
        <button
          className="relative z-10 w-6 h-6 flex items-center justify-center"
          onClick={() => {
            if (showSearch) {
              handleReset();
            }
            setShowSearch(!showSearch);
          }}>
          {showSearch ? <XIcon /> : <SearchIcon />}
        </button>
      </div>
    </div>
  );
}
