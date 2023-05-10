import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import RecordFound from "../RecordFound";
import { DEFAULT_IMAGE } from "../../config";
import CartModal from "../Cart/CartModal";

const ProductList = ({ productList, loading, setRefresh, refresh }) => {
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
          <Col md={3} className="me-4 mb-5">
            <Card onClick={() => handlePopUp(obj)}>
              <span className="position-absolute top-0 end-0 mt-3 me-3">
                <i class="bi bi-heart"></i>
              </span>
              <Card.Body>
                <Card.Img
                  src={
                    obj?.productImages[0]
                      ? obj?.productImages[0]
                      : DEFAULT_IMAGE
                  }
                  // height={"150rem"}
                  style={{ padding: "0.5rem 3rem 0.8rem 3rem" }}
                />
                <div className="product_heading">{obj?.itemDescription}</div>
                <div className="product_description text-muted">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </div>
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
          hide={false}
          setRefresh={setRefresh}
          refresh={refresh}
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
