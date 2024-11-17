import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';

const KannadaLearning = () => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const launchDate = new Date('2024-05-24'); // Set the launch date
    const currentDate = new Date();

    const differenceInTime = launchDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    setDaysLeft(differenceInDays >= 0 ? differenceInDays : 0);

    // Calculate time left in the day
    const hoursLeft = Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((differenceInTime % (1000 * 60)) / 1000);

    setTimeLeft(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);

    // Update countdown every second
    const interval = setInterval(() => {
      const newDifference = launchDate.getTime() - new Date().getTime();
      const newDaysLeft = Math.ceil(newDifference / (1000 * 60 * 60 * 24));

      setDaysLeft(newDaysLeft >= 0 ? newDaysLeft : 0);

      const newHoursLeft = Math.floor((newDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newMinutesLeft = Math.floor((newDifference % (1000 * 60 * 60)) / (1000 * 60));
      const newSecondsLeft = Math.floor((newDifference % (1000 * 60)) / 1000);

      setTimeLeft(`${newHoursLeft}h ${newMinutesLeft}m ${newSecondsLeft}s`);
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '200px' }}>
        <h1>ಕನ್ನಡ ಕಲಿ Page</h1>
        <p>This is a placeholder for the ಕನ್ನಡ ಕಲಿ page content.</p>
        <p>Please come back later to check for updates!</p>
        {daysLeft > 0 ? (
          <p>Estimated launch in {daysLeft} {daysLeft === 1 ? 'day' : 'days'} and {timeLeft} remaining.</p>
        ) : (
          <p>Launching today!</p>
        )}
      </div>
    </Layout>
  );
};

export default KannadaLearning;
