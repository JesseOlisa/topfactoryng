import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';
import Cart from './Cart';
import NavMenu from './NavMenu';
const Navbar = () => {
	const router = useRouter();
	const { showCart, setShowCart, cartItems } = useStateContext();
	const [isNavOpen, setIsNavOpen] = useState(false);

	let activeLink = router.query.category;
	return (
		<>
			{/* // DESKTOP NAV BAR */}
			<div className='fixed top-0 left-0 z-10 hidden w-full items-center justify-between bg-white py-6 px-5 shadow-md md:flex'>
				{/* navbar logo */}
				<h1>
					<Link href='/'>TopFactoryng</Link>
				</h1>
				{/* NAVLINKS */}
				<div className='link-container flex text-lg'>
					<Link
						href={`/category/tops`}
						className={`${
							activeLink === 'tops' ? 'font-normal' : 'font-light'
						}`}
					>
						Tops
					</Link>
					<Link
						href={`/category/shirt`}
						className={`${
							activeLink === 'shirts' ? 'font-normal' : 'font-light'
						}`}
					>
						Shirts
					</Link>
					<Link
						href={`/category/gowns`}
						className={`${
							activeLink === 'gowns' ? 'font-normal' : 'font-light'
						}`}
					>
						Gowns
					</Link>
					<Link
						href={`/category/two piece sets`}
						className={`${
							activeLink === 'two piece sets' ? 'font-normal' : 'font-light'
						}`}
					>
						Two piece sets
					</Link>
					<Link
						href={`/category/trousers & shorts`}
						className={`${
							activeLink === 'trousers & shorts' ? 'font-normal' : 'font-light'
						}`}
					>
						Trousers & Shorts
					</Link>
					<Link
						href={`/category/corporate`}
						className={`${
							activeLink === 'trousers & shorts' ? 'font-normal' : 'font-light'
						}`}
					>
						Corporate
					</Link>
					<Link
						href={`/category/silk`}
						className={`${
							activeLink === 'silk' ? 'font-normal' : 'font-light'
						}`}
					>
						Silk
					</Link>
					<Link
						href={`/category/Cargo wears`}
						className={`${
							activeLink === 'silk' ? 'font-normal' : 'font-light'
						}`}
					>
						Cargo wears
					</Link>
				</div>
				{/* cart */}
				<button
					className='relative'
					onClick={() => {
						setShowCart(!showCart);
						if (showCart === true) {
							document.body.style.overflow = 'hidden';
						}
					}}
				>
					<AiOutlineShopping size={30} />
					<span className='absolute -right-2 -top-0.5 rounded-full bg-red-500 px-[6px] text-[12px] text-white'>
						{cartItems.length}
					</span>
				</button>

				{showCart && <Cart />}
			</div>

			{/* MOBILE NAVBAR */}
			<div>
				<div className='fixed top-0 left-0 z-10 flex w-full items-center justify-between bg-white py-4 px-2 shadow-md md:hidden md:py-6 md:px-5'>
					{/* MENU */}
					<NavMenu
						isNavOpen={isNavOpen}
						setIsNavOpen={setIsNavOpen}
					/>
					{/* navbar logo */}
					<h1>
						<Link href='/'>Top factory</Link>
					</h1>
					{/* cart */}
					<button
						className='relative'
						onClick={() => setShowCart(!showCart)}
					>
						<AiOutlineShopping size={30} />
						<span className='absolute -right-1 top-0.5 rounded-full bg-red-500 px-[4.5px] text-[10px] text-white'>
							{cartItems.length}
						</span>
					</button>

					{/* MOBILE NAV BAR*/}

					{isNavOpen && (
						<div
							className='absolute top-0 left-0 h-screen w-full animate-fade-in bg-blackOverlay'
							// ref={navBarRef}
						>
							<div className='link-container top-0 left-0 flex h-screen w-[14rem] animate-slide-in-left flex-col gap-7 bg-white px-4 pt-20 text-base'>
								<Link
									href={`/category/tops`}
									onClick={() => setIsNavOpen(false)}
								>
									Tops
								</Link>
								<Link
									href={`/category/shirt`}
									onClick={() => setIsNavOpen(false)}
								>
									Shirts
								</Link>
								<Link
									href={`/category/gowns`}
									onClick={() => setIsNavOpen(false)}
								>
									Gowns
								</Link>
								<Link
									href={`/category/two piece sets`}
									onClick={() => setIsNavOpen(false)}
								>
									Two piece sets
								</Link>
								<Link
									href={`/category/trousers & shorts`}
									onClick={() => setIsNavOpen(false)}
								>
									Trousers & Shorts
								</Link>
								<Link
									href={`/category/corporate`}
									onClick={() => setIsNavOpen(false)}
								>
									Corporate
								</Link>
								<Link
									href={`/category/silk`}
									onClick={() => setIsNavOpen(false)}
								>
									Silk
								</Link>
								<Link
									href={`/category/Cargo wears`}
									onClick={() => setIsNavOpen(false)}
								>
									Cargo wears
								</Link>
							</div>
						</div>
					)}

					{showCart && <Cart />}
				</div>
			</div>
		</>
	);
};

export default Navbar;
