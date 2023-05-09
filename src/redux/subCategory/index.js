import {
  GET_SUB_CATEGORY_PROCESSING,
  GET_SUB_CATEGORY_SUCCESSFUL,
  STOP_GET_SUB_CATEGORY_PROCESSING,
} from "./type";

const defaultReducer = {
  processing: false,
  subCategories: null,
};

export const getSubCategoriesReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        processing: false,
        subCategories: action.payload,
      };
    case GET_SUB_CATEGORY_PROCESSING:
      return {
        ...state,
        processing: true,
      };
    case STOP_GET_SUB_CATEGORY_PROCESSING:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
};
