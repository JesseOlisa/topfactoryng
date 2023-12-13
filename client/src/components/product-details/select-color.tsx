'use client';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { cartProduct } from '@/lib/definitions';
import { useStoreContext } from '@/context/StoreContext';

// PROP TYPES
type SelectColorProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  colors: string;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  quickAddToCart?: boolean;
  product?: cartProduct;
};

export const SelectColor = ({
  isOpen,
  setIsOpen,
  colors,
  selectedColor,
  setSelectedColor,
  quickAddToCart,
  product,
}: SelectColorProps) => {
  const { addToCart } = useStoreContext();

  const handleColorChange = (text: string) => {
    setSelectedColor(text);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className='shadow-none max-w-xs lg:max-w-lg xs:rounded-lg p-3 sm:p-6'>
        <Select
          defaultValue={selectedColor}
          value={selectedColor}
          onValueChange={(value) => handleColorChange(value)}
        >
          <SelectTrigger className=' mt-7 sm:mt-5 text-base capitalize'>
            <SelectValue placeholder='Select color' />
          </SelectTrigger>
          <SelectContent className='max-h-48 px-0 capitalize'>
            {colors.split(',').map((color) => {
              if (color !== '') {
                return (
                  <SelectItem
                    key={color}
                    value={color.toString()}
                  >
                    {color}
                  </SelectItem>
                );
              }
            })}
          </SelectContent>
        </Select>

        <button
          className='btn-primary py-2.5 rounded-md mt-1'
          onClick={() => {
            if (quickAddToCart) {
              //if no color, do nothing
              if (!product?.color) {
                return;
              }
              addToCart(product);
            }
            setIsOpen(false);
          }}
        >
          {quickAddToCart ? 'Proceed' : 'Close'}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectColor;
