import React, { useEffect, useState } from "react";
import { DEFAULT_IMAGE } from "../../config";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "../Loader";
import RecordFound from "../RecordFound";
import { useNavigate } from "react-router-dom";

const SubCategories = ({ subCategoriesList, loading }) => {
  const [subCategories, setSubCategories] = useState(subCategoriesList);
  const navigate = useNavigate();
  useEffect(() => {
    setSubCategories(subCategoriesList);
  }, [subCategoriesList]);

  console.log("subCategoriesList", subCategoriesList);
  console.log("loading", loading);

  const handleProduct = (id) => {
    navigate(`/products/${id}`, { state: { subCategoryId: id } });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : subCategories?.length ? (
        subCategories?.map((obj, index) => (
          <>
            <Col
              md={3}
              className="me-5 sub_category_col"
              onClick={() => handleProduct(obj?.subCategoryId)}
            >
              <Card className="">
                <Card.Img
                  src={
                    obj?.subCategoryImageURL
                      ? obj?.subCategoryImageURL
                      : DEFAULT_IMAGE
                  }
                  alt="Card image"
                />
                <Card.ImgOverlay className="sub_category_overlay">
                  <Card.Body className="sub_category_heading">
                    {obj?.subCategoryName}
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </>
        ))
      ) : (
        <RecordFound label="No Sub Category Found" />
      )}
      ;
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    subCategoriesList: state?.getSubCategoriesReducer?.subCategories?.result,
    loading: state?.getSubCategoriesReducer?.processing,
  };
};

export default connect(mapStateToProp)(SubCategories);
