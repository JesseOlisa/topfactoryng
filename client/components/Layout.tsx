import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Head>
				<title>Topfactoryng</title>
			</Head>
			<main className='relative min-h-screen min-w-full bg-white'>
				{children}
			</main>
		</>
	);
};

export default Layout;
