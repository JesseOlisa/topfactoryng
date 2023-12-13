import Navbar from '@/components/navbar/navbar';
import SearchForm from '@/components/orders/search-form';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className='flex-center flex-col h-screen w-full bg-gray-50 text-center'>
        <SearchForm />
        <Link
          href='/'
          className='flex items-center mx-auto my-3 text-sm underline hover:scale-105 transition-all duration-150'
        >
          <ArrowLeftIcon className='mr-2 w-4 h-4' />
          Go to homepage
        </Link>
      </div>
    </>
  );
}
