import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavbarCom = () => {
  // console.log(profileItem);

  let pathName = window.location.pathname;

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="nav px-3 text-dark"
        // style={{ position: "relative !important", zIndex: "100 !important" }}
      >
        <Navbar.Brand href="#home" className="ps-0 text-dark">
          {/* <img src="/assets/img/tbaconsulting.png"></img> */}
          LOGO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="mx-4">
            <NavLink style={{ textDecoration: "none" }} to={"/perfil"}>
              <div
                className={`${
                  pathName == "/perfil" && "Nav-after"
                } d-flex align-items-center text-dark`}
              >
                <Nav.Link className="text-dark">
                  <img
                    className={`${pathName == "/perfil" && "Imgborder"}`}
                    src={"assets/img/noUser.png"}
                    alt=""
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                </Nav.Link>
                Denish
              </div>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarCom;
