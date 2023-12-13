import { productType } from '@/lib/definitions';
import Product from './product';
import { cn } from '@/lib/utils';
import { getPlaiceholder } from 'plaiceholder';
import { urlFor } from '@/sanity/sanity.client';

type ProductListProps = {
  products: productType[];
  className?: string;
};

export const getBase64 = async (src: string) => {
  const imageURL = urlFor(src).width(50).height(50).quality(20).url();
  try {
    const response = await fetch(imageURL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    const buffer = await response.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    console.error('Failed to get image');
  }
};

const ProductList = async ({ products, className }: ProductListProps) => {
  // const base64Promises = products.map((product) =>
  //   getBase64(product.product_image)
  // );
  // const base64Results = await Promise.all(base64Promises);

  // const productsWithBlur = products.map((product, i) => {
  //   return {
  //     ...product,
  //     blur_URL: base64Results[i],
  //   };
  // });
  // console.log(productsWithBlur);
  return (
    <div
      className={cn(
        'grid grid-cols-200 justify-center xl:justify-between gap-2 overflow-hidden py-7 md:grid-cols-280 md:gap-6 md:px-3 1xl:grid-cols-320',
        className
      )}
    >
      {products.map((product) => (
        <Product
          product={product}
          key={product._id}
        />
      ))}
    </div>
  );
};

export default ProductList;
