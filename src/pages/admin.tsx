import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { AdminLogin, ProductTable, OrderTable, ProductModal } from '../components';
import { Product, Products, Order } from '../components/Admin/types'; // Adjusted import path

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productData, setProductData] = useState<Products>(products);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    oldPrice: 0,
    discount: 0,
    rating: 0,
    reviews: 0,
    sold: 0,
    sizes: '',
    services: '',
    image: '',
    description: '',
    details: '',
    category: '',
  });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleAddOrEditProduct = () => {
    if (!formData.title || !formData.price || !formData.category) {
      alert('Please fill in required fields: Title, Price, and Category.');
      return;
    }

    const slug = formData.title.toLowerCase().replace(/\s+/g, '-') + (editingSlug ? `-${editingSlug.split('-').pop()}` : '');
    const updatedProduct: Product = {
      title: formData.title,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      discount: Number(formData.discount),
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      sold: Number(formData.sold),
      sizes: formData.sizes.split(',').map((s) => s.trim()),
      services: formData.services.split(',').map((s) => s.trim()),
      image: formData.image || '/Cups/Default.png',
      description: formData.description,
      details: formData.details.split(',').map((d) => d.trim()),
      category: formData.category,
    };

    setProductData((prev: Products) => { // Explicitly typed prev
      const newData = { ...prev };
      if (editingSlug) {
        delete newData[editingSlug];
      }
      newData[slug] = updatedProduct;
      return newData;
    });

    setIsProductModalOpen(false);
    setEditingSlug(null);
    setFormData({
      title: '',
      price: 0,
      oldPrice: 0,
      discount: 0,
      rating: 0,
      reviews: 0,
      sold: 0,
      sizes: '',
      services: '',
      image: '',
      description: '',
      details: '',
      category: '',
    });
  };

  const handleEdit = (slug: string) => {
    const product = productData[slug];
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        rating: product.rating,
        reviews: product.reviews,
        sold: product.sold,
        sizes: product.sizes.join(', '),
        services: product.services.join(', '),
        image: product.image,
        description: product.description,
        details: product.details.join(', '),
        category: product.category,
      });
      setEditingSlug(slug);
      setIsProductModalOpen(true);
    }
  };

  const handleDelete = (slug: string) => {
    if (confirm(`Are you sure you want to delete ${productData[slug]?.title}?`)) {
      setProductData((prev: Products) => { // Explicitly typed prev
        const newData = { ...prev };
        delete newData[slug];
        return newData;
      });
    }
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev: Order[]) => // Explicitly typed prev
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'Accepted' } : order
      )
    );
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders((prev: Order[]) => // Explicitly typed prev
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'Rejected' } : order
      )
    );
  };

  const handleUpdateStatus = (orderId: string, newStatus: 'Delivered' | 'Received') => {
    setOrders((prev: Order[]) => // Explicitly typed prev
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 pt-20">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      {!isAuthenticated ? (
        <AdminLogin onLogin={setIsAuthenticated} />
      ) : (
        <>
          <ProductTable
            products={productData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddProduct={() => setIsProductModalOpen(true)}
          />
          <OrderTable
            orders={orders}
            onAcceptOrder={handleAcceptOrder}
            onRejectOrder={handleRejectOrder}
            onUpdateStatus={handleUpdateStatus}
          />
          <ProductModal
            isOpen={isProductModalOpen}
            onClose={() => {
              setIsProductModalOpen(false);
              setEditingSlug(null);
              setFormData({
                title: '',
                price: 0,
                oldPrice: 0,
                discount: 0,
                rating: 0,
                reviews: 0,
                sold: 0,
                sizes: '',
                services: '',
                image: '',
                description: '',
                details: '',
                category: '',
              });
            }}
            onSave={handleAddOrEditProduct}
            editingSlug={editingSlug}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      )}
    </div>
  );
}