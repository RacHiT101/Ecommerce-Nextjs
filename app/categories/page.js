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
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      try {
        const res = await axios.post("/api/categories", data);
        // console.log(res);
      } catch (err) {
        // console.log("axios: ", err);
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
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: Array.isArray(values) ? values.join(",") : values,
      }))
    );
  };

  // console.log(properties);

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

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  // console.log(properties);

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      // console.log(prev);
      const properties = [...prev];
      properties[index] = { ...properties[index], name: newName };
      return properties;
    });
  };

  const handlePropertyValuesChange = (index, property, newValue) => {
    // console.log(property);
    setProperties((prev) => {
      const properties = [...prev];
      properties[index] = { ...properties[index], values: newValue };
      return properties;
    });
  };

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <div>
      <h1 className="mb-4">Categories</h1>
      <label className="">
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex flex-col justify-center gap-2 mt-1">
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
          <div className="mb-2">
            <label className="block mb-2">Properties</label>
            <button
              onClick={addProperty}
              type="button"
              className="btn-default text-sm mb-2"
            >
              Add new property
            </button>
            {properties?.length > 0 &&
              properties?.map((property, index) => (
                <div key={index} className="flex gap-1 mb-2">
                  <input
                    type="text"
                    value={property.name}
                    className="mb-0"
                    onChange={(ev) =>
                      handlePropertyNameChange(index, property, ev.target.value)
                    }
                    placeholder="(example: color)"
                  />
                  <input
                    type="text"
                    className="mb-0"
                    onChange={(ev) =>
                      handlePropertyValuesChange(
                        index,
                        property,
                        ev.target.value
                      )
                    }
                    value={property.values}
                    placeholder="values, comma separated"
                  />
                  <button
                    onClick={() => removeProperty(index)}
                    type="button"
                    className="btn-red"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <div className="flex gap-1">
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setName("");
                  setParentCategory("");
                  setProperties([]);
                }}
                className="btn-default"
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary py-1">
              Save
            </button>
          </div>
        </div>
      </form>
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
    </div>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
