import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "./EarningsTable.css";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { indianNumbers } from "../../components/common/indianNumbers";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { asmCardData } from "../../assets/utils/abhiApi";

//custom styles

const customStyles = {};

const EarningsTable = ({ performance, months, date, totalPerfomance }) => {
  const month = moment(date).format("MM");
  const year = moment(date).format("YYYY");
  const [modalData, setModalData] = React.useState([]);
  const getModalData = (asmid, month, year) => {
    let api = asmCardData;
    console.log(asmid, month, year);
    axios
      .get(api, { params: { asm_id: asmid, month: month, year: year } })
      .then((res) => {
        setClientMod(true);
        setModalData(res.data.projects);
        console.log(res.data.projects);
      })
      .catch((err) => console.log(err));
  };
  const location = useLocation();

  const maincolumns = [];

  maincolumns.push({
    name: (
      <div style={{ display: "flex" }}>
        <div
          style={{ width: "200px", fontSize: "12px", fontWeight: "600" }}
        ></div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ fontSize: "12px", fontWeight: "600" }}
        >
          <span> Overall Earning</span>
          <span className="badge text-bg-success fs-12 p-1">
            {" "}
            ₹ {indianNumbers(totalPerfomance, 2)}
          </span>
        </div>
      </div>
    ),
    width: "320px",
    cell: (d) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "200px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="d-flex align-items-center">
              {/* <img
              src={d?.profile_image}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%", border: "1.5px solid black" }}
            /> */}
              {d?.profile_image != "" &&
              // d?.profile_image != "null" ? (
              d?.profile_image?.includes("https") ? (
                <img
                  loading="lazy"
                  className=" rounded-circle img-fluid userprofile"
                  alt="s"
                  src={d.profile_image}
                  style={{
                    width: "40px",
                    height: "40px",
                    border:
                      d.type == "4" ? "4px solid #FFA45E" : "4px solid #63bbbe",
                  }}
                />
              ) : (
                //   : (
                //     <img
                //       className="rounded-circle img-fluid userprofile "
                //       alt="p"
                //       src={`https://isp.taskmo.in/asm_images/${d?.profile_image}`}
                //       style={{
                //         width: "40px",
                //         height: "40px",
                //         border:
                //           d.type == "4"
                //             ? "4px solid #FFA45E"
                //             : "4px solid #63bbbe",
                //       }}
                //     />
                //   )
                // )
                <div className="rounded-circle img-fluid userprofile my-2 d-flex align-items-center">
                  <div
                    className="rounded-circle img-fluid userprofile bg-soft-secondary text-secondary d-flex align-items-center justify-content-center fs-20 fw-bold"
                    // style={{ width: "40px", height: "35px" }}
                    style={{
                      width: "40px",
                      height: "40px",
                      border:
                        d?.type == "4"
                          ? "4px solid #FFA45E"
                          : "4px solid #63bbbe",
                    }}
                  >
                    {d?.full_name[0]}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div style={{ fontWeight: "600", fontSize: "12px" }}>
                {d.full_name}
              </div>
              <div className="fs-10" style={{ fontWeight: "600" }}>
                SPID : {d?.asm_id}
              </div>
              <div style={{ fontSize: "8px" }}>Cluster : {d.cluster_name}</div>
              <div style={{ fontSize: "8px" }}>City : {d.city}</div>
            </div>
          </div>
        </div>
        <div
          className=" fw-semibold"
          style={{
            textDecoration:
              location.pathname == "/supply/earnings" ? "underline" : "none",
            // backgroundColor: "#A281CB",
            color: "#b83016",
            // border: "1px solid #A281CB",
            // borderRadius: "6px",
            fontSize: "14px",
            padding: "1px",
            // color: "#000",
            width: "82px",
            height: "24px",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              cursor:
                location.pathname == "/supply/earnings" ? "pointer" : "default",
            }}
            onClick={() => {
              getModalData(d.asm_id, month, year);
            }}
          >
            {" "}
            ₹ {indianNumbers(d.overall, 2)}
          </div>
        </div>
      </div>
    ),
  });

  // if (location.pathname == "/supply/earnings") {
  //   maincolumns.push({
  //     name: (
  //       <div style={{ display: "flex" }}>
  //         <div style={{ width: "250px", fontSize: "12px", fontWeight: "600" }}>
  //           SP List
  //         </div>
  //         <div style={{ fontSize: "12px", fontWeight: "600" }}>
  //           Overall Earning
  //         </div>
  //       </div>
  //     ),
  //     width: "400px",
  //     cell: (d) => (
  //       <div style={{ display: "flex", alignItems: "center" }}>
  //         <div style={{ width: "250px" }}>
  //           <div style={{ display: "flex", gap: "12px" }}>
  //             <div>
  //               {/* <img
  //               src={d?.profile_image}
  //               alt="brand logo"
  //               className="rounded-avatar-xs"
  //               width="40px"
  //               height={"40px"}
  //               style={{ borderRadius: "50%", border: "1.5px solid black" }}
  //             /> */}
  //               {d?.profile_image != "" &&
  //               // d?.profile_image != "null" ? (
  //               d?.profile_image?.includes("https") ? (
  //                 <img
  //                   loading="lazy"
  //                   className=" rounded-circle img-fluid userprofile"
  //                   alt="s"
  //                   src={d.profile_image}
  //                   style={{
  //                     width: "40px",
  //                     height: "40px",
  //                     border:
  //                       d.type == "4"
  //                         ? "4px solid #FFA45E"
  //                         : "4px solid #63bbbe",
  //                   }}
  //                 />
  //               ) : (
  //                 //   : (
  //                 //     <img
  //                 //       className="rounded-circle img-fluid userprofile "
  //                 //       alt="p"
  //                 //       src={`https://isp.taskmo.in/asm_images/${d?.profile_image}`}
  //                 //       style={{
  //                 //         width: "40px",
  //                 //         height: "40px",
  //                 //         border:
  //                 //           d.type == "4"
  //                 //             ? "4px solid #FFA45E"
  //                 //             : "4px solid #63bbbe",
  //                 //       }}
  //                 //     />
  //                 //   )
  //                 // )
  //                 <div className="rounded-circle img-fluid userprofile my-2 d-flex align-items-center">
  //                   <div
  //                     className="rounded-circle img-fluid userprofile bg-soft-secondary text-secondary d-flex align-items-center justify-content-center fs-20 fw-bold"
  //                     // style={{ width: "40px", height: "35px" }}
  //                     style={{
  //                       width: "40px",
  //                       height: "40px",
  //                       border:
  //                         d?.type == "4"
  //                           ? "4px solid #FFA45E"
  //                           : "4px solid #63bbbe",
  //                     }}
  //                   >
  //                     {d?.full_name[0]}
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //             <div>
  //               <div style={{ fontWeight: "600", fontSize: "12px" }}>
  //                 {d.full_name}
  //               </div>
  //               <div className="fs-10" style={{ fontWeight: "600" }}>
  //                 SPID : {d?.asm_id}
  //               </div>
  //               <div style={{ fontSize: "8px" }}>
  //                 Active Since : {d.active_since} Days
  //               </div>
  //               <div style={{ fontSize: "8px" }}>City : {d.city}</div>
  //             </div>
  //           </div>
  //         </div>
  //         <div
  //           style={{
  //             textDecoration: "underline",
  //             backgroundColor: "#A281CB",
  //             border: "1px solid #A281CB",
  //             borderRadius: "6px",
  //             fontSize: "12px",
  //             padding: "5px",
  //             color: "#fff",
  //             width: "102px",
  //             height: "24px",
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div
  //             style={{ cursor: "pointer" }}
  //             onClick={() => setClientMod(true)}
  //           >
  //             {" "}
  //             ₹ {indianNumbers(d.overall, 2)}
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   });
  // } else {
  //   maincolumns.push({
  //     name: (
  //       <div style={{ display: "flex" }}>
  //         <div style={{ width: "250px", fontSize: "12px", fontWeight: "600" }}>
  //           SP List
  //         </div>
  //       </div>
  //     ),
  //     width: "250px",
  //     cell: (d) => (
  //       <div style={{ display: "flex", alignItems: "center" }}>
  //         <div style={{ width: "250px" }}>
  //           <div style={{ display: "flex", gap: "12px" }}>
  //             <div>
  //               {/* <img
  //               src={d?.profile_image}
  //               alt="brand logo"
  //               className="rounded-avatar-xs"
  //               width="40px"
  //               height={"40px"}
  //               style={{ borderRadius: "50%", border: "1.5px solid black" }}
  //             /> */}
  //               {d?.profile_image != "" &&
  //               // d?.profile_image != "null" ? (
  //               d?.profile_image?.includes("https") ? (
  //                 <img
  //                   className=" rounded-circle img-fluid userprofile"
  //                   alt="s"
  //                   src={d.profile_image}
  //                   style={{
  //                     width: "40px",
  //                     height: "40px",
  //                     border:
  //                       d.type == "4"
  //                         ? "4px solid #FFA45E"
  //                         : "4px solid #63bbbe",
  //                   }}
  //                 />
  //               ) : (
  //                 //   : (
  //                 //     <img
  //                 //       className="rounded-circle img-fluid userprofile "
  //                 //       alt="p"
  //                 //       src={`https://isp.taskmo.in/asm_images/${d?.profile_image}`}
  //                 //       style={{
  //                 //         width: "40px",
  //                 //         height: "40px",
  //                 //         border:
  //                 //           d.type == "4"
  //                 //             ? "4px solid #FFA45E"
  //                 //             : "4px solid #63bbbe",
  //                 //       }}
  //                 //     />
  //                 //   )
  //                 // )
  //                 <div className="rounded-circle img-fluid userprofile my-2 d-flex align-items-center">
  //                   <div
  //                     className="rounded-circle img-fluid userprofile bg-soft-secondary text-secondary d-flex align-items-center justify-content-center fs-20 fw-bold"
  //                     // style={{ width: "40px", height: "35px" }}
  //                     style={{
  //                       width: "40px",
  //                       height: "40px",
  //                       border:
  //                         d?.type == "4"
  //                           ? "4px solid #FFA45E"
  //                           : "4px solid #63bbbe",
  //                     }}
  //                   >
  //                     {d?.full_name[0]}
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //             <div>
  //               <div style={{ fontWeight: "600", fontSize: "12px" }}>
  //                 {d.full_name}
  //               </div>
  //               <div className="fs-10" style={{ fontWeight: "600" }}>
  //                 SPID : {d?.asm_id}
  //               </div>
  //               <div style={{ fontSize: "8px" }}>
  //                 Active Since : {d.active_since} Days
  //               </div>
  //               <div style={{ fontSize: "8px" }}>City : {d.city}</div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   });
  // }

  months.map((items) => {
    maincolumns.push({
      name: (
        <div style={{ fontSize: "12px", fontWeight: "600" }}>
          {items.split("_").join("-")}
        </div>
      ),
      cell: (d) => (
        <div
          style={{
            // color: "#502485",
            color:
              location.pathname == "/supply/performance"
                ? Number(d[items + "p"]) < 2
                  ? "#FF4444"
                  : Number(d[items + "p"]) >= 2 && Number(d[items + "p"]) <= 4
                  ? "#FFBB33"
                  : Number(d[items + "p"]) > 4 && Number(d[items + "p"]) <= 5
                  ? "#0EA049"
                  : "#683395"
                : "#502485",
            fontSize: "13px",
            fontWeight: "450",
          }}
        >
          {d[items] != 0 || d[items + "p"] != 0
            ? location.pathname == "/supply/earnings"
              ? `₹ ${indianNumbers(d[items], 2)}`
              : ` ${d[items + "p"]}%`
            : "-"}
        </div>
      ),
    });
  });
  console.log(performance, months, "testing");
  const [clientMod, setClientMod] = React.useState(false);

  const tableDataExtension = {
    columns: maincolumns,
    data: performance,
  };
  return (
    <div>
      {/* <DataTableExtensions
        {...tableDataExtension}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      > */}
      <DataTable
        columns={maincolumns}
        data={performance}
        className="my-pipeline-table"
        pagination
        paginationPerPage={6}
        customStyles={customStyles}
      />
      {/* </DataTableExtensions> */}

      <Modal
        size={modalData.length == 0 ? "sm" : "xl"}
        id="signupModals"
        // tabIndex=""
        isOpen={clientMod}
        toggle={() => {
          setClientMod(!clientMod);
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            setClientMod(!clientMod);
          }}
        ></ModalHeader>

        <ModalBody>
          <div>
            <Row>
              {modalData?.length == 0 && "No Data Found"}
              {modalData.map((item) => (
                <>
                  <Col xs={4} style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "350px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        borderRadius: "10px",
                        // padding: "10px",
                        paddingBottom: "0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                          padding: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div
                                className={`flex-shrink-0 chat-user-img 
                ${
                  item.add_lead_status == "enable"
                    ? "Active"
                    : item.add_lead_status == "disable"
                    ? "Hold"
                    : ""
                } 
                "user-own-img gap-2`}
                              >
                                <img
                                  src={item?.brand_logo}
                                  alt="brandlogo"
                                  className="rounded-circle avatar-xs"
                                />
                                <span className="user-status"></span>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                              }}
                            >
                              <div
                                style={{
                                  color: "#0A0A0A",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                {item?.project_title ?? ""}
                              </div>
                              <div
                                style={{ fontSize: "10px", fontWeight: "500" }}
                              >
                                Project ID : {item.sow_id}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ color: "#39006A", fontSize: "11px" }}>
                              Earnings
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#39006A",
                              }}
                            >
                              ₹ {item.total_earning}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1px",
                            padding: "0 5px 0 5px",
                          }}
                        >
                          <div
                            style={{
                              background: "#EEEFFF",
                              borderRadius: "10px 10px 0 0",
                              padding: "10px",
                            }}
                          >
                            <div>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    Current month
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "300px",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div style={{ fontSize: "10px" }}>
                                          Created
                                        </div>
                                        <div style={{ fontWeight: "600" }}>
                                          {item?.current_created}
                                        </div>
                                      </div>
                                    </div>

                                    <div> | </div>
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div style={{ fontSize: "10px" }}>
                                          Approved
                                        </div>
                                        <div style={{ fontWeight: "600" }}>
                                          {item?.current_approved}
                                        </div>
                                      </div>
                                    </div>

                                    <div> | </div>

                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div style={{ fontSize: "10px" }}>
                                          N/W Earnings
                                        </div>
                                        <div style={{ fontWeight: "600" }}>
                                          ₹ {item?.current_network_earnings}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: "#EEEFFF",
                              borderRadius: "0 0 10px 10px",
                              padding: "10px",
                            }}
                          >
                            <div>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    Carried from previous month
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "300px",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div style={{ fontSize: "10px" }}>
                                          Created
                                        </div>
                                        <div style={{ fontWeight: "600" }}>
                                          {item?.previous_created}
                                        </div>
                                      </div>
                                    </div>

                                    <div> | </div>
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div style={{ fontSize: "10px" }}>
                                          Approved
                                        </div>
                                        <div style={{ fontWeight: "600" }}>
                                          {item?.previous_approved}
                                        </div>
                                      </div>
                                    </div>

                                    <div> | </div>

                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div style={{ fontSize: "10px" }}>
                                          N/W Earnings
                                        </div>
                                        <div style={{ fontWeight: "600" }}>
                                          ₹ {item?.previous_network_earnings}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div
                        style={{
                          position: "relative",
                          bottom: 0,
                          marginTop: "10px",
                        }}
                      >
                        {/* <div
                          style={{
                            backgroundColor: "#FDEFE6",
                            color: "#C97A4B",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "8px",
                            padding: "5px",
                            borderRadius: "0 0 10px 10px ",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            {" "}
                            <i
                              style={{ fontSize: "10px" }}
                              className="ri-information-fill"
                            ></i>{" "}
                          </div>
                           <div>
                            {" "}
                            15 leads created on last month carried to current
                            month
                          </div> 
                        </div>
                      </div> */}
                    </div>
                  </Col>
                </>
              ))}
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EarningsTable;
