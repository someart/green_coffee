import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

interface CartItem {
  title: string;
  price: number;
  size: string;
  service: string;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending';
  timestamp: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      console.log('Stored cart:', storedCart); // Debug
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
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

    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Pending',
      timestamp: Date.now(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    localStorage.removeItem('cart'); // Clear cart
    setCartItems([]); // Clear local state
    router.push('/checkout'); // Redirect to checkout page
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

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <FaShoppingCart className="text-gray-300 text-5xl mb-4 mx-auto" />
          <p className="text-xl text-gray-500">Your cart is empty</p>
          <a
            href="/product/espresso-ice-coffee"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  Size: <strong>{item.size}</strong> | Service:{' '}
                  <strong>{item.service}</strong>
                </p>
                <p className="text-green-600 font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
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
            Total: $
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
			onClick={() => {
			  handleCheckout();
			  router.push('/checkout');
			}}
			className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
		  >
			Checkout
		  </button>
        </div>
      )}
    </div>
  );
}