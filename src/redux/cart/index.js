import { SET_CART_ITEMS_SUCCESSFUL } from "./type";

const defaultReducer = {
  processing: false,
  cartItems: [],
};

export const cartItemsReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    case SET_CART_ITEMS_SUCCESSFUL:
      return {
        ...state,
        processing: false,
        cartItems: action.payload,
      };
    // case GET_CATEGORY_PROCESSING:
    //   return {
    //     ...state,
    //     processing: false,
    //   };
    // case STOP_GET_CATEGORY_PROCESSING:
    //   return {
    //     ...state,
    //     processing: false,
    //   };
    default:
      return state;
  }
};
