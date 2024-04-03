import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import RightSidebar from "../components/common/RightSidebar";

//import actions
import { changeLayoutMode } from "../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { topbarThemeTypes } from "../components/constants/layout";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");
  const dispatch = useDispatch();
  const [sideBar, setSideBar] = useState(false);

  const [layoutModeType, setLayoutModeType] = useState("light");

  /*
    layout settings
    */
  useEffect(() => {
    if (layoutModeType == "dark") {
      document.body.setAttribute("data-layout-mode", "dark");
    } else {
      document.body.setAttribute("data-layout-mode", "light");
    }
  }, [layoutModeType]);
  /*
    call dark/light mode
    */

  // const onChangeLayoutMode = (value) => {
  //   if (value == "dark") {
  //     document.body.setAttribute("data-layout-mode", "dark");
  //   } else {
  //     document.body.setAttribute("data-layout-mode", "light");
  //   }
  // };

  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutModeType}
          setLayoutModeType={setLayoutModeType}
          setSideBar={setSideBar}
          sideBar={sideBar}
        />
        <Sidebar
          layoutModeType={layoutModeType}
          sideBar={sideBar}
          setSideBar={setSideBar}
        />
        <div
          className="main-content"
          style={sideBar ? { marginLeft: "0" } : { outline: "none" }}
        >
          {props.children}
          {/* <Footer /> */}
        </div>
      </div>
      {/* <RightSidebar /> */}
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);
