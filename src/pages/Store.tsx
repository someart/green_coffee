import { SidebarFilter, ProductCard } from '../components';
import { useState } from 'react';
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
	const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
	const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
	const [maxPrice, setMaxPrice] = useState(100);
  
	const handleDrinkFilter = (drink: string) => {
	  setSelectedDrinks(prev =>
		prev.includes(drink) ? prev.filter(d => d !== drink) : [...prev, drink]
	  );
	};
  
	const handleFoodFilter = (food: string) => {
	  setSelectedFoods(prev =>
		prev.includes(food) ? prev.filter(f => f !== food) : [...prev, food]
	  );
	};
  
	const filteredProducts = mockProducts.filter(product => {
	  const matchesPrice = parseFloat(product.price) <= maxPrice;
	  const matchesDrink = selectedDrinks.length === 0 || selectedDrinks.some(d => product.title.includes(d));
	  const matchesFood = selectedFoods.length === 0 || selectedFoods.some(f => product.title.includes(f));
	  return matchesPrice && (matchesDrink || matchesFood);
	});
  
	return (
	  <div className="min-h-screen bg-gray-100 p-6 pt-20">
		<div className="text-sm text-gray-600 mb-4">
		  Home <span className="mx-2">›</span> <strong>Product</strong>
		</div>
		<div className="flex flex-col lg:flex-row gap-6">
		  <SidebarFilter
			selectedDrinks={selectedDrinks}
			selectedFoods={selectedFoods}
			maxPrice={maxPrice}
			onDrinkChange={handleDrinkFilter}
			onFoodChange={handleFoodFilter}
			onPriceChange={setMaxPrice}
		  />
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
			{filteredProducts.map((product, index) => (
			  <ProductCard key={index} {...product} />
			))}
		  </div>
		</div>
	  </div>
	);
  }