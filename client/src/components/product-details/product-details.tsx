'use client';
import { useState, useMemo } from 'react';
import { cartProduct, productType } from '@/lib/definitions';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { sizes } from '@/lib/data';

import SelectColor from './select-color';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useStoreContext } from '@/context/StoreContext';
import toast from 'react-hot-toast';

const ProductDetails = ({ product }: { product: productType }) => {
  const { addToCart, buyNow } = useStoreContext();
  const { _id, name, baseprice, colors, product_image, category } = product;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('6');
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState('');

  //Updates prices when sizes change
  const newPrice = useMemo(() => {
    let price = baseprice;
    if (size === '6' || size === '8') {
      return price;
    } else if (size === '10') {
      return (price += 200);
    } else if (size === '12' || size === '14' || size === '16') {
      return (price += 500);
    } else if (Number(size) > 16 && category !== 'tops') {
      return (price += 700);
    } else {
      return (price += 500); //adds 500 to price if it is more than 16 and its category is tops
    }
  }, [size, baseprice, category]);

  //update product price whenever quantity and newPrice change
  const productPrice = useMemo(() => newPrice * quantity, [newPrice, quantity]);

  const productDetails: cartProduct = {
    _id,
    name,
    product_image,
    size: Number(size),
    color,
    price: productPrice,
    _key: '',
    quantity,
  };

  const handleQuantityChange = (text: string) => {
    setQuantity(Number(text));
  };

  const handleSizeChange = (text: string) => {
    setSize(text);
  };

  // ADD ITEMS TO CART
  const addItemToCart = (product: cartProduct) => {
    if (!product.color) {
      setOpen(true);
      toast.error('Please Choose a color');
    } else {
      addToCart(product);
    }
  };

  const buyProductNow = (product: cartProduct) => {
    if (!product.color) {
      setOpen(true);
      toast('Please Choose a color');
    } else {
      buyNow(product);
    }
  };

  return (
    <>
      <div className='flex flex-col md:gap-3 px-2'>
        <div className='flex-between py-2'>
          <h2 className='text-xl font-semibold'>{name}</h2>
          <p className='text-xl font-semibold'>
            &#x20A6;{productPrice.toLocaleString()}
          </p>
        </div>
        <div className='flex w-full items-center justify-between'>
          <p className='text-base px-1.5 rounded-full  bg-green-100 text-green-500'>
            In stock
          </p>
          <div className='flex gap-1 pl-2 text-sm'>
            <p className='text-lg'>Qty:</p>
            {/* Select dropdown */}
            <Select
              defaultValue={quantity.toString()}
              value={quantity.toString()}
              onValueChange={(value) => handleQuantityChange(value)}
            >
              <SelectTrigger className='py-1 h-8 gap-x-1'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                ref={(ref) => {
                  //This function prevents event propagation
                  if (!ref) return;
                  ref.ontouchstart = (e) => {
                    e.preventDefault();
                  };
                }}
              >
                <SelectItem value='1'>1</SelectItem>
                <SelectItem value='2'>2</SelectItem>
                <SelectItem value='3'>3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='mb-2 mt-4 flex w-full items-center justify-between'>
          <p className='mt-1 text-base font-semibold'>Select Size</p>
          <Select
            defaultValue={size.toString()}
            value={size.toString()}
            onValueChange={(value) => handleSizeChange(value)}
          >
            <SelectTrigger className='py-1 gap-x-1 w-[100px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              ref={(ref) => {
                if (!ref) return;
                ref.ontouchstart = (e) => {
                  e.preventDefault();
                };
              }}
              className='min-w-[100px] max-h-52'
            >
              {sizes.map((size) => (
                <SelectItem
                  key={size}
                  value={size.toString()}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='mt-5'>
          {!color ? (
            <button
              onClick={() => setOpen(true)}
              className='btn-primary w-full'
            >
              Select Color
            </button>
          ) : (
            <div className='flex w-full items-center gap-3'>
              <p className='flex-1 capitalize'>
                <span className='font-semibold'>Color: </span>
                {color}
              </p>
              <button
                onClick={() => setOpen(true)}
                className='flex items-center justify-center gap-1 rounded-md bg-black px-2 py-1 text-white'
              >
                <span> Edit</span>
                <PencilIcon className='w-4 h-4 ml-1' />
              </button>
            </div>
          )}
          <SelectColor
            isOpen={open}
            setIsOpen={setOpen}
            colors={colors}
            selectedColor={color}
            setSelectedColor={setColor}
          />
        </div>

        <p className='my-2 text-xs italic text-gray-700/80'>
          *Prices may vary for different sizes
        </p>
      </div>

      <div className='px-2'>
        <hr className='mb-3 mt-1' />
        <button
          className='btn-primary w-full'
          onClick={() => addItemToCart(productDetails)}
        >
          Add to Cart
        </button>
        <button
          className='btn-primary my-2 w-full'
          onClick={() => buyProductNow(productDetails)}
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
