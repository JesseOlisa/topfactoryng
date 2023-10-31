import React from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next';
import { client } from '@/lib/client';
import { ParsedUrlQuery } from 'querystring';
import ProductDetail from '@/components/ProductDetail';
import Transition from '@/components/Transition';

interface Params extends ParsedUrlQuery {
  slug: string;
}

const ProductInfo = ({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <Transition>
        <div className='flex-center mb-5 min-h-screen w-full pt-20 md:pt-16'>
          <ProductDetail product={product} />
        </div>
      </Transition>
    </>
  );
};

export default ProductInfo;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == 'product'] {
        'slug': slug.current
    }`;
  const allProducts = await client.fetch(query);

  // this is used to get all products using their slugs for the static url
  const paths = allProducts.map((product: Params) => {
    return {
      params: {
        slug: product.slug.toString(),
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = '' } = context.params as Params;
  const query = `*[_type == 'product' && slug.current =='${slug}'][0] {
		name,
		baseprice,
		"imageUrl": image,
		"colors": category -> colors,
		'slug': slug.current,
		"category": category -> title,
		_id,
	}`;
  const product = await client.fetch(query, slug);
  return {
    props: { product },
    revalidate: 1,
  };
};
