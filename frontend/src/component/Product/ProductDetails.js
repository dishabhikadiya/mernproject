import axios from "axios";
import { useState, useEffect } from "react";
import React, { Fragment } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MataData from "../layout/MataData";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetails = (product) => {
  console.log("image ", product);
  const alert = useAlert();
  const history = useHistory();
  let { id } = useParams();
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (setdata.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHendler = () => {
    history.push("/Shipping", {
      data: {
        params1: id,
        params2: quantity,
        params3: setdata.name,
        params4: setdata.price,
      },
    });
    console.log("hellllllll", {
      params1: id,
      params2: quantity,
      params3: setdata.name,
      params4: setdata.price,
    });
    // console.log("rrrrrr", setdata._id);
    // localStorage.setItem(`cart_${setdata._id}`, JSON.stringify({ ...setdata }));
    console.log(setdata);
    // alert("Added to Cart Successfully!");
  };
  const [loading, setloading] = useState(false);
  const [setdata, setdataDt] = useState([]);
  const dataGet = async (req, res) => {
    // console.log("data --- ", id);
    const data = await axios.get(
      `http://localhost:4000/api/v1/getproduct/${id}`
    );
    console.log("zxcvbnm", data);
    setdataDt(data.data.product);
  };
  useEffect(() => {
    dataGet();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MataData title={setdata.name} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {setdata.images &&
                  setdata.images.map((item, i) => (
                    <div>
                      <img
                        className="CarouselImage"
                        key={item.i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{setdata.name}</h2>
                <p>
                  product # {setdata?._id}
                  {/* {console.log("1111",setdata._id)} */}
                </p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({setdata.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                {" "}
                <h1>{`₹${setdata.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHendler}>BUY NOW</button>
                </div>
                <p>
                  status:{""}
                  <b className={setdata.Stock < 1 ? "RedColor" : "GreenColor"}>
                    {setdata.Stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{setdata.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHendling">REVIEW</h3>
          {setdata.reviews && setdata.reviews[0] ? (
            <div className="reviews">
              {setdata.reviews &&
                setdata.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">NO Review</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
