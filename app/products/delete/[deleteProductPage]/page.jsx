"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteProduct = ({ params }) => {
  const [productInfo, setProductInfo] = useState(null);

  const router = useRouter();

  function goBack() {
    router.push("/products");
  }

  useEffect(() => {
    if (!params.deleteProductPage) {
      return;
    }
    axios
      .get("/api/products?id=" + params.deleteProductPage)
      .then((response) => {
        setProductInfo(response.data);
      });
  }, [params.deleteProductPage]);

  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + params.deleteProductPage);
    goBack();
  };

  return (
    <div>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
