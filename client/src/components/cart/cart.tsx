'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
} from '../ui/sheet';
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useStoreContext } from '@/context/StoreContext';
import { urlFor } from '@/sanity/sanity.client';

const Cart = () => {
  const { cartItems, deleteFromCart, totalPrice, clearCart } =
    useStoreContext();
  const [isOpen, setIsOpen] = useState(false);

  const clearCartItems = () => {
    clearCart();
    setIsOpen(false);
  };
  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetOverlay />
      <SheetTrigger className='relative'>
        <ShoppingBagIcon className='w-[25px] h-[25px] font-semibold' />
        <span className='absolute -right-1 top-0 rounded-full bg-red-500 px-[4.5px] text-[10px] text-white'>
          {cartItems.length}
        </span>
      </SheetTrigger>
      <SheetContent
        className={cn('w-full py-3', {
          'px-2': cartItems.length > 0,
        })}
      >
        {cartItems.length === 0 ? (
          <div className='flex-center h-4/5 w-full flex-col gap-3'>
            <ShoppingCartIcon className='text-zinc-900 w-[120px] h-[120px]' />
            <h3 className='text-2xl font-semibold'>Your Cart is Empty.</h3>
            <p className='text-sm text-zinc-700 text-center max-w-xs'>
              Looks like you have not added anything to your cart yet.
            </p>
            <button
              className={cn('btn-red mt-5')}
              onClick={() => setIsOpen(false)}
            >
              Keep Shopping
            </button>
          </div>
        ) : (
          <div className='flex flex-col w-full h-full'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl'>Shopping cart</h3>

              <SheetClose>
                <XMarkIcon className='w-7 opacity-75 hover:opacity-100' />
              </SheetClose>
            </div>
            <div className='hide-scrollbar flex-1 mt-4 flex w-full flex-col gap-2 overflow-auto scroll-smooth text-sm'>
              {cartItems?.map((item) => (
                <div
                  key={item._id}
                  className='relative flex w-full gap-1 border-b border-gray-300 pb-2 px-1'
                >
                  <div className='flex-center flex-1 gap-3'>
                    <div className='flex-center relative h-[65px] w-[65px] overflow-hidden'>
                      <Image
                        src={urlFor(item?.product_image).url()}
                        alt='product'
                        className='rounded-sm object-cover'
                        fill
                      />
                    </div>
                    <div className='flex flex-1 flex-col  text-xs'>
                      <p className='text-sm font-semibold'>{item?.name}</p>
                      <p>Size: {item?.size}</p>
                      <p>Qty: {item?.quantity}</p>
                      <div className='flex gap-2'>
                        <p>Color: {item?.color}</p>
                      </div>
                    </div>
                  </div>
                  <div className='font-semibold'>
                    &#x20A6;{item?.price.toLocaleString()}
                  </div>
                  {/* DELETE BUTTON */}
                  <button
                    className='absolute bottom-2 right-2 text-[0.85rem] font-medium text-red-500 hover:underline'
                    onClick={() => deleteFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className='border-t border-gray-200 py-2 justify-self-end'>
              <div className='flex justify-between font-semibold text-lg'>
                <p>Total</p>
                <p>&#x20A6;{totalPrice?.toLocaleString()}</p>
              </div>

              <div className='mt-3'>
                <Link
                  href={'/checkout'}
                  onClick={() => setIsOpen(false)}
                  className='btn-red py-3 rounded-md text-center'
                >
                  Checkout
                </Link>
              </div>
              <div className='mt-2 flex flex-col justify-center text-center text-sm'>
                {/* <p className='text-gray-500'>or</p> */}
                <button
                  className='font-medium hover:underline text-zinc-800'
                  onClick={clearCartItems}
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
