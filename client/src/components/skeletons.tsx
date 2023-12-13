import { cn } from '@/lib/utils';

type productListSkeletonProps = {
  length?: number;
  className?: string;
};
//for pulse animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export const ProductSkeleton = () => (
  <div
    className={`${shimmer} relative overflow-hidden rounded-md p-2 product-container`}
  >
    <div className='bg-gray-200 shadow-sm rounded-lg h-[220px] md:h-[320px] w-full' />
    <div className='flex w-full justify-between text-sm md:text-base'>
      <div className='w-16 h-6 bg-gray-200 rounded my-3' />
      <div className='w-16 h-6 bg-gray-200 rounded my-3' />
    </div>
    <div className='mt-1 bg-gray-200 rounded h-8 md:h-10 w-full' />
  </div>
);

export const ProductListSkeleton = ({
  length = 4,
  className,
}: productListSkeletonProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-200 justify-center gap-2 py-6 overflow-hidden md:grid-cols-280 md:gap-6 md:px-3',
        className
      )}
    >
      {Array.from({ length }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export const NavLinksSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <span
          key={index}
          className='relative overflow-hidden w-[100px] h-6 bg-gray-200 py-5'
        >
          <span className={`${shimmer}`}></span>
        </span>
      ))}
    </>
  );
};
