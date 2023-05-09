import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Sidebar = () => {
  const navigate = useLocation();
  const path = navigate.pathname;
  console.log("path", navigate);

  return (
    <>
      <Row
        style={{ overflow: "hidden" }}
        className="mt-4 d-flex justify-content-center"
      >
        <Link to={"/"} className="text-decoration-none ms-5 mt-2 mt" style={{}}>
          <Col
            md={8}
            className=" ps-0 fw-bold"
            style={{
              padding: "1rem",
              background: path == "/" ? "#FFF2F2" : "#FEFEFE",
              borderRadius: "1rem",
              color: path == "/" ? "#781A1A" : "#BABABA",
            }}
          >
            <i class="bi bi-bar-chart px-3"></i>
            Dashboard
          </Col>
        </Link>
        <Link
          to={"/products"}
          className="text-decoration-none ms-5 mt-2"
          style={{}}
        >
          <Col
            md={8}
            className=" ps-0 fw-bold"
            style={{
              padding: "1rem",
              background: path == "/products" ? "#FFF2F2" : "#FEFEFE",
              borderRadius: "1rem",
              color: path === "/products" ? "#781A1A" : "#BABABA",
            }}
          >
            <i class="bi bi-kanban-fill px-3"></i> All Products
          </Col>
        </Link>
        <Link to={"/"} className="text-decoration-none ms-5 mt-2" style={{}}>
          <Col
            md={8}
            className=" ps-0 fw-bold"
            style={{
              padding: "1rem",
              background: path == "/orders" ? "#FFF2F2" : "#FEFEFE",
              borderRadius: "1rem",
              color: path === "/orders" ? "#781A1A" : "#BABABA",
            }}
          >
            <i class="bi bi-border-all px-3"></i>
            Orders
          </Col>
        </Link>
        <Link to={"/"} className="text-decoration-none ms-5 mt-2" style={{}}>
          <Col
            md={8}
            className=" ps-0 fw-bold"
            style={{
              padding: "1rem",
              background: path == "/favourites" ? "#FFF2F2" : "#FEFEFE",
              borderRadius: "1rem",
              color: path === "/favourites" ? "#781A1A" : "#BABABA",
            }}
          >
            <i class="bi bi-heart-fill px-3 px-3"></i>
            Favourites
          </Col>
        </Link>
        <Link to={"/"} className="text-decoration-none ms-5 mt-2" style={{}}>
          <Col
            md={8}
            className=" ps-0 fw-bold"
            style={{
              padding: "1rem",
              background: path == "/new-arrivals" ? "#FFF2F2" : "#FEFEFE",
              borderRadius: "1rem",
              color: path === "/new-arrivals" ? "#781A1A" : "#BABABA",
            }}
          >
            <i class="bi bi-aspect-ratio-fill px-3"></i>
            New Arrivals
          </Col>
        </Link>
      </Row>
    </>
  );
};

export default Sidebar;
