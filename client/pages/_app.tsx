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

export default function App({ Component, pageProps, router }: AppProps) {
	useScrollRestoration(router);
	const { pathname } = router;
	const noNavLinks = ['/contact', '/success', '/orders', '/orders/[orderId]'];
	const removeNav = noNavLinks.includes(pathname); // this removes navbar from the above links

	return (
		<StateContext>
			<Layout>
				<Toaster position='top-center' />

				{!removeNav && <Navbar />}
				<AnimatePresence
					initial={false}
					mode='wait'
					// onExitComplete={() => window.scrollTo(0, 0)}
				>
					<div>
						<Component
							key={router.asPath}
							{...pageProps}
						/>
					</div>
				</AnimatePresence>
				<Footer />
			</Layout>
		</StateContext>
	);
}
