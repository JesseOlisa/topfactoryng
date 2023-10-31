import React, { useState, useRef, useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import { StateContext } from '@/context/StateContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps, router }: AppProps) {
  useScrollRestoration(router);
  const { pathname } = router;
  const noNavLinks = ['/contact', '/success', '/orders', '/orders/[orderId]'];
  const allowNavBar = noNavLinks.includes(pathname); // this checks if navbar is allowed

  return (
    <StateContext>
      <Layout>
        <Toaster position='top-center' />

        {!allowNavBar && <Navbar />}
        <AnimatePresence
          initial={false}
          mode='wait'
        >
          <div>
            <Component
              key={router.asPath}
              {...pageProps}
            />
            <Analytics />
          </div>
        </AnimatePresence>
        <Footer />
      </Layout>
    </StateContext>
  );
}
