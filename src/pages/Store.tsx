import { SidebarFilter, ProductCard } from '../components';

const mockProducts = [
  {
    title: 'Espresso Ice Coffee',
    price: '10.00',
    rating: 4.5,
    sold: 2068,
    image: '/Cups/Express.png',
  },
  {
    title: 'Cappuccino Ice Coffee',
    price: '12.50',
    rating: 4.3,
    sold: 1201,
    image: '/Cups/Dark.png',
  },
  {
    title: 'Espresso Ice Coffee',
    price: '10.00',
    rating: 4.5,
    sold: 2068,
    image: '/Cups/Express.png',
  },
  {
    title: 'Cappuccino Ice Coffee',
    price: '12.50',
    rating: 4.3,
    sold: 1201,
    image: '/Cups/Dark.png',
  },
  {
    title: 'Espresso Ice Coffee',
    price: '10.00',
    rating: 4.5,
    sold: 2068,
    image: '/Cups/Express.png',
  },
  {
    title: 'Cappuccino Ice Coffee',
    price: '12.50',
    rating: 4.3,
    sold: 1201,
    image: '/Cups/Dark.png',
  },
  {
    title: 'Espresso Ice Coffee',
    price: '10.00',
    rating: 4.5,
    sold: 2068,
    image: '/Cups/Express.png',
  },
  {
    title: 'Cappuccino Ice Coffee',
    price: '12.50',
    rating: 4.3,
    sold: 1201,
    image: '/Cups/Dark.png',
  },

  // ... add more
];

export default function Store() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <div className="text-sm text-gray-600 mb-4">
        Home <span className="mx-2">›</span> <strong>Product</strong>
      </div>
      <div className="flex gap-6">
        <SidebarFilter />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
          {mockProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
