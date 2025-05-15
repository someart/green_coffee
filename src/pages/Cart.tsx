import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CartItem, Order } from '../components/Admin/types';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order: Order = {
      id: `ORDER-${Date.now()}`,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Pending',
      timestamp: Date.now(),
      statusTimestamps: {
        pending: Date.now(),
      },
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));

    router.push('/checkout');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-600 hover:underline">Go shopping!</Link></p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={`${item.title}-${item.size}-${item.service}`} className="flex justify-between items-center border-b py-2">
              <div>
                <h2 className="text-lg">{item.title}</h2>
                <p className="text-sm text-gray-600">Size: {item.size}, Service: {item.service}, Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}