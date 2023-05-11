import React from "react";
import { Col, Row } from "react-bootstrap";

const HeadingRowCart = ({ open, setOpen }) => {
  return (
    <Row
      className="mt-0 mb-2 "
      style={{
        padding: "0rem 0rem 0.5rem 0rem",
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
        <div>
          <div className="mb-0">Price</div>
        </div>
        <div>
          <div
            className="mb-0 d-flex align-items-center"
            style={{ color: "#BE212A" }}
          >
            <i
              class="bi bi-pencil-fill px-1"
              style={{ fontSize: "0.7rem" }}
            ></i>
            <span style={{ fontSize: "0.7rem" }} onClick={() => setOpen(true)}>
              Edit
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default HeadingRowCart;
