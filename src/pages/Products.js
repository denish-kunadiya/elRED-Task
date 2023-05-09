import React, { useEffect } from "react";
import AfterAuth from "../HOC/AfterAuth";
import { Button, Card, Col, Row } from "react-bootstrap";
import CardElement from "../Shared/CardElement";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as productActions from "../redux/products/action";
import ProductList from "../components/Products/ProductList";

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
        <Col md={8}>
          <CardElement>
            <Row className="scrolling_wrapper">
              <ProductList />
            </Row>
            {/* <Row className="">
              <SubCategories />
            </Row> */}
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
    getProducts: (id) => dispatch(productActions.getProducts(id)),
  };
};

export default connect(null, mapDispatchToProp)(Products);
