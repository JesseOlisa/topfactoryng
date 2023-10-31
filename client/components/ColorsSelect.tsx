import React, { useState, useCallback, useRef } from 'react';
import Select from 'react-select';
import { useStateContext } from '@/context/StateContext';
import { cartType } from '@/interfaces';
import { CgClose } from 'react-icons/cg';

export type ColorSelectValue = {
  label: string;
  value: string;
};

interface ColorsSelectProps {
  options?: ColorSelectValue[];
  value: string | null;
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: string) => void;
  productSection?: boolean;
  product?: cartType;
}
const ColorsSelect = ({
  options,
  value,
  isOpen,
  productSection,
  onChange,
  product,
}: ColorsSelectProps) => {
  const { addToCart } = useStateContext();

  const colorModalRef = useRef<HTMLDivElement | null>(null);

  const initialValue = value ? { label: value, value: value } : null;
  const [selectedValue, setSelectedValue] = useState(initialValue);
  // updates select value
  const handleChange = useCallback(
    (option: any) => {
      setSelectedValue(option);
      onChange(option.value);
    },
    [onChange]
  );

  // This functions closes the cart modal on desktop view when clicked outside
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as Element;
    if (!colorModalRef.current?.contains(target)) {
      isOpen(false);
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 z-10 flex min-h-screen w-full items-center justify-center bg-blackOverlay`}
      onClick={(e) => closeModal(e)}
    >
      <div
        ref={colorModalRef}
        className='flex min-w-[80%] flex-col gap-6 rounded-md bg-white px-3 py-5 md:min-w-[400px] md:rounded-lg md:p-5'
      >
        <div>
          {/* <div className='mb-2 flex justify-end  text-2xl'>
            <CgClose className='' />
          </div> */}
          <Select
            value={selectedValue}
            options={options as any}
            onChange={(option) => handleChange(option)}
            placeholder='Select Color'
          />
        </div>
        <button
          className='btn-primary'
          onClick={() => {
            if (productSection) {
              if (!product?.color) {
                return;
              }
              addToCart(product as cartType);
            }
            isOpen(false);
          }}
        >
          {productSection ? 'Proceed' : 'Close'}
        </button>
      </div>
    </div>
  );
};

export default ColorsSelect;
