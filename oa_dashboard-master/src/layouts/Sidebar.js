import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";

//Import Components
import VerticalLayout from "./VerticalLayouts";
import TwoColumnLayout from "./TwoColumnLayout";
import { Container } from "reactstrap";
import HorizontalLayout from "./HorizontalLayout";
import VerticalLayouts from "./VerticalLayouts";
import onx from "../assets/images/onxAwign.svg";
const Sidebar = ({ layoutModeType, sideBar, setSideBar }) => {
  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable");
      });
    }
  });

  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (
      document.documentElement.getAttribute("data-sidebar-size") === "sm-hover"
    ) {
      document.documentElement.setAttribute(
        "data-sidebar-size",
        "sm-hover-active"
      );
    } else if (
      document.documentElement.getAttribute("data-sidebar-size") ===
      "sm-hover-active"
    ) {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    } else {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    }
  };

  return (
    <React.Fragment>
      <div
        className="app-menu navbar-menu"
        style={
          sideBar
            ? {
                display: "none",
              }
            : { background: "#fff" }
        }
      >
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-lg">
              <img
                src={onx}
                alt="onx"
                role="presentation"
                height="40"
                width="120"
              />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-lg">
              <img
                src={onx}
                alt="onx"
                role="presentation"
                height="40"
                width="120"
              />
            </span>
          </Link>
          <button
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <React.Fragment>
          <SimpleBar id="scrollbar" className="h-100">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <VerticalLayout layoutType={setSideBar} />
              </ul>
            </Container>
          </SimpleBar>
          <div className="sidebar-background"></div>
        </React.Fragment>
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
