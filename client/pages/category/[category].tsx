import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Product from '@/components/Product';
import { client } from '@/lib/client';
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetServerSidePropsType,
} from 'next';

import { ParsedUrlQuery } from 'querystring';

import { productType } from '@/interfaces';
import Footer from '@/components/Footer';

interface Params extends ParsedUrlQuery {
	category: string;
}
const Category = ({
	products,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
	// STATES
	const [itemsLength, setItemsLength] = useState<number>(8);

	if (products.length === 0) {
		return (
			<div className='flex-center h-screen w-full pt-24'>
				<Navbar />
				<h1 className='font-light'>Coming Soon...</h1>
			</div>
		);
	}
	return (
		<div>
			<Navbar />
			<div className='grid w-screen grid-cols-200 justify-center gap-2 pt-24 md:grid-cols-280 md:gap-6 md:px-3'>
				{products.slice(0, itemsLength).map((product: any, index: number) => (
					<Product
						product={product}
						key={index}
					/>
				))}
			</div>
			{products.length > itemsLength && (
				<button
					className='mx-auto mb-4 block border-b-2 border-b-black/40 px-1 text-center text-black/70 transition-all duration-200 ease-in-out hover:border-b-black/80 hover:text-black'
					onClick={() => setItemsLength((prev) => prev + 4)}
				>
					See more
				</button>
			)}
			<Footer />
		</div>
	);
};
export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type == 'product'][].category | order(_createdAt asc)`;
	const allCategories = await client.fetch(query);

	// this is used to get all the categories for the static url
	const paths = allCategories.map((category: Params) => {
		return {
			params: {
				category,
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
	const query = `*[_type == 'product' && category =='${category}'] {
		name,
		baseprice,
		"imageUrl": image.asset ->url,
		colors,
		'slug': slug.current,
		_id,
	}`;
	const products: productType[] = await client.fetch(query, category);
	return {
		props: { products },
	};
};
