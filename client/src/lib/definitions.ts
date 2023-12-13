// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

import { SanityDocumentStub } from '@sanity/client';

// PRODUCT TYPE
export type productType = {
  _id: string;
  name: string;
  product_image: string;
  slug: string;
  baseprice: number;
  colors: string;
  category: string;
  _createdAt: string;
  blur_URL?: string;
};

export type navLinks = {
  title: string;
};

export type searchResult = {
  name: string;
  product_image: string;
  slug: string;
  baseprice: number;
};

// CART TYPE
export type cartProduct = {
  _id: string;
  _key: string;
  name: string;
  product_image: string;
  size: number;
  price: number;
  color: string | null;
  quantity: any;
};

export type orderDocType = {
  _type: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  orderId: string;
  items: cartProduct[];
  totalPrice: number;
};

// CONTEXT TYPES
export type ContextType = {
  // showCart: boolean;
  // setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  // // sizeArr: sizeArrType;
  // setSizeArr: React.Dispatch<React.SetStateAction<sizeArrType>>;
  cartItems: cartProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<cartProduct[]>>;
  addToCart: (product: cartProduct) => void;
  deleteFromCart: (product: cartProduct) => void;
  totalPrice: number;
  confirmOrder: (doc: SanityDocumentStub<orderDocType>) => void;
  // orderId: string;
  reference: string;
  // contact: contactType;
  // setContact: React.Dispatch<React.SetStateAction<contactType>>;
  buyNow: (product: cartProduct) => void;
  isLoading: boolean;
  clearCart: () => void;
  // totalPriceNew: number;
  //   hideScrollbar: 'overflow-y-hidden' | 'overflow-y-auto';
};
