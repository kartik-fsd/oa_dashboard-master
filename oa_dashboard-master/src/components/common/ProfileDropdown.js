import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import axios from "axios";
import { sessionDataToken } from "../../assets/config/sessionToken";
import { extract_token } from "../../assets/utils/common";
import { api } from "../../globalConfig";
import ModalFormSpocs from "../../pages/ManagerDashboard/ModalForm/ModalFormSpocs";
import ProfileModal from "./ProfileModal";
import { UserContext } from "../../layouts/Header";
import { oa_details } from "../../assets/utils/sow";
import { Context } from "../../App";

const ProfileDropdown = () => {
  const [userName, setUserName] = useState("Admin");
  const [userType, setUserType] = useState("");
  const [open, set_open] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileMod, setProfileMod] = useState(false);
  const [check, setCheck] = useState(false);
  const [profImg, setProfImg] = React.useState("");
  const [userData, setUserdata] = React.useState({});
  const [context, setContext] = useContext(Context);

  const oaListURL = api.OA_URL + oa_details;
  const pathName = api.VENDOR_URL + extract_token;

  React.useEffect(() => {
    axios
      .get(oaListURL)

      .then((res) => {
        setUserdata(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get("https://Crmbackend.onxtasks.com/test/getcurrenttime")
      .then((res) => {
        context.currentDate = res.data.date;
        setContext(...context);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [check]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect(() => {
  //     if (sessionStorage.getItem("authUser")) {
  //         const obj = JSON.parse(sessionStorage.getItem("authUser"));
  //         setUserName(user.first_name || obj.data.first_name || "Admin");
  //     }
  // }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const profileImg1 = (img) => {
    setProfImg(img);
  };

  return (
    <>
      <React.Fragment>
        <Dropdown
          isOpen={isProfileDropdown}
          toggle={toggleProfileDropdown}
          className="ms-sm-3 header-item topbar-user"
        >
          <DropdownToggle tag="button" type="button" className="btn">
            <span className="d-flex align-items-center">
              {userData?.profile_image?.length > 0 ? (
                <img
                  className="rounded-circle header-profile-user"
                  src={userData?.profile_image}
                  alt="Header Avatar"
                />
              ) : (
                <div className="avatar-xxs">
                  <div
                    className="avatar-title rounded"
                    style={{ backgroundColor: "#f07d47", color: "#b83016" }}
                  >
                    {userData?.full_name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              <span className="text-start ms-xl-2">
                <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text text-capitalize">
                  {userData?.full_name}
                </span>
                <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text text-capitalize">
                  {userData?.role?.split("_").join(" ")}
                </span>
              </span>
            </span>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <h6 className="dropdown-header text-capitalilze">
              Welcome {userName}!
            </h6>
            {/* <DropdownItem>
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem> */}
            {/* <DropdownItem href="/apps-chat">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Messages</span>
          </DropdownItem>
          <DropdownItem href="/apps-tasks-kanban">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Taskboard</span>
          </DropdownItem>
          <DropdownItem href="/pages-faqs">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Help</span>
          </DropdownItem> */}
            <div className="dropdown-divider"></div>
            {/* <DropdownItem href="/pages-profile">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </DropdownItem>
          <DropdownItem href="/pages-profile-settings">
            <span className="badge bg-soft-success text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Settings</span>
          </DropdownItem> */}
            {/* <DropdownItem
              onClick={() => {
                set_open(true);
              }}
            >
              <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Add Spoc</span>
            </DropdownItem> */}
            <DropdownItem
              onClick={() => {
                setProfileMod(true);
              }}
            >
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle" data-key="t-logout">
                Profile
              </span>
            </DropdownItem>
            <div className="dropdown-divider"></div>
            <DropdownItem
              href="/login"
              onClick={() => sessionStorage.removeItem("token")}
            >
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>

      <ProfileModal
        profileMod={profileMod}
        setProfileMod={setProfileMod}
        setProfImg={setProfImg}
        userData={userData}
        check={check}
        setCheck={setCheck}
      />
    </>
  );
};

export default ProfileDropdown;
