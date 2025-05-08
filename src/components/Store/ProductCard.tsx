import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: string;
  rating: number;
  sold: number;
  image: string;
}

export function ProductCard({
  title,
  price,
  rating,
  sold,
  image,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative w-full h-52">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="w-full h-48 object-scale-down rounded-t"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 font-medium">€{price}</p>
        <div className="text-xs text-gray-400">
          ⭐ {rating} | {sold} sold
        </div>
		
      </div>
    </div>
  );
}
