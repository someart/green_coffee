import Link from 'next/link';
import Image from 'next/image'; 

export function Header() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full pb-20"> {/* Adjust bottom padding here */}
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/Logo/Header.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 text-white text-center p-10">
        <h2 className="text-4xl font-bold font-miniver text-secondary-color">Best Coffee</h2>
        <h3 className="mt-2 text-2xl font-semibold">Make your day great with our special coffee!</h3>
        <p className="mt-4 max-w-md mx-auto">Welcome to our coffee paradise, where every bean tells a story and every cup sparks joy.</p>
        <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
		<a href="#contact" className=" bg-white text-amber-950 text-3xl px-6 py-2 rounded-full hover:bg-transparent hover:text-primary-color">Contact Us</a>
		</div>
      </div>
    </section>
  );
}