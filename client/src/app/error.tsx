'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='h-screen w-full flex-center flex-col'>
      <XCircleIcon className='w-32' />
      <h2>Something went wrong!</h2>
      <button
        className='btn-primary px-6 mt-5'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
