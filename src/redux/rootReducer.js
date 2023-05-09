import { combineReducers } from "redux";
import { loginReducer } from "./userLogin";
import { getCategoriesReducer } from "./mainCategory";
import { getSubCategoriesReducer } from "./subCategory";
import { getProductsReducer } from "./products";
export default combineReducers({
  loginReducer,
  getCategoriesReducer,
  getSubCategoriesReducer,
  getProductsReducer,
});
