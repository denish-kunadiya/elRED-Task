import { ApiCall } from "../../helper";
import {
  GET_PRODUCTS_PROCESSING,
  GET_PRODUCTS_SUCCESSFUL,
  STOP_GET_PRODUCTS_PROCESSING,
} from "./type";

export const getProducts = (payload) => (dispatch) => {
  console.log("payload", payload);
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_PRODUCTS_PROCESSING });
    ApiCall(`reactAssignment/getProduct_${payload}.json`, "GET")
      .then((products) => {
        console.log("products", products);
        resolve(products.data);
        dispatch({
          type: GET_PRODUCTS_SUCCESSFUL,
          payload: products.data,
        });
      })
      .catch((error) => {
        reject(error);
        dispatch({ type: STOP_GET_PRODUCTS_PROCESSING });
        console.log("error in GET_PRODUCTS action", error.message);
      });
  });
};
