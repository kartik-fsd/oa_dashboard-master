import React, { useEffect } from "react";
import { Redirect, useHistory, withRouter } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const NonAuthLayout = ({ children, props }) => {
  const history = useHistory();
  const ot = sessionStorage.getItem("token");
  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  useEffect(() => {
    if (layoutModeType === "dark") {
      document.body.setAttribute("data-layout-mode", "dark");
    } else {
      document.body.setAttribute("data-layout-mode", "light");
    }
  }, [layoutModeType]);

  return ot ? history.goBack() : <div>{children}</div>;
};

export default withRouter(NonAuthLayout);
