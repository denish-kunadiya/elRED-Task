import {
  GET_PRODUCTS_PROCESSING,
  GET_PRODUCTS_SUCCESSFUL,
  STOP_GET_PRODUCTS_PROCESSING,
} from "./type";

const defaultReducer = {
  processing: false,
  products: null,
};

export const getProductsReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESSFUL:
      return {
        ...state,
        processing: false,
        products: action.payload,
      };
    case GET_PRODUCTS_PROCESSING:
      return {
        ...state,
        processing: true,
      };
    case STOP_GET_PRODUCTS_PROCESSING:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
};
