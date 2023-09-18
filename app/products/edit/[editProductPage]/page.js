"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import NewProduct from "../../new/page";

const EditProductPage = ({ params }) => {

  const [productInfo, setProductInfo] = useState(null);

  const getProduct = async () => {
    const res = await axios.get("/api/products?id=" + params.editProductPage);
    console.log(res.data);
    setProductInfo(res.data)
  };

  useEffect(() => {
    getProduct();
  }, [params.editProductPage]);
  

  console.log(params.editProductPage);

  return <div> <h1 className="mb-4">Edit product</h1>
  {productInfo && (
    <NewProduct {...productInfo} />
  )}</div>;
};

export default EditProductPage;
