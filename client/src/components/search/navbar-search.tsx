'use client';

import { searchResult } from '@/lib/definitions';
import { fetchSearchResults } from '@/sanity/sanity.query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';

type SearchProps = {
  isSearchOpen?: boolean;
  setIsSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ isSearchOpen, setIsSearchOpen }: SearchProps) => {
  const router = useRouter();
  const [result, setResult] = useState<searchResult[] | null>(null);

  const handleChange = useDebouncedCallback(async (text: string) => {
    if (text) {
      const results = await fetchSearchResults(text);
      return results ? setResult(results) : null;
    } else {
      setResult(null);
    }
  }, 300);

  const closeSearchResult = () => {
    setResult(null);
    if (isSearchOpen && setIsSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  const onClickResult = (slug: string) => {
    router.push(`/product/${slug}`);
    closeSearchResult();
  };

  return (
    <div className='relative w-full md:block md:min-w-280'>
      {/* search input */}
      <div className='relative w-full'>
        <label
          htmlFor='search'
          className='sr-only'
        >
          Search
        </label>
        <input
          autoComplete='off'
          placeholder='Search products'
          className='w-full border-transparent md:border-neutral-400 py-2 pl-8 pr-3 text-sm rounded md:rounded-lg md:border focus:ring-1 focus:ring-black focus:border-neutral-500'
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className='absolute top-[50%] left-2 -translate-y-1/2'>
          <FiSearch
            size={20}
            className='font-semibold text-neutral-600'
          />
        </div>
      </div>
      {/* results */}

      {result && (
        <ul className='absolute z-10 mt-4 w-full rounded-sm border bg-white shadow-sm md:min-w-280'>
          {result?.length > 0 ? (
            result.map((result, idx) => (
              <li
                key={idx}
                className='flex cursor-pointer items-center justify-between border-b p-2 last:border-b-0 hover:bg-neutral-200'
                onClick={() => onClickResult(result.slug)}
              >
                <div className='relative h-10 w-10'>
                  <Image
                    src={result.product_image}
                    alt='product'
                    fill
                    className='rounded-md object-cover'
                    sizes='40px'
                  />
                </div>
                <div className='flex flex-col items-end gap-y-1 text-sm'>
                  <p>{result.name}</p>
                  <p className='font-semibold'>&#x20A6;{result.baseprice}</p>
                </div>
              </li>
            ))
          ) : (
            <p className='py-5 text-center text-xs text-neutral-500'>
              No result for this product
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
