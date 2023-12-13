'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  CustomSheetClose,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type NavProps = {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // handleClick: () => void;
};

const Hamburger = ({ sidebarLinks }: { sidebarLinks: { title: string }[] }) => {
  const pathname = usePathname();
  const decodePathname = decodeURIComponent(pathname);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className='relative z-10 bg-transparent'>
        <button
          className='relative h-8 w-8 bg-transparent focus:outline-none'
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className='sr-only'>Open main menu</span>
          <div className='flex-center absolute w-full'>
            <span
              aria-hidden='true'
              className={`absolute mb-2 block h-0.5 w-5 transform rounded bg-black transition duration-500 ease-in-out ${
                isNavOpen && 'translate-y-1 -rotate-45'
              }`}
            ></span>
            <span
              aria-hidden='true'
              className={`absolute block h-0.5 w-5 transform rounded bg-black transition duration-500 ease-in-out ${
                isNavOpen && 'opacity-0 '
              }`}
            ></span>
            <span
              aria-hidden='true'
              className={`absolute mt-2 block h-0.5 w-5 transform rounded bg-black transition duration-500 ease-in-out ${
                isNavOpen && '-translate-y-1 rotate-45'
              } `}
            ></span>
          </div>
        </button>
      </div>

      <Sheet
        open={isNavOpen}
        onOpenChange={setIsNavOpen}
      >
        <SheetOverlay className='md:hidden' />
        <SheetContent
          side={'left'}
          className='w-[16rem] md:hidden'
        >
          <CustomSheetClose />
          <div className='link-container text-base mt-3'>
            <span className='text-sm uppercase pt-16 text-gray-700'>
              categories
            </span>
            <div className='mt-5 flex flex-col gap-y-3'>
              {sidebarLinks.map((link) => (
                <Link
                  key={link.title}
                  href={`/category/${link.title}`}
                  className={cn({
                    'font-semibold':
                      decodePathname === `/category/${link.title}`,
                  })}
                  onClick={() => setIsNavOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Hamburger;
