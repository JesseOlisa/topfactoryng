'use client';
import { useState } from 'react';
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from '../ui/sheet';
import Search from './navbar-search';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

const MobileSearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <Sheet
      open={isSearchOpen}
      onOpenChange={setIsSearchOpen}
    >
      <SheetTrigger onClick={() => setIsSearchOpen(true)}>
        <MagnifyingGlassIcon className='w-[25px] h-[25px] font-semibold' />
      </SheetTrigger>
      <SheetOverlay />
      <SheetContent
        side='top'
        className='!animate-none p-5 pr-2 md:hidden'
      >
        <div className='flex items-center gap-x-2'>
          <Search
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
          <XMarkIcon
            className='w-10 h-10 font-bold'
            onClick={() => setIsSearchOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearchBar;
