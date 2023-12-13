'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const NavBarLink = ({ title }: { title: string }) => {
  const pathname = usePathname();
  const isActive = decodeURIComponent(pathname) === `/category/${title}`;

  return (
    <>
      <Link
        href={`/category/${title}`}
        className={cn('hover:underline font-light', {
          'font-medium underline': isActive,
        })}
      >
        {title}
      </Link>
    </>
  );
};
