'use client';
import { useEffect, useState } from 'react';
const Disclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleDisclaimer = () => {
    sessionStorage.setItem('disclaimer', 'agreed');
    setShowDisclaimer(false);
  };

  useEffect(() => {
    //when the user visits the sites
    const agreed = sessionStorage.getItem('disclaimer');
    if (!agreed) {
      setShowDisclaimer(true);
    }
  }, []);

  //return nothing if show disclamier is false
  if (!showDisclaimer) {
    return;
  }
  return (
    <section className='flex-center fixed top-0 left-0 z-20 h-screen w-full bg-blackOverlayDarker px-2 md:px-0'>
      <div className='text-align relative max-w-lg rounded bg-white px-5 py-10'>
        <h2 className='text-center text-2xl font-bold tracking-wide underline underline-offset-2'>
          Please Note!
        </h2>
        <p className='mx-auto mt-5 max-w-sm text-center tracking-wide md:max-w-md md:text-base'>
          Orders are taken weekly and, items are available only on pre-order as
          we do not have ready to wear items. To deliver quality wears, we take
          at least 7 - 14 working days to produce, package and dispatch all
          orders.
        </p>
        <button
          className='mx-auto mt-3 block rounded-lg bg-red-500 px-3 py-2 text-white'
          onClick={handleDisclaimer}
        >
          Keep Shopping
        </button>
      </div>
    </section>
  );
};

export default Disclaimer;
