import React from "react";
import { Image, Row, Col } from "react-bootstrap";

function CartItem({ item }) {
  return (
    <Row className="align-items-center">
      <Col xs={1}>
        <Image src={"item.image"} fluid />
      </Col>
      <Col xs={4}>
        <div>
          <strong>{"item.name"}</strong>
        </div>
        <div>{"item.color"}</div>
      </Col>
      <Col xs={2}>
        <div>{"item.quantity"}</div>
      </Col>
      <Col xs={4} className="text-end">
        <div>
          <strong>244445</strong>
        </div>
      </Col>
    </Row>
  );
}

export default CartItem;
