// pages/cart.tsx
import { useState } from 'react';
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaEdit,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

interface CartItem {
  name: string;
  model: string;
  image?: string;
  hsCode: string;
  color: string;
  quantity: number;
  weight: number;
  deliveryMethod: string;
  perPieceRate: number;
  totalPrice: number;
  description: string;
  showDescription: boolean;
  isEditingDescription: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Example utility functions
  const incrementQuantity = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    updated[index].totalPrice =
      updated[index].quantity * updated[index].perPieceRate;
    setCartItems(updated);
  };

  const decrementQuantity = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updated[index].totalPrice =
        updated[index].quantity * updated[index].perPieceRate;
      setCartItems(updated);
    }
  };

  const getColorHex = (color: string) => {
    const map: Record<string, string> = {
      Black: '#000',
      Silver: '#C0C0C0',
      Blue: '#00f',
      Red: '#f00',
      White: '#fff',
    };
    return map[color] || '#000';
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

      {/* Empty Cart */}
      {cartItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <FaShoppingCart className="text-gray-300 text-5xl mb-4 mx-auto" />
          <p className="text-xl text-gray-500">Your cart is empty</p>
          <a
            href="#"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </a>
        </div>
      )}

      {/* Cart items rendering and logic continues... */}
    </div>
  );
}
