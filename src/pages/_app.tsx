import '../styles/globals.css';
import { Navbar, Footer, Chatbot } from '../components'; // Ensure these paths are correct
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Chatbot />
      <Footer />
    </>
  );
}

export default MyApp;
