import React, { useEffect, useState } from "react";
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
import OrderCart from "../components/Order/OrderCart";
import PlaceOrder from "../components/Order/PlaceOrder";
import HeadingRowCart from "../components/Order/HeadingRowCart";
import HeadingRowOrder from "../components/Order/HeadingRowOrder";

const Products = ({ getProducts }) => {
  const params = useLocation();
  let id = params.state.subCategoryId;
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (params.state !== null) {
      getProducts(id).then((res) => {
        console.log("res getProducts", res);
      });
    } else {
      navigate("/");
    }
  }, [id]);

  const countTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.grossPrice, 0);
    return setGrossTotal(total);
  };

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
                  <ProductList
                    setRefresh={setRefresh}
                    refresh={refresh}
                    open={open}
                    setOpen={setOpen}
                  />
                </Row>
              </CardElement>
            </Col>
            <Col md={12} height={"30vh"} className="py-2">
              {/* <Card style={{ height: "14vh" }}> */}
              <CardElement>
                <Row className="scrolling_wrapper">
                  <ProductSlider />
                </Row>
              </CardElement>
              {/* <SubCategories /> */}
              {/* </Card> */}
            </Col>
          </Row>
        </Col>
        <Col md={3} className="px-0">
          {/* <Card style={{ height: "80vh" }}> */}
          <HeadingRowCart open={open} setOpen={setOpen} />
          <CardElement>
            <OrderCart
              setRefresh={setRefresh}
              refresh={refresh}
              countTotal={(items) => countTotal(items)}
            />
          </CardElement>
          <HeadingRowOrder />
          <CardElement>
            <PlaceOrder grossTotal={grossTotal} />
          </CardElement>
          {/* </Card> */}
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
