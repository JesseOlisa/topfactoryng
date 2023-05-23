import React, {
	createContext,
	useContext,
	useState,
	PropsWithChildren,
} from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import {
	ContextType,
	sizeArrType,
	cartType,
	orderDocType,
	productType,
} from '@/interfaces';
import { sizeOptionsArr } from '@/lib/data';
import { AiOutlineShopping } from 'react-icons/ai';
import { client } from '@/lib/client';
import { contactType } from '@/interfaces';
import { contactObj } from '@/lib/data';
import { SanityDocumentStub } from '@sanity/client';

const Context = createContext<ContextType | null>(null);

export const StateContext = ({ children }: PropsWithChildren) => {
	const router = useRouter();

	const [showCart, setShowCart] = useState(false);
	const [showColorSelect, setShowColorSelect] = useState(true);
	const [cartItems, setCartItems] = useState<cartType[]>([]);
	const [sizeArr, setSizeArr] = useState<sizeArrType>(sizeOptionsArr);
	const [totalPrice, setTotalPrice] = useState(0);
	const [orderId, setOrderId] = useState<string>('');
	const [contact, setContact] = useState<contactType>(contactObj);

	// ADD TO CART FUNCTION
	const addToCart = (product: cartType) => {
		// checks if the product is already in cart
		const isProductInCart = cartItems.find((item) => item._id === product._id);

		if (!isProductInCart) {
			setCartItems([...cartItems, { ...product }]);
			setTotalPrice((prevPrice) => prevPrice + product.price);
			let successNotification = toast.success('Item Added to Cart', {
				style: {
					fontSize: '0.8rem',
				},
			});
			return successNotification;
		} else {
			let toastnotification = toast.success('Item already in Cart', {
				icon: <AiOutlineShopping fontSize={20} />,
				duration: 3000,
			});
			return toastnotification;
		}
	};

	// REMOVE FROM CART FUNCTION
	const deleteFromCart = (product: cartType) => {
		// updates the price after deleting from cart
		setTotalPrice((prevPrice) => prevPrice - product.price);
		// removes items from array
		const updatedCart = cartItems.filter((item) => item._id !== product._id);
		setCartItems(updatedCart);
	};

	const reference = new Date().getTime().toString();

	// BUY NOW
	const buyNow = (product: cartType) => {
		setCartItems([product]);
		setTotalPrice(product.price);
		router.push('/contact');
	};

	// CONFIRMS ORDER
	const confirmOrder = (doc: SanityDocumentStub<orderDocType>) => {
		client.create(doc).then((res) => {
			setCartItems([]);
			setOrderId(doc.orderId);
			setShowCart(false);
			setTotalPrice(0);
			router.push('/success');
		});
	};
	return (
		<Context.Provider
			value={{
				showCart,
				showColorSelect,
				setShowCart,
				sizeArr,
				setSizeArr,
				cartItems,
				setCartItems,
				addToCart,
				deleteFromCart,
				totalPrice,
				confirmOrder,
				orderId,
				reference,
				contact,
				setContact,
				buyNow,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context) as ContextType;
