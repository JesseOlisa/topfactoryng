import React from 'react';
import { ColorSelectValue } from './ColorsSelect';
import Select, {
	DropdownIndicatorProps,
	components,
	StylesConfig,
} from 'react-select';
import { SizesArr } from '@/lib/data';
import { FaChevronDown } from 'react-icons/fa';

interface SizeSelectProps {
	value: string;
	handleChange: (value: any) => void;
	// options: ColorSelectValue[];
}

const DropdownIndicator = (props: DropdownIndicatorProps) => (
	<components.DropdownIndicator {...props}>
		<FaChevronDown size={12} />
	</components.DropdownIndicator>
);

const customStyles: StylesConfig = {
	option: (provided) => ({
		...provided,
		fontSize: '14px',
		minHeight: '10px',
	}),
};

const SizeSelect = ({ value, handleChange }: SizeSelectProps) => {
	return (
		<div>
			<Select
				value={{ label: value, value: value }}
				options={SizesArr}
				isSearchable={false}
				onChange={(option) => handleChange(option)}
				styles={customStyles}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator,
				}}
				classNames={{
					input: () => 'text-sm',
					option: () => 'text-xs',
					indicatorsContainer: () => 'pl-5',
					valueContainer: () => 'text-sm',
					dropdownIndicator: () => '!p-1',
				}}
			/>
		</div>
	);
};

export default SizeSelect;
