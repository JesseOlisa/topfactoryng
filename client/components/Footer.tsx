import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import Flag from '../public/assets/flagIcon.png';

const Footer = () => {
	return (
		<footer className='flex-center md:flex-between flex-col gap-5 bg-[#040406] px-5 py-12 text-white md:flex-row'>
			<div className='md:flex-center flex flex-col text-center md:text-left'>
				<div>
					<h1 className='mb-4 text-2xl md:text-3xl'>Contact Us</h1>
					<p className='mb-5 max-w-xs text-sm text-white/90 md:mb-3 md:max-w-sm'>
						For Custom products, Exclusive Deals or Complaints, reach out to us
						through any of our socaial media platforms
					</p>
				</div>
				<div className='flex w-full justify-center gap-3 md:justify-start'>
					<Link
						href='https://instagram.com/topfactory.ng?igshid=YmMyMTA2M2Y='
						className='block hover:text-white/80'
						target='_blank'
					>
						<SiInstagram size={25} />
					</Link>
					<Link
						href='https://wa.me/2348080686180'
						className='block hover:text-white/80'
						target='_blank'
					>
						<SiWhatsapp size={25} />
					</Link>
				</div>
			</div>
			<div className='flex flex-col items-center md:items-end'>
				<Image
					src={Flag}
					alt='flag'
					width={35}
				/>
				<p className='text-sm text-white/75'>&copy;Topfactoryng 2023</p>
			</div>
		</footer>
	);
};

export default Footer;
