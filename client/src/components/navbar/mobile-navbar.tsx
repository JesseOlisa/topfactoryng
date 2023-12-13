// 'use client';

// import { useState } from 'react';
import Link from 'next/link';

import Hamburger from './hamburger';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { fetchCategories } from '@/sanity/sanity.query';
import Search from '../search/navbar-search';
import MobileSearchBar from '../search/mobile-search';
import Cart from '../cart/cart';

const MobileNavbar = async () => {
  const categories = await fetchCategories();
  return (
    <header>
      <div className='fixed top-0 left-0 z-10 flex w-full items-center justify-between bg-white py-4 px-2 shadow-md md:hidden md:py-6 md:px-5'>
        <div className='flex items-center gap-x-4'>
          {/* MENU */}
          <Hamburger sidebarLinks={categories} />
        </div>
        {/* navbar logo */}
        <h4 className='font-bold text-lg'>
          <Link href='/'>Top factory</Link>
        </h4>
        <div className='flex items-center gap-x-4'>
          {/* MOBILE SEARCH BAR */}
          <MobileSearchBar />
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default MobileNavbar;
