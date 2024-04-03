import axios from "axios";
import { login_number } from "../../../assets/utils/login";
import { loginUser } from "./action";
import { LOGIN_USER } from "./actionTypes";

export const loginUsingOtp = (props) => async (dispatch) => {
  try {
    axios
      .post(login_number, props)
      .then((res) => {
        dispatch(
          loginUser(LOGIN_USER, { type: res.data, payload: props.history })
        );
      })
      .catch((e) => console.log(e));
  } catch (error) {
    dispatch();
  }
};
