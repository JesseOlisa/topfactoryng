import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Head>
				<title>Topfactoryng</title>
			</Head>
			<div className='relative min-h-screen min-w-full bg-secondaryColor'>
				<main>{children}</main>
			</div>
		</>
	);
};

export default Layout;
