import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStateContext } from '@/context/StateContext';
import { sizeArrType, colorArrType, ProductProps } from '@/interfaces';
import { sizeOptionsArr, colorCode } from '@/lib/data';
import { urlFor } from '@/lib/client';

const Product = ({ product }: ProductProps) => {
	const { _id, name, imageUrl, baseprice, colors } = product;
	// console.log(product);

	const colorArrTwo = colors?.map((color) => {
		return {
			name: color.name,
			code: color.colorCode,
			isSelected: false,
		};
	});
	// console.log(colorArrTwo);

	const { addToCart } = useStateContext();

	const [sizeArr, setSizeArr] = useState<sizeArrType>(sizeOptionsArr);
	const [colorArr, setColorArr] = useState<colorArrType>(colorArrTwo);
	const [selectedSize, setSelectedSize] = useState<number>(6);
	const [quantity, setQuantity] = useState<any>(1);

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
	// console.log(productDetail);

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
		<div className='product-container'>
			<div className='h-60 w-full overflow-hidden rounded-t-lg bg-productBg'>
				<img
					src={urlFor(productDetail.imageUrl)
						.width(480)
						.height(410)
						.fit('max')
						// .sharpen(15)
						.url()}
					alt='product'
					style={{
						width: '100%',
					}}
					className='max-w-none rounded-t-lg object-contain'
				/>
			</div>
			<div className='product-desc'>
				<div className='flex w-full justify-between py-1 font-semibold'>
					<h2>{productDetail.name}</h2>
					<span className='text-black/80'>
						&#x20A6;{productInfo.price.toLocaleString()}
					</span>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-sm'>In stock</p>
					<div className='flex gap-1 text-sm'>
						<p>Qty:</p>
						<select
							name='quantity'
							id='quantity'
							value={quantity}
							className='w-10 rounded border border-gray-400 px-1 outline-none'
							onChange={(e) => setQuantity(Number(e.target.value))}
						>
							<option defaultValue={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
					</div>
				</div>
				<div className='mb-2 w-full'>
					<p className='mt-1 text-sm'>Size</p>
					<div className='size-options-container'>
						{sizeArr.map((option, index) => (
							<button
								key={index}
								className={
									option.isSelected
										? 'bg-black text-white'
										: 'bg-white text-black hover:bg-gray-300'
								}
								onClick={() => updateSize(index)}
							>
								{option.size}
							</button>
						))}
					</div>
					<div className='flex flex-col'>
						<p className='mt-1 text-sm'>Preferred color</p>
						<div className='color-options-container'>
							{colorArr?.map((color, index) => (
								<button
									key={index}
									className={
										color.isSelected
											? 'border-2.5 border-black'
											: 'border border-gray-700'
									}
									style={{
										backgroundColor: `${color.code}`,
									}}
									onClick={() => updateColor(index)}
								></button>
							))}
						</div>
					</div>
				</div>
				<hr className='mb-3 mt-1' />
				<button
					className='btn-primary'
					onClick={() => addToCart(productInfo)}
				>
					Add to Cart
				</button>
				<p className='my-2 text-xs italic text-gray-700/80'>
					*prices may vary for different sizes
				</p>
			</div>
		</div>
	);
};

export default Product;
