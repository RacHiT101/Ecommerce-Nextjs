"use client";

import React, { useEffect, useState } from "react";

const Categories = () => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { name };

    if (_id) {
      await axios.put("/api/categories", { ...data, _id });
      //   setGoToProducts(true);
    } else {
      await axios.post("/api/categories", data);
      //   setGoToProducts(true);
    }
  };

  const getAllCategories = async () => {
    const res = axios.get('/api/categories');
    setCategories(res.data);
  }

  useEffect(() => {
    getAllCategories();
  },[])

  //   if (goToProducts) {
  //     router.push("/products");
  //   }

  return (
    <div>
      <h1 className="mb-4">Categories</h1>
      <label className="">
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
            className="mt-1"
          />
        </div>
        <button type="submit" className="btn-primary w-1/6">
          Save
        </button>
      </form>
    </div>
  );
};

export default Categories;
