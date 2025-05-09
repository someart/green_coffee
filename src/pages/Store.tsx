import { useState, useMemo } from 'react';
import { SidebarFilter, ProductCard } from '../components';
import { products } from '@/data/products'; // Import from data file

export default function Store() {
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);

  // Transform products object into an array compatible with ProductCard
  const productArray = useMemo(() => {
    return Object.values(products).map((product) => ({
      title: product.title,
      price: product.price.toFixed(2), // Match ProductCard's string price
      rating: product.rating,
      sold: product.sold,
      image: product.image,
    }));
  }, [products]);

  const handleDrinkFilter = (drink: string) => {
    setSelectedDrinks((prev) =>
      prev.includes(drink) ? prev.filter((d) => d !== drink) : [...prev, drink]
    );
  };

  const handleFoodFilter = (food: string) => {
    setSelectedFoods((prev) =>
      prev.includes(food) ? prev.filter((f) => f !== food) : [...prev, food]
    );
  };

  // Optimize filtering with useMemo
  const filteredProducts = useMemo(() => {
    return productArray.filter((product) => {
      const matchesPrice = parseFloat(product.price) <= maxPrice;
      const matchesDrink =
        selectedDrinks.length === 0 ||
        selectedDrinks.some((d) => product.title.includes(d));
      const matchesFood =
        selectedFoods.length === 0 ||
        selectedFoods.some((f) => product.title.includes(f));
      return matchesPrice && (matchesDrink || matchesFood);
    });
  }, [maxPrice, selectedDrinks, selectedFoods, productArray]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <nav className="text-sm text-gray-600 mb-4">
        Home <span className="mx-2">›</span> <strong>Product</strong>
      </nav>
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
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No products match your filters.
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductCard key={`${product.title}-${index}`} {...product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
