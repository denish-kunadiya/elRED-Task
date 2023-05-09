import {
  LOGIN_USER_SUCCESSFUL,
  LOGIN_PROCESSING,
  STOP_LOGIN_PROCESSING,
  SET_ACCESS_TOKEN,
  OTP_SEND,
} from "../userLogin/type";

const defaultReducer = {
  isLoggedIn: false,
  processing: false,
  loginUser: null,
  loginData: null,
  accessToken: null,
};

export const loginReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    case OTP_SEND:
      return {
        ...state,
        processing: false,
        isLoggedIn: true,
        loginData: action.payload,
      };
    case LOGIN_USER_SUCCESSFUL:
      return {
        ...state,
        processing: false,
        isLoggedIn: true,
        loginUser: action.payload,
      };
    case LOGIN_PROCESSING:
      return {
        ...state,
        processing: false,
      };
    case STOP_LOGIN_PROCESSING:
      return {
        ...state,
        processing: false,
      };

    // case SET_ACCESS_TOKEN:
    //   return {
    //     ...state,
    //     // accessToken: action.payload,
    //   };
    default:
      return state;
  }
};
