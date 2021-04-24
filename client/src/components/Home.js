import React from 'react';

import Card from './Card';

import 'assets/css/home.css';

import { thinkTogether } from 'assets/images';
import { products } from 'constants/products';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="img-container">
        <img src={thinkTogether} alt="thinkTogether" />
      </div>
      <div>
        <h1 className="title">Bring clarity to your team</h1>
        <h2 className="subtitle">solve problem together...</h2>
        <span className="subtitle">One tool for your whole team.</span>
        <ul className="hashtags">
          <li>#team-work</li>
          <li>#think-together</li>
          <li>#peer-programming</li>
          <li>#learning</li>
        </ul>
      </div>
      <div className="main">
        {products.map((product) => {
          return <Card product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
