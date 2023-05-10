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
import { connect } from "react-redux";
import CartItem from "./CartItem";

const CartModal = ({
  open,
  handleClose,
  singleProduct,
  addCartItem,
  cartItemList,
}) => {
  const [quantity, setQuantity] = useState(12);
  const [urgentOrder, setUrgentOrder] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUrgentOrderChange = (event) => {
    setUrgentOrder(event.target.checked);
  };

  const uniqueData = Array.from(
    new Set(singleProduct.variants.map((item) => item.colorDescription))
  ).map((name) => {
    return singleProduct.variants.find(
      (item) => item.colorDescription === name
    );
  });

  const uniquePackage = Array.from(
    new Set(singleProduct.variants.map((item) => item.packingDescription))
  ).map((name) => {
    return singleProduct.variants.find(
      (item) => item.packingDescription === name
    );
  });
  console.log("singleProduct", singleProduct);

  const [selectColor, setSelectColor] = useState(
    uniqueData[0].colorDescription
  );
  const [selectPackage, setSelectPackage] = useState(
    uniqueData[0].packingDescription
  );
  const [grossPrice, setGrossPrice] = useState(uniqueData[0].grossPrice);

  const handleAddItem = () => {
    const data = {
      id: singleProduct.productId,
      item: singleProduct.itemDescription,
      color: selectColor,
      package: selectPackage,
      grossPrice: grossPrice * quantity,
      quantity: parseFloat(quantity),
    };

    let index = cartItemList.findIndex((item) => item.id === data.id);

    if (index !== -1) {
      // If the object already exists, update quantity and grossPrice
      cartItemList[index].quantity += data.quantity;
      cartItemList[index].grossPrice += parseFloat(data.grossPrice);
    } else {
      // If the object does not exist, add it to the array
      // cartItemList.push(data);
      addCartItem([...cartItemList, data]);
    }
  };

  console.log(uniqueData);

  const handleSelectColor = (color) => {
    setSelectColor(color);
    if (selectColor && color) {
      setGrossPrice(
        getGrossPrice(selectColor, selectPackage, singleProduct.variants)
      );
    }
  };
  const handleSelectPackage = (description) => {
    setSelectPackage(description);
    if (selectColor && description) {
      setGrossPrice(
        getGrossPrice(selectColor, selectPackage, singleProduct.variants)
      );
    }
  };

  console.log("cartItemList", cartItemList);

  return (
    <Container>
      <Offcanvas placement="end" show={open} onHide={handleClose}>
        {/* <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ padding: "0rem 3rem" }} className="fw-bold">
            {singleProduct.itemDescription}
          </Offcanvas.Title>
        </Offcanvas.Header> */}
        <Offcanvas.Body>
          <Form>
            <Row style={{ height: "100vh" }}>
              <Col
                md={6}
                style={{
                  overflowY: "auto",
                  height: "100vh",
                  // width: "30rem",
                  borderRight: "1px dashed gray",
                  padding: "0rem 2rem",
                }}
              >
                <div className="fw-bold">{singleProduct.itemDescription}</div>
                <div style={{ textAlign: "center" }}>
                  <Card
                    style={{
                      padding: "3rem 8rem",
                      // width: "25rem",
                      backgroundColor: "rgb(220, 223, 229)",
                    }}
                  >
                    <span className="position-absolute top-0 end-0 mt-3 me-3">
                      <i class="bi bi-heart"></i>
                    </span>
                    <Card.Img
                      variant="top"
                      src={
                        singleProduct?.productImages[0]
                          ? singleProduct?.productImages[0]
                          : DEFAULT_IMAGE
                      }
                      height={"200px"}
                      width={"50px"}
                      //   style={{ padding: "3rem" }}
                    />
                  </Card>
                </div>
                {/* </Col>
              <Col> */}
                <div>
                  <h5 className="text-muted">#{singleProduct.itemNumber}</h5>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">
                      {singleProduct.itemDescription}
                    </span>
                    <span className="fw-bold">$ {grossPrice}</span>
                  </div>
                  <div className="text-muted">
                    lorem30Ea excepteur non ipsum irure et sit anim. Eu eu non
                    est qui deserunt amet laboris est anim aliquip anim.
                    Pariatur velit occaecat proident laborum.
                  </div>
                </div>
                <div className="mt-3">
                  <h6 className="fw-bold">Please Select Color:</h6>

                  {uniqueData.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      name="radio2"
                      value={selectColor}
                      checked={selectColor === radio.colorDescription}
                      onClick={() => handleSelectColor(radio.colorDescription)}
                      className="Btn-Blue-BG"
                      style={{
                        margin: "0.5rem 0.5rem 0.5rem 0rem",
                        backgroundColor:
                          selectColor === radio.colorDescription
                            ? "#FDE9EC"
                            : "#fff",
                        color:
                          selectColor === radio.colorDescription
                            ? "#C18185"
                            : "black",
                        border: "1px solid #FDE9EC",
                      }}
                    >
                      {radio.colorDescription}
                    </ToggleButton>
                  ))}
                </div>
                <div className="mt-3">
                  <h6 className="fw-bold">
                    Please Select Packaging Description:
                  </h6>

                  {uniquePackage.map((obj, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      name="radio1"
                      value={selectPackage}
                      checked={selectPackage === obj.packingDescription}
                      onClick={() =>
                        handleSelectPackage(obj.packingDescription)
                      }
                      className="Btn0-Blue-BG"
                      style={{
                        margin: "0.5rem 0.5rem 0.5rem 0rem",
                        backgroundColor:
                          selectPackage === obj.packingDescription
                            ? "#FDE9EC"
                            : "#fff",
                        color:
                          selectPackage === obj.packingDescription
                            ? "#C18185"
                            : "black",
                        border: "1px solid #FDE9EC",
                      }}
                    >
                      {obj.packingDescription}
                    </ToggleButton>
                  ))}
                </div>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    min="12"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="I Need Urgent Order"
                  onChange={handleUrgentOrderChange}
                />
                <Button variant="primary" block onClick={handleAddItem}>
                  Add to Cart
                </Button>
              </Col>
              <Col md={6} style={{ padding: "0rem 2rem" }}>
                <CartItem />
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

export default connect(mapStateToProp, mapDispatchToProp)(CartModal);
