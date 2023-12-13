import Link from 'next/link';
import { Logo } from '../logo';
import Search from '../search/navbar-search';
import NavLinks from './nav-links';
import { Suspense } from 'react';
import { NavLinksSkeleton } from '../skeletons';
import MobileNavbar from './mobile-navbar';
import Cart from '../cart/cart';
const Navbar = async () => {
  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className='fixed top-0 left-0 z-10 hidden w-full bg-white shadow-md md:flex'>
        <div className='max-w-[1440px] w-full mx-auto flex justify-between items-center py-6 px-5'>
          <div className='flex items-center gap-x-36 w-full'>
            <Logo />

            <nav className=''>
              <ul className='link-container flex items-center gap-x-2 uppercase'>
                <li className='text-base'>
                  <Link
                    href='/'
                    className='px-2'
                  >
                    Home
                  </Link>
                </li>
                <li className='group relative'>
                  <span className='rounded p-2 bg-white text-base font-normal hover:!bg-gray-50 cursor-pointer transition-colors ease-in duration-300'>
                    Categories
                  </span>
                  <div className='sublinks--container invisible absolute top-[1.75rem] left-3 z-10 grid gap-2 rounded-sm border bg-white py-4 text-sm shadow-md group-hover:visible min-w-350 min-h-[150px] px-2'>
                    <Suspense fallback={<NavLinksSkeleton />}>
                      <NavLinks />
                    </Suspense>
                  </div>
                </li>
                {/* <li className='text-base'>
                <Link
                  href='/orders'
                  className='px-2'
                >
                  Check Order
                </Link>
              </li> */}
              </ul>
            </nav>
          </div>

          <div className='flex items-center gap-x-3'>
            <Search />
            <Cart />
          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      <MobileNavbar />
    </>
  );
};
export default Navbar;
