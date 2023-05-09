import React, { Component, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Slider from "react-slick";
import { DEFAULT_IMAGE } from "../../config";
import Loader from "../Loader";
import RecordFound from "../RecordFound";
import { useNavigate } from "react-router-dom";
var settings = {
  className: "bottom_slider",
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
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

const ProductSlider = ({ subCategoriesList, loading }) => {
  const [subCategories, setSubCategories] = useState(subCategoriesList);
  const navigate = useNavigate();
  useEffect(() => {
    setSubCategories(subCategoriesList);
  }, [subCategoriesList]);

  console.log("subCategoriesList :::::::", subCategoriesList);
  console.log("loading", loading);

  const handleProduct = (id) => {
    navigate(`/products/${id}`, { state: { subCategoryId: id } });
  };

  return (
    <div>
      <Slider {...settings}>
        <Row>
          {loading ? (
            <Loader />
          ) : subCategories?.length ? (
            subCategories?.map((obj, index) => (
              <>
                <Col
                  md={5}
                  className="me-5 sub_category_col"
                  onClick={() => handleProduct(obj?.subCategoryId)}
                >
                  <Card className="">
                    <Card.Img
                      src={
                        !obj?.subCategoryImageURL
                          ? obj?.subCategoryImageURL
                          : DEFAULT_IMAGE
                      }
                      alt="Card image"
                    />
                    {/* <Card.ImgOverlay className="sub_category_overlay">
                    <Card.Body className="sub_category_heading">
                      {obj?.subCategoryName}
                    </Card.Body>
                  </Card.ImgOverlay> */}
                  </Card>
                </Col>
              </>
            ))
          ) : (
            <RecordFound label="No Sub Category Found" />
          )}
        </Row>
      </Slider>
      <hr />
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    subCategoriesList: state?.getSubCategoriesReducer?.subCategories?.result,
    loading: state?.getSubCategoriesReducer?.processing,
  };
};

export default connect(mapStateToProp)(ProductSlider);
