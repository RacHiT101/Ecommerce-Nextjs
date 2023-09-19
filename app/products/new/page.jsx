"use client";

import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { ReactSortable } from "react-sortablejs";

const NewProduct = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  const getCategories = async () => {
    const res = await axios.get("/api/categories");
    // console.log(res);
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  } , [])

  // console.log(_id);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images, category, productProperties };

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
      setGoToProducts(true);
    } else {
      await axios.post("/api/products", data);
      setGoToProducts(true);
    }
  };

  if (goToProducts) {
    router.push("/products");
  }

  const uploadImages = async (e) => {
    const files = e.target.files;

    setIsUploading(true);
    const data = new FormData();
    for (const file of files) {
      data.append("file", file);
      data.append("upload_preset", "vtzyitzi");
      data.append("cloud_name", "dvfqgwynd");
    }

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvfqgwynd/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (response.ok) {
        const jsonData = await response.json();
        // console.log(jsonData);
        setImages((oldImages) => {
          return [...oldImages, jsonData.url];
        });
      } else {
        console.log("Upload failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error uploading images: " + error.message);
    }
    setIsUploading(false);
  };

  // console.log(images);

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category);
    // console.log(catInfo);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  // console.log(propertiesToFill);

  return (
    <form onSubmit={saveProduct} className="flex flex-col gap-2">
      <label>Product name</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories?.length > 0 &&
          categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
              <select value={productProperties[p.name]}
                      onChange={ev =>
                        setProductProp(p.name,ev.target.value)
                      }
              >
                {p.values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((url) => (
              <div
                key={url}
                className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
              >
                <img src={url} alt="" className="flex rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 w-32 justify-center flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-primary rounded-sm text-gray-500 bg-gray-200 shadow-sm border-primary border flex justify-center items-center gap-2">
          <BsUpload /> Upload
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        {!images?.length && (
          <div className="flex items-center ml-4">
            No Photos in this Product
          </div>
        )}
      </div>
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary w-1/6">
        Save
      </button>
    </form>
  );
};

export default NewProduct;
