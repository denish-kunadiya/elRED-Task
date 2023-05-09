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
import Sidebar from "../components/Sidebar";

const Contact = ({ getCategories, getSubCategories }) => {
  const [selectCategory, setSelectCategory] = useState("");
  useEffect(() => {
    getCategories().then((res) => {
      console.log("res", res);
    });
  }, []);
  useEffect(() => {
    if (selectCategory) {
      getSubCategories(selectCategory).then((res) => {
        console.log("res getSubCategories", res);
      });
    }
  }, [selectCategory]);

  console.log("selectCategory", selectCategory);
  return (
    <AfterAuth>
      <Row>
        <Col md={9}>
          <Row>
            <Col style={{ padding: "0px" }} md={3}>
              <Card style={{ height: "80vh" }}>
                <Sidebar />
              </Card>
            </Col>
            <Col md={9}>
              <CardElement height={"80vh"}>
                <Row className="scrolling_wrapper">
                  <Responsive
                    setSelectCategory={setSelectCategory}
                    selectCategory={selectCategory}
                  />
                </Row>
                <Row className="subcategory_wrapper">
                  <SubCategories />
                </Row>
              </CardElement>
            </Col>
            {/* <Col md={12}>
              <Card style={{ height: "10vh" }}>
                <h3>Hello</h3>
              </Card>
            </Col> */}
          </Row>
        </Col>
        <Col md={3}>
          <Card style={{ height: "80vh" }}>
            <CardElement>hello this is card</CardElement>
          </Card>
        </Col>
      </Row>
    </AfterAuth>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    getCategories: () => dispatch(categoryAction.getMainCategories()),
    getSubCategories: (selectCategory) =>
      dispatch(subCategoryAction.getSubCategories(selectCategory)),
  };
};

export default connect(null, mapDispatchToProp)(Contact);
