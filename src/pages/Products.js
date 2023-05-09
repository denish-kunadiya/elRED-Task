import React, { useEffect } from "react";
import AfterAuth from "../HOC/AfterAuth";
import { Button, Card, Col, Row } from "react-bootstrap";
import CardElement from "../Shared/CardElement";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as productActions from "../redux/products/action";
import ProductList from "../components/Products/ProductList";
import Sidebar from "../components/Sidebar";
import ProductSlider from "../components/ProductSlider";
import SubCategories from "../components/Categories/SubCategories";

const Products = ({ getProducts }) => {
  const params = useLocation();
  let id = params.state.subCategoryId;
  const navigate = useNavigate();

  useEffect(() => {
    if (params.state !== null) {
      getProducts(id).then((res) => {
        console.log("res getProducts", res);
      });
    } else {
      navigate("/");
    }
  }, [id]);

  return (
    <AfterAuth>
      <Row>
        <Col md={9}>
          <Row>
            <Col style={{ padding: "0px" }} md={3}>
              <Card style={{ height: "65vh" }}>
                <Sidebar />
              </Card>
            </Col>
            <Col md={9} className="px-2">
              <CardElement height={"65vh"}>
                <Row
                  className="scrolling_wrapper overflow-auto"
                  style={{ height: "60vh" }}
                >
                  <ProductList />
                </Row>
              </CardElement>
            </Col>
            <Col md={12} className="py-2 px-0">
              <Card style={{ height: "14vh" }}>
                <ProductSlider />

                {/* <SubCategories /> */}
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={3} className="px-2">
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
    getProducts: (id) => dispatch(productActions.getProducts(id)),
  };
};

export default connect(null, mapDispatchToProp)(Products);
