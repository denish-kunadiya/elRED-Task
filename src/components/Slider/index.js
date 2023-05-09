import React, { Component, useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Slider from "react-slick";
import { DEFAULT_IMAGE } from "../../config";
import Loader from "../Loader";
import RecordFound from "../RecordFound";

var settings = {
  className: "hr_slider",
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Responsive = ({ allCategories, setSelectCategory, loading }) => {
  const [categories, setCategories] = useState(allCategories);

  useEffect(() => {
    setCategories(allCategories);
    if (allCategories?.length) {
      setSelectCategory(allCategories[0]?.categoryId);
    }
  }, [allCategories]);

  console.log("allCategories", allCategories);
  console.log("loading", loading);

  return (
    <div>
      <h2> Print Heads </h2>
      <Slider {...settings}>
        {loading ? (
          <Loader />
        ) : categories?.length ? (
          categories?.map((obj, index) => (
            <Col md={3} onClick={() => setSelectCategory(obj?.categoryId)}>
              <Card className="scrollable_card" style={{ width: "auto" }}>
                <Card.Img
                  src={
                    obj?.categoryImageURL
                      ? obj?.categoryImageURL
                      : DEFAULT_IMAGE
                  }
                  alt="Card image"
                  onClick={() => setSelectCategory(obj?.categoryId)}
                  style={{ height: "150px" }}
                />

                <Card.ImgOverlay className="main_category_overlay">
                  <Card.Body className="main_category_heading">
                    {obj?.categoryName}
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))
        ) : (
          <RecordFound label="No Categories Found" />
        )}
      </Slider>
      <hr />
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    allCategories: state?.getCategoriesReducer?.mainCategories?.result,
    loading: state?.getCategoriesReducer?.processing,
  };
};
export default connect(mapStateToProp)(Responsive);
