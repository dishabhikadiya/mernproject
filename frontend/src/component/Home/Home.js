import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import MataData from "../layout/MataData";
import axios from "axios";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import { BsSearch } from "react-icons/bs";
import { TfiMouse } from "react-icons/tfi";
import { BiUserCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Search from "../Product/Search";
const Home = () => {
  const [first, setfirst, loading] = useState([]);
  // const dispatch = useDispatch();

  const dataGet = async () => {
    const data = await axios.get("http://localhost:4000/api/v1/products");
    setfirst(data.data.products);
    console.log("asd", data.data.products);
  };

  useEffect(() => {
    // getProducts();
    dataGet();
    // dispatch(getProducts());
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MataData title="HOME" />
          <div className="banner">
            <p>welcome to Ecommerce</p>
            <h1>FIND AMEZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll
                <TfiMouse />
              </button>
            </a> 
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {first &&
              first?.map((product) => {
                console.log("=======================product", product);
                return <ProductCard product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
