import Link from 'next/link';
import Image from 'next/image'; // Import Image component from Next.js

export function Footer() {
  return (
    <footer className="w-full  bg-amber-950 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Logo/Logo.png`} // Path to your logo image
              alt="Brand Logo"
              className="h-40 w-auto" // Increased height for a bigger logo
              width={100} // Increased width for a bigger logo
              height={50} // Increased height for proportional adjustment
            />
            <p className="text-gray-400">Green@coffee.com</p>
            <p className="text-gray-400">(+216) 90-000-990</p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col text-lg text-center gap-4 lg:flex-row lg:gap-10">
            <Link href="/shop" className="text-white hover:text-white">
              Shop
            </Link>
            <Link href="/blog" className="text-white hover:text-white">
              Blog
            </Link>
            <Link href="/product" className="text-white hover:text-white">
              Product
            </Link>
            <Link href="/booking" className="text-white hover:text-white">
              Booking
            </Link>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="py-7 border-t border-white">
          <div className="flex items-center justify-center">
            <span className="text-gray-900">
              ©2025-{' '}
              <Link href="/" className="text-white text-bold">
                Green
              </Link>
              , All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
