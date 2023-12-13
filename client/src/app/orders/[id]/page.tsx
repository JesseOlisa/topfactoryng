import { fetchOrdersById } from '@/sanity/sanity.query';
import { urlFor } from '@/sanity/sanity.client';
import Image from 'next/image';
import { cartProduct } from '@/lib/definitions';
import Link from 'next/link';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';

export default async function OrdersPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await fetchOrdersById(params.id);

  // THIS DISPLAYS IF NO ORDER MATCHES THE ORDER ID
  if (!order) {
    return (
      <main className='flex-center h-screen flex-col gap-3 bg-white px-4'>
        <ArchiveBoxXMarkIcon className='w-[100px]' />
        <div className='text-center'>
          <h3 className='text-xl font-medium'>
            We couldn&apos;t find your Order.
          </h3>
          <p className='text-gray-700 mt-3'>
            Please try again or{' '}
            <span>
              <Link
                href='https://wa.me/2348080686180'
                className='text-black underline'
                target='_blank'
              >
                contact us
              </Link>
            </span>
          </p>
        </div>
        <div className='mt-2 flex flex-col gap-2 text-center'>
          <Link
            href='/orders'
            className='btn-primary px-2'
          >
            Search Again
          </Link>
          <Link
            href='/'
            className='btn-primary px-2'
          >
            Return to homepage
          </Link>
        </div>
      </main>
    );
  }

  const { firstname, address, items, lastname, phone, totalPrice, orderId } =
    order;

  return (
    <div className='flex-center  min-h-[90vh] w-full flex-col bg-white py-4 '>
      <div>
        <h1 className='py-2 text-center text-xl uppercase md:px-8 md:text-3xl'>
          Waybill Information
        </h1>
      </div>
      <div className='w-[90%] shadow-md md:w-2/3'>
        <div className='bg-gray-50'>
          <section className='receipt text-gray-700'>
            <div className='flex flex-col md:flex-row'>
              <div className='w-full border border-white px-2 py-1 pt-4 md:w-1/2'>
                <h3>Name</h3>
                <p>
                  {firstname} {lastname}
                </p>
              </div>
              <div className='w-full border border-white px-2 py-1 md:w-1/2 md:pt-4'>
                <h3>Phone Number</h3>
                <p>{phone}</p>
              </div>
            </div>
            <div className='border border-white px-2 py-1'>
              <h3>Order ID</h3>
              <p>{orderId}</p>
            </div>
            <div className='px-2 py-1 pb-4'>
              <h3>Address</h3>
              <p>{address}</p>
            </div>
          </section>
        </div>
        <div className='mt-4 flex w-full flex-col gap-3 bg-white px-3'>
          <h2 className='text-base font-semibold'>Items Ordered</h2>
          {items.map((item: cartProduct, index: number) => (
            <div
              key={index}
              className='flex w-full gap-1 border-t pt-1  text-xs xs:text-sm md:gap-3'
            >
              <div>
                <Image
                  src={urlFor(item.product_image)
                    .fit('max')
                    .width(65)
                    .height(65)
                    .quality(100)
                    .url()}
                  alt='product'
                  width={65}
                  height={65}
                  className='rounded'
                />
              </div>
              <div className='flex-between flex flex-1 items-center'>
                <div>
                  <p>Name: {item.name}</p>
                  <p>Color: {item.color}</p>
                </div>
                <div>
                  <p className='mb-1'>Quantity: {item.quantity}</p>
                  <p>Price: &#x20A6;{item.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-2 border-y bg-white py-5 px-4 text-right'>
          <h3 className='font-bold'>Total:</h3>
          <p className='text-lg font-semibold'>
            &#x20A6;{totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      <div className='mt-4 max-w-[280px] text-center text-xs text-gray-500 md:max-w-lg'>
        <p>
          We take at least 7 working days to produce, package and dispatch all
          orders
        </p>
        <p className='mt-2'>
          Having any issue or challenges regarding your order, please send a DM
          to any of our social media handle
        </p>
      </div>

      <Link
        href='/'
        className='btn-red mx-auto mt-5'
      >
        Return to homepage
      </Link>
    </div>
  );
}
