import React from 'react'
import logo from "../Images/logo.png";
import './AddProduct.css'

const AdminNav = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light under-b">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" width="auto" height="40" className="d-inline-block align-top img-logo" />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
              <li className="nav-item active hovering">
                <a className="nav-link text-dark" href="/admin">admin-home</a>
              </li>
              <li className="nav-item active hovering">
                <a className="nav-link text-dark" href="/admin/products/view">products</a>
              </li>
              <li className="nav-item active hovering">
                <a className="nav-link text-dark" href="/admin/categories/view">category</a>
              </li>
              <li className="nav-item active hovering">
                <a className="nav-link text-dark" href="/">logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNav
