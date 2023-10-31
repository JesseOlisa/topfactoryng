import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';
import { ProductProps } from '@/interfaces';
import { urlFor } from '@/lib/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ColorsSelect from './ColorsSelect';
import { cartType } from '@/interfaces';
import { toast } from 'react-hot-toast';

const easing: number[] = [0.6, -0.05, 0.01, 0.99];

const productvariant = {
  initial: { opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.4 },
  },
};

const Product = ({ product }: ProductProps) => {
  const { _id, name, imageUrl, baseprice, slug, colors } = product;

  const [colorSelect, setColorSelect] = useState(false);

  const { addToCart } = useStateContext();
  // COLORS  OPTIONS FOR REACT SELECT
  const colorOptions = useMemo(() => {
    return colors?.split(',')?.map((item) => ({
      label: item,
      value: item,
    }));
  }, [colors]);

  let productDetail = {
    _id,
    name,
    imageUrl,
    size: 6,
    color: null,
    price: baseprice,
    quantity: 1,
    _key: '',
  };
  const [productInfo, setProductInfo] = useState<cartType>(productDetail);
  // UPDATES COLOR IN PRODUCT INFO
  const updateColor = (value: string) => {
    setProductInfo({ ...productInfo, color: value });
  };

  // ADD ITEMS TO CART
  const addItemToCart = async (product: cartType) => {
    if (!product.color) {
      setColorSelect(true);
      toast('Please Choose a color');
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <motion.div
        variants={productvariant}
        className='product-container relative'
      >
        <div className='w-full overflow-hidden rounded-t-lg'>
          <Link href={`/product/${slug}`}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.9],
              }}
              className='relative h-[220px] w-full rounded-lg md:h-[350px]'
            >
              <Image
                src={urlFor(productDetail.imageUrl).url()}
                alt='product'
                fill
                className='rounded-lg object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </motion.div>
          </Link>
          <div className='product-desc'>
            <div className='flex w-full justify-between text-sm md:text-base'>
              <h2>{productDetail.name}</h2>
              <span className='text-black/80'>
                &#x20A6;{productDetail.price.toLocaleString()}
              </span>
            </div>
            {/* <p className='text-xs text-gray-600'>{productDetail.color.name}</p> */}
          </div>
          <div className='flex-center flex-col gap-2'>
            <motion.button
              whileTap={{ scale: 1.24 }}
              transition={{ ease: 'backOut', duration: 0.6 }}
              className='btn-product-primary w-full'
              onClick={() => addItemToCart(productInfo)}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
      {colorSelect && (
        <ColorsSelect
          options={colorOptions}
          value={productInfo.color}
          onChange={updateColor}
          isOpen={setColorSelect}
          product={productInfo}
          productSection
        />
      )}
    </>
  );
};

export default Product;
