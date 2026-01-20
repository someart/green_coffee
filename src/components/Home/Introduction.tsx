import Image from 'next/image'; // Import Image from Next.js

export function Introduction() {
  return (
    <div className="flex justify-center items-center bg-center">
      <section className="w-full max-w-5xl mx-auto rounded-4xl py-14 lg:py-20 px-5 lg:px-0">
        <div
          className="rounded-4xl px-5 py-5  my-1 mx-auto flex flex-col lg:flex-row gap-y-5 justify-center items-center"
          style={{
            backgroundImage: "url('/green_coffee/BG/Wood2.png')", // Replace with your image path
            backgroundSize: 'cover', // Ensure the image covers the entire section
            backgroundPosition: 'center', // Center the image
          }}
        >
          {/* Left Image */}
          <div className="flex-shrink-0">
            <Image
              src="/green_coffee/Logo/Logo.png" // Replace with your image path
              alt="Description of the image"
              width={200} // Set appropriate width
              height={200} // Set appropriate height
              className="rounded-lg" // Optional: add rounded corners
            />
          </div>
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center text-center lg:text-left">
            <p
              className="text-gray-800 text-[20px] font-normal leading-normal"
              style={{ fontFamily: 'Poppins' }}
            >
              At GREEN Coffee Shop, we take immense pride in crafting each cup
              of coffee with passion and precision. Our skilled baristas curate
              a diverse selection of specialty coffees sourced from the finest
              beans across the globe, ensuring every sip transports you to a
              world of unparalleled taste and bliss.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Introduction;
