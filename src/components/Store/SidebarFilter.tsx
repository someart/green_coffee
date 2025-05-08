export function SidebarFilter() {
  return (
    <aside className="w-full md:w-60 p-4 bg-white rounded-xl shadow">
      <h2 className="font-semibold mb-4">Filter</h2>
      <div className="mb-6">
        <label className="block text-sm mb-1 text-gray-700">Price</label>
        <input type="range" min="0" max="100" className="w-full" />
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-2 text-gray-700">Drink</label>
        {['Ice Coffee', 'Coffee', 'Mocktail', 'Tea'].map((drink) => (
          <div key={drink}>
            <input type="checkbox" id={drink} className="mr-2" />
            <label htmlFor={drink}>{drink}</label>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm mb-2 text-gray-700">Food</label>
        {['Toast', 'Burger', 'Bread', 'Potato'].map((food) => (
          <div key={food}>
            <input type="checkbox" id={food} className="mr-2" />
            <label htmlFor={food}>{food}</label>
          </div>
        ))}
      </div>
    </aside>
  );
}
