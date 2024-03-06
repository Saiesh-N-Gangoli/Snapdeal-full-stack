import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from "../Navigation/Navigation";
import Carousels from "../../Carousel/Carousels";
import Location from "../Location/Location";

import "./sidebar.css";

function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viewcategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="Overflowing">
      <Navigation />
      <div className="Main-Side">
        <div className="SideBar">
          <div className="NavFlex">
            <center>
              <h6>
                <div className='d-flex justify-content-center top'><strong><center>Top Categories</center></strong></div>
              </h6>
            </center>
            <div className="itemlist">
              <div className="top-categ">
              {categories.map((category) => (
                <Link key={category.category_id} to={`/procategory/${category.category_id}`} className="LinkMe">
                  <li style={{"marginBottom" : "17px", "fontWeight": "300"}}>
                    {category.category_name}
                  </li>
                </Link>
              ))}
              </div>
              <hr className="horizontalline" />
              <div className="QrScanner">
                <img src={"https://i2.sdlcdn.com/img/snapdeal/barCode_Home1x.png"} alt="" className="QRImg" />
                <div className="QRDetails">
                  <h5><center>Convenient Order Tracking</center></h5>
                  <h6><center>Scan to download app</center></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Carousels />
        <Location />
      </div>
    </div>
  );
}

export default Sidebar;
