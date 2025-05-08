import Image from 'next/image'; // Import Image from Next.js

export function Party() {
  return (
    <div className="flex justify-center items-center bg-center">
      <section className="w-full max-w-5xl mx-auto rounded-4xl py-14 lg:py-20 px-5 lg:px-0">
        <div
          className="rounded-4xl px-5 py-5  my-1 mx-auto flex flex-col lg:flex-row gap-y-5 justify-center items-center"
          style={{
            backgroundImage: "url('/BG/Party.png')", // Replace with your image path
            backgroundSize: 'cover', // Ensure the image covers the entire section
            backgroundPosition: 'center', // Center the image
          }}
        >
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center text-left lg:text-left">
            <h1
              className="text-gray-800 text-[30px] font-normal text-left leading-normal"
              style={{ fontFamily: 'Poppins' }}
            >
              Request an order for your private party or event?{' '}
            </h1>
            <p
              className="text-gray-800 text-[20px] font-normal leading-normal"
              style={{ fontFamily: 'Poppins' }}
            >
              We are open to ordering party events such as weddings,
              celebrations, or other events{' '}
            </p>
          </div>
          {/* Store Button */}
          <div className="text-center p-4 my-4">
            <a
              href="/Store"
              className="btn btn-primary bg-black p-4  rounded-4xl text-white"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Party;
