import React, { useState, useRef, useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import { StateContext } from '@/context/StateContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps, router }: AppProps) {
	const scrollCache = useRef<Record<string, [number, number]>>({});
	const activeRestorePath = useRef<string>();

	useEffect(() => {
		if (history.scrollRestoration !== 'manual') {
			history.scrollRestoration = 'manual';
		}
		const getCurrentPath = () => location.pathname + location.search;
		router.beforePopState(() => {
			activeRestorePath.current = getCurrentPath();
			return true;
		});
		const onComplete = () => {
			const scrollPath = activeRestorePath.current;
			if (!scrollPath || !(scrollPath in scrollCache.current)) {
				window.scrollTo(0, 0);
				return;
			}
			activeRestorePath.current = undefined;
			const [scrollX, scrollY] = scrollCache.current[scrollPath];
			window.scrollTo(scrollX, scrollY);

			const delays = [10, 20, 40, 80, 160];
			const checkAndScroll = () => {
				if (
					(window.scrollX === scrollX && window.scrollY === scrollY) ||
					scrollPath !== getCurrentPath()
				) {
					return;
				}
				window.scrollTo(scrollX, scrollY);
				const delay = delays.shift();
				if (delay) {
					setTimeout(checkAndScroll, delay);
				}
			};
			setTimeout(checkAndScroll, delays.shift());
		};
		const onScroll = () => {
			scrollCache.current[getCurrentPath()] = [window.scrollX, window.scrollY];
		};
		// router.events.on('routeChangeStart', () => {
		// 	setLoading(true);
		// });
		router.events.on('routeChangeComplete', onComplete);
		window.addEventListener('scroll', onScroll);

		return () => {
			// router.events.off('routeChangeStart', () => {
			// 	setLoading(true);
			// });
			router.events.off('routeChangeComplete', onComplete);
			window.removeEventListener('scroll', onScroll);
		};
	}, []);
	return (
		<StateContext>
			<Layout>
				<Toaster position='top-center' />
				{router.asPath !== '/contact' && <Navbar />}
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
