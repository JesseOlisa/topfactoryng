import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Head>
				<title>Topfactoryng</title>
			</Head>
			<div className='relative min-h-screen min-w-full bg-white'>
				<main>{children}</main>
			</div>
		</>
	);
};

export default Layout;
