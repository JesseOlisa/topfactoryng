import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import { StateContext } from '@/context/StateContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<StateContext>
			<Layout>
				<Toaster position='top-center' />
				<Component {...pageProps} />
			</Layout>
		</StateContext>
	);
}
