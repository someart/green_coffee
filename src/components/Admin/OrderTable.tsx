import { Order } from './types'; // Assuming a types file (see below)

interface OrderTableProps {
  orders: Order[];
  onAcceptOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onUpdateStatus: (
    orderId: string,
    newStatus: 'Delivered' | 'Received'
  ) => void;
}

export function OrderTable({
  orders,
  onAcceptOrder,
  onRejectOrder,
  onUpdateStatus,
}: OrderTableProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">
                  {order.items.map((item) => (
                    <div key={item.title}>
                      {item.title} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td className="p-3">${order.total.toFixed(2)}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3 flex gap-2">
                  {order.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => onAcceptOrder(order.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onRejectOrder(order.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {order.status === 'Accepted' && (
                    <button
                      onClick={() => onUpdateStatus(order.id, 'Delivered')}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Mark Delivered
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <button
                      onClick={() => onUpdateStatus(order.id, 'Received')}
                      className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Mark Received
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
