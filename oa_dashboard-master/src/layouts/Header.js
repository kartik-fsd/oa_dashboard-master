import React, { useEffect, useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";

//import images
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";

//import Components
// import SearchOption from '../Components/Common/SearchOption';
import LanguageDropdown from "../components/common/LanguageDropdown";
// import WebAppsDropdown from '../Components/Common/WebAppsDropdown';
// import MyCartDropdown from '../Components/Common/MyCartDropdown';
import FullScreenDropdown from "../components/common/FullScreenDropdown";
//import NotificationDropdown from "../components/common/NotificationDropdown";
import ProfileDropdown from "../components/common/ProfileDropdown";
import LightDark from "../components/common/LightDark";
import { api } from "../globalConfig";
import { extract_token } from "../assets/utils/common";
import axios from "axios";
import { Context } from "../App";
export const UserContext = createContext();
const Header = ({
  setLayoutModeType,
  layoutModeType,
  headerClass,
  setSideBar,
  sideBar,
}) => {
  const [context, setContext] = useContext(Context);

  const [search, setSearch] = useState(false);
  const [userData, setUserData] = useState({});

  const toogleSearch = () => {
    setSearch(!search);
  };

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    setSideBar(!sideBar);

    if (windowSize > 767)
      document.querySelector(".hamburger-icon").classList.toggle("open");

    // For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }
    if (windowSize > 767) {
      // document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.getAttribute("data-sidebar-size") === "lg"
        ? document.documentElement.setAttribute("data-sidebar-size", "sm")
        : document.documentElement.setAttribute("data-sidebar-size", "lg");
    }
  };

  useEffect(() => {
    const pathName = api.VENDOR_URL + extract_token;

    axios
      .get(pathName)
      .then((res) => {
        context.oaDetials = res.data;
        setContext(...context);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserContext.Provider value={[context, setContext]}>
      <React.Fragment>
        <header
          id="page-topbar"
          className="page-topbar"
          style={sideBar ? { left: "0" } : { outline: "none" }}
        >
          <div className="layout-width">
            <div className="navbar-header">
              <div className="d-flex">
                {/* <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="40" width="120" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoDark} alt="" height="40" width="120" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="40" width="120" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoLight} alt="" height="40" width="120" />
                  </span>
                </Link>
              </div> */}

                <button
                  onClick={toogleMenuBtn}
                  type="button"
                  className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                  id="topnav-hamburger-icon"
                >
                  <span className="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>

                {/* <SearchOption /> */}
              </div>

              <div className="d-flex align-items-center">
                <Dropdown
                  isOpen={search}
                  toggle={toogleSearch}
                  className="d-md-none topbar-head-dropdown header-item"
                >
                  <DropdownToggle
                    type="button"
                    tag="button"
                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  >
                    <i className="bx bx-search fs-22"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                    <Form className="p-3">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search ..."
                            aria-label="Recipient's username"
                          />
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#ec5c24",
                              color: "whitesmoke",
                              transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#dd4319")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "#ec5c24")
                            }
                            type="submit"
                          >
                            <i className="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </div>
                    </Form>
                  </DropdownMenu>
                </Dropdown>

                {/* LanguageDropdown */}
                {/* <LanguageDropdown /> */}

                {/* WebAppsDropdown */}
                {/* <WebAppsDropdown /> */}

                {/* MyCartDropdwon */}
                {/* <MyCartDropdown /> */}

                {/* FullScreenDropdown */}
                <FullScreenDropdown />

                {/* Dark/Light Mode set */}
                <LightDark
                  layoutMode={layoutModeType}
                  setLayoutModeType={setLayoutModeType}
                />

                {/* NotificationDropdown */}
                {/* <NotificationDropdown /> */}

                {/* ProfileDropdown */}
                <ProfileDropdown userData={userData} />
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default Header;
