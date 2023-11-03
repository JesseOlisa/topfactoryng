import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
  useMemo,
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
import secureLocalStorage from 'react-secure-storage';

const Context = createContext<ContextType | null>(null);

export const StateContext = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<cartType[]>([]);
  const [sizeArr, setSizeArr] = useState<sizeArrType>(sizeOptionsArr);
  const [orderId, setOrderId] = useState<string>('');
  const [contact, setContact] = useState<contactType>(contactObj);
  const [isLoading, setIsLoading] = useState(false);

  // ADD TO CART FUNCTION
  const addToCart = (product: cartType) => {
    // checks if the product is already in cart
    const isProductInCart = cartItems.find((item) => item._id === product._id);
    // console.log(isProductInCart);

    if (!isProductInCart) {
      setCartItems([...cartItems, { ...product }]);
      let successNotification = toast.success('Item Added to Cart', {
        style: {
          fontSize: '0.8rem',
        },
      });
      //   console.log(cartItems);
      return successNotification;
    } else if (
      isProductInCart &&
      (isProductInCart.color !== product.color ||
        isProductInCart.quantity !== product.quantity ||
        isProductInCart.size !== product.size)
    ) {
      const updatedItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return { ...product };
        }
        return item;
      });
      setCartItems(updatedItems);
      toast.success('Item updated in cart', { style: { fontSize: '0.8rem' } });
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
    // removes items from array
    const updatedCart = cartItems.filter((item) => item._id !== product._id);
    setCartItems(updatedCart);
    //This will delete the localstorage when you delete the last item in the cart
    if (cartItems.length === 1) {
      secureLocalStorage.removeItem('cartList');
      secureLocalStorage.removeItem('totalPrice');
    }
  };

  //calculate price
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  //CLEAR CART FUNCTION
  const clearCart = () => {
    secureLocalStorage.clear();
    setCartItems([]);
  };

  const reference = new Date().getTime().toString();

  // BUY NOW
  const buyNow = (product: cartType) => {
    setCartItems([product]);
    router.push('/contact');
  };

  // CONFIRMS ORDER
  const confirmOrder = async (doc: SanityDocumentStub<orderDocType>) => {
    setIsLoading(true);
    await client
      .create(doc)
      .then((res) => {
        setOrderId(doc.orderId);
        setCartItems([]);
        setShowCart(false);
        secureLocalStorage.clear();
        router.push('/success');
      })
      .finally(() => setIsLoading(false));
  };
  // //prevent scrolling
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  // }, [showCart]);

  useEffect(() => {
    const storedCartItems = secureLocalStorage.getItem('cartList') as string;
    if (storedCartItems !== null) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length !== 0) {
      secureLocalStorage.setItem('cartList', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <Context.Provider
      value={{
        showCart,
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
        isLoading,
        clearCart,
        // totalPriceNew,
        // hideScrollbar,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context) as ContextType;
