import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import { StateContext } from '@/context/StateContext';
import { AnimatePresence } from 'framer-motion';
export default function App({ Component, pageProps, router }: AppProps) {
	return (
		<StateContext>
			<AnimatePresence initial={false}>
				<Layout>
					<Toaster position='top-center' />
					<Component
						key={router.asPath}
						{...pageProps}
					/>
				</Layout>
			</AnimatePresence>
		</StateContext>
	);
}
