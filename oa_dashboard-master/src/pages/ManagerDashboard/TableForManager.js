import axios from "axios";
import React, { useContext } from "react";

import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import OtpInput from "react-otp-input";
import { Switch, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Tooltip,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import { extract_token } from "../../assets/utils/common";
import {
  aravindSowAdd,
  confirm_sow_enable,
  delete_sow_new,
  sow_email_otp,
  sow_get_target,
} from "../../assets/utils/dashboard";
import { manager_projects, crm_access } from "../../assets/utils/sow";
import { api } from "../../globalConfig";
import faqImg from "../../assets/images/faq-img.png";
import "./ManagerDashboard.css";
import { toast, ToastContainer } from "react-toastify";
import ItemDetails from "../NFTMarketDetails/Itemdetails/Index";
import ManagerEdit from "./managerChanges/ManagerEdit";
import ModalFormSpocs from "./ModalForm/ModalFormSpocs";
import Swal from "sweetalert2";
import DeleteModal from "../../components/common/DeleteModal";
import {
  business_projects,
  finance_projects,
} from "../../assets/utils/Business";

import { Context } from "../../App";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
      minWidth: "120px",
      center: true,
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  table: {
    style: {
      minHeight: "400px",
    },
  },
};

const ExpandableRowComponent = (props) => {
  const dataTarget = props?.data?.target;

  const ManagerTargetSet = [...dataTarget].map((item) => item.manager_target);

  const ManagerTargetAchi = [...dataTarget].map(
    (item) => item.manager_achieved
  );
  var obj1 = { Target: "Target" };
  var obj2 = { Target: "Target Achieved" };

  for (let i = 0; i < dataTarget.length; i++) {
    obj1[dataTarget[i].target_month] = dataTarget[i].manager_target;
    obj2[dataTarget[i].target_month] = dataTarget[i].manager_achieved;
  }

  const customStyles = {
    rows: {
      style: {
        minHeight: "36px",
        // border: '1px solid black'
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",

        // border: '1px solid black'
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        // border: '1px solid black',
        // borderRight: '1px solid black'
      },
    },
    table: {
      style: {
        minHeight: "400px",
      },
    },
  };

  const columns = [
    {
      name: "Month",
      selector: (row) => row.Target,
      center: true,
      width: "80px",
    },
    {
      name: "Jan",
      selector: (row) => row.Jan,
      center: true,
      width: "80px",
    },
    {
      name: "Feb",
      selector: (row) => row.Feb,
      center: true,
      width: "80px",
    },
    {
      name: "Mar",
      selector: (row) => row.Mar,
      center: true,
      width: "80px",
    },
    {
      name: "Apr",
      selector: (row) => row.Apr,
      center: true,
      width: "80px",
    },
    {
      name: "May",
      selector: (row) => row.May,
      center: true,
      width: "80px",
    },

    {
      name: "Jun",
      selector: (row) => row.Jun,
      center: true,
      width: "80px",
    },
    {
      name: "Jul",
      selector: (row) => row.Jul,
      center: true,
      width: "80px",
    },
    {
      name: "Aug",
      selector: (row) => row.Aug,
      center: true,
      width: "80px",
    },
    {
      name: "Sep",
      selector: (row) => row.Sep,
      center: true,
      width: "80px",
    },
    {
      name: "Oct",
      selector: (row) => row.Oct,
      center: true,
      width: "80px",
    },
    {
      name: "Nov",
      selector: (row) => row.Nov,
      center: true,
      width: "80px",
    },
    {
      name: "Dec",
      selector: (row) => row.Dec,
      center: true,
      width: "80px",
    },
  ];

  const data = [obj1, obj2];

  return (
    <div style={{ height: "150px" }} className={""}>
      <DataTable columns={columns} data={data} customStyles={customStyles} />
    </div>
  );
};

