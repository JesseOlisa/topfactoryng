import React, { useState, useCallback } from 'react';
import Select from 'react-select';
import { useStateContext } from '@/context/StateContext';
import { cartType } from '@/interfaces';

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
	return (
		<div
			className={`fixed top-0 left-0 z-10 flex min-h-screen w-full items-center justify-center bg-blackOverlay`}
		>
			<div className='flex min-w-[80%] flex-col gap-6 rounded-md bg-white px-3 py-5 md:min-w-[400px] md:rounded-lg md:p-5'>
				<div>
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
