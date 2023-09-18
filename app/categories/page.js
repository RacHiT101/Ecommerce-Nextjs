"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

const Categories = ({ swal }) => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  const getAllCategories = async () => {
    const res = await axios.get("/api/categories");
    // console.log(res);
    setCategories(res.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      try {
        const res = await axios.post("/api/categories", data);
        console.log(res);
      } catch (err) {
        console.log("axios: ", err);
      }
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    getAllCategories();
  }

  const editCategory = (category, event) => {
    event.preventDefault();
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  };

  const deleteCategory = (category, event) => {
    event.preventDefault();
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          const res = await axios.delete("/api/categories?id=" + _id);
          //   console.log(res);
          getAllCategories();
        }
      });
  };

  return (
    <div>
      <h1 className="mb-4">Categories</h1>
      <label className="">
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
            // className="mt-1"
          />
          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <button type="submit" className="btn-primary w-1/6">
            Save
          </button>
        </div>
        {!editedCategory && (
          <table className="basic mt-4">
            <thead>
              <tr>
                <td>Category name</td>
                <td>Parent category</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 &&
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td>
                      <button
                        onClick={(event) => editCategory(category, event)}
                        className="btn-default mr-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(event) => deleteCategory(category, event)}
                        className="btn-red"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </form>
    </div>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
