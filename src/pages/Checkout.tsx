import { useState, useEffect } from 'react'; // Added useEffect to the import
import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';

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

export default function CheckoutPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('+82');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  // Load the last order from localStorage
  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const lastOrder = orders[orders.length - 1];
      if (lastOrder) {
        setCartItems(lastOrder.items); // Display items from the last order
      } else {
        router.push('/cart'); // Redirect if no order found
      }
    } catch (error) {
      console.error('Error loading order from localStorage:', error);
      router.push('/cart');
    }
  }, [router]);

  const validateForm = () => {
    let isValid = true;

    // Phone validation: Must start with +82 and be followed by digits (e.g., +82-010-1234-5678)
    const phoneRegex = /^\+82-\d{3}-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid phone number (e.g., +82-010-1234-5678)');
      isValid = false;
    } else {
      setPhoneError(null);
    }

    // Address validation: Must not be empty
    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Update the last order with additional details (phone, address, paymentMethod)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const lastOrder = orders[orders.length - 1];
    if (lastOrder) {
      lastOrder.phone = phone;
      lastOrder.address = address;
      lastOrder.paymentMethod = paymentMethod;
      localStorage.setItem('orders', JSON.stringify(orders));
    }

    try {
     
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lastOrder),
      });
      if (!response.ok) throw new Error('Failed to save order');
      

      // Clear cart (already cleared in CartPage, but ensure consistency)
      setCartItems([]);
      localStorage.setItem('cart', JSON.stringify([]));

      alert(`Order placed successfully with ${paymentMethod === 'cash' ? 'cash' : 'card'} payment!`);
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 font-sans min-h-screen p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:underline">Home</a>
        <span className="mx-2">/</span>
        <a href="/product/espresso-ice-coffee" className="hover:underline">Product</a>
        <span className="mx-2">/</span>
        <a href="/product/espresso-ice-coffee" className="hover:underline">Espresso Ice Coffee</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout Details</h1>
      <p className="text-sm text-gray-500 mb-4">Enter your personal details to complete your purchase.</p>
      <p className="text-sm text-gray-400 mb-6">Free delivery and free returns.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">General</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`mt-1 p-2 w-full border rounded ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="+82-010-1234-5678"
              />
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`mt-1 p-2 w-full border rounded ${addressError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="270 Everton, Liverpool, South England, 19802"
              />
              {addressError && <p className="text-red-500 text-xs mt-1">{addressError}</p>}
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
            >
              Confirm Order
            </button>
          </form>
        </div>

        {/* Payment and Item Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment Methods</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Payment Option</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 p-2 w-full border rounded border-gray-300"
            >
              <option value="cash">Pay with Cash</option>
              <option value="card">Pay with Card (9900-0000-0000-2023 / 24)</option>
            </select>
            {paymentMethod === 'card' && (
              <p className="text-xs text-gray-500 mt-2">Note: Card payments require integration with a payment gateway like Stripe.</p>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">No items in cart.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.service} | Size: {item.size} | Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <a href="/cart" className="text-sm text-blue-600 hover:underline">Edit Cart</a>
                <p className="text-lg font-semibold text-gray-800">Total: ${total.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}