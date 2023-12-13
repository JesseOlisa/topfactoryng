import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

// export default function Logo({ className }: LogoProps) {
//   return (
//     <h4 className={cn('text-xl font-bold', className)}>
//       <Link href='/'>TopFactoryng</Link>
//     </h4>
//   );
// }

export const Logo = () => {
  return (
    <h4 className={cn('text-xl font-bold')}>
      <Link href='/'>TopFactoryng</Link>
    </h4>
  );
};
