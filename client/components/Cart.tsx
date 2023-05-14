import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { RxCaretLeft } from 'react-icons/rx';
import { useStateContext } from '@/context/StateContext';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti';

import { motion, AnimatePresence } from 'framer-motion';
const Cart = () => {
	const {
		showCart,
		setShowCart,
		cartItems,
		deleteFromCart,
		totalPrice,
		setCartItems,
		confirmOrder,
	} = useStateContext();
	const router = useRouter();

	const cartRef = useRef<HTMLDivElement | null>(null);
	const fadeanimation = showCart ? 'animate-fade-in' : 'animate-fade-out';

	// This functions closes the cart modal on desktop view when clicked outside
	const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const target = e.target as Element;
		if (!cartRef.current?.contains(target)) {
			setShowCart(false);
		}
	};
	let cart = cartItems;
	return (
		<div
			className={`${fadeanimation} absolute top-0 left-0 right-0 z-10 min-h-screen w-full bg-blackOverlay md:flex md:justify-end`}
			onClick={(e) => closeModal(e)}
		>
			<div
				ref={cartRef}
				className='relative  h-screen w-full animate-slide-in-right bg-white p-3 duration-100 md:w-2/5'
			>
				{cartItems.length === 0 ? (
					<div className='flex-center h-4/5 w-full flex-col gap-3'>
						<TiShoppingCart
							size={120}
							className='text-gray-600'
							strokeWidth={0.08}
						/>
						<p className='text-sm'>No items here yet</p>
						<button
							className='btn-red'
							onClick={() => setShowCart(false)}
						>
							Keep Shopping
						</button>
					</div>
				) : (
					<>
						<div>
							<button
								className='flex items-center text-lg text-red-500'
								onClick={() => {
									setShowCart(false);
								}}
							>
								<span>
									<RxCaretLeft
										size={25}
										className='font-semibold'
									/>
								</span>
								Close
							</button>
						</div>
						<div className='hide-scrollbar mt-4 flex h-[80%] w-full flex-col gap-2 overflow-auto scroll-smooth text-sm'>
							<AnimatePresence mode='sync'>
								{cartItems?.map((item) => (
									<motion.div
										key={item._id}
										className='relative flex h-28 w-full gap-1 border-b border-gray-300'
										animate={{ scale: 1, opacity: 1 }}
										exit={{ scale: 0.8, opacity: 0 }}
										transition={{
											type: 'spring',
											duration: 0.5,
											delay: 0.5,
										}}
									>
										<div className='flex-center h-[90px] w-[80px] overflow-hidden'>
											<Image
												src={`${item.imageUrl}?sharp=15&fit=max`}
												alt='product'
												className='rounded-sm'
												width={80}
												height={90}
											/>
										</div>
										<div className='flex flex-1 flex-col px-1 py-3.5'>
											<p className='font-semibold'>{item?.name}</p>
											{/* <div className='flex gap-2'>
												<p>Color:</p>
												<span
													className='mt-0.5 h-4 w-4 rounded-full border border-gray-500'
													style={{
														backgroundColor: `${item?.color.colorCode}`,
													}}
												></span>
											</div> */}

											<p>Size: {item?.size}</p>
											<p>Qty: {item?.quantity}</p>
										</div>
										<div className='px-3 py-1 font-semibold'>
											&#x20A6;{item?.price}
										</div>
										<button
											className='absolute bottom-4 right-2'
											onClick={() => deleteFromCart(item)}
										>
											<RiDeleteBin6Line
												size={20}
												className='text-red-600/95'
											/>
										</button>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
						<div className='absolute bottom-0 left-0 right-0 flex justify-between border-t-2 border-gray-300 bg-white py-5 px-3'>
							<button
								className='btn-red'
								onClick={() => router.push('/contact')}
							>
								Proceed to Checkout
							</button>
							<p className='text-lg font-semibold'>
								<span>Total: </span>&#x20A6;{totalPrice.toLocaleString()}
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
