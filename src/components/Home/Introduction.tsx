import Image from 'next/image'; // Import Image from Next.js

export function Introduction() {
  return (
    <div className="flex justify-center items-center bg-amber-50 bg-center">
      <section
        className="w-full max-w-5xl mx-auto rounded-xl py-14 lg:py-20 px-5 lg:px-0"
        style={{
          backgroundImage: "url('/Logo/Logo.png')", // Replace with your image path
          backgroundSize: 'cover', // Ensure the image covers the entire section
          backgroundPosition: 'center', // Center the image
        }}
      >
        <div className="rounded-2xl p-5 py-14 bg-[#DEF6F5] dark:bg-gray-700 mx-auto flex flex-col lg:flex-row gap-y-5 justify-center items-center">
          {/* Left Image */}
          <div className="flex-shrink-0">
            <Image
              src="/Logo/Logo.png" // Replace with your image path
              alt="Description of the image"
              width={300} // Set appropriate width
              height={300} // Set appropriate height
              className="rounded-lg" // Optional: add rounded corners
            />
          </div>
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl lg:text-5xl max-w-xl lg:max-w-3xl mx-auto font-bold text-black dark:text-white">
              Discover endless learning opportunities.
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-800 dark:text-gray-300">
              Unlock your potential with our wide range of courses and resources.
            </p>
            <button className="bg-[#1EBFC1] dark:bg-[#0E6B6D] w-1/2 md:w-1/3 hover:shadow-lg border border-transparent hover:drop-shadow transition duration-200 lg:w-1/3 text-white font-semibold text-sm lg:text-base rounded px-4 py-2">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Introduction;