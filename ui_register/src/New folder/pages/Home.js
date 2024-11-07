import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import Banner1 from '../images/banner1.jpg'; // Importing banner image
import "../styles/HomeStyles.css";

const Home = () => {
  return (
    <Layout>
      {/* Display the single banner */}
      <div className='home' style={{backgroundImage:`url(${Banner1})`}}>
        <div className='headerContainer'>
          <h1>Online Book Store</h1>
          <p>Best books in India</p>
          <Link to="/menu">
            <button>
              ORDER NOW
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
