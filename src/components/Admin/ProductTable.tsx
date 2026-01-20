interface Product {
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
}

type Products = { [key: string]: Product };

interface ProductTableProps {
  products: Products;
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
  onAddProduct: () => void;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
  onAddProduct,
}: ProductTableProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
      <button
        onClick={onAddProduct}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add New Product
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(products).map(([slug, product]) => (
              <tr key={slug} className="border-t">
                <td className="p-3">{product.title}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => onEdit(slug)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(slug)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
