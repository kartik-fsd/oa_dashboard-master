module.exports = {
  api: {
    OA_URL: process.env.REACT_APP_BASE_URL + "oa_vendor",
    VENDOR_URL: process.env.REACT_APP_BASE_URL + "vendor",
    FINANCE_URL: process.env.REACT_APP_BASE_URL + "finance",
    AWS_URL: process.env.REACT_APP_BASE_URL + "aws",
    ONX_URL: process.env.REACT_APP_BASE_URL + "taskmo",
  },
  business: {
    BUSINESS_URL: process.env.REACT_APP_BUSINESS_URL,
  },
  farming: {
    farming_URL: process.env.REACT_APP_BASE_URL_FARMING_URL,
  },
};
