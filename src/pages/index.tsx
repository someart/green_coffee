import React from 'react';
import { Header, Introduction, Carousel, Party } from '../components';

const Home = () => (
  <div className="flex justify-between min-h-screen flex-col relative overflow-hidden" style={{ fontFamily: 'Poppins' }}>
    <Header />
    <Introduction />
    <Carousel />
    <Party />
  </div>
);

export default Home;
