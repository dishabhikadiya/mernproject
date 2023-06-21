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

// import { useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetails = (product) => {
  let { id } = useParams();
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [setdata, first, loading] = useState([]);
  const dataGet = async (req, res) => {
    // console.log("data --- ", id);
    const data = await axios.get(
      `http://localhost:4000/api/v1/getproduct/${id}`
    );
    console.log("zxcvbnm", data);
    first(data.data.product);
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
          <MataData title={product.name} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {setdata.images &&
                  setdata.images.map((item, i) => (
                    <div>
                      <img
                        className="CarouselImage"
                        key={setdata.i}
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
                <p>product # {setdata?._id}</p>
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
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
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
