import React, { useEffect, useState } from "react";
import AfterAuth from "../HOC/AfterAuth";
import CardElement from "../Shared/CardElement";
import { Card, Col, Row } from "react-bootstrap";
import Responsive from "../components/Slider";

import * as categoryAction from "../redux/mainCategory/action";
import * as subCategoryAction from "../redux/subCategory/action";
import { connect } from "react-redux";
import { DEFAULT_IMAGE } from "../config";
import SubCategories from "../components/Categories/SubCategories";

const Contact = ({ getCategories, getSubCategories }) => {
  const [SelectCategory, setSelectCategory] = useState("");
  useEffect(() => {
    getCategories().then((res) => {
      console.log("res", res);
    });
    // getSubCategories().then((res) => {
    //   console.log("res getSubCategories", res);
    // });
  }, []);
  useEffect(() => {
    if (SelectCategory) {
      getSubCategories(SelectCategory).then((res) => {
        console.log("res getSubCategories", res);
      });
    }
  }, [SelectCategory]);

  console.log("SelectCategory", SelectCategory);
  return (
    <AfterAuth>
      <Row>
        <Col md={8}>
          <CardElement>
            <Row className="scrolling_wrapper">
              <Responsive setSelectCategory={setSelectCategory} />
            </Row>
            <Row className="scrolling_wrapper">
              <SubCategories />
            </Row>
          </CardElement>
        </Col>
        <Col md={4}>
          <CardElement>hello this is card</CardElement>
        </Col>
      </Row>
    </AfterAuth>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    getCategories: () => dispatch(categoryAction.getMainCategories()),
    getSubCategories: (SelectCategory) =>
      dispatch(subCategoryAction.getSubCategories(SelectCategory)),
  };
};

export default connect(null, mapDispatchToProp)(Contact);
