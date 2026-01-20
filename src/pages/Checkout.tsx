import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define interfaces
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
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Completed' | 'Failed';
  timestamp: number;
  statusTimestamps: {
    pending?: number;
    completed?: number;
  };
}

interface User {
  id: string;
  orders: string[];
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  console.log('cartItemscartItemscartItems', cartItems);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Prevent SSR issues
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null;
    if (!currentUser?.id) {
      setError('Please log in to complete your payment.');
      router.push('/login');
      return;
    }

    // Load cart from localStorage
    try {
      const storedCart = localStorage.getItem('cart');
      const items = storedCart ? JSON.parse(storedCart) : [];
      if (!Array.isArray(items)) throw new Error('Invalid cart data');
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
      setError('Failed to load cart items.');
      setCartItems([]);
    }
  }, [router]);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (typeof window === 'undefined') return; // Prevent SSR issues
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null;
    if (!currentUser?.id) {
      setError('User not logged in. Please log in to proceed.');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        throw new Error('Please fill in all payment details.');
      }

      const order: Order = {
        id: `ORDER-${Date.now()}`,
        userId: currentUser.id,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'Completed',
        timestamp: Date.now(),
        statusTimestamps: { completed: Date.now() },
      };

      let orders: Order[] = [];
      const storedOrders = localStorage.getItem('orders');
      orders = storedOrders ? JSON.parse(storedOrders) : [];
      if (!Array.isArray(orders)) {
        throw new Error('Orders data is invalid');
      }
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      console.log('Order saved:', order);

      currentUser.orders = currentUser.orders || [];
      currentUser.orders.push(order.id);
      let users: User[] = [];
      const storedUsers = localStorage.getItem('users');
      users = storedUsers ? JSON.parse(storedUsers) : [];
      const userIndex = users.findIndex((u) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
      } else {
        users.push(currentUser);
      }
      localStorage.setItem('users', JSON.stringify(users));
      console.log('User updated:', currentUser);

      localStorage.setItem('cart', JSON.stringify([]));
      setCartItems([]);

      setTimeout(() => {
        setIsProcessing(false);
        router.push('/profile');
      }, 1000); // Delay for feedback
    } catch (err) {
      const error = err as Error;
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    router.push('/Cart');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Payment</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={handleBackToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Cart
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-2 border-b">
                <Image
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                <div>
                  <h3 className="font-medium">{item.title || 'Unavailable'}</h3>
                  <p className="text-sm text-gray-600">
                    Size: {item.size || 'N/A'} | Service: {item.service || 'N/A'}
                  </p>
                  <p className="text-green-600">TND{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="text-right font-semibold text-xl">
              Total: TND{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentChange}
              placeholder="Card Number (e.g., 1234 5678 9012 3456)"
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentChange}
                placeholder="Expiry Date (MM/YY)"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                placeholder="CVV"
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
            <button
              onClick={handleBackToCart}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-2"
            >
              Back to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}