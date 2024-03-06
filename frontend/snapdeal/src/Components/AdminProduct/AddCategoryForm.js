import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategoryForm = () => {
  const [category_name, set_category_name] = useState('');
  const [category_id, set_category_id] = useState('');
  console.log(set_category_id);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/createcat", {
        category_name: category_name,
        category_id: category_id
      });
      console.log(response)

      swal({ text: "Category added Successfully", icon: "success" });
      set_category_name('');
      navigate('/admin/categories')


    } catch (error) {
      swal({ text: "Category addition failed", icon: "error" });
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <form action="/admin/categories/add" method="post">
            <input type="hidden" name="id" value={category_id} />
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                required
                name="name"
                id="name"
                placeholder="Enter name"
                value={category_name}
                onChange={(e) => set_category_name(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
