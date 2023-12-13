'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OrderSearchSchema } from '@/lib/schema';

const SearchForm = () => {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const orderId = formData.get('referenceNumber');
    //validation
    const isValidated = OrderSearchSchema.safeParse(orderId);

    if (!isValidated.success) {
      setErrorMessage(isValidated.error.flatten().formErrors.toLocaleString());
      return;
    }
    push(`/orders/${orderId}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white rounded-md shadow p-3 min-w-350'
    >
      <h2 className='text-lg font-bold'>Search for Order</h2>
      <p className='max-w-[300px] mb-3 text-xs text-zinc-700 text-center mx-auto'>
        Paste in or type the reference number from the receipt sent to your
        email.{' '}
      </p>
      <div className='w-full form-container'>
        <label
          htmlFor='referenceNumber'
          className='sr-only'
        >
          <span className='mb-2 text-lg font-semibold'>
            Enter reference number
          </span>
        </label>
        <input
          name='referenceNumber'
          id='referenceNumber'
          autoComplete='off'
          placeholder='Enter reference Number'
          className=''
        />
      </div>
      {errorMessage && (
        <p className='text-left text-sm text-red-600'>{errorMessage}</p>
      )}
      <button
        type='submit'
        className='btn-red mt-4 mx-auto w-full'
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
