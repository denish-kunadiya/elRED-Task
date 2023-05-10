import React, { useEffect, useState } from "react";
import { Image, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as cartActions from "../../redux/cart/action";
import CartListShow from "./CartListShow";

function OrderCart({ cartItemList, setRefresh, refresh, countTotal }) {
  const [cart, setCart] = useState(cartItemList);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCart(cartItemList);
    countTotal(cartItemList);
    console.log("countTotal(cartItemList);", countTotal(cartItemList));
  }, [cartItemList, refresh]);

  const handlePopUp = () => {
    setOpen(true);
  };

  return (
    <>
      {!cart.length ? (
        <Row>
          <Col md={12}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ padding: "0 0rem" }}
            >
              <img src="/assets/empty.png" />
            </div>
          </Col>
        </Row>
      ) : (
        <>
          {cart.slice(0, 4).map((item, index) => (
            <Row className="mt-2">
              <Col className=" d-flex justify-content-between">
                <div
                  className="d-flex flex-row align-items-center"
                  style={{ width: "10rem" }}
                >
                  <div>
                    <img
                      src={item.image}
                      className="img-fluid rounded-3"
                      alt="img...."
                      style={{ width: "50px" }}
                    />
                  </div>
                  <div className="ms-2">
                    <div
                      className="fw-bold text_ellipse"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.item}
                    </div>
                    <div
                      className="small mt-1 text-muted text_ellipse"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {item.package}
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div style={{ width: "100px" }}>
                    <h5 className="fw-normal mb-0 fs-6">{item.quantity}</h5>
                  </div>
                  <div style={{ width: "50px" }}>
                    <h5 className="mb-0 fs-6">{item.grossPrice}</h5>
                  </div>
                </div>
                {/* <div className="d-flex flex-row align-items-center justify-content-end">
                  <i
                    class="bi bi-x-lg cursor-pointer"
                    
                  ></i>
                </div> */}
              </Col>
            </Row>
          ))}
          <hr />
          <div className="mt-1 d-flex justify-content-center">
            <div
              style={{
                color: "#BE212A",
                border: "none",
              }}
              onClick={handlePopUp}
            >
              See all
            </div>
          </div>
          {open && (
            <CartListShow open={open} handleClose={() => setOpen(false)} />
          )}
        </>
      )}
    </>
  );
}

const mapStateToProp = (state) => {
  return {
    cartItemList: state.cartItemsReducer.cartItems,
  };
};

export default connect(mapStateToProp)(OrderCart);
