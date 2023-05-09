import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import NavbarCom from "../components/NavbarCom";
import Sidebar from "../components/Sidebar";
import CardElement from "../Shared/CardElement";

const AfterAuth = ({ children }) => {
  return (
    <div>
      <NavbarCom />

      <Container fluid>
        <Row
          style={{
            backgroundColor: "#DCDFE5",
            padding: "30px",
            height: "100vh",
          }}
        >
          <Col md={12}>{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default AfterAuth;
