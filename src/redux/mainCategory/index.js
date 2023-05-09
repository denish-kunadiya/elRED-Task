import {
  GET_CATEGORY_PROCESSING,
  GET_CATEGORY_SUCCESSFUL,
  STOP_GET_CATEGORY_PROCESSING,
} from "./type";

const defaultReducer = {
  processing: false,
  mainCategories: null,
};

export const getCategoriesReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    case GET_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        processing: false,
        mainCategories: action.payload,
      };
    case GET_CATEGORY_PROCESSING:
      return {
        ...state,
        processing: false,
      };
    case STOP_GET_CATEGORY_PROCESSING:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
};
