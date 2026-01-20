import { useState } from 'react';

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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingSlug: string | null;
  formData: {
    title: string;
    price: number;
    oldPrice: number;
    discount: number;
    rating: number;
    reviews: number;
    sold: number;
    sizes: string;
    services: string;
    image: string;
    description: string;
    details: string;
    category: string;
  };
  setFormData: (data: any) => void;
}

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  editingSlug,
  formData,
  setFormData,
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          {editingSlug ? 'Edit Product' : 'Add Product'}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Old Price"
            value={formData.oldPrice}
            onChange={(e) =>
              setFormData({ ...formData, oldPrice: Number(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: Number(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: Number(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Reviews"
            value={formData.reviews}
            onChange={(e) =>
              setFormData({ ...formData, reviews: Number(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Sold"
            value={formData.sold}
            onChange={(e) =>
              setFormData({ ...formData, sold: Number(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Sizes (comma-separated)"
            value={formData.sizes}
            onChange={(e) =>
              setFormData({ ...formData, sizes: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Services (comma-separated)"
            value={formData.services}
            onChange={(e) =>
              setFormData({ ...formData, services: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Details (comma-separated)"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="p-2 border rounded"
          />
        </div>
        <div className="mt-6 flex gap-4">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editingSlug ? 'Update' : 'Add'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
