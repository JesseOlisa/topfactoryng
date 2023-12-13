'use client';
import { useState } from 'react';
import { useStoreContext } from '@/context/StoreContext';
import { CreateOrder, deleteDocument } from '@/lib/schema';
import toast from 'react-hot-toast';
import { usePaystackPayment } from 'react-paystack';
import { useDebouncedCallback } from 'use-debounce';
import { orderDocType } from '@/lib/definitions';
import { uuid } from '@sanity/uuid';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// import { migrateNextBatch } from '@/sanity/migrate';

export type State = {
  errors?: {
    firstname?: string[];
    lastname?: string[];
    email?: string[];
    address?: string[];
    phone?: string[];
  };
  message?: string | null;
};

const reference = new Date().getTime().toString();

const CheckoutForm = () => {
  const { totalPrice, confirmOrder, cartItems, isLoading } = useStoreContext();
  const { back } = useRouter();
  const [state, setState] = useState<State>({ errors: {}, message: null });
  const [email, setEmail] = useState('');

  const handleEmailChange = useDebouncedCallback((text: string) => {
    setEmail(text);
  }, 500);

  const initializePayment = usePaystackPayment({
    reference,
    amount: totalPrice * 100,
    email,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY as string,
  });

  const createOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const validatedFields = CreateOrder.safeParse({
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      address: formData.get('address'),
      phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
      setState({
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Some fields are invalid failed to create order',
      });
      return;
    }
    const orderDoc: orderDocType = {
      ...validatedFields.data,
      _type: 'orders',
      orderId: reference,
      items: cartItems.map((item) => ({
        ...item,
        _key: uuid(),
      })),
      totalPrice,
    };
    // console.log(orderDoc);
    try {
      initializePayment(
        () => confirmOrder(orderDoc),
        () => toast('Checkout cancelled')
      );
    } catch (error) {
      console.error('Error');
    }
  };

  return (
    <form
      className='w-full'
      onSubmit={createOrder}
    >
      <div className='form-container flex flex-col gap-3 mx-auto w-[90%]  rounded-lg bg-white p-3 py-4 shadow-md md:w-1/3'>
        <div className=''>
          <label
            htmlFor='firstname'
            className='mb-2 block text-sm font-medium'
          >
            Firstname
          </label>
          <input
            type='text'
            id='firstname'
            name='firstname'
            placeholder='Enter your firstname'
          />
          {state.errors?.firstname ? (
            <div
              id='firstname-error'
              aria-live='polite'
              className='mt-2 text-sm text-red-500'
            >
              {state.errors.firstname.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className=''>
          <label
            htmlFor='lastname'
            className='mb-2 block text-sm font-medium'
          >
            Lastname
          </label>
          <input
            type='text'
            id='lastname'
            name='lastname'
            placeholder='Enter your lastname'
          />
          {state.errors?.lastname ? (
            <div
              id='firstname-error'
              aria-live='polite'
              className='mt-2 text-sm text-red-500'
            >
              {state.errors.lastname.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className=''>
          <label
            htmlFor='email'
            className='mb-2 block text-sm font-medium'
          >
            Email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            placeholder='Enter your email'
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {state.errors?.email ? (
            <div
              id='email-error'
              aria-live='polite'
              className='mt-2 text-sm text-red-500'
            >
              {state.errors.email.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className=''>
          <label
            htmlFor='address'
            className='mb-2 block text-sm font-medium'
          >
            Waybill Address / Bustop
          </label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='Enter your address'
          />
          {state.errors?.address ? (
            <div
              id='address-error'
              aria-live='polite'
              className='mt-2 text-sm text-red-500'
            >
              {state.errors.address.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className=''>
          <label
            htmlFor='phone'
            className='mb-2 block text-sm font-medium'
          >
            Phone
          </label>
          <input
            type='text'
            id='phone'
            name='phone'
            placeholder='Enter your phone number'
            maxLength={11}
          />
          {state.errors?.phone ? (
            <div
              id='phone-error'
              aria-live='polite'
              className='mt-2 text-sm text-red-500'
            >
              {state.errors.phone.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {state.message ? (
          <p className='mt-2 text-red-500 text-sm bg-red-50 py-3 rounded-md border border-red-500 text-center'>
            {state.message}
          </p>
        ) : null}
        <div
          className={cn('mt-2', {
            'cursor-not-allowed': isLoading,
          })}
        >
          <button
            type='submit'
            aria-disabled={isLoading}
            className={cn(
              'btn-primary flex-center w-full hover:bg-black/90 rounded-md',
              {
                'pointer-events-none opacity-70': isLoading,
              }
            )}
          >
            {isLoading && <Loader2 className='mr-2 animate-spin' />}
            {isLoading
              ? 'Processing Order'
              : `Pay ₦${totalPrice.toLocaleString()}`}
          </button>
        </div>
      </div>
      <button
        type='button'
        onClick={() => back()}
        className='flex items-center mx-auto my-3 text-sm underline hover:scale-105 transition-all duration-150'
      >
        <ArrowLeftIcon className='mr-2 w-4 h-4' />
        Go back
      </button>
    </form>
  );
};

export default CheckoutForm;
