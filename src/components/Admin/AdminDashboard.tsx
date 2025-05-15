import { useEffect, useState, useRef } from 'react';
import { Order, CartItem } from './types'; // Adjusted import path based on structure
import Chart from 'chart.js/auto'; // Static import for Chart.js

export function AdminDashboard() {
  const [productTotals, setProductTotals] = useState<{ [key: string]: number }>({});
  const [totalIncome, setTotalIncome] = useState(0);
  const productChartRef = useRef<HTMLCanvasElement>(null);
  const incomeChartRef = useRef<HTMLCanvasElement>(null);
  let productChartInstance: Chart | null = null;
  let incomeChartInstance: Chart | null = null;

  useEffect(() => {
    // Debug log to check orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('Orders from localStorage:', orders);
    const totals: { [key: string]: number } = {};
    let income = 0;

    orders.forEach((order: Order) => {
      order.items.forEach((item: CartItem) => {
        const productKey = `${item.title} (Size: ${item.size}, Service: ${item.service})`;
        totals[productKey] = (totals[productKey] || 0) + item.price * item.quantity;
      });
      income += order.total;
    });

    setProductTotals(totals);
    setTotalIncome(income);

    // Initialize charts
    if (productChartRef.current && !productChartInstance) {
      productChartInstance = new Chart(productChartRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(totals),
          datasets: [{
            label: 'Total Payment ($)',
            data: Object.values(totals),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    if (incomeChartRef.current && !incomeChartInstance) {
      incomeChartInstance = new Chart(incomeChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Total Income'],
          datasets: [{
            data: [income],
            backgroundColor: ['rgba(54, 162, 235, 0.6)']
          }]
        },
      options: {
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Total Income ($)'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
      });
    }

    // Cleanup charts on unmount
    return () => {
      if (productChartInstance) productChartInstance.destroy();
      if (incomeChartInstance) incomeChartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>

      {/* Bar Chart for Product Totals */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Total Payment per Product</h3>
        <canvas ref={productChartRef} id="productChart"></canvas>
      </div>

      {/* bar Chart for Total Income */}
      <div>
        <h3 className="text-lg font-medium mb-2">Total Income</h3>
        <canvas ref={incomeChartRef} id="incomeChart"></canvas>
      </div>
    </div>
  );
}