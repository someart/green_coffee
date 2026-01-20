import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products'; // Adjust path as needed

// Define Product type
type Product = {
  title: string;
  rating: number;
  reviews: number;
  sold: number;
  price: number;
  oldPrice: number;
  discount: number;
  sizes: string[];
  services: string[];
  image: string;
  description: string;
  details: string[];
  category: string;
};

// Define products type with explicit index signature
type Products = Record<string, Product>;

// Explicitly type the imported products
const typedProducts: Products = products as Products;

export function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { sender: string; text: string; product?: Product; slug?: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show welcome message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'Bot',
          text: 'Hello, how can I assist you?',
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Close chatbot on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const lowerCaseInput = input.toLowerCase();
    let botMessages: {
      sender: string;
      text: string;
      product?: Product;
      slug?: string;
    }[] = [];

    // Handle specific keywords: "peanuts" and "chocolate"
    if (
      lowerCaseInput.includes('peanuts') ||
      lowerCaseInput.includes('chocolate')
    ) {
      const targetSlug = 'peanuts-milkshake';
      const product = typedProducts[targetSlug];
      if (product) {
        botMessages = [
          {
            sender: 'Bot',
            text: `Try our ${product.title}! A creamy milkshake with ${lowerCaseInput.includes('peanuts') ? 'rich peanut flavor' : 'delicious chocolate goodness'}.`,
            product,
            slug: targetSlug,
          },
        ];
      } else {
        botMessages = [
          {
            sender: 'Bot',
            text: `Sorry, I couldn't find the ${lowerCaseInput} milkshake. Try something else!`,
          },
        ];
      }
    } else {
      // Find products where any detail matches the input
      const matchingProducts = Object.entries(typedProducts).filter(
        ([, product]) =>
          product.details.some((detail) =>
            detail.toLowerCase().includes(lowerCaseInput)
          )
      );

      if (matchingProducts.length > 0) {
        // Suggest up to three matching products
        botMessages = matchingProducts.slice(0, 3).map(([slug, product]) => ({
          sender: 'Bot',
          text: `I recommend our ${product.title}! Contains: ${product.details.join(', ')}.`,
          product,
          slug,
        }));
      } else {
        // Fallback to default product
        const defaultSlug = 'espresso-ice-coffee';
        const defaultProduct = typedProducts[defaultSlug];
        botMessages = [
          {
            sender: 'Bot',
            text: `I couldn't find a match for "${input}". Try our ${defaultProduct.title} instead! Contains: ${defaultProduct.details.join(', ')}.`,
            product: defaultProduct,
            slug: defaultSlug,
          },
        ];
      }
    }

    setMessages([...messages, { sender: 'User', text: input }, ...botMessages]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={chatbotRef}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xl w-[440px] h-[634px] flex flex-col"
          >
            {/* Header */}
            <div className="flex flex-col space-y-1.5 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl tracking-tight text-gray-800">
                  Green Chatbot
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Your friendly coffee companion
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 pr-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className={`flex gap-3 my-4 text-sm ${
                    msg.sender === 'User' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'Bot' && (
                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div className="rounded-full bg-gray-100 border p-1">
                        <Image
                          src="/green_coffee/Logo/Logo.png"
                          alt="Green Cafe Logo"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                    </span>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender === 'User'
                        ? 'bg-amber-100 text-gray-800'
                        : 'bg-green-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                    {msg.product && msg.slug && (
                      <div className="mt-2 flex items-center gap-3">
                        <Image
                          src={msg.product.image}
                          alt={msg.product.title}
                          width={50}
                          height={50}
                          className="rounded object-cover"
                        />
                        <Link
                          href={`/product/${msg.slug}`}
                          className="text-amber-600 hover:text-amber-800 font-medium underline"
                        >
                          View {msg.product.title}
                        </Link>
                      </div>
                    )}
                  </div>
                  {msg.sender === 'User' && (
                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div className="rounded-full bg-gray-100 border p-1 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">U</span>
                      </div>
                    </span>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border border-amber-300 rounded-lg p-3 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                placeholder="Type an ingredient (e.g., Sugar, Ice, Peanuts, Chocolate)..."
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-amber-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-amber-800 transition"
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-amber-900 text-white rounded-full p-5 shadow-lg flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