createTheme("VendorTable", {
  text: {
    primary: "black",
    secondary: "#b2b2b2",
  },
  background: {
    default: "#fff",
  },
  boxshadow: {
    default: "5px 5px 30px #DEDEDEBF",
  },
  headCells: {
    default: "#64abdd",
  },
  divider: {
    default: "#f4f4f4",
  },
  cell: {
    style: {
      height: "60px !important",
    },
  },

  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

const TableForManager = (props) => {
  const { dmCamp, dmSow, switchData } = props;

  console.log(switchData, "tesitng");
  const history = useHistory();
  const location = useLocation();

  console.log(location.pathname, "testingonit");

  // console.log(location.pathname.split("/")[1], "testinglocation");

  const [sowId1, setSowId1] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const [open2, setOpen2] = React.useState(null);
  const [open3, setOpen3] = React.useState(null);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [itemprops, setItemProps] = React.useState("");
  const [omitData, setOmitData] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [apiData, setApiData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setIsErr] = React.useState(false);
  const [userType, setUserType] = React.useState("");
  const [code, setCode] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const [managerOaData, setManagerOaData] = React.useState({});
  const [managerData, setManagerData] = React.useState({});
  const [reload, setReload] = React.useState(false);
  const [omit2, setOmit2] = React.useState(false);
  const [omit3, setOmit3] = React.useState(false);
  const [omit4, setOmit4] = React.useState(false);
  const [omit5, setOmit5] = React.useState(false);
  const [todaysData, setTodaysData] = React.useState([]);
  const [link, setLink] = React.useState("");
  const [open_spoc, set_open_spoc] = React.useState(false);
  const [sowId2, setSowId2] = React.useState("");
  const [data, setData] = React.useState({});
  const [typeData, setTypeData] = React.useState(undefined);
  // const [userId, setUserId] = React.useState("");
  const [projectId, setProjectId] = React.useState(0);
  const [ttop, setttop] = React.useState(false);
  const [oaName, setOaName] = React.useState("");
  const [id, setId] = React.useState("");
  const [onClickData, setOnClickData] = React.useState({});
  const [relieveMod, setRelieveMod] = React.useState(false);
  const [deleteProjectId, setDeleteProjectId] = React.useState("");
  const [businessData, setBusinessData] = React.useState([]);
  const [financeData, setFinanceData] = React.useState([]);
  const [context, setContext] = useContext(Context);

  console.log(businessData, "buss");
  // console.log(userId, "type");

  const pathName = api.VENDOR_URL + extract_token;

  // const [dmLeads, setDmLeads] = React.useState([]);
  const openview = (d) => {
    setItemProps(d);
    setOpen3(true);
  };

  const closeview = () => {
    setOpen3(false);
  };

  const handleClose4 = () => {
    setOpen4(!open4);
    setTypeData("");
  };
  const handleClose5 = () => {
    setOpen5(!open5);
  };
  const handleClose6 = (d) => {
    setOpen6(!open6);
    // console.log(d.sow_id, "sowid");
  };

  const handleChangeType = (e) => {
    setTypeData(e.target.value);
    data.user_type = e.target.value;
  };

  const emailOtp = api.VENDOR_URL + sow_email_otp;

  const callOtpFunction = (id, leadStatus) => {
    const postData = {
      sow_id: id,
    };

    axios
      .post(emailOtp, postData)
      .then((res) => {
        setOpen(true);
        setSowId1(id);
        setStatus(leadStatus);
        setCheck(!check);
      })
      .catch((err) => console.log(err.message));
  };

  const handleLink = (sowid) => {
    let path = "https://app.backend.taskmo.co/sharemedia";
    let body = {};
    body.user_id = "99231";
    body.sow_id = sowid;
    axios
      .post(path, body)
      .then((res) => setLink(res.data.link))
      .catch((err) => console.log(err));
  };

  function copyDmLink(id, name) {
    var copyText = document.getElementById(id);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    toast(`Copied ${name} Campaign`, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      className: "bg-success text-white",
    });
  }

  const handleSpocSow = (data) => {
    set_open_spoc(true);
    setSowId2(data.sow_id);
  };

  // console.log(context.oaDetials, "context.oaDetials?.type");
  // React.useEffect(() => {
  //   const link = api.OA_URL + "/oa_details";
  //   axios.get(link).then((res) => {
  //     setUserId(res.data.data.id);
  //   });
  // }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const link = api.VENDOR_URL + crm_access;
    data.project_id = projectId;
    // data.created_by = userId;
    // console.log(data, "lin");

    axios
      .post(link, data)
      .then((res) => {
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          handleClose5();
        }
      })
      .catch((err) => {
        toast(err.response.data.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      });
  };

  const columns = [
    {
      name: "Project ID",
      width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,

      // width:'180px',
      center: true,
    },
    {
      name: "Project Details",
      selector: (row) => row.brand_logo,
      sortable: true,
      center: true,

      minWidth: "250px",
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            gap: "10px",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
          <div>
            <div
              className={`flex-shrink-0 chat-user-img 
                ${
                  d.add_lead_status == "enable"
                    ? "Active"
                    : d.add_lead_status == "disable"
                    ? "Hold"
                    : d.add_lead_status == "none"
                    ? "New"
                    : d.add_lead_status == "closed"
                    ? "Closed"
                    : "Disable"
                } 
                "user-own-img gap-2`}
            >
              <img
                src={d.brand_logo}
                alt="brand logo"
                className="rounded-avatar-xs"
                width="40px"
                height={"40px"}
                // style={{ borderRadius: "50%" }}
              />
              <span className="user-status"></span>
            </div>
          </div>

          <div>{d.project_title}</div>
        </div>
      ),
      // center: true,
    },
    //   {
    //     name: "Enable For",
    //     selector: (row) => row.enable_for,
    //     center: true,
    //   },
    //   {
    //     name: "App View Status",
    //     selector: (row) => row.app_view_status,
    //     center: true,
    //   },
    //   {
    //     name: "Project Id",
    //     selector: (row) => row.project_id,
    //     center: true,
    //   },
    // {
    //   name: "Project Title",
    //   selector: (row) => row.project_title,
    //   sortable: true,

    //   center: true,
    //   // width:'180px',
    // },
    // {
    //   name: "Team",
    //   selector: (row) => row.main_team,
    //   sortable: true,
    //   center: true,
    //   cell: (d) => (
    //     <div onClick={() => handleClose6(d)}>
    //       {d.main_team && (
    //         <div className="d-flex gap-1 align-items-center">
    //           <p className="m-0">{d.main_team}</p>
    //           <span
    //             id="tooltipTop"
    //             style={{
    //               padding: "0",
    //               border: "none",
    //               fontSize: "16px",
    //               display: "flex",
    //               cursor: "pointer",
    //             }}
    //             onMouseEnter={() => {
    //               setManagerOaData({ manager: d.manager_name, oa: d.oa_name });
    //             }}
    //           >
    //             {/* <i className=" ri-information-line"></i> */}
    //           </span>
    //           {/* <UncontrolledTooltip placement="top" target="tooltipTop">
    //             {Object.keys(managerOaData).length > 0
    //               ?
    //               <>
    //               <div>Manager: {managerOaData.manager == "null"?'no data':  managerOaData.manager}</div>
    //               <div>KAM: {managerOaData.oa}</div>

    //               </>
    //               : "No Data"}
    //           </UncontrolledTooltip> */}
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },
    {
      name: "Team",
      selector: (row) => row.profile_image,
      sortable: true,
      cell: (d, index) => (
        <div>
          {/* <div className="avatar-group">
            <div className="avatar-group-item">
              <div className="avatar-sm">
                <div className="avatar-title rounded-circle bg-light " style:{{color: "#b83016"}}>
                  {d.main_team}
                </div>
              </div>
            </div>
            <div className="avatar-group-item">
              <Tooltip
                placement="top"
                isOpen={id == d.sow_id ? ttop : false}
                target={`tooltip-${d.sow_id}`}
              >
                {oaName}
              </Tooltip>
              <img
                onMouseEnter={() => {
                  setId(d.sow_id);
                  setttop(true);
                  setOaName(d.oa_name);
                }}
                onMouseLeave={() => {
                  setttop(false);
                  setOaName("");
                }}
                id={`tooltip-${d.sow_id}`}
                src={d.oa_profile}
                alt="test"
                className="rounded-circle avatar-sm"
              />
            </div>
          </div> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              width: "200px",
              height: "100px",
            }}
          >
            <div>
              {d.oa_profile == "null" || d.oa_profile == "" ? (
                <div className="avatar-xs">
                  <div className="avatar-title rounded-circle bg-soft-info text-info">
                    {d.oa_name && d.oa_name.length > 0 ? d?.oa_name[0] : "-"}
                  </div>
                </div>
              ) : (
                <img
                  src={d.oa_profile}
                  alt="brand logo"
                  className="rounded-avatar-md"
                  width="50px"
                  height={"50px"}
                  style={{ borderRadius: "50%" }}
                />
              )}
            </div>

            <div className="fs-12 w-100">
              <div className="fs-14 fw-semi-bold">
                {d.oa_name}{" "}
                <span
                  className="badge badge-soft text-capitalize"
                  style={{ backgroundColor: "#f07d47" }}
                >
                  {d.oa_count > 0 ? `+${d.oa_count}` : "0"}
                </span>
              </div>{" "}
              <span className="fs-10 text-muted text-capitalize">
                Manager: {d.manager_name}
              </span>
            </div>
          </div>
        </div>
      ),
      // center: true,
      // width:'180px',
    },
    // {
    //   name: "Manager",
    //   selector: (row) => row.manager_name,
    //   sortable: true,

    //   center: true,
    //   // width:'180px',
    // },
    // {
    //   name: "KAM",
    //   selector: (row) => row.oa_name,
    //   sortable: true,

    //   center: true,
    //   // width:'180px',
    // },

    // {
    //   name: "Network",
    //   width: "100px",
    //   selector: (row) => row.enable_for,
    //   sortable: true,
    //   omit: omit2,
    //   cell: (d) => (
    //     <div>
    //       {d.enable_for == "closed_network" ? (
    //         <span
    //           className="ri-lock-line fs-20 text-warning"
    //           style={{ color: "yellow" }}
    //         ></span>
    //       ) : d.enable_for == "open_network" ? (
    //         <span
    //           className="ri-lock-unlock-line fs-20 "
    //           style={{ color: "grey" }}
    //         ></span>
    //       ) : (
    //         // <span className="ri-lock-password-line fs-20 text-dark opacity-50" style={{color:''}}></span>
    //         <span>--</span>
    //       )}
    //     </div>
    //   ),

    //   center: true,
    // },
    // {
    //   name: "View",
    //   omit: omit2,
    //   width: "70px",
    //   selector: (row) => row.app_view_status,
    //   sortable: true,
    //   cell: (d) => (
    //     <div>
    //       {d.app_view_status == "show" ? (
    //         <span
    //           className="mdi mdi-eye-outline fs-20"
    //           style={{ color: "grey" }}
    //         ></span>
    //       ) : d.app_view_status == "none" ? (
    //         <span className="mdi mdi-eye-settings-outline fs-20 text-warning "></span>
    //       ) : (
    //         <span className="">--</span>
    //       )}
    //     </div>
    //   ),

    //   center: true,
    // },
    {
      name: "Hold",
      omit: true,
      width: "60px",
      selector: (row) => row.add_lead_status,
      sortable: true,
      cell: (d) => (
        <div>
          {d.add_lead_status == "enable" ? (
            <span
              className="bx bxs-hand fs-20 "
              style={{ color: "grey" }}
            ></span>
          ) : d.add_lead_status == "none" ? (
            <span className="">--</span>
          ) : (
            <span className="bx bxs-hand fs-20 text-warning"></span>
          )}
        </div>
      ),

      center: true,
    },
    {
      name: "Total",
      selector: (row) => row.total_leads,
      sortable: true,
      omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "grey",
            }}
          >
            {d.total_leads}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div>
        </div>
      ),
    },
    {
      name: "Last Month",
      selector: (row) => row.leads_last_month,
      sortable: true,
      omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {d.leads_last_month}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div>
        </div>
      ),
    },
    {
      name: "Monthly",
      selector: (row) => row.total_leads_month,
      sortable: true,
      omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {d.total_leads_month}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "#7b96ae",
            }}
          >
            +{d.total_leads_today}
            {/* 
            {todaysData.map((item) =>
              item.sow_id == d.sow_id ? (
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "2px",
                    marginLeft: "0px",
                    color: "#7b96ae",
                  }}
                >
                  +{item.total_leads}
                </div>
              ) : (
                ""
              )
            )} */}
          </div>
        </div>
      ),
    },
    {
      name: "Approved Leads",
      selector: (row) => row.approved_leads,
      sortable: true,
      omit: omitData || omit4,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill text-bg-success"
            style={{ width: "60px", fontWeight: 600, fontSize: "12px" }}
          >
            {d.approved_leads}
          </span>

          {/* <span className="badge rounded-pill text-bg-primary" style={{width:'60px',fontWeight:600,fontSize:'12px'}}>{d.approved_leads}</span> */}
          <div
            style={{
              fontSize: "12px",
              marginTop: "-2px",
              marginLeft: "-2px",
              color: "#7b96ae",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* +{d.approved_leads_today} */}
          </div>
        </div>
      ),
    },
    {
      name: "",
      right: true,
      width: "50px",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle style={{ background: "#fff", border: "none" }}>
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {location.pathname !== "/my-projects/new" ? (
                ""
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => history.push(`/editsow/${d.sow_id}`)}
                >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                  Edit Project
                </DropdownItem>
              )}

              {location.pathname == "/my-projects/closed" ||
              location.pathname == "/my-projects/inactive" ||
              (context.oaDetials?.role !== "super_admin" &&
                context.oaDetials?.operations != "1") ? (
                ""
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => {
                    setOpen2(true);
                    setManagerData(d);
                  }}
                >
                  <i className="ri-file-edit-line align-bottom m-0 me-2 text-muted"></i>
                  Add/Edit Target
                </DropdownItem>
              )}

              {location.pathname == "/my-projects/new" ? (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  // onClick={() => history.push(`/my-sows/${d.sow_id}`)}
                  onClick={() => {
                    openview(d);
                  }}
                >
                  <i className="ri-code-view align-bottom me-2 text-muted"></i>
                  View project
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() =>
                    history.push(`/my-sows/${d.sow_id}-${d?.project_title}`)
                  }
                  // onClick={()=>{openview(d)}}
                >
                  <i className="ri-code-view align-bottom me-2 text-muted"></i>
                  View project
                </DropdownItem>
              )}
              {location.pathname == "/my-projects/closed" ||
              location.pathname == "/my-projects/inactive" ||
              context.oaDetials?.role !== "super_admin" ? (
                ""
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => {
                    callOtpFunction(d.sow_id, d.add_lead_status);
                    setOnClickData(d);
                  }}
                >
                  {d.add_lead_status === "enable" ? (
                    <i className="ri-indeterminate-circle-line align-bottom me-2 text-muted"></i>
                  ) : (
                    <i className="ri-checkbox-circle-line align-bottom me-2 text-muted"></i>
                  )}

                  {d.add_lead_status === "enable"
                    ? "Put on hold"
                    : "Activate Project"}
                </DropdownItem>
              )}
              {location.pathname == "/my-projects/new" &&
              context.oaDetials?.role == "super_admin" ? (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  // onClick={() => deleteProject(d)}

                  onClick={() => {
                    setRelieveMod(true);
                    setDeleteProjectId(d.sow_id);
                  }}
                >
                  <i className=" ri-delete-bin-5-line align-bottom me-2 text-muted"></i>
                  Delete
                </DropdownItem>
              ) : (
                ""
              )}
              {location.pathname !== "/my-projects/active" ||
              context.oaDetials?.role !== "super_admin" ? (
                ""
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  disabled={true}
                >
                  <i className="ri-close-circle-line align-bottom me-2 text-muted"></i>
                  Close Project
                </DropdownItem>
              )}
              {/* {location.pathname !== "/my-projects/active" ||
              userType !== "all" ? (
                ""
              ) : (
                <DropdownItem
                  onClick={() => {
                    handleClose4();
                    handleLink(d.sow_id);
                  }}
                  className="edit-item-btn d-flex align-items-center"
                >
                  <i className="ri-link align-bottom me-2 text-muted"></i>
                  Generate Link
                </DropdownItem>
              )} */}
              {/* <DropdownItem
                onClick={() => {
                  handleSpocSow(d);
                }}
                className="edit-item-btn d-flex align-items-center"
              >
                <i className="ri-user-add-line align-bottom me-2 text-muted"></i>
                Add Agents
              </DropdownItem> */}
              {location.pathname != "/my-projects/new" &&
              context.oaDetials?.operations == 1 ? (
                <DropdownItem
                  onClick={() => {
                    handleClose5();
                    setProjectId(d.project_id);
                  }}
                  className="edit-item-btn d-flex align-items-center"
                >
                  <i className="ri-contacts-book-line align-bottom me-2 text-muted"></i>
                  Client Access
                </DropdownItem>
              ) : (
                <></>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
    //   {
    //     name: "Start Date",
    //     selector: (row) => row.start_date,
    //     center: true,
    //   },
    //   {
    //     name: "End Date",
    //     selector: (row) => row.end_date,
    //     center: true,
    //   },

    //   {
    //     name: "Brand Name",
    //     selector: (row) => row.brand_name,
    //     center: true,
    //   },
    //   {
    //     name: "Add Lead Status",
    //     selector: (row) => row.add_lead_status,
    //     center: true,
    //   },
    //   {
    //     name: "Job Category",
    //     selector: (row) => row.job_category,
    //     center: true,
    //   },
  ];

  const columnsBusiness = [
    {
      name: "Project ID",
      width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,

      center: true,
    },
    {
      name: "Project Details",
      selector: (row) => row.brand_logo,
      sortable: true,
      center: true,

      minWidth: "250px",
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            gap: "10px",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
          <div>
            <div
              className={`flex-shrink-0 chat-user-img 
                ${
                  d.add_lead_status == "enable"
                    ? "Active"
                    : d.add_lead_status == "disable"
                    ? "Hold"
                    : d.add_lead_status == "none"
                    ? "New"
                    : d.add_lead_status == "closed"
                    ? "Closed"
                    : "Disable"
                } 
                "user-own-img gap-2`}
            >
              <img
                src={d.brand_logo}
                alt="brand logo"
                className="rounded-avatar-xs"
                width="40px"
                height={"40px"}
                style={{ borderRadius: "50%" }}
              />
              <span className="user-status"></span>
            </div>
          </div>

          <div>{d.project_title}</div>
        </div>
      ),
    },

    {
      name: "Created by",
      selector: (row) => row.profile_image,
      sortable: true,
      cell: (d, index) => (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              width: "200px",
              height: "100px",
            }}
          >
            <div>
              {d.oa_profile == "" || !d.oa_profile ? (
                <div className="avatar-xs">
                  <div className="avatar-title rounded-circle bg-soft-info text-info">
                    {d.oa_name && d.oa_name.length > 0 ? d?.oa_name[0] : "-"}
                  </div>
                </div>
              ) : (
                <img
                  src={d.oa_profile}
                  alt="brand logo"
                  className="rounded-avatar-md"
                  width="50px"
                  height={"50px"}
                  style={{ borderRadius: "50%" }}
                />
              )}
            </div>

            <div className="fs-12 w-100">
              <div className="fs-14 fw-semi-bold text-capitalize">
                {d.oa_name}{" "}
                {/* <span className="badge badge-soft-primary">
                  {d.oa_count > 0 ? `+${d.oa_count}` : "0"}
                </span> */}
              </div>{" "}
              <span className="fs-10 text-muted text-capitalize">
                Manager: {d.parent_name}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Hold",
      omit: true,
      width: "60px",
      selector: (row) => row.add_lead_status,
      sortable: true,
      cell: (d) => (
        <div>
          {d.add_lead_status == "enable" ? (
            <span
              className="bx bxs-hand fs-20 "
              style={{ color: "grey" }}
            ></span>
          ) : d.add_lead_status == "none" ? (
            <span className="">--</span>
          ) : (
            <span className="bx bxs-hand fs-20 text-warning"></span>
          )}
        </div>
      ),

      center: true,
    },
    {
      name: "Total",
      selector: (row) => row.total_leads,
      sortable: true,
      omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "grey",
            }}
          >
            {d.total_leads}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div>
        </div>
      ),
    },
    {
      name: "Last Month",
      selector: (row) => row.leads_last_month,
      sortable: true,
      omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {d.leads_last_month}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div>
        </div>
      ),
    },
    {
      name: "Monthly",
      selector: (row) => row.total_leads_month,
      sortable: true,
      omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {d.total_leads_month}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "#7b96ae",
            }}
          >
            +{d.total_leads_today}
          </div>
        </div>
      ),
    },
    {
      name: "Approved Leads",
      selector: (row) => row.approved_leads,
      sortable: true,
      omit: omitData || omit4,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill text-bg-success"
            style={{ width: "60px", fontWeight: 600, fontSize: "12px" }}
          >
            {d.approved_leads}
          </span>

          {/* <span className="badge rounded-pill text-bg-primary" style={{width:'60px',fontWeight:600,fontSize:'12px'}}>{d.approved_leads}</span> */}
          <div
            style={{
              fontSize: "12px",
              marginTop: "-2px",
              marginLeft: "-2px",
              color: "#7b96ae",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* +{d.approved_leads_today} */}
          </div>
        </div>
      ),
    },
    {
      name: "",
      right: true,
      width: "50px",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle style={{ background: "#fff", border: "none" }}>
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {location.pathname == "/business/new" ? (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  // onClick={() => history.push(`/my-sows/${d.sow_id}`)}
                  onClick={() => {
                    openview(d);
                  }}
                >
                  <i className="ri-code-view align-bottom me-2 text-muted"></i>
                  View project
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() =>
                    history.push(`/my-sows/${d.sow_id}-${d?.project_title}`)
                  }
                  // onClick={()=>{openview(d)}}
                >
                  <i className="ri-code-view align-bottom me-2 text-muted"></i>
                  View project
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const columnsDm = [
    {
      name: "Campaign ID",
      selector: (row) => row.campaign_id,
      sortable: true,
      center: true,
    },
    {
      name: "Campaign Name",
      selector: (row) => row.campaign_name,
      sortable: true,
      left: true,
      cell: (d) => {
        return (
          <div>
            <p>{d.campaign_name}</p>
          </div>
        );
      },
    },
    {
      name: "Project Details",
      selector: (row) => row.campaign_id,
      sortable: true,
      left: true,
      cell: (d) => {
        return (
          <div>
            <span>
              <img src={d.brand_logo} alt="logo" width="35" />
            </span>
            <span style={{ marginLeft: "6px" }}>{d.brand_name}</span>
          </div>
        );
      },
    },

    {
      name: "Leads",
      selector: (row) => row.leads,
      sortable: true,
      center: true,
    },
    {
      name: "Project ID",
      selector: (row) => row.sow_id,
      sortable: true,
      center: true,
    },

    {
      name: "Link",
      selector: (row) => (
        <div>
          {row.link}
          <span>
            <i data-feather="copy"></i>
          </span>
        </div>
      ),
      sortable: true,
      center: true,
      cell: (d) => {
        return (
          <div>
            <input
              className="d-none"
              type="text"
              value={d.link}
              id={`dmlink${d.campaign_id}`}
            />
            <button
              type="button"
              className="btn waves-effect waves-light"
              style={{backgroundColor:"#ec5c24" }}
              onClick={() =>
                copyDmLink(`dmlink${d.campaign_id}`, d.campaign_name)
              }
            >
              <i className="bx bx-copy-alt"></i>
            </button>
          </div>
        );
      },
    },
    {
      name: "",
      // selector: (row) => row.sow_id,
      sortable: true,
      right: true,
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle style={{ background: "#fff", border: "none" }}>
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {location.pathname == "/my-projects/closed" ||
              location.pathname == "/my-projects/inactive" ||
              context.oaDetials?.type !== "all" ? (
                ""
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => history.push(`/camp-leads/${d.campaign_id}`)}
                >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                  View Leads
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const handleChange = (code) => setCode(code);

  const newApiData = apiData.filter((item) => item.add_lead_status == "enable");
  console.log(newApiData, "tesitng2", apiData);

  const params = useParams();
  const getData = (id = "enable") => {
    const link = api.VENDOR_URL + manager_projects + `?add_lead_status=${id}`;
    setLoading(true);
    axios
      .get(link)
      .then((res) => {
        // let filteredData;
        // if (params.id == "onhold") {
        //   filteredData = res.data.sows.filter(
        //     (item) => item.add_lead_status == "disable"
        //   );
        // } else if (params.id == "active") {
        //   filteredData = res.data.sows.filter(
        //     (item) => item.add_lead_status == "enable"
        //   );
        // } else {
        //   filteredData = res?.data?.sows;
        // }
        // setApiData(filteredData);
        let ot;
        if (location.pathname == "/my-projects/active") {
          if (switchData == false) {
            ot = res.data.sows.filter(
              (item) => item.add_lead_status == "enable"
            );
          } else {
            ot = res.data.sows;
          }
          setApiData(ot);
        } else {
          setApiData(res.data.sows);
        }

        console.log(res.data.sows, "tesitng");
        setLoading(false);
      })
      .catch((err) => setIsErr(true))
      .finally(() => {
        setLoading(false);
      });
  };

  const getTodaydata = () => {
    axios
      .get("https://app.backend.taskmo.co/projectdashboard/todayLeads")
      .then((res) => {
        setTodaysData(res?.data?.today_leads);
      })
      .catch((err) => console.log(err, "err"));
  };

  React.useEffect(() => {
    let id;
    if (params.id == "active") {
      id = "enable";
      setOmitData(false);
      setOmit2(false);
      setOmit4(true);
      setOmit3(false);
      setOmit5(false);
    }
    if (params.id == "inactive") {
      id = "disable";
      setOmitData(false);
      setOmit5(true);
    }
    if (params.id == "new") {
      id = "none";
      setOmitData(true);
      setOmit2(false);
      setOmit5(true);
    }
    if (params.id == "closed") {
      id = "closed";
      setOmitData(false);
      setOmit2(true);
      setOmit4(false);
      setOmit3(true);
      setOmit5(true);
    }
    if (params.id == "onhold") {
      id = "enable";
      setOmitData(false);
      setOmit2(false);
      setOmit4(true);
      setOmit3(false);
      setOmit5(true);
    }
    // console.log(params.id, "testing");
    let passData =
      params.id == "new"
        ? "none"
        : params.id == "active"
        ? "enable"
        : params.id == "onhold"
        ? "disable"
        : params.id == "closed"
        ? "closed"
        : "";
    getData(passData);
    getTodaydata();
  }, [params.id, check, props.check1, reload, switchData]);

  // React.useEffect(() => {
  //   axios
  //     .get(pathName)
  //     .then((res) => {
  //       setUserType(res.data?.type);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   const path = api.OA_URL + "/dm_leads";

  //   axios
  //     .get(path, extract_token)
  //     .then((res) => setDmLeads(res.data.leads))
  //     .catch((err) => console.log(err));
  // }, [dmCamp]);

  React.useEffect(() => {
    const path = api.VENDOR_URL + finance_projects;
    axios
      .get(path)
      .then((res) => setFinanceData(res.data.sows))
      .catch((err) => console.log(err));
  }, [location.pathname]);

  const tableData = {
    // columns: location.pathname == "/my-projects/dm" ? columnsDm : columns,
    // data: location.pathname == "/my-projects/dm" ? dmLeads : apiData,

    columns:
      // location.pathname == "/my-projects/dm" ? columnsDm :
      location.pathname.split("/")[1] == "business" ? columnsBusiness : columns,

    data:
      // location.pathname == "/my-projects/dm"
      //   ? dmLeads
      // :
      location.pathname.split("/")[1] == "my-projects"
        ? apiData
        : location.pathname.split("/")[1] == "business"
        ? businessData
        : financeData,
  };

  React.useEffect(() => {
    let pathParam =
      location.pathname.split("/")[3] == "new"
        ? "none"
        : location.pathname.split("/")[3] == "active"
        ? "enable"
        : location.pathname.split("/")[3] == "onhold"
        ? "disable"
        : location.pathname.split("/")[3] == "closed"
        ? "closed"
        : "";
    // console.log(location.pathname.split("/")[2], "checkresponse");
    let apilink = api.VENDOR_URL + business_projects;
    setLoading(true);
    axios
      .get(apilink, { params: { add_lead_status: pathParam } })
      .then((res) => {
        if (switchData) {
          const enable = res?.data?.sows?.filter(
            (it) => it.add_lead_status == "enable"
          );
          setBusinessData(enable);
          setLoading(false);
        }
        if (!switchData) {
          const disable = res?.data?.sows?.filter(
            (it) => it.add_lead_status == "disable"
          );
          setBusinessData(disable);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setLoading(false));
  }, [location.pathname, switchData]);

  const deleteProject = (sow_id) => {
    const pathname = api.VENDOR_URL + delete_sow_new;
    setRelieveMod(false);
    axios
      .delete(pathname, { params: { sow_id: sow_id } })
      .then((res) => {
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setCheck(!check);
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  console.log(
    location.pathname !== "/my-projects/new" &&
      context.oaDetials?.operations == 1,
    "onClickData"
  );
  const handleEnterOtp = () => {
    const submitOtpUrl = api.VENDOR_URL + confirm_sow_enable;
    const postData = {
      sow_id: sowId1,
      otp: code,
      type: "sow",
      remark,
      action_type: status === "enable" ? "disable" : "enable",
    };

    if (postData.action_type == "enable") {
      const enterAravind = {
        project_id: onClickData.ref_project_id,
        sow_id: onClickData.sow_id,
        ref_table_name: onClickData.ref_table_name,
        sow_status: 1,
        project_intro_status: 1,
      };
      const headerEnter = {
        headers: {
          "x-auth-key": "mxhyz-bsmnr-pqknt",
        },
      };

      axios
        .patch(aravindSowAdd, enterAravind, headerEnter)
        .then((res) => {
          console.log("success res");
        })
        .catch((err) => {
          console.log(err.response.data, "error");
        });
    }

    axios
      .post(submitOtpUrl, postData)
      .then((res) => {
        // console.log(res, "response data confirm");
        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setOpen(false);
          // React.setTimeout(()=>{
          //   window.location.reload()
          // },3000)
          setReload(!reload);
        }
      })
      .catch((err) => {
        // console.log(err.response, "show error");
        toast(err.response.data?.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      });
  };
  function myFunction() {
    // Get the text field
    var copyText = document.getElementById("myInput");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    toast("Copied", {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      className: "bg-success text-white",
    });
  }
  return (
    <div
      className={
        window.location.pathname == "/my-projects/active"
          ? "my-active-table"
          : ""
      }
    >
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={
            // location.pathname == "/my-projects/dm" ? columnsDm :
            location.pathname.split("/")[1] == "business"
              ? columnsBusiness
              : columns
          }
          data={
            // location.pathname == "/my-projects/dm"
            //   ? dmLeads
            // :
            location.pathname.split("/")[1] == "my-projects"
              ? apiData
              : location.pathname.split("/")[1] == "business"
              ? businessData
              : financeData
          }
          theme="VendorTable"
          pagination
          expandableRows={false}
          // expandableRows={userType == "om" ? true : false}
          expandableRowsComponent={ExpandableRowComponent}
          expandableRowsHideExpander //hide the arrow icon on the left
          progressPending={loading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        toggle={() => {
          setOpen();
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            setOpen();
          }}
        >
          Project On Hold
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div>
              <img src={faqImg} alt="otp" width={200} />
            </div>
            <Col md={6}>
              <Label>Enter OTP:</Label>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <OtpInput
                  value={code}
                  onChange={handleChange}
                  numInputs={4}
                  separator={<span style={{ width: "16px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: "1px solid #CFD3DB ",
                    borderRadius: "8px",
                    width: "44px",
                    height: "44px",
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none",
                  }}
                />
              </div>
            </Col>
            <Col md={6}>
              <Label>Enter Remark</Label>
              <Input
                type="textarea"
                onChange={(e) => setRemark(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-end w-100">
                <Button onClick={handleEnterOtp}>Submit</Button>
              </div>
            </Col>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        id="signupModals"
        className="modal-lg"
        tabIndex="-1"
        isOpen={open2}
        toggle={() => {
          setOpen2(false);
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            setOpen2(false);
          }}
        >
          Add/Edit Project Target
        </ModalHeader>
        <ModalBody>
          <div>
            <>
              <ManagerEdit
                set_modal_edit={setOpen2}
                managerData={managerData}
              />
            </>
          </div>
        </ModalBody>
      </Modal>

      {open3 && (
        <Modal
          size="xl"
          id="signupModals"
          tabIndex="-1"
          isOpen={open3}
          toggle={() => {
            closeview();
          }}
          centered={true}
        >
          <ModalHeader
            className="p-3"
            toggle={() => {
              closeview();
            }}
          >
            view
          </ModalHeader>
          <ModalBody>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <ItemDetails itemprops={itemprops} />
            </div>
          </ModalBody>
        </Modal>
      )}
      <Modal
        size="md"
        id="signupModals"
        // tabIndex=""
        isOpen={open4}
        toggle={() => {
          handleClose4();
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            handleClose4();
          }}
        >
          Link
        </ModalHeader>
        <ModalBody>
          <div className="input-group">
            <input
              type="text"
              value={link}
              id="myInput"
              className="form-control"
              aria-label="Recipient's username with two button addons"
            />
            <button
              className="btn"
              style={{
                backgroundColor: "#ec5c24",
                color: "whitesmoke",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dd4319")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ec5c24")}
              type="button"
              onClick={() => {
                myFunction();
              }}
            >
              Copy
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open_spoc}
        toggle={() => {
          set_open_spoc(!open_spoc);
        }}
        top="true"
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            set_open_spoc(!open_spoc);
          }}
        >
          Add Spocs
        </ModalHeader>

        <ModalBody>
          <div className="mt-2">
            <ModalFormSpocs
              set_open={set_open_spoc}
              open={open_spoc}
              sow_id={sowId2}
            />
          </div>
        </ModalBody>
      </Modal>

      <Modal
        size="md"
        id="signupModals"
        // tabIndex=""
        isOpen={open5}
        toggle={() => {
          handleClose5();
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            handleClose5();
          }}
        >
          Client Access
        </ModalHeader>
        <form onSubmit={handlesubmit}>
          <ModalBody>
            <Row>
              <Col xs={"12"}>
                <div>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    onChange={(e) => {
                      data.full_name = e.target.value;

                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs={"12"} className="mt-3">
                <div>
                  <label htmlFor="number" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    minLength={10}
                    maxLength={10}
                    required
                    onChange={(e) => {
                      data.mobile_number = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs={"12"} className="mt-3">
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    onChange={(e) => {
                      data.email_id = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs={"12"} className="mt-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  id="type"
                  required={true}
                  onChange={handleChangeType}
                >
                  <option selected disabled value="">
                    select Type
                  </option>
                  <option value="client">client</option>
                  <option value="admin">admin</option>
                </select>

                <FormFeedback>type is important</FormFeedback>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn"
              style={{
                backgroundColor: "#ec5c24",
                color: "whitesmoke",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dd4319")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ec5c24")}
              type="submit"
            >
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
      <Modal
        size="md"
        id="signupModals"
        // tabIndex=""
        isOpen={open6}
        toggle={() => {
          handleClose6();
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            handleClose6();
          }}
        >
          Team
        </ModalHeader>

        <ModalBody></ModalBody>
      </Modal>
      <DeleteModal
        show={relieveMod}
        onSubmitClick={() => deleteProject(deleteProjectId)}
        onCloseClick={() => setRelieveMod(false)}
        statement={`Project-ID : ${deleteProjectId} will be deleted!`}
        value={"reset"}
      />
    </div>
  );
};

export default TableForManager;
