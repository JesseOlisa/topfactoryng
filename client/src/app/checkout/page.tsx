import { Logo } from '@/components/logo';
import CheckoutForm from '@/components/checkout/checkout-form';

export default function CheckOutPage() {
  return (
    <>
      <main className='flex-center flex-col bg-gray-50 min-h-screen'>
        <Logo />
        <h3 className='mb-6 text-center text-sm text-gray-700'>
          Please fill in your waybill information
        </h3>
        <CheckoutForm />
      </main>
    </>
  );
}
