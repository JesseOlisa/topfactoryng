import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import { StateContext } from '@/context/StateContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePreserveScroll } from '@/hooks/usePreserveScroll';
export default function App({ Component, pageProps, router }: AppProps) {
	usePreserveScroll();
	return (
		<StateContext>
			<Layout>
				<Toaster position='top-center' />
				{router.pathname !== 'contact' && <Navbar />}
				<AnimatePresence
					initial={false}
					mode='wait'
					onExitComplete={() => window.scrollTo(0, 0)}
				>
					<Component
						key={router.asPath}
						{...pageProps}
					/>
				</AnimatePresence>
				<Footer />
			</Layout>
		</StateContext>
	);
}
