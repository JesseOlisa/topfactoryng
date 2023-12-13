'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cartProduct, productType } from '@/lib/definitions';
import { urlFor } from '@/sanity/sanity.client';
import { useStoreContext } from '@/context/StoreContext';
import SelectColor from '../product-details/select-color';
// import { getBase64 } from '@/lib/utils';

type productProps = {
  product: productType;
};

const Product = ({ product }: productProps) => {
  const { addToCart } = useStoreContext();
  const {
    name,
    _id,
    baseprice,
    category,
    colors,
    product_image,
    slug,
    blur_URL,
  } = product;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  const cartProduct: cartProduct = {
    _id,
    name,
    color: selectedColor,
    price: baseprice,
    product_image,
    quantity: 1,
    size: 6,
    _key: '',
  };

  const addProductToCart = (product: cartProduct) => {
    if (!product.color) {
      setIsOpen(true);
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <div className='product-container relative'>
        <div className='w-full overflow-hidden rounded-t-lg'>
          <Link href={`/product/${slug}`}>
            <div className='relative h-[220px] w-full rounded-lg md:h-[350px]'>
              <Image
                src={urlFor(product_image).url()}
                alt='product'
                fill
                className='rounded-lg object-cover'
                sizes='(min-width: 780px) 400px, 164px'
                // placeholder='blur'
                // blurDataURL={blur_URL}
              />
            </div>
          </Link>
          <div className='product-desc'>
            <div className='flex w-full justify-between text-sm md:text-base'>
              <h2>{name}</h2>
              <span className='text-black/80'>
                &#x20A6;{baseprice.toLocaleString()}
              </span>
            </div>
            {/* <p className='text-xs text-gray-600'>{productDetail.color.name}</p> */}
          </div>
          <div className='flex-center flex-col gap-2'>
            <button
              className='btn-product-primary w-full'
              onClick={() => addProductToCart(cartProduct)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <SelectColor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        quickAddToCart
        product={cartProduct}
      />
    </>
  );
};

export default Product;
