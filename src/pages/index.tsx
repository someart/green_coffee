import React from 'react';
import { Header, Introduction } from '../components'; 

const Home = () => (
  <div className="flex justify-between min-h-screen flex-col relative overflow-hidden">
    <Header />
    <Introduction />
  </div>
);

export default Home;