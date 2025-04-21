import Image from 'next/image';
import { useEffect, useRef } from 'react';

const products = [
	{
		title: "Peace Lily",
		price: "$36.00",
		category: "Indoor",
		image: "/Cups/Dark.png",
	},
	{
		title: "Monstera",
		price: "$45.00",
		category: "Outdoor",
		image: "/Cups/Dark.png",
	},
	{
		title: "Oak Tree",
		price: "$68.50",
		category: "Outdoor",
		image: "/Cups/Express.png",
	},
	{
		title: "Cactus",
		price: "$25.00",
		category: "Indoor",
		image: "/Cups/Latte.png",
	},
	{
		title: "Monstera",
		price: "$45.00",
		category: "Outdoor",
		image: "/Cups/Dark.png",
	},
	{
		title: "Oak Tree",
		price: "$68.50",
		category: "Outdoor",
		image: "/Cups/Express.png",
	},
	{
		title: "Cactus",
		price: "$25.00",
		category: "Indoor",
		image: "/Cups/Latte.png",
	},
	{
		title: "Monstera",
		price: "$45.00",
		category: "Outdoor",
		image: "/Cups/Dark.png",
	},
	{
		title: "Oak Tree",
		price: "$68.50",
		category: "Outdoor",
		image: "/Cups/Express.png",
	},
	{
		title: "Cactus",
		price: "$25.00",
		category: "Indoor",
		image: "/Cups/Latte.png",
	},
];

export const Carousel: React.FC = () => {
	const carouselRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			if (carouselRef.current) {
				const carousel = carouselRef.current;
				carousel.scrollBy({ left: 300, behavior: 'smooth' });

				if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
					carousel.scrollTo({ left: 0, behavior: 'smooth' });
				}
			}
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
		}
	};

	return (
		<div className="container justify-center items-center py-5">
			{/* Section Title */}
			<div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
				<p className="fs-5 fw-medium fst-italic text-primary">Our Products</p>
				<h1 className="display-6">Coffee has a complex positive effect on the body</h1>
			</div>

			{/* Product Carousel */}
			<div className="owl-carousel product-carousel wow fadeInUp" data-wow-delay="0.5s">
				<div className="owl-stage-outer mx-auto" style={{ maxWidth: '1200px' }}>
					<div
						ref={carouselRef}
						className="owl-stage flex overflow-x-auto space-x-4 mx-5"
						style={{ marginLeft: 'auto', marginRight: 'auto' }}
					>
						{products.map((product, index) => (
							<div key={index} className="owl-item flex-shrink-0  sm:1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 ">
								<a href="#" className="d-block product-item rounded">
									<Image
										src={product.image}
										alt={product.title}
										width={100}
										height={100}
										className="w-full h-48 object-scale-down rounded-t"
									/>
									<div className="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4 rounded-b">
										<h4 className="text-primary">{product.title}</h4>
										<span className="text-body">{product.category}</span>
										<div className="mt-2">
											<span className="text-xl</div> font-bold">{product.price}</span>
										</div>
									</div>
								</a>
							</div>
						))}
					</div>
				</div>
				{/* Navigation Buttons */}
				<div className="owl-nav flex justify-between mt-4">
					<button onClick={scrollLeft} className="owl-prev bg-gray-200 p-2 rounded-full">
						<i className="bi bi-chevron-left"></i>
					</button>
					<button onClick={scrollRight} className="owl-next bg-gray-200 p-2 rounded-full">
						<i className="bi bi-chevron-right"></i>
					</button>
				</div>
				   {/* Store Button */}
				   <div className="text-center p-4 my-4">
        <a href="/store" className="btn btn-primary bg-black p-4  rounded-4xl text-white">Go to Our Store</a>
      </div>
			</div>
		</div>
	);
};