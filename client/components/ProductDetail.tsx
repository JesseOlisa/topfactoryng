import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { sizeArrType, ProductProps } from '@/interfaces';
import { sizeOptionsArr } from '@/lib/data';
import { useStateContext } from '@/context/StateContext';
import { motion } from 'framer-motion';

import { urlFor } from '@/lib/client';

const containerVariant = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariant = {
	initial: { y: 10, opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			ease: 'easeIn',
			duration: 0.3,
		},
	},
};

const ProductDetail = ({ product }: ProductProps) => {
	const { _id, name, imageUrl, baseprice } = product;

	const { addToCart, buyNow } = useStateContext();

	// const colorArrTwo = colors?.map((color) => {
	// 	return {
	// 		name: color.name,
	// 		code: color.colorCode,
	// 		isSelected: false,
	// 	};
	// });

	const [sizeArr, setSizeArr] = useState<sizeArrType>(sizeOptionsArr);
	const [quantity, setQuantity] = useState<any>(1);
	const [selectedSize, setSelectedSize] = useState<number>(6);
	// const [colorArr, setColorArr] = useState<colorArrType>(colorArrTwo);

	let price: number = baseprice;
	// PRICE LISTING
	switch (selectedSize) {
		case 6:
		case 8:
			price;
			break;
		case 10:
			price += 200;
			break;
		case 12:
		case 14:
		case 16:
			price += 500;
			break;
		default:
			break;
	}

	let productDetail = useMemo(
		() => ({
			_id,
			name,
			imageUrl,
			size: 6,
			price,
			// color: colors?.[0],
			quantity,
			_key: '',
		}),
		[_id, name, imageUrl, price, quantity]
	);

	const [productInfo, setProductInfo] = useState(productDetail);

	// FUNCTIONS
	const updateSize = (id: number) => {
		let newArr = sizeArr.map((opt, index) => {
			if (id === index) {
				setProductInfo({ ...productInfo, size: opt.size }); //this update size in the product info array
				return { ...opt, isSelected: true };
			}
			return { ...opt, isSelected: false };
		});
		setSizeArr(newArr);
	};

	const updatePrice = useCallback(() => {
		sizeArr.map((option) => {
			if (option.isSelected) {
				setSelectedSize(option.size);
			}
			return;
		});
	}, [sizeArr]);

	// const updateColor = (id: number) => {
	// 	let newColorArr = colorArrTwo.map((opt, index) => {
	// 		if (id === index) {
	// 			setProductInfo({
	// 				...productInfo,
	// 				color: { name: opt.name, colorCode: opt.code },
	// 			});
	// 			return { ...opt, isSelected: true };
	// 		}
	// 		return { ...opt, isSelected: false };
	// 	});
	// 	setColorArr(newColorArr);
	// };

	// USE EFFECT
	useEffect(() => {
		updatePrice();
	}, [sizeArr, updatePrice]);
	// for pricing update
	useEffect(() => {
		setProductInfo({ ...productInfo, quantity, price: price * quantity });
	}, [selectedSize, quantity, price, productInfo]);
	// USE EFFECT
	useEffect(() => {
		setProductInfo(productDetail);
	}, [product, productDetail]);

	return (
		<motion.div className='flex-center w-full max-w-[50rem] flex-col items-center gap-4 md:flex-row md:items-start'>
			<motion.div
				initial={{ opacity: 0.5 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4 }}
				className='relative h-[21rem] w-[18rem] md:h-[26rem] md:w-1/2 md:max-w-[20rem]'
			>
				<Image
					src={urlFor(imageUrl).url()}
					alt='product'
					className='rounded-xl object-cover md:h-full md:rounded-r-none'
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					priority
				/>
			</motion.div>
			<div className='flex min-h-[20rem] w-[18rem] flex-col justify-between md:h-[26rem] md:w-[45%] md:gap-4 md:px-0'>
				<motion.div
					className='flex flex-col md:gap-3'
					initial='initial'
					animate='animate'
					variants={containerVariant}
				>
					<motion.div
						className='flex-between py-2 px-2'
						variants={itemVariant}
					>
						<h1 className='text-xl font-semibold'>{name}</h1>
						<p className='text-xl font-semibold'>
							&#x20A6;{productInfo.price.toLocaleString()}
						</p>
					</motion.div>
					<motion.div
						className='flex w-full items-center justify-between px-2'
						variants={itemVariant}
					>
						<p className='text-lg'>In stock</p>
						<div className='flex gap-1 px-2 text-sm'>
							<p className='text-lg'>Qty:</p>
							<select
								name='quantity'
								id='quantity'
								value={quantity}
								className='ml-1 w-12 rounded border border-gray-400 px-1 text-base outline-none'
								onChange={(e) => setQuantity(Number(e.target.value))}
							>
								<option defaultValue={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
							</select>
						</div>
					</motion.div>

					{/* <motion.div
						className='flex w-full flex-col px-2'
						variants={itemVariant}
					>
						<p className='mt-1 font-semibold'>Color</p>
						<div className='color-options-container'>
							{colorArr?.map((color, index) => (
								<button
									key={index}
									className={
										color.isSelected
											? 'border-2.5 border-black p-[0.5px]'
											: 'border border-gray-400 p-[0.5px]'
									}
									style={{
										backgroundColor: `${color.code}`,
									}}
									onClick={() => updateColor(index)}
								></button>
							))}
						</div>
					</motion.div> */}
					<motion.div
						className='mb-2 w-full'
						variants={itemVariant}
					>
						<p className='mt-1 px-2 text-base font-semibold'>Size</p>
						<div className='size-options-container'>
							{sizeArr.map((option, index) => (
								<button
									key={index}
									className={
										option.isSelected
											? ' bg-black text-white'
											: 'border bg-white  text-black hover:bg-gray-100'
									}
									onClick={() => updateSize(index)}
								>
									{option.size}
								</button>
							))}
						</div>
					</motion.div>
					<motion.p className='my-2 text-xs italic text-gray-700/80'>
						*Prices may vary for different sizes
					</motion.p>
				</motion.div>
				<div className='px-2'>
					<hr className='mb-3 mt-1' />
					<button
						className='btn-primary w-full'
						onClick={() => addToCart(productInfo)}
					>
						Add to Cart
					</button>
					<button
						className='btn-primary my-2 w-full'
						onClick={() => buyNow(productInfo)}
					>
						Buy Now
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductDetail;
