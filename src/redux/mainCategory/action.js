import { ApiCall } from "../../helper";
import { GET_CATEGORIES } from "../../helper/url";
import {
  GET_CATEGORY_PROCESSING,
  GET_CATEGORY_SUCCESSFUL,
  STOP_GET_CATEGORY_PROCESSING,
} from "./type";

export const getMainCategories = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_CATEGORY_PROCESSING });
    ApiCall(GET_CATEGORIES, "GET")
      .then((mainCatedory) => {
        console.log("mainCatedory", mainCatedory);
        resolve(mainCatedory.data);
        dispatch({
          type: GET_CATEGORY_SUCCESSFUL,
          payload: mainCatedory.data,
        });
      })
      .catch((error) => {
        reject(error);
        dispatch({ type: STOP_GET_CATEGORY_PROCESSING });
        console.log("error in GET_CATEGORY_PROCESSING action", error.message);
      });
  });
};
