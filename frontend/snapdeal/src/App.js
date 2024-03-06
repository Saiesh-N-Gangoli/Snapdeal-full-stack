import './App.css';
import Navigation from './Components/Navigation/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import LoneProduct from './Components/SingleProduct/LoneProduct';
import AllProducts from './Components/ProductList.js/AllProducts';
import AdminDashboard from './Components/AdminProduct/AdminDashboard';
import AddCategoryForm from './Components/AdminProduct/AddCategoryForm';
import AddProductForm from './Components/AdminProduct/AddProductForm';
import ProductsTable from './Components/AdminProduct/ProductsTable';
import ProList from './Components/FeaturedProducts/ProList';
import ShoppingCart from './Components/FeaturedProducts/ShoppingCart';
import { useState } from 'react';
import ProductsByCategory from './Components/FeaturedProducts/ProductsByCategory';
import Checkout from './Components/Checkout/CheckoutPage';
import UserProfile from './Components/UserProfile/UserProfile';
import Location from './Components/Location/Location';
import ViewCategory from './Components/AdminProduct/ViewCategory';
import Payment from './Components/Payment/Payment';
import SuccessPage from './Components/Checkout/SuccessPage';
import Example from './Components/Login/Example';
import CheckoutDummy from './Components/Checkout/CheckoutDummy';

function App() {
  const [cartdetails, setCartDetails] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/nav' element={<Navigation cartdetails={cartdetails}/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/productlist' element={<ProList/>}/>
        <Route path="/singleproduct/:id" element={<LoneProduct/>} />
        <Route path='/allproducts' element={<AllProducts/>}/>
        <Route path='/successpage' element={<SuccessPage/>}/>
        <Route path='/example' element={<Example/>}/>

        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/admin/categories/add' element={<AddCategoryForm/>}/>
        <Route path='/admin/products' element={<AddProductForm/>}/>
        <Route path='/admin/products/view' element={<ProductsTable/>}/>
        <Route path='/admin/categories/view' element={<ViewCategory/>}/>



        <Route path='/cart' element={<ShoppingCart cartdetails={cartdetails} setCartDetails={setCartDetails} />}/>
        <Route path='/checkout' element={<Checkout cartdetails={cartdetails} setCartDetails={setCartDetails} />}/>
        <Route path='/payment' element={<Payment cartdetails={cartdetails} setCartDetails={setCartDetails} />}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/location' element={<Location/>}/>
        <Route path='/checkoutdummy' element={<CheckoutDummy/>}/>
        <Route path='/procategory/:category_id' element={<ProductsByCategory/>}/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
