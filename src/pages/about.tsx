import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const staffMembers = [
	{
		name: 'Maissa Mathlouthi',
		role: 'Lead Developer',
		description: 'Youssef built the Green Coffee website, ensuring a seamless user experience with Next.js and Tailwind CSS.',
		image: './staff/staff1.jpg', // Placeholder image path
	  },
	  {
		name: 'Wijden el hsseyni',
		role: 'UI/UX Designer',
		description: 'Fatma designed the intuitive and modern interface, making online ordering a delight.',
		image: './staff/staff2.jpg', // Placeholder image path
	  },
	  {
		name: 'Zahra Ben Achour',
		role: 'Customer Support Lead',
		description: 'Nour ensures all user inquiries are handled promptly, keeping our community happy.',
		image: './staff/staff3.jpg', // Placeholder image path
	  },
  ];

  return (
    <div className="pt-50 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-3xl font-bold text-center mb-10 ${isMounted ? 'animate-fade' : ''}`}>
          About Our Website
        </h1>

        {/* Website Purpose Section */}
        <section className={`bg-white p-6 rounded-xl shadow-lg mb-10 ${isMounted ? 'animate-scaleUp' : ''} transition-opacity duration-500`}>
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <p className="text-gray-700">
            Green Coffee is an online platform launched in 2024 to simplify ordering coffee, desserts, and snacks in Tunisia. Our website connects customers with a curated menu of high-quality products, offering a refreshing Espresso Ice Coffee for just 32.00 TND or a delicious Tiramisu for 80.00 TND. With features like drive-thru, in-store pickup, and courier delivery, we make it easy to enjoy your favorites anytime, anywhere.
          </p>
        </section>

        {/* Website Story Section */}
        <section className={`bg-white p-6 rounded-xl shadow-lg mb-10 ${isMounted ? 'animate-scaleUp' : ''} transition-opacity duration-500 delay-100`}>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            The Green Coffee website was launched in early 2024 by a small team passionate about technology and great food. Built using Next.js for fast performance and Tailwind CSS for a sleek design, our platform aims to bring convenience to coffee lovers across Tunisia. Since our launch, weve served thousands of users, offering a seamless experience from browsing to checkout, with plans to expand our features in the future.
          </p>
        </section>

        {/* Staff Section */}
        <section className={`bg-white p-6 rounded-xl shadow-lg mb-10 ${isMounted ? 'animate-scaleUp' : ''} transition-opacity duration-500 delay-200`}>
          <h2 className="text-2xl font-semibold mb-4">Meet Our Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staffMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full relative">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-500 mt-1">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className={`bg-white p-6 rounded-xl shadow-lg mb-10 ${isMounted ? 'animate-scaleUp' : ''} transition-opacity duration-500 delay-300`}>
          <h2 className="text-2xl font-semibold mb-4">Website Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Easy online ordering with size and service options.</li>
            <li>Secure checkout and order tracking via your profile.</li>
            <li>Responsive design for seamless use on mobile and desktop.</li>
            <li>Fast performance with Next.js server-side rendering.</li>
            <li>Modern animations for an engaging user experience.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Link href="/product" className="inline-block px-6 py-3 bg-amber-900 text-white rounded hover:bg-green-700 hover:animate-bounce">
            Start Ordering Now
          </Link>
        </div>
      </div>
    </div>
  );
}