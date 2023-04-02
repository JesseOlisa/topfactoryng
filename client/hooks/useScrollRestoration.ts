import { useRef, useEffect } from 'react';
import { NextRouter } from 'next/router';

export function useScrollRestoration(router: NextRouter) {
	const scrollCache = useRef<Record<string, [number, number]>>({});
	const activeRestorePath = useRef<string>();
	useEffect(() => {
		router.beforePopState((state) => {
			state.options.scroll = false;
			return true;
		});
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
		router.events.on('routeChangeComplete', onComplete);
		window.addEventListener('scroll', onScroll);

		return () => {
			router.events.off('routeChangeComplete', onComplete);
			window.removeEventListener('scroll', onScroll);
		};
	}, []);
}
