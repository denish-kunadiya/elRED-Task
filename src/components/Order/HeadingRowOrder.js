import React from "react";
import { Col, Row } from "react-bootstrap";

const HeadingRowOrder = () => {
  return (
    <Row
      className="mt-0 mb-2 "
      style={{
        padding: "0.5rem",
        backgroundColor: "rgb(220, 223, 229)",
      }}
    >
      <Col className=" d-flex justify-content-between border-1">
        <div>
          <div>Other Instruction</div>
        </div>
        <div>
          <div className="mb-0" style={{ color: "#BE212A" }}>
            Add
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default HeadingRowOrder;
