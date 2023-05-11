import React, { useEffect, useState } from "react";
import { Image, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as cartActions from "../../redux/cart/action";
import { useNavigate } from "react-router-dom";

function CartItem({
  cartItemList,
  removeCartItem,
  hide,
  setRefresh,
  refresh,
  handleClose,
  setEditData,
}) {
  const navigate = useNavigate();
  const [cart, setCart] = useState(cartItemList);

  useEffect(() => {
    setCart(cartItemList);
  }, [cartItemList]);
  console.log("cart", cart);

  const deleteCartItem = (id, color, itemPackage) => {
    const updatedItems = cart.filter(
      (item) =>
        !(
          item.id === id &&
          item.color === color &&
          item.package === itemPackage
        )
    );
    // dispatch(updateCart(updatedItems));
    removeCartItem(updatedItems);
  };

  const handleAddToCart = () => {
    setRefresh(refresh + 1);
    handleClose();
    // navigate(-1);
  };

  return (
    <>
      {!cart.length ? (
        <Row>
          <Col md={12}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ padding: "0 0rem", height: "100vh" }}
            >
              <img src="/assets/empty.png" />
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row
            className="mt-2 mb-4 "
            style={{
              padding: "0.5rem 0rem",
              backgroundColor: "rgb(220, 223, 229)",
            }}
          >
            <Col className=" d-flex justify-content-between border-1">
              <div className="d-flex flex-row align-items-center">
                <div>Products</div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <div style={{ width: "40px" }}>
                  <div className="fw-normal mb-0">Quantity</div>
                </div>
              </div>
              <div style={{ width: hide ? "100px" : "45px" }}>
                <div className="mb-0">Price</div>
              </div>
            </Col>
          </Row>
          {cart.map((item, index) => (
            <Row className="mt-2" onClick={() => setEditData(item)}>
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
                {!hide && (
                  <div className="d-flex flex-row align-items-center justify-content-end">
                    <i
                      class="bi bi-x-lg cursor-pointer"
                      onClick={() =>
                        deleteCartItem(item.id, item.color, item.package)
                      }
                    ></i>
                  </div>
                )}
              </Col>
            </Row>
          ))}
          {!hide && (
            <div className="mt-5 d-flex justify-content-center">
              <Button
                style={{
                  backgroundColor: "#BE212A",
                  color: "#ffffff",
                  border: "none",
                  width: "15rem",
                }}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </div>
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

const mapDispatchToProp = (dispatch) => {
  return {
    removeCartItem: (item) => dispatch(cartActions.setCartItems(item)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(CartItem);
