import React from 'react';
import { useRouter } from 'next/router';

interface PaginationProps {
  totalItems: number | null;
  currentPage: number;
  pageSize: number;
  category: string;
}

const Pagination = ({
  totalItems,
  currentPage,
  pageSize,
  category,
}: PaginationProps) => {
  const router = useRouter();

  const pagesCount = totalItems ? Math.ceil(totalItems / pageSize) : 0;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  // const activeButtonStyle =
  return (
    <div className='flex-center mb-6 flex w-full overflow-x-auto px-4'>
      <div className='flex gap-1.5'>
        {pages.map((item) => (
          <button
            key={item}
            onClick={() => {
              router.push({
                query: { category: category, page: item },
              });
            }}
            className='cursor-pointer rounded-sm px-3 text-xl font-light'
            style={{
              color: currentPage === item ? 'white' : 'black',
              backgroundColor:
                currentPage === item ? 'black' : 'rgb(243 244 246)',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
