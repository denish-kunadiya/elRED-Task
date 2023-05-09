import { ApiCall } from "../../helper";
import { LOGIN_BUSINESS_USER, VERIFY_LOGIN } from "../../helper/api/url";
import {
  LOGIN_USER_SUCCESSFUL,
  LOGIN_PROCESSING,
  STOP_LOGIN_PROCESSING,
  OTP_SEND,
  SET_ACCESS_TOKEN,
} from "./type";

export const loginUser = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOGIN_PROCESSING });
    ApiCall(LOGIN_BUSINESS_USER, "post", payload)
      .then((loginUser) => {
        console.log("loginUser", loginUser);
        resolve(loginUser);
        dispatch({
          type: LOGIN_USER_SUCCESSFUL,
          payload: loginUser,
        });
      })
      .catch((error) => {
        dispatch({ type: STOP_LOGIN_PROCESSING });
        console.log("error in login action", error.message);
      });
  });
};
