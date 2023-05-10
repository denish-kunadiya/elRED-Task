import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Offcanvas,
  ToggleButton,
} from "react-bootstrap";
import { Form, Row, Col, Image } from "react-bootstrap";
import { DEFAULT_IMAGE } from "../../config";
import { toast } from "react-toastify";
import { getGrossPrice } from "../../utility/functions";
import * as cartActions from "../../redux/cart/action";
import { connect, useDispatch } from "react-redux";
import CartItem from "../Cart/CartItem";

const CartListShow = ({ open, handleClose, cartItemList }) => {
  return (
    <Container style={{ height: "100vh" }}>
      <Offcanvas
        placement="end"
        className="offcanvas_all_items"
        show={open}
        onHide={handleClose}
      >
        <Offcanvas.Body>
          <Form>
            <Row>
              <Col
                md={12}
                style={{
                  overflowY: "auto",
                  height: "100vh",
                  // width: "30rem",
                  borderRight: "1px dashed gray",
                  padding: "0rem 2rem",
                }}
              >
                <CartItem hide={true} />
              </Col>
            </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

const mapStateToProp = (state) => {
  return {
    cartItemList: state.cartItemsReducer.cartItems,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    addCartItem: (item) => dispatch(cartActions.setCartItems(item)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(CartListShow);
