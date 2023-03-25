import { sizeArrType, contactType } from '@/interfaces';

// SIZE OPTIONS ARRAY
export const sizeOptionsArr: sizeArrType = [
	{
		size: 6,
		isSelected: true,
	},
	{
		size: 8,
		isSelected: false,
	},
	{
		size: 10,
		isSelected: false,
	},
	{
		size: 12,
		isSelected: false,
	},
	{
		size: 14,
		isSelected: false,
	},
	{
		size: 16,
		isSelected: false,
	},
];

// COLOR OPTIONS ARRAY
export const colorCode = [
	{
		name: 'black',
		code: '#000000',
		isSelected: false,
	},
	{
		name: 'white',
		code: '#FAF9F6',
		isSelected: false,
	},
	{
		name: 'skyblue',
		code: '#87CEEB',
		isSelected: false,
	},
	{
		name: 'brown',
		code: '#A52A2A',
		isSelected: false,
	},
	{
		name: 'ash',
		code: '#666362',
		isSelected: false,
	},
];

// FINAL PRODUCT DETAILS
export const productDetail = {
	_id: '',
	name: '',
	imageUrl: [],
	size: 6,
	price: 0,
	color: 'black',
};

// FORM DETAILS
export const contactObj: contactType = {
	firstName: '',
	lastName: '',
	email: '',
	address: '',
	phoneNumber: 0,
};

export const collection = [
	{
		name: 'tops',
		title: 'Tops',
		image:
			'https://images.unsplash.com/photo-1525171254930-643fc658b64e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=240&q=80',
	},
	{
		name: 'gowns',
		title: 'Gowns',
		image:
			'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=240&q=80',
	},
	{
		name: 'two piece dress',
		title: 'Two Piece Dress',
		image:
			'https://images.unsplash.com/photo-1606168054091-74617220d1db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=240&q=80',
	},
	{
		name: 'shorts & trousers',
		title: 'Shorts & Trousers',
		image:
			'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=240&q=80',
	},
];
