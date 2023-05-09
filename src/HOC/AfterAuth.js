import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarCom from "../components/NavbarCom";
import Sidebar from "../components/Sidebar";

const AfterAuth = ({ children }) => {
  return (
    <div>
      <NavbarCom />

      <Container
        fluid
        style={{
          marginTop: "4.6%",
          // height: "80vh",
        }}
      >
        <Row>
          <Col
            md={2}
            id="sidebar-wrapper"
            className="px-0 "
            style={
              {
                // overflow: "hidden !important",
                // height: "100vh",
              }
            }
          >
            <Sidebar />
          </Col>
          <Col
            md={10}
            id="page-content-wrapper"
            className="py-4"
            style={{
              backgroundColor: "#DCDFE5",

              overflowY: "scroll",
              height: "100vh",
            }}
          >
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AfterAuth;
