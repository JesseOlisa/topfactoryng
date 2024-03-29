import { Suspense } from 'react';
import { ProductListSkeleton } from '@/components/skeletons';
import { cn } from '@/lib/utils';
import RecentProducts from '@/components/products/recent-product';
import { collection } from '@/lib/data';
import Link from 'next/link';
import Disclaimer from '@/components/disclamier';
const heroImage =
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80';

export default async function Home() {
  return (
    <main className='page-container'>
      {/* BANNER */}
      <section
        className='min-h-[30rem] w-full'
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className='flex-center h-[30rem] w-full flex-col bg-blackOverlay text-center font-extralight text-white'>
          <h1 className='mb-5 animate-fade-in-slower font-serif text-3xl font-normal'>
            Made with Quality
          </h1>
          <p>We are a womenswear brand in Nigeria.</p>
          <p>All our products are proudly made in Nigeria.</p>

          <p
            className={cn(
              'pointer-events-none mt-20 btn-red',
              'rounded-none py-1.5'
            )}
          >
            Find what you love , order it.
          </p>
        </div>
      </section>

      {/* RECENTS PRODUCTS SECTIONS */}
      <section className='bg-white pt-8'>
        <h2 className='ml-4 text-2xl md:ml-10'>New Products</h2>
        <Suspense fallback={<ProductListSkeleton />}>
          <RecentProducts />
        </Suspense>
      </section>

      {/* HOW TO ORDER */}
      <section
        className='w-full'
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className='w-full bg-blackOverlayDarker px-4 py-11 font-light text-white'>
          <h2 className='text-center text-3xl uppercase underline underline-offset-8'>
            How we operate
          </h2>
          <p className='mx-auto mt-5 max-w-sm text-center tracking-wide md:max-w-md md:text-lg'>
            Orders are taken weekly and, items are available only on pre-order
            as we do not have ready to wear items. To deliver quality wears, we
            take at least 7 working days to produce, package and dispatch all
            orders.
          </p>

          <h2 className='mt-8 text-center text-3xl uppercase underline underline-offset-8'>
            What to do
          </h2>
          <p className='mx-auto mt-5 max-w-sm text-center tracking-wide md:max-w-md md:text-lg'>
            Pick from our range of amazing products. Select your preferred size
            and color. Add your item(s) to cart and proceed to checkout. That is
            it!.
          </p>
        </div>
      </section>

      <section className='flex-center w-full flex-col bg-white md:flex-row'>
        <div className='flex-center w-full bg-productBg px-5 py-8 md:w-1/2'>
          <div className='w-[90%] overflow-x-auto rounded-lg md:w-[80%]'>
            <table className='w-full bg-white text-left text-sm text-black shadow-lg'>
              <caption className='text- bg-white p-5 text-center text-lg font-semibold'>
                Size charts
              </caption>
              <thead className='border-y border-gray-900 bg-white text-xs uppercase text-gray-900'>
                <tr>
                  <th scope='col'>Size</th>
                  <th scope='col'>Bust</th>
                  <th scope='col'>Base Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='px-6 py-4'>6</td>
                  <td className='px-6 py-4'>30-31</td>
                  <td className='px-6 py-4'>1800</td>
                </tr>
                <tr>
                  <td className='px-6 py-4'>8</td>
                  <td className='px-6 py-4'>32-34</td>
                  <td className='px-6 py-4'>1800</td>
                </tr>
                <tr>
                  <td className='px-6 py-4'>10</td>
                  <td className='px-6 py-4'>35-37</td>
                  <td className='px-6 py-4'>2000</td>
                </tr>
                <tr>
                  <td className='px-6 py-4'>12</td>
                  <td className='px-6 py-4'>38-40</td>
                  <td className='px-6 py-4'>2000</td>
                </tr>
                <tr>
                  <td className='px-6 py-4'>14</td>
                  <td className='px-6 py-4'>41-43</td>
                  <td className='px-6 py-4'>2300</td>
                </tr>
                <tr className='border-b-0'>
                  <td className='px-6 py-4'>16</td>
                  <td className='px-6 py-4'>30-31</td>
                  <td className='px-6 py-4'>2300</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECOND ROW */}

        <div className='flex-center h-full w-full flex-col gap-4 py-8 text-white md:w-1/2'>
          <p className='text-black'>Browse Our Collections</p>
          {collection.map((link, index) => (
            <Link
              key={index}
              href={`/category/${link.name}`}
              className='text-center'
              scroll={false}
            >
              <div
                className='transition-bg-150 ease h-12 w-[15rem] rounded-lg bg-100 duration-300 md:hover:bg-120'
                style={{
                  backgroundImage: `url(${link.image})`,
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className='h-12 rounded-lg bg-blackOverlay pt-2.5 transition duration-500 ease-in-out hover:bg-blackOverlayDarker'>
                  {link.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Disclaimer />
    </main>
  );
}
