import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

interface CartItem {
  title: string;
  price: number;
  size: string;
  service: string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      console.log('Raw stored cart:', storedCart);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        console.log('Parsed cart:', parsedCart);
        const validCartItems = Array.isArray(parsedCart)
          ? parsedCart.filter((item): item is CartItem => 
              item && 
              typeof item.title === 'string' && 
              typeof item.price === 'number' && 
              typeof item.size === 'string' && 
              typeof item.service === 'string' && 
              typeof item.image === 'string' && 
              typeof item.quantity === 'number' && 
              item.quantity > 0 && 
              item.price >= 0
            )
          : [];
        console.log('Validated cart items:', validCartItems);
        if (validCartItems.length === 0 && parsedCart.length > 0) {
          console.warn('Invalid cart data detected, resetting cart');
          localStorage.setItem('cart', JSON.stringify([]));
        }
        setCartItems(validCartItems);
      } else {
        console.log('No cart data found in localStorage');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setError('Failed to load cart. Resetting to empty.');
      setCartItems([]);
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log('Saving cart to localStorage:', cartItems);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      setError('Failed to save cart. Please try again.');
    }
  }, [cartItems]);

  const incrementQuantity = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
  };

  const decrementQuantity = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
    }
  };

  const removeItem = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser?.id) {
      router.push('/login');
      return;
    }

    router.push('/Checkout');
  };

  const resetCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    setError(null);
    console.log('Cart reset manually');
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center">
          <FaShoppingCart className="mr-2" />
          <span>{cartItems.length}</span>
          <span className="hidden sm:inline ml-1">items</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
          {error} <button onClick={resetCart} className="ml-2 text-blue-600 underline">Reset Cart</button>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <FaShoppingCart className="text-gray-300 text-5xl mb-4 mx-auto" />
          <p className="text-xl text-gray-500">Your cart is empty</p>
          <Link
            href="/product/espresso-ice-coffee"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex gap-4"
            >
              <Image
                src={item.image || '/images/placeholder.jpg'}
                alt={item.title}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title || 'Unavailable'}</h2>
                <p className="text-sm text-gray-600">
                  Size: <strong>{item.size || 'N/A'}</strong> | Service:{' '}
                  <strong>{item.service || 'N/A'}</strong>
                </p>
                <p className="text-green-600 font-semibold text-lg">
                  TND{(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementQuantity(index)}
                    className="p-1 border rounded"
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(index)}
                    className="p-1 border rounded"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow p-4 text-right font-semibold text-xl">
            Total: TND
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
          <button
            onClick={() => setCartItems([])}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="mt-4 ml-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}