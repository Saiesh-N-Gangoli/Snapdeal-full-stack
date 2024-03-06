import React from 'react';
import add_pro from "../Images/g.png";
import cate from "../Images/categ.png";
import './AddProduct.css'
import AdminNav from './AdminNav';

const AdminDashboard = () => {
  return (
    <div>
    <AdminNav/>
      <div className="container-fluid-k">
        <div className="row">
          <div className="col-sm-3 pt-3">
            <div className="card card-g" style={{ backgroundColor: 'white' }}>
              <div className="card-body flex-card">
              <img src={cate} alt="" className='img-in' style={{
    "width": "145px",
    "height": "144px"}}/>
                <h4 className="card-title">Categories</h4>
                <a href="/admin/categories/view" className="card-link btn btn-primary w-100">View</a>
                <a href="/admin/categories/view" className="card-link btn btn-primary w-100 mt-2">Add</a>
              </div>
            </div>
          </div>
          <div className="col-sm-3 pt-3">
            <div className="card card-g card-left" style={{ backgroundColor: 'white' }}>
              <div className="card-body flex-card">
              <img src={add_pro} alt="" className='img-in'/>
                <h4 className="card-title">Products</h4>
                <a href="/admin/products/view" className="card-link btn btn-primary w-100">View</a>
                <a href="/admin/products" className="card-link btn btn-primary w-100 mt-2">Add</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
