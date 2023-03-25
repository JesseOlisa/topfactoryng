import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityDocumentStub } from '@sanity/client';

// SIZE ARRAY TYPE
export type sizeArrType = {
	size: number;
	isSelected: Boolean;
}[];

export type colorArrType = {
	name: string;
	code: string;
	isSelected: boolean;
}[];

// PRODUCT TYPE
export type productType = {
	_id: string;
	name: string;
	imageUrl: string;
	baseprice: number;
	colors: { name: string; colorCode: string }[];
};
export interface ProductProps {
	product: productType;
}

// CART TYPE
export type cartType = {
	_id: string;
	_key: string;
	name: string;
	imageUrl: string;
	size: number;
	price: number;
	color: { name: string; colorCode: string };
	quantity: any;
};

// FORM TYPE
export type contactType = {
	firstName: string;
	lastName: string;
	address: string;
	phoneNumber: number;
	email: string;
};

// SANITY ORDER DOCUMENT
export type orderDocType = {
	_type: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	orderId: string;
	items: cartType[];
	totalPrice: number;
};

// CONTEXT TYPES
export type ContextType = {
	showCart: Boolean;
	setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
	sizeArr: sizeArrType;
	setSizeArr: React.Dispatch<React.SetStateAction<sizeArrType>>;
	cartItems: cartType[];
	setCartItems: React.Dispatch<React.SetStateAction<cartType[]>>;
	addToCart: (product: cartType) => void;
	deleteFromCart: (product: cartType) => void;
	totalPrice: number;
	confirmOrder: (doc: SanityDocumentStub<orderDocType>) => void;
	orderId: string;
	reference: string;
	contact: contactType;
	setContact: React.Dispatch<React.SetStateAction<contactType>>;
};
