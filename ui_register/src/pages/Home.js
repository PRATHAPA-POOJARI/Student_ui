import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import Banner1 from '../images/banner1.webp';   // Importing banner image
import "../styles/HomeStyles.css";
import { Box } from '@mui/material';
const Home = () => {
  return (
    <Layout>
      {/* Display the single banner */}
      <div className='home' style={{backgroundImage:`url(${Banner1})`, height: '100vh', width: '100%'}}>
        <div className='headerContainer'>
        {/* <Box className='contentBox' style={{ backgroundColor: ' #f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center', maxWidth: '900px', margin: 'auto', marginTop: '600px', marginBottom: '100px' }}>
            <p style={{ color: '#333', fontFamily: 'Arial, sans-serif', fontSize: '18px', lineHeight: '1.6', margin: '0' }}>
              Kannada Sangha aims to propagate Karnataka culture, Kannada language, and art forms among Kannadigas and like-minded individuals. Our goal is to unite Kannadigas, nurture cultural pride, and support local talent through diverse cultural programs and charitable activities.
            </p>
          </Box> */}
          <Link to="/menu">
            {/* <button>
              ORDER NOW
            </button> */}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

// import React from 'react';
// import Layout from '../components/Layout/Layout';
// import { Link } from 'react-router-dom';
// import Banner1 from '../images/banner1.mp4'; // Importing banner video
// import "../styles/HomeStyles.css";
// import { Box } from '@mui/material';

// const Home = () => {
//   return (
//     <Layout>
//       {/* Display the video banner */}
//       <div className='home' style={{ height: '2000px', width: '100%' }}>
//         <video autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: '-1' }}>
//           <source src={Banner1} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className='headerContainer'>
//           {/* Optional content can go here */}
//           {/* <Box className='contentBox' style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center', maxWidth: '900px', margin: 'auto', marginTop: '600px', marginBottom: '100px' }}>
//             <p style={{ color: '#333', fontFamily: 'Arial, sans-serif', fontSize: '18px', lineHeight: '1.6', margin: '0' }}>
//               Kannada Sangha aims to propagate Karnataka culture, Kannada language, and art forms among Kannadigas and like-minded individuals. Our goal is to unite Kannadigas, nurture cultural pride, and support local talent through diverse cultural programs and charitable activities.
//             </p>
//           </Box> */}
//           <Link to="/menu">
//             {/* <button>
//               ORDER NOW
//             </button> */}
//           </Link>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Home;
