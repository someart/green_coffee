import { useState } from 'react';
import { useRouter } from 'next/router';
import { products } from '@/data/products';
import Image from 'next/image';

interface CartItem {
  title: string;
  price: number;
  size: string;
  service: string;
  image: string;
  quantity: number;
}

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedService, setSelectedService] = useState('');

  if (!slug || typeof slug !== 'string') return null;

  const product = products[slug as keyof typeof products];
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedService) {
      alert('Please select size and service.');
      return;
    }

    const newItem: CartItem = {
      title: product.title,
      price: product.price,
      size: selectedSize,
      service: selectedService,
      image: product.image,
      quantity: 1,
    };

    try {
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = currentCart.findIndex(
        (item: CartItem) =>
          item.title === newItem.title &&
          item.size === newItem.size &&
          item.service === newItem.service
      );

      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantity += 1;
      } else {
        currentCart.push(newItem);
      }

      localStorage.setItem('cart', JSON.stringify(currentCart));
      alert('Added to cart!');
      router.push('/cart');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const handleCheckout = () => {
    router.push('/cart'); // Redirect to cart page
  };

  return (
    <div className="pt-20 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="w-full h-auto object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600">
            ⭐ {product.rating} ({product.reviews} Reviews) | {product.sold} Sold
          </p>
          <div className="my-4">
            <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
            <span className="line-through ml-2 text-gray-400">${product.oldPrice.toFixed(2)}</span>
            <span className="ml-2 text-red-500 font-semibold">{product.discount}% OFF</span>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-1">Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded text-sm ${
                    selectedSize === size ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-1">Service</h3>
            <div className="flex gap-2">
              {product.services.map((service: string) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`px-3 py-1 border rounded text-sm ${
                    selectedService === service ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={handleCheckout}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Descriptions</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <h3 className="font-medium mb-2">Product Details</h3>
        <ul className="list-disc list-inside text-gray-600">
          {product.details.map((detail: string, i: number) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}