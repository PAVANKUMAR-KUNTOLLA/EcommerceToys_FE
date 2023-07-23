import React from "react";
import Api from "../components/Api";
import axios from "axios";

export const privateApiPOSTProducts = (data = {}) => {
  const token = localStorage.getItem("token");

  axios({
    method: "POST",
    url: Api.Products,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    data,
  })
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        console.log(data);
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
