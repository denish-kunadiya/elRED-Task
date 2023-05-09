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
  slidesToShow: 6,
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

const Responsive = ({
  allCategories,
  setSelectCategory,
  selectCategory,
  loading,
}) => {
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
            <Col onClick={() => setSelectCategory(obj?.categoryId)}>
              <Card
                className={
                  selectCategory === obj?.categoryId
                    ? "scrollable_card border_selected"
                    : "scrollable_card border-none"
                }
              >
                <Card.Img
                  src={
                    obj?.categoryImageURL
                      ? obj?.categoryImageURL
                      : DEFAULT_IMAGE
                  }
                  alt="category"
                  className={
                    selectCategory === obj?.categoryId
                      ? "selected_category_img "
                      : "category_img"
                  }
                  onClick={() => setSelectCategory(obj?.categoryId)}
                />

                <Card.ImgOverlay className="main_category_overlay">
                  <Card.Body
                    className={
                      obj?.categoryImageURL
                        ? "main_category_heading text-light text-center"
                        : "main_category_heading text-dark text-center"
                    }
                  >
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
