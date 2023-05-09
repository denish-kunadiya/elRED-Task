import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import RecordFound from "../RecordFound";
import { DEFAULT_IMAGE } from "../../config";
import CartModal from "../Cart/CartModal";

const ProductList = ({ productList, loading }) => {
  console.log("productList", productList);
  console.log("loading", loading);

  const [products, setProducts] = useState(productList);
  const [open, setOpen] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  const handlePopUp = (data) => {
    setOpen(true);
    setSingleProduct(data);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : products?.length ? (
        products.map((obj, index) => (
          <Col md={4}>
            <Card onClick={() => handlePopUp(obj)}>
              <span className="position-absolute top-0 end-0 mt-3 me-3">
                <i class="bi bi-heart"></i>
              </span>
              <Card.Img
                variant="top"
                src={
                  obj?.productImages[0] ? obj?.productImages[0] : DEFAULT_IMAGE
                }
                height={"200px"}
                style={{ padding: "3rem" }}
              />
              <Card.Body>
                <Card.Title>{obj?.itemDescription}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <RecordFound label={"No Sub-category/Product found"} />
      )}

      {open && (
        <CartModal
          open={open}
          handleClose={() => setOpen(false)}
          singleProduct={singleProduct}
        />
      )}
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    productList: state?.getProductsReducer?.products?.result,
    loading: state?.getProductsReducer?.processing,
  };
};

export default connect(mapStateToProp)(ProductList);
