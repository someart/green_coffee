import { useState } from 'react';

interface SidebarFilterProps {
  selectedDrinks: string[];
  selectedFoods: string[];
  maxPrice: number;
  onDrinkChange: (drink: string) => void;
  onFoodChange: (food: string) => void;
  onPriceChange: (price: number) => void;
}

export function SidebarFilter({
  selectedDrinks,
  selectedFoods,
  maxPrice,
  onDrinkChange,
  onFoodChange,
  onPriceChange,
}: SidebarFilterProps) {
  const drinks = ['Ice Coffee', 'Coffee', 'Mocktail', 'Fruit', 'Tea'];
  const foods = ['Toast', 'Burger', 'Pizza', 'Bread', 'Potato'];

  const [showAllDrinks, setShowAllDrinks] = useState(false);
  const [showAllFoods, setShowAllFoods] = useState(false);

  const visibleDrinks = showAllDrinks ? drinks : drinks.slice(0, 3);
  const visibleFoods = showAllFoods ? foods : foods.slice(0, 3);

  return (
    <aside className="w-full lg:w-60 p-4 bg-white rounded-xl shadow">
      <h2 className="font-semibold mb-4">Filter</h2>

      <div className="mb-6">
        <label className="block text-sm mb-1 text-gray-700">Price</label>
        <input
          type="range"
          min="0"
          max="100"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-xs mt-1 text-gray-600">
          Max. ${maxPrice.toFixed(2)}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-2 text-gray-700">Drink</label>
        {visibleDrinks.map((drink) => (
          <div key={drink} className="mb-1">
            <input
              type="checkbox"
              id={drink}
              checked={selectedDrinks.includes(drink)}
              onChange={() => onDrinkChange(drink)}
              className="mr-2"
            />
            <label htmlFor={drink}>{drink}</label>
          </div>
        ))}
        <button
          onClick={() => setShowAllDrinks(!showAllDrinks)}
          className="text-amber-900 text-sm mt-2"
        >
          {showAllDrinks ? 'Show Less' : 'Show All'}
        </button>
      </div>

      <div>
        <label className="block text-sm mb-2 text-gray-700">Food</label>
        {visibleFoods.map((food) => (
          <div key={food} className="mb-1">
            <input
              type="checkbox"
              id={food}
              checked={selectedFoods.includes(food)}
              onChange={() => onFoodChange(food)}
              className="mr-2"
            />
            <label htmlFor={food}>{food}</label>
          </div>
        ))}
        <button
          onClick={() => setShowAllFoods(!showAllFoods)}
          className="text-amber-900 text-sm mt-2"
        >
          {showAllFoods ? 'Show Less' : 'Show All'}
        </button>
      </div>
    </aside>
  );
}
