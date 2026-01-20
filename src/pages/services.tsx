import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define interfaces for TypeScript
interface Service {
  name: string;
  description: string;
  image: string;
}

interface ServiceCardProps {
  name: string;
  description: string;
  image: string;
  index?: number; // Optional prop for animation delay
}

const ServiceCard = ({ name, description, image, index }: ServiceCardProps) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center ${index !== undefined ? 'animate-scaleUp' : ''} transition-opacity duration-500 delay-${(index ?? 0) * 100} hover:bg-amber-300 transition-colors duration-300`}
  >
    <div className="w-40 h-50 mb-4 overflow-hidden rounded relative">
      <Image
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        fill
        sizes="160px"
      />
    </div>
    <h2 className="text-xl font-semibold mb-2 text-amber-800">{name}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services: Service[] = [
    {
      name: 'Coffee',
      description:
        'Savor our premium Arabica and Robusta blends, freshly brewed for a perfect cup every time.',
      image: './Services/coffee.jpg', // Placeholder image path
    },
    {
      name: 'Fresh Drinks',
      description:
        'Enjoy refreshing smoothies, iced teas, and cold-pressed juices made with natural ingredients.',
      image: './Services/drink.jpg', // Placeholder image path
    },
    {
      name: 'Healthy Food',
      description:
        'Indulge in nutritious salads, wraps, and bowls packed with fresh, wholesome ingredients.',
      image: './Services/healthyy.jpg', // Placeholder image path
    },
    {
      name: 'Breakfast',
      description:
        'Start your day with hearty options like croissants, oatmeal, and breakfast sandwiches.',
      image: './Services/breackfast.jpg', // Placeholder image path
    },
  ];

  const whyChooseUsBenefits = [
    {
      title: 'Fresh Ingredients',
      description:
        'We use only the finest, locally sourced ingredients for every dish.',
      icon: (
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      title: 'Customizable Options',
      description:
        'Tailor your order to your taste with our flexible menu choices.',
      icon: (
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      title: 'Daily Specials',
      description: 'Enjoy exclusive deals and new items featured daily.',
      icon: (
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const specialDeals = [
    {
      name: 'Coffee & Pastry Combo',
      description: 'Get a coffee and pastry for just 15.00 TND.',
      validUntil: 'June 14, 2025',
    },
    {
      name: 'Healthy Bowl Deal',
      description: 'Enjoy a healthy bowl for 20.00 TND (save 5 TND).',
      validUntil: 'June 13, 2025',
    },
  ];

  return (
    <div className="pt-45 p-6 bg-green-50  min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`text-3xl font-bold text-center mb-10 text-amber-800 ${isMounted ? 'animate-fade' : ''}`}
        >
          Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              name={service.name}
              description={service.description}
              image={service.image}
              index={index}
            />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <section
          className={`bg-white p-6 rounded-xl shadow-lg mt-10 mb-10 ${isMounted ? 'animate-scaleUp' : ''} transition-opacity duration-500 delay-500`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-amber-800">
            Why Choose Our Menu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUsBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-2">{benefit.icon}</div>
                <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Special Deals Section */}
        <section
          className={`bg-white p-6 rounded-xl shadow-lg mb-10 ${isMounted ? 'animate-scaleUp' : ''} transition-opacity duration-500 delay-600`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-amber-800">
            Special Deals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialDeals.map((deal) => (
              <div key={deal.name} className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-amber-800">
                  {deal.name}
                </h3>
                <p className="text-gray-600 mb-2">{deal.description}</p>
                <p className="text-sm text-gray-500">
                  Valid until: {deal.validUntil}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-10">
          <Link
            href="/product"
            className="inline-block px-6 py-3 bg-amber-900 text-white rounded hover:bg-green-700 hover:animate-bounce transition-colors duration-300"
          >
            Explore Our Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
