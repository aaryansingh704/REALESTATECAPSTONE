import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useStateContext } from "../context";

import { checkIfImage } from "../util";
import Header from "../PageComponents/Components/Header";
const list = () => {
  const {
    address,
    contract,
    createPropertyFunction,
    getPropertiesData,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        setIsLoading(true);
        console.log("trying to call create property");
        await createPropertyFunction({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
        });
        setIsLoading(false);
      } else {
        alert("please provide valid url");
        setForm({ ...form, images: "" });
      }
    });
  };
  //get data
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();

    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);

  console.log(properties);

  return (
    <div className="full-space-div single-banner-shape-card ">
      <Header />
      <div
        style={{
          padding: "40px 80px 20px 80px",
          backgroundColor: "black",
          borderRadius: "20px",
          margin: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ padding: "0px 100px 0px 0px " }}>List your Property</h1>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "10px" }} className="">
              <label htmlFor="propertyTitle">Property Title:</label>
              <input
                type="text"
                id="propertyTitle"
                placeholder="Enter property title"
                onChange={(e) => handleFormFieldChange("propertyTitle", e)}
              />
            </div>
            <div style={{ padding: "10px" }} className="">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                placeholder="Enter description"
                onChange={(e) => handleFormFieldChange("description", e)}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "10px" }}>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                placeholder="Enter category"
                onChange={(e) => handleFormFieldChange("category", e)}
              />
            </div>
            <div style={{ padding: "25px" }}>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                defaultValue={0.0}
                onChange={(e) => handleFormFieldChange("price", e)}
              />
            </div>
          </div>

          <div style={{ padding: "10px" }}>
            <label htmlFor="images">Image URL:</label>
            <input
              type="url"
              id="images"
              placeholder="Paste image URL here"
              onChange={(e) => handleFormFieldChange("images", e)}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <label htmlFor="propertyAddress">Property Address:</label>
            <input
              type="text"
              id="propertyAddress"
              placeholder="Enter property address"
              onChange={(e) => handleFormFieldChange("propertyAddress", e)}
            />
          </div>
          <button
            className="btn"
            type="submit"
            style={{
              backgroundColor: "cyan",
              fontWeight: "30px",
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default list;
