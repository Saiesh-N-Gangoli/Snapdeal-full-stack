import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../SideBar/Sidebar';
import Footer from '../Footer/Footer';
import BelowFooter from '../Footer/BelowFooter';
import Featured from '../FeaturedProducts/Featured';
import { Spinner } from 'react-bootstrap';
import './Home.css'

export default function Home() {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setContentLoaded(true);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {contentLoaded ? (
        <>
          <Navigation />
          <div>
            <Sidebar />
          </div>
          <Featured />
          <Footer />
          <BelowFooter />
        </>
      ) : <div className='spinner-class'><Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></div>}
    </div>
  );
}
