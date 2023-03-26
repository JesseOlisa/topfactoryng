import React, { useState, useEffect } from 'react';
import { sizeArrType, colorArrType, ProductProps } from '@/interfaces';
import { sizeOptionsArr, colorCode } from '@/lib/data';
import { useStateContext } from '@/context/StateContext';

import { urlFor } from '@/lib/client';

const ProductDetail = ({ product }: ProductProps) => {
	const { _id, name, imageUrl, baseprice, colors } = product;

	const { addToCart, buyNow } = useStateContext();

	const colorArrTwo = colors?.map((color) => {
		return {
			name: color.name,
			code: color.colorCode,
			isSelected: false,
		};
	});

	const [sizeArr, setSizeArr] = useState<sizeArrType>(sizeOptionsArr);
	const [quantity, setQuantity] = useState<any>(1);
	const [selectedSize, setSelectedSize] = useState<number>(6);
	const [colorArr, setColorArr] = useState<colorArrType>(colorArrTwo);

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

	let productDetail = {
		_id,
		name,
		imageUrl,
		size: 6,
		price,
		color: colors?.[0],
		quantity,
		_key: '',
	};

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

	const updatePrice = () => {
		sizeArr.map((option) => {
			if (option.isSelected) {
				setSelectedSize(option.size);
			}
			return;
		});
	};

	const updateColor = (id: number) => {
		let newColorArr = colorArrTwo.map((opt, index) => {
			if (id === index) {
				setProductInfo({
					...productInfo,
					color: { name: opt.name, colorCode: opt.code },
				});
				return { ...opt, isSelected: true };
			}
			return { ...opt, isSelected: false };
		});
		setColorArr(newColorArr);
	};

	// USE EFFECT
	useEffect(() => {
		updatePrice();
	}, [sizeArr]);
	// for pricing update
	useEffect(() => {
		setProductInfo({ ...productInfo, quantity, price: price * quantity });
	}, [selectedSize, quantity]);
	// USE EFFECT
	useEffect(() => {
		setProductInfo(productDetail);
	}, [product]);

	return (
		<div className='flex-center max-w-[50rem] flex-col gap-2 rounded-lg md:pr-2 md:shadow'>
			<div className='flex w-full justify-between px-4 py-1 text-lg font-semibold md:hidden'>
				<h2>{name}</h2>
				<p>&#x20A6;{productInfo.price.toLocaleString()}</p>
			</div>
			<div className='flex-center w-full flex-col items-center gap-3 md:flex-row md:items-start'>
				<div className='max-w-[20rem] md:w-1/2'>
					<img
						src={urlFor(imageUrl).width(400).height(450).fit('max').url()}
						alt='product'
						className='rounded-xl object-cover md:rounded-r-none'
					/>
				</div>
				<div className='flex min-h-[20rem] flex-col justify-between md:h-[22rem] md:w-1/2 md:gap-4 md:px-0'>
					<div className='flex flex-col md:gap-2'>
						<div className='flex-between py-2 px-2'>
							<h1 className='text-xl font-semibold'>{name}</h1>
							<p className='text-lg font-semibold'>&#x20A6;{price}</p>
						</div>
						<div className='flex w-full items-center justify-between px-2'>
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
						</div>

						<div className='flex w-full flex-col px-2'>
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
						</div>
						<div className='mb-2 w-full'>
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
						</div>
						<p className='my-2 text-xs italic text-gray-700/80'>
							*prices may vary for different sizes
						</p>
					</div>

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
			</div>
		</div>
	);
};

export default ProductDetail;
