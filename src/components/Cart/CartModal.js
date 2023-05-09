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

const CartModal = ({ open, handleClose, singleProduct }) => {
  const [quantity, setQuantity] = useState(12);
  const [urgentOrder, setUrgentOrder] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUrgentOrderChange = (event) => {
    setUrgentOrder(event.target.checked);
  };
  const [selectColor, setSelectColor] = useState(0);
  const [selectPackage, setSelectPackage] = useState(0);

  //   console.log("singleProduct", singleProduct);
  console.log("selectColor", selectColor);
  console.log("selectPackage", selectPackage);

  const handleAddItem = () => {
    const matchingProduct = singleProduct.variants.find(
      (product) =>
        product.colorDescription === selectColor &&
        product.packingDescription === selectPackage
    );

    console.log("matchingProduct", matchingProduct);

    if (matchingProduct) {
      console.log("matched");
    } else {
      console.log("Item does not match");
    }
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

  console.log(uniqueData);

  return (
    <Container className="p-4">
      <Offcanvas placement="end" show={open} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar Title</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row style={{ height: "100vh" }}>
              <Col md={6} style={{ overflowY: "auto" }}>
                <div style={{ textAlign: "center" }}>
                  <Card style={{ padding: "3rem 10rem" }}>
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
                  <h3>#{singleProduct.itemNumber}</h3>
                  <div className="d-flex justify-content-between">
                    <p>{singleProduct.itemDescription}</p>
                    <p>{singleProduct.itemDescription}</p>
                  </div>
                </div>
                <div>
                  <h5>Please Select Color:</h5>

                  {uniqueData.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      name="radio2"
                      value={selectColor}
                      checked={selectColor === radio.colorDescription}
                      onClick={() => setSelectColor(radio.colorDescription)}
                      className="Btn-Blue-BG"
                      style={{
                        margin: "0.5rem",
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
                <div>
                  <h5>Please Select Packaging Description:</h5>

                  {uniquePackage.map((obj, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      name="radio1"
                      value={selectPackage}
                      checked={selectPackage === obj.packingDescription}
                      onClick={() => setSelectPackage(obj.packingDescription)}
                      className="Btn0-Blue-BG"
                      style={{
                        margin: "0.5rem",
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
              <Col md={6}>hello</Col>
            </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default CartModal;
