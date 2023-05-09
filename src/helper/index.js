import axios from "axios";
import { BASE_URL } from "../config/index";

export const ApiCall = (url, method, data = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      headers: {
        ...headers,
      },
    })
      .then(resolve)
      .catch(reject);
  });
};
