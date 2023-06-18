import React, { useState, useMemo, useCallback } from 'react';
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetServerSidePropsType,
} from 'next';
import Navbar from '@/components/Navbar';
import Product from '@/components/Product';
import Transition from '@/components/Transition';
import { client } from '@/lib/client';
import Pagination from '@/components/Pagination';

import { ParsedUrlQuery } from 'querystring';

import { productType } from '@/interfaces';
import { motion } from 'framer-motion';

interface Params extends ParsedUrlQuery {
	category: string;
}

const containerVariant = {
	animate: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};
const Category = ({
	products,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
	// STATES
	// let itemsLength = 20;

	const [itemsLength, setItemsLength] = useState<number>(20);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 20;
	let startIndex = useMemo(() => {
		return (currentPage - 1) * pageSize;
	}, [currentPage, pageSize]);

	let lastIndex = useMemo(() => {
		return startIndex + pageSize;
	}, [startIndex, pageSize]);

	const onPageChange = useCallback((page: number) => {
		return setCurrentPage(page);
	}, []);

	let increment = useCallback(() => {
		return setItemsLength(itemsLength + 20);
	}, [itemsLength]);

	if (products.length === 0) {
		return (
			<div className='flex-center h-screen w-full pt-24'>
				<Navbar />
				<h1 className='font-light'>Coming Soon...</h1>
			</div>
		);
	}
	return (
		<Transition>
			<motion.div
				initial='initial'
				animate='animate'
				variants={containerVariant}
				className='grid min-h-[100vh] w-screen grid-cols-200 justify-center gap-2 overflow-hidden py-10 pt-24 md:grid-cols-280 md:gap-6 md:px-3'
			>
				{products &&
					products
						.slice(startIndex, lastIndex)
						.map((product: any, index: number) => (
							<Product
								product={product}
								key={index}
							/>
						))}
			</motion.div>
			{/* {products.length > itemsLength && (
				<button
					className='mx-auto mb-4 block border-b-2 border-b-black/40 px-1 text-center text-black/70 transition-all duration-200 ease-in-out hover:border-b-black/80 hover:text-black'
					onClick={() => increment()}
				>
					See more
				</button>
			)} */}
			<Pagination
				totalItems={products.length}
				currentPage={currentPage}
				pageSize={pageSize}
				onPageChange={onPageChange}
			/>
		</Transition>
	);
};
export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type == 'category']{
		title
	}`;
	const allCategories = await client.fetch(query);

	// this is used to get all the categories for the static url
	const paths = allCategories.map((category: Params) => {
		return {
			params: {
				category: category.title,
			},
		};
	});

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { category = '' } = context.params as Params;
	const query = `*[_type == 'product' && category._ref in *[_type=="category" && title=="${category}"]._id] | order(_createdAt desc) {
		name,
		baseprice,
		"imageUrl": image,
		"colors": category -> colors,
		'slug': slug.current,
		_id,
	}`;
	const products: productType[] = await client.fetch(query, category);
	return {
		props: { products },
		revalidate: 10,
	};
};
