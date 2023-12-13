'use client';
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';
import { AiOutlineShopping } from 'react-icons/ai';
import { ContextType, cartProduct, orderDocType } from '@/lib/definitions';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/sanity.client';
import { SanityDocumentStub } from '@sanity/client';

const Context = createContext<ContextType | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { push, replace } = useRouter();
  const [cartItems, setCartItems] = useState<cartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (product: cartProduct) => {
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
      toast.success('Item updated in cart');
    } else {
      let toastnotification = toast.success('Item already in Cart', {
        icon: <AiOutlineShopping fontSize={20} />,
        duration: 3000,
      });
      return toastnotification;
    }
  };

  // REMOVE FROM CART FUNCTION
  const deleteFromCart = (product: cartProduct) => {
    // removes items from array
    const updatedCart = cartItems.filter((item) => item._id !== product._id);
    setCartItems(updatedCart);
    //This will delete the localstorage when you delete the last item in the cart
    if (cartItems.length === 1) {
      secureLocalStorage.removeItem('cartList');
    }
  };

  //CLEAR CART FUNCTION
  const clearCart = (hideToast = false) => {
    secureLocalStorage.clear();
    setCartItems([]);
    if (!hideToast) {
      toast.success('Cart items cleared');
    }
  };

  //calculate price
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  // BUY NOW
  const buyNow = (product: cartProduct) => {
    setCartItems([product]);
    push('/checkout');
  };

  const reference = new Date().getTime().toString();

  // CONFIRMS ORDER
  const confirmOrder = async (doc: SanityDocumentStub<orderDocType>) => {
    setIsLoading(true);
    try {
      const response = await client.create(doc);
      if (response) {
        toast.success('Order Processed.');
        replace(`/orders/${response.orderId}`);
        clearCart(true);

        // router.replace('/');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to process order');
    } finally {
      setIsLoading(false);
    }
  };

  //SIDE EFFECTS FOR STORING AND GETTING ITEMS FROM CART
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
        cartItems,
        setCartItems,
        addToCart,
        deleteFromCart,
        totalPrice,
        clearCart,
        buyNow,
        reference,
        confirmOrder,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStoreContext = () => useContext(Context) as ContextType;
