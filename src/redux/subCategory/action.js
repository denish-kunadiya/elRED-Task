import { ApiCall } from "../../helper";
import { GET_CATEGORIES, GET_SUB_CATEGORIES } from "../../helper/url";
import {
  GET_SUB_CATEGORY_PROCESSING,
  GET_SUB_CATEGORY_SUCCESSFUL,
  STOP_GET_SUB_CATEGORY_PROCESSING,
} from "./type";

export const getSubCategories = (payload) => (dispatch) => {
  console.log("payload", payload);
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_SUB_CATEGORY_PROCESSING });
    ApiCall(`reactAssignment/getSubCategory_${payload}.json`, "GET")
      .then((subCategories) => {
        console.log("subCategories", subCategories);
        resolve(subCategories.data);
        dispatch({
          type: GET_SUB_CATEGORY_SUCCESSFUL,
          payload: subCategories.data,
        });
      })
      .catch((error) => {
        reject(error);
        dispatch({ type: STOP_GET_SUB_CATEGORY_PROCESSING });
        console.log("error in GET_SUB_CATEGORY action", error.message);
      });
  });
};
