import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';
import Cart from './Cart';
import NavMenu from './NavMenu';
import { client } from '@/lib/client';
import Search from './Search';
import { FiSearch } from 'react-icons/fi';
import { SearchResult } from '@/interfaces';

interface categoryType {
	title: string;
}
const Navbar = () => {
	const router = useRouter();
	const { showCart, setShowCart, cartItems } = useStateContext();
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [categories, setCategories] = useState<categoryType[]>([]);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
	const [searchText, setSearchText] = useState('');
	let activeLink = router.query.category;

	// FETCH CATEGORIES
	const fetchCategories = async () => {
		const query = `*[_type == 'category'] | order(_createdAt asc) {
			title,
		}`;
		try {
			const data = await client.fetch(query);
			setCategories(data);
		} catch (error) {
			console.error('Error fetching categories', error);
		}
	};

	//SEARCH RESULT

	const fetchResults = async (searchedTerm: string) => {
		const query = `*[_type == 'product' && name match "${searchedTerm}*"][0..4]{
			image,
			  name,
			  baseprice,
			  'slug': slug.current,
			}`;

		try {
			const result = await client.fetch(query);
			setSearchResult(result);
		} catch (error) {
			console.log('Error fetch result', error);
		}
	};

	const handleChange = (value: string) => {
		setSearchText(value);
		if (value !== '') {
			fetchResults(value);
		} else {
			setSearchResult(null);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<>
			{/* // DESKTOP NAV BAR */}
			<div className='fixed top-0 left-0 z-10 hidden w-full items-center justify-between bg-white py-6 px-5 shadow-md md:flex'>
				<div className='flex items-center gap-x-36'>
					{/* navbar logo */}
					<h1>
						<Link href='/'>TopFactoryng</Link>
					</h1>
					{/* NAVLINKS */}

					<ul className='link-container flex items-center text-lg'>
						<li className='rounded-lg p-1 text-base font-normal hover:!bg-gray-50'>
							<Link href='/'>Home</Link>
						</li>
						<li className='group relative'>
							<button className='text-base font-normal hover:!bg-gray-50'>
								Categories
							</button>
							{/* SUBLINKS */}
							<div className='sublinks--container invisible absolute top-8 left-3 z-10 grid gap-2 rounded-sm border bg-white py-4 text-sm shadow-md group-hover:visible'>
								{categories.map((category, idx) => (
									<Link
										key={idx}
										href={`/category/${category.title}`}
										className={`${
											activeLink === category.title
												? 'font-normal underline'
												: 'font-light hover:underline'
										} hover:!bg-transparent`}
									>
										{category.title}
									</Link>
								))}
							</div>
						</li>
					</ul>
				</div>

				<div className='flex items-center gap-x-3'>
					<Search
						setSearchText={setSearchText}
						searchResult={searchResult}
						handleChange={handleChange}
						searchText={searchText}
						setSearchResult={setSearchResult}
					/>
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
				</div>

				{showCart && <Cart />}
			</div>

			{/* MOBILE NAVBAR */}
			<div>
				<div className='fixed top-0 left-0 z-10 flex w-full items-center justify-between bg-white py-4 px-2 shadow-md md:hidden md:py-6 md:px-5'>
					{isSearchOpen ? (
						<Search
							setIsSearchOpen={setIsSearchOpen}
							setSearchText={setSearchText}
							searchResult={searchResult}
							handleChange={handleChange}
							searchText={searchText}
							setSearchResult={setSearchResult}
						/>
					) : (
						<>
							<div className='flex items-center gap-x-4'>
								{/* MENU */}
								<NavMenu
									isNavOpen={isNavOpen}
									setIsNavOpen={setIsNavOpen}
								/>
							</div>
							{/* navbar logo */}
							<h1>
								<Link href='/'>Top factory</Link>
							</h1>
							<div className='flex items-center gap-x-4'>
								<FiSearch
									size={25}
									className='font-semibold'
									onClick={() => setIsSearchOpen(true)}
								/>
								<button
									className='relative'
									onClick={() => setShowCart(!showCart)}
								>
									<AiOutlineShopping size={30} />
									<span className='absolute -right-1 top-0.5 rounded-full bg-red-500 px-[4.5px] text-[10px] text-white'>
										{cartItems.length}
									</span>
								</button>
							</div>
						</>
					)}
					{/* cart */}

					{/* MOBILE NAV BAR*/}

					{isNavOpen && (
						<div
							className='absolute top-0 left-0 h-screen w-full animate-fade-in bg-blackOverlay'
							// ref={navBarRef}
						>
							<div className='link-container top-0 left-0 flex h-screen w-[14rem] animate-slide-in-left flex-col gap-7 bg-white px-4 pt-20 text-base'>
								<span className='text-sm uppercase text-gray-700'>
									categories
								</span>
								{categories.map((category, idx) => (
									<Link
										key={idx}
										href={`/category/${category.title}`}
										onClick={() => setIsNavOpen(false)}
									>
										{category.title}
									</Link>
								))}
							</div>
						</div>
					)}

					{isSearchOpen && (
						<div className='absolute top-16 left-0 h-[80vh] w-full animate-fade-in bg-blackOverlay'></div>
					)}

					{showCart && <Cart />}
				</div>
			</div>
		</>
	);
};

export default Navbar;
