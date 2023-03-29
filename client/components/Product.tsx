import React from 'react';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';
import { ProductProps } from '@/interfaces';
import { urlFor } from '@/lib/client';
import { motion } from 'framer-motion';

const easing: number[] = [0.6, -0.05, 0.01, 0.99];

const productvariant = {
	initial: { y: 40, opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
		transition: { ease: easing, duration: 0.4 },
	},
};

const Product = ({ product }: ProductProps) => {
	const { _id, name, imageUrl, baseprice, colors, slug } = product;

	const { addToCart } = useStateContext();

	let productDetail = {
		_id,
		name,
		imageUrl,
		size: 6,
		price: baseprice,
		color: colors?.[0],
		quantity: 1,
		_key: '',
	};

	return (
		<motion.div
			variants={productvariant}
			className='product-container'
		>
			<div className='w-full overflow-hidden'>
				<Link
					href={`/product/${slug}`}
					className='rounded-lg'
				>
					<motion.img
						src={urlFor(productDetail.imageUrl)
							.width(320)
							.height(380)
							.fit('max')
							.url()}
						alt='product'
						whileHover={{ scale: 1.04 }}
						transition={{
							duration: 0.5,
							ease: [0.43, 0.13, 0.23, 0.9],
						}}
						style={{
							width: '100%',
						}}
						className='max-w-none rounded-lg object-contain'
					/>
				</Link>
				<div className='product-desc'>
					<div className='flex w-full justify-between text-sm md:text-base'>
						<h2>{productDetail.name}</h2>
						<span className='text-black/80'>
							&#x20A6;{productDetail.price.toLocaleString()}
						</span>
					</div>
					<p className='text-xs text-gray-600'>{productDetail.color.name}</p>
				</div>
				<div className='flex-center flex-col gap-2'>
					<motion.button
						whileTap={{ scale: 1.24 }}
						transition={{ ease: 'backOut', duration: 0.6 }}
						className='btn-product-primary w-full'
						onClick={() => addToCart(productDetail)}
					>
						Add to Cart
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default Product;
