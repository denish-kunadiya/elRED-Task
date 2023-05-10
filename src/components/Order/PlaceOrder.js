import React, { useEffect, useState } from "react";
import { Image, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as cartActions from "../../redux/cart/action";
import { toast } from "react-toastify";

function PlaceOrder({ grossTotal, clearCart }) {
  const PlaceCartOrder = () => {
    clearCart([]);
    toast.success("Your Order Placed Successfully.");
  };

  return (
    <>
      <div>
        <div
          className="d-flex justify-content-between mt-1"
          style={{ fontSize: "0.8rem" }}
        >
          <span className="text-muted">Items Total</span>
          <span className="text-muted">{grossTotal}</span>
        </div>
        <div
          className="d-flex justify-content-between mt-1"
          style={{ fontSize: "0.8rem" }}
        >
          <span className="text-muted">SGST(9%)</span>
          <span className="text-muted">{grossTotal * 0.09}</span>
        </div>
        <div
          className="d-flex justify-content-between mt-1"
          style={{ fontSize: "0.8rem" }}
        >
          <span className="text-muted">CGST(9%)</span>
          <span className="text-muted">{grossTotal * 0.09}</span>
        </div>
        <div
          className="d-flex justify-content-between mt-1"
          style={{ fontSize: "0.8rem" }}
        >
          <span className="text-muted">IGST(9%)</span>
          <span className="text-muted">{grossTotal * 0.09}</span>
        </div>
        <div
          className="d-flex justify-content-between mt-1"
          style={{ fontSize: "0.8rem" }}
        >
          <span className="text-muted">Taxable Amount</span>
          <span className="text-muted">30000</span>
        </div>

        <hr />
        <div
          className="d-flex justify-content-between mt-1"
          style={{ fontSize: "0.8rem" }}
        >
          <span className="fw-bold">Order Total</span>
          <span className="fw-bold">
            {Math.ceil(
              grossTotal +
                grossTotal * 0.09 +
                grossTotal * 0.09 +
                grossTotal * 0.09
            )}
          </span>
        </div>
      </div>
      <div className="mt-2 d-flex justify-content-between align-items-center">
        <Button
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "1px solid #000000",
            borderRadius: "0.4rem",
            // width: "15rem",
          }}
        >
          Clear Cart
        </Button>
        <Button
          style={{
            backgroundColor: "#BE212A",
            color: "#ffffff",
            border: "none",
            // width: "15rem",
          }}
          onClick={PlaceCartOrder}
        >
          Place Order
        </Button>
      </div>
    </>
  );
}

const mapDispatchToProp = (dispatch) => {
  return {
    clearCart: (item) => dispatch(cartActions.setCartItems(item)),
  };
};

export default connect(null, mapDispatchToProp)(PlaceOrder);
