module.exports = {
  api: {
    OA_URL: "http://43.204.241.215:8014/oa_vendor",
    VENDOR_URL: "http://43.204.241.215:8014/vendor",
    FINANCE_URL: process.env.REACT_APP_BASE_URL + "finance",
    AWS_URL: process.env.REACT_APP_BASE_URL + "aws",
    TASKMO_URL: process.env.REACT_APP_BASE_URL + "taskmo",
  },
  business: {
    BUSINESS_URL: "http://43.204.241.215:8014/",
  },
  farming: {
    farming_URL: process.env.REACT_APP_BASE_URL_FARMING_URL,
  },
};
