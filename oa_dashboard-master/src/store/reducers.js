import { combineReducers } from "redux";

import Login from "./auth/login/reducer";
import Layout from "./layouts/reducer";
// import Profile from "./auth/profile/reducer";
// import Account from "./auth/register/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  // Profile,
  // Account,
});

export default rootReducer;
