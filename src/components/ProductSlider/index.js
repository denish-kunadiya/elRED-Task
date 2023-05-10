import React, { Component, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Slider from "react-slick";
import { DEFAULT_IMAGE } from "../../config";
import Loader from "../Loader";
import RecordFound from "../RecordFound";
import { useLocation, useNavigate, useParams } from "react-router-dom";
var settings = {
  className: "bottom_slider",
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  variableWidth: true,
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
  const params = useParams();
  console.log("params", params.id);
  useEffect(() => {
    setSubCategories(subCategoriesList);
  }, [subCategoriesList]);

  console.log("subCategoriesList :::::::", subCategories);

  const handleProduct = (id) => {
    navigate(`/products/${id}`, { state: { subCategoryId: id } });
  };

  const BackToHome = () => {
    console.log("clicked");
    navigate("/");
  };

  return (
    <div>
      <Slider {...settings}>
        {/* <Row> */}
        <Col md={1} className="me-4" onClick={BackToHome}>
          <Card
            className="d-flex justify-content-center text-center"
            style={{ width: "6rem", height: "5rem" }}
          >
            <i class="bi bi-house-door" style={{ fontSize: "3rem" }}></i>
          </Card>
        </Col>
        {loading ? (
          <Loader />
        ) : subCategories?.length ? (
          subCategories?.map((obj, index) => (
            // <>

            <Col
              className="me-4"
              style={{ width: "10rem" }}
              onClick={() => handleProduct(obj?.subCategoryId)}
            >
              <Card>
                <Card.Img
                  src={
                    obj?.subCategoryImageURL
                      ? obj?.subCategoryImageURL
                      : DEFAULT_IMAGE
                  }
                  alt="Card image"
                  className={
                    params.id === obj.subCategoryId
                      ? "product_slider_img product_slider_img_selected"
                      : "product_slider_img border-none"
                  }
                />
                <Card.ImgOverlay className="sub_category_overlay my-overlay">
                  <Card.Body className="sub_category_heading text-light text-center">
                    {obj?.subCategoryName}
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </Col>
            // </>
          ))
        ) : (
          ""
        )}
        {/* </Row> */}
      </Slider>
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
