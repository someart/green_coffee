import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Order, CartItem } from '../components/Admin/types'; // Import CartItem type

export default function CheckoutPage() {
  const router = useRouter();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    // Simulate checkout completion
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]'); // Explicitly type cartItems
    if (cartItems.length > 0) {
      const order: Order = {
        id: `ORDER-${Date.now()}`,
        userId: currentUser.id,
        items: cartItems,
        total: cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0), // Add type annotations
        status: 'Pending',
        timestamp: Date.now(),
        statusTimestamps: {
          pending: Date.now(),
        },
      };
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      currentUser.orders.push(order.id);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
      users[userIndex] = currentUser;
      localStorage.setItem('users', JSON.stringify(users));

      localStorage.setItem('cart', JSON.stringify([]));
    }
    router.push('/profile');
  }, [router, currentUser]);

  return <div className="p-6">Processing checkout...</div>;
}