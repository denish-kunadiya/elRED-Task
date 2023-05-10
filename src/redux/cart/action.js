import { ApiCall } from "../../helper";
import { GET_CATEGORIES } from "../../helper/url";
import { SET_CART_ITEMS_SUCCESSFUL } from "./type";

export const setCartItems = (payload) => {
  return {
    type: SET_CART_ITEMS_SUCCESSFUL,
    payload: payload,
  };
};
