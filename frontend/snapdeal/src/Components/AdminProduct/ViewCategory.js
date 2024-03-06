import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import { Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer} from 'react-toastify';

const ViewCategory = () => {
    const [category_name, set_category_name] = useState('');
    const [category_id, set_category_id] = useState('');
    const [updateCat, setUpdateCat] = useState('');
    const [selectedcat, set_selected] = useState();
    console.log(set_category_id);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const validcategory = category_name.length>=1;

    const handleShow = (c) => {
        set_selected(c);
        setShow(true);
    }

    const handleDelete = async(category_id) => {
        try {
            console.log("category_id gotten: " + category_id)
            await axios.delete(`http://localhost:8080/deletecat/${category_id}`);
            toast.success("Category deleted successfully")
            const response = await axios.get('http://localhost:8080/viewcategory');
            setCategory(response.data);
        } catch (error) {
            toast.error("Category deletion failed")
        }
    }

    const handleUpdate = async(e) =>{
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/updatecat/${selectedcat}`,{
            category_name : updateCat,
        }); 
        toast.success("Category updated successfully");
        handleClose();
        const response = await axios.get('http://localhost:8080/viewcategory');
        setCategory(response.data);
    }
        catch (error) {
            toast.error("Category updation failed");
        }
    }

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:8080/createcat", {
          category_name: category_name,
          category_id: category_id
        });
        console.log(response)
        toast.success("Category added Successfully")
        set_category_name('');
        const r = await axios.get('http://localhost:8080/viewcategory');
        setCategory(r.data);
  
  
      } catch (error) {
        toast.error("Category addition failed");
        console.error(error);
      }
    };
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viewcategory');
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <>
    <AdminNav/>
    
    <div className="container">
      <div className="row flex-add">
        <div className="col-sm-4">
          <form action="/admin/categories/add" method="post">
            <input type="hidden" name="id" value={category_id} />
            <div className="form-group">
              <label htmlFor="name"></label>
              <center><h6>Add Category</h6></center>
              <input
                type="text"
                className="form-control"
                required
                name="name"
                id="name"
                placeholder="Enter category name"
                value={category_name}
                onChange={(e) => set_category_name(e.target.value)}
                style={{"font-size" : "14px"}}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-add-cat mb-2" onClick={handleFormSubmit} disabled={!validcategory}>
            Add Category + 
            </button>
          </form>
        </div>
      </div>
      <hr />
    </div>
    <div className="container mt-2">
      <table className="table table-adjust">
        <thead className="thead-light">
          <tr>
            <th scope="col">Serial No.</th>
            <th scope="col">Category Name</th>
            <th scope="col" className='action'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map(cat => (
            <tr key={cat.category_id}>
              <td>{cat.category_id}</td>
              <td>{cat.category_name}</td>
              <td>
                <button className="btn btn-danger w-50" style={{"font-size" : "14px"}} onClick={() => {handleDelete(cat.category_id)}}>
                  Delete
                </button>
                <button className="btn btn-dark w-50 left-button" style={{"font-size" : "14px"}} onClick={() => handleShow(cat.category_id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{"font-size" : "16px"}}>Update category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input
                type="text"
                className="form-control"
                required
                name="name"
                id="name"
                placeholder="Enter updated category name"
                value={updateCat}
                onChange={(e) => setUpdateCat(e.target.value)}
                style={{"font-size" : "14px"}}
              />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  style={{"font-size" : "14px"}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}  style={{"font-size" : "14px"}}>
            Update 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default ViewCategory;
