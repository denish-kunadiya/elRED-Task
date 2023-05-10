import { combineReducers } from "redux";
import { loginReducer } from "./userLogin";
import { getCategoriesReducer } from "./mainCategory";
import { getSubCategoriesReducer } from "./subCategory";
import { getProductsReducer } from "./products";
import { cartItemsReducer } from "./cart";
export default combineReducers({
  loginReducer,
  getCategoriesReducer,
  getSubCategoriesReducer,
  getProductsReducer,
  cartItemsReducer,
});
