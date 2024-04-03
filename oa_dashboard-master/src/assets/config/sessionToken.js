import axios from "axios";

const sessionToken = sessionStorage.getItem("token")
  ? sessionStorage.getItem("token")
  : null;
// const sessionDataToken = {
//   headers: {
//     "x-access-token": sessionToken,
//     "content-type": "application/json",
//   },
// };

if (sessionToken?.length > 0) {
  axios.defaults.headers["x-access-token"] = sessionToken;
}

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params) => {
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}

export { sessionToken, APIClient };
