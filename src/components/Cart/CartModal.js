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
import CartItem from "./CartItem";

const CartModal = ({
  open,
  handleClose,
  singleProduct,
  addCartItem,
  cartItemList,
  setRefresh,
  refresh,
}) => {
  const [quantity, setQuantity] = useState(12);
  const [urgentOrder, setUrgentOrder] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUrgentOrderChange = (event) => {
    setUrgentOrder(event.target.checked);
  };

  const [grossPrice, setGrossPrice] = useState();

  // **************************************************************************************
  const [selectedCombination, setSelectedCombination] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [availablePackaging, setAvailablePackaging] = React.useState([]);

  console.log("selectedPackage", selectedPackage);

  const handleSelectColors = (color) => {
    console.log("color", color);
    // const color = event.target.value;
    const matchingItems = singleProduct.variants.filter(
      (item) => item.colorDescription === color
    );
    console.log("matchingItems", matchingItems);

    const uniquePackaging = Array.from(
      new Set(matchingItems.map((item) => item.packingDescription))
    );
    console.log("uniquePackaging", uniquePackaging);

    const selectedPackaging = uniquePackaging[0];
    const matchingCombination = matchingItems.find(
      (item) =>
        item.colorDescription === color &&
        item.packagingDescription === selectedPackaging
    );
    setSelectedCombination(matchingCombination);
    setSelectedColor(color);
    setAvailablePackaging(uniquePackaging);
  };

  const handleSelectPackaging = (selectedPackaging) => {
    console.log("selectedPackaging", selectedPackaging);
    // const selectedPackaging = selectedpackaging.target.value;
    setSelectedPackage(selectedPackaging);
    const matchingCombination = singleProduct.variants.find(
      (item) =>
        item.colorDescription === selectedColor &&
        item.packingDescription === selectedPackaging
    );
    console.log("matchingCombination", matchingCombination);
    setSelectedCombination(matchingCombination);
    setGrossPrice(Number(matchingCombination.grossPrice));
  };

  const uniqueColors = Array.from(
    new Set(singleProduct.variants.map((item) => item.colorDescription))
  );

  // **************************************************************************************

  const handleAddItem = () => {
    const data = {
      id: singleProduct.productId,
      item: singleProduct.itemDescription,
      color: selectedColor,
      package: selectedPackage,
      grossPrice: grossPrice * quantity,
      quantity: parseFloat(quantity),
      allColors: uniqueColors,
      allPackages: availablePackaging,
      image: singleProduct?.productImages[0]
        ? singleProduct?.productImages[0]
        : DEFAULT_IMAGE,
    };
    console.log("data", data);
    let index = cartItemList.findIndex(
      (item) =>
        item.id === data.id &&
        item.color === data.color &&
        item.package === data.package
    );
    console.log("clicked");
    if (index !== -1) {
      const newQuantity = cartItemList[index].quantity + data.quantity;
      const newGrossPrice = cartItemList[index].grossPrice + data.grossPrice;
      const updatedItem = {
        ...cartItemList[index],
        quantity: newQuantity,
        grossPrice: newGrossPrice,
      };
      const newCartItems = [...cartItemList];
      newCartItems[index] = updatedItem;
      addCartItem(newCartItems);
    } else {
      // If the object does not exist, add it to the array
      addCartItem([...cartItemList, data]);
    }
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Offcanvas placement="end" show={open} onHide={handleClose}>
        <Offcanvas.Body>
          <Form>
            <Row>
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

                  {uniqueColors.map((color, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      name="radio2"
                      value={selectedColor}
                      checked={selectedColor === color}
                      onClick={() => handleSelectColors(color)}
                      className="Btn-Blue-BG"
                      style={{
                        margin: "0.5rem 0.5rem 0.5rem 0rem",
                        backgroundColor:
                          selectedColor === color ? "#FDE9EC" : "#fff",
                        color: selectedColor === color ? "#C18185" : "black",
                        border: "1px solid #FDE9EC",
                      }}
                    >
                      {color}
                    </ToggleButton>
                  ))}
                </div>
                <div className="mt-3">
                  <h6 className="fw-bold">
                    Please Select Packaging Description:
                  </h6>

                  {selectedColor &&
                    availablePackaging.map((packaging, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        name="radio1"
                        value={packaging}
                        checked={selectedPackage === packaging}
                        onClick={() => handleSelectPackaging(packaging)}
                        className="Btn0-Blue-BG"
                        style={{
                          margin: "0.5rem 0.5rem 0.5rem 0rem",
                          backgroundColor:
                            selectedPackage === packaging ? "#FDE9EC" : "#fff",
                          color:
                            selectedPackage === packaging ? "#C18185" : "black",
                          border: "1px solid #FDE9EC",
                        }}
                      >
                        {packaging}
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
                <CartItem
                  setRefresh={setRefresh}
                  refresh={refresh}
                  handleClose={handleClose}
                />
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
