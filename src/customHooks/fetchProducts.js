import React, { useState } from "react";
import Api from "../components/Api";
import axios from "axios";

export const fetchProductsData = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  axios({
    method: "GET",
    url: Api.Products,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        console.log("data", data);
        setData(data?.data);
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
  return { data };
};
