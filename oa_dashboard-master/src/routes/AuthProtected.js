import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
// import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { logoutUser } from "../store/actions";
import { useState } from "react";

const AuthProtected = (props) => {
  const getSToken = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const { loading, setLoadign } = useState("");
  const { token, settToken } = useState(getSToken);

  // useEffect(() => {
  //   if (userProfile && !loading && token) {
  //     setAuthorization(token);
  //   } else if (!userProfile && loading && !token) {
  //     dispatch(logoutUser());
  //   }
  // }, [token, , loading, dispatch]);

  /*
    redirect is un-auth access protected routes via url
    */
  const ot = sessionStorage.getItem("token");
  if (!ot) {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
