import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  cityIn,
  confirm_supply_sp,
  supply_requests,
} from "../../assets/utils/SupplyApi";
import { api, farming } from "../../globalConfig";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import dummy from "../../assets/images/users/avatar-3.jpg";
import {
  Button,
  Card,
  Col,
  Label,
  Modal,
  ModalBody,
  Row,
  Tooltip,
} from "reactstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { create_supply_request } from "../../assets/utils/dashboard";
// const customStyles = {
//   rows: {
//     style: {
//       minHeight: "72px",
//       minWidth: "120px",
//       center: true,
//     },
//   },
//   headCells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for head cells
//       paddingRight: "8px",
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for data cells
//       paddingRight: "8px",
//     },
//   },
// };
// const columns = [
//   {
//     name: "Request Id",
//     selector: (row) => row.req_id,
//     cell: (d) => <div>{d.req_id}</div>,
//     width: "80px",
//     left: "true",
//   },
//   {
//     name: "Details",
//     selector: (row) => row.year,
//     center: "true",
//     cell: (d) => (
//       <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//         <div>
//           <img
//             src={d.req_by_image}
//             alt=""
//             className="rounded-circle avatar-sm"
//           />
//         </div>
//         <div>
//           <div className="fs-12">{d.req_by_name} </div>
//           <div className="fs-10 text-muted">{d.city}</div>
//         </div>
//       </div>
//     ),
//   },
//   {
//     name: "Count",
//     selector: (row) => row.count,
//     center: "true",
//   },
//   {
//     name: "Status",
//     selector: (row) => row.status,
//     center: "true",
//     cell: (d) => (
//       <div
//         className={
//           d.status == "pending"
//             ? "badge badge-outline-warning"
//             : d.status == "filled"
//             ? "badge badge-outline-success"
//             : "badge badge-outline-info"
//         }
//       >
//         {d.status}
//       </div>
//     ),
//   },
//   {
//     name: "Requested on",
//     selector: (row) => row.req_on,
//     center: "true",
//   },
// ];

// function Testing({ data }) {
//   if (data?.sp_list.length == 0) {
//     return <div>No Data Found</div>;
//   }
//   return (
//     <div className="mx-2 py-4">
//       <div
//         style={{
//           display: "flex",
//           placeContent: "center flex-start",
//           placeItems: "center start",
//           flexWrap: "wrap",
//           gap: "15px",
//           margin: "auto",
//         }}
//       >
//         {data.sp_list.map((item, i) => (
//           <Col key={i} xs={2} style={{ width: "200px" }}>
//             <CardData data={item} />
//           </Col>
//         ))}
//       </div>
//     </div>
//   );
// }

const SupplyTableData = ({ stateData, showAdd, setShowAdd }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [relieveMod, setRelieveMod] = React.useState(false);
  // const [showAdd, setShowAdd] = useState(false);
  const { id } = useParams();
  const sowId = id.split("-")[0];
  // const [stateData, setStateData] = useState([]);
  const [supplycity, setSupplyCity] = useState({});
  const [cityList, setCityList] = useState([]);
  const [clickedCardId, setClickedCardId] = useState("");
  const [dData, setDData] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const getSupplyRequest = () => {
    let apiLink = api.VENDOR_URL + supply_requests;
    axios
      .get(apiLink, { params: { sow_id: sowId } })
      .then((res) => {
        setData(res.data.request_list);
      })
      .catch((err) => console.log(err));
  };

  const handleApproveRejected = (d, status, index) => {
    const apiLink = api.OA_URL + confirm_supply_sp;

    let postdata = {
      status,
      req_id: d.req_id,
      assign_id: d.id,
      remark: d.remark,
      sow_id: sowId,
      sp_id: d.asm_id,
    };

    axios
      .post(apiLink, postdata)
      .then((res) => {
        if (res.data.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
          getSupplyRequest();
          dData.sp_list[index].status = "rejected";
          setDData(dData);
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          getSupplyRequest();
          dData.sp_list[index].status = status;
          setDData(dData);
        }
      })
      .catch((err) => {
        toast(err.response.data.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
        if (err.response.data.error) {
          getSupplyRequest();
          dData.sp_list[index].status = "rejected";
          setDData(dData);
          console.log(dData, " first");
        }
      });
  };

  useEffect(() => {
    getSupplyRequest();
  }, []);

  const handleClickCard = (d) => {
    setDData(d);
    setClickedCardId(d.req_id);
  };

  function CardData({ data }) {
    // if (clickedCardId && data.req_id === clickedCardId) {
    //   let da = data.filter((item) => item.req_id == clickedCardId);
    //   handleClickCard(da);
    // }

    return (
      <>
        <div
          onClick={() => handleClickCard(data)}
          // className={
          //   data.status == "rejected"
          //     ? "bg-soft-danger"
          //     : data.status == "approved"
          //     ? " bg-soft-success"
          //     : " bg-soft-warning"
          // }
          style={{
            display: "flex",
            flexDirection: "row",
            width: "220px",
            padding: "4px 10px",
            borderRadius: "5px",
            height: "70px",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "5px",
            boxShadow:
              clickedCardId == data.req_id
                ? "  rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
                : "0px 1px 4px rgba(0, 0, 0, 0.16)",

            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)",
            cursor: "pointer",
          }}
        >
          <div className="d-flex gap-2 align-items-center justify">
            {" "}
            <div>
              <div className="fs-12">
                {data?.city}
                {/* <span>({data?.count})</span> */}
              </div>
              <div className="text-muted fs-10">{data?.req_on}</div>
            </div>
          </div>
          <div className="mx-2">
            <div
              style={{
                display: "flex",

                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>{data?.count}</div>
              <div>
                <span
                  className={
                    data.status == "pending"
                      ? "badge badge-soft-warning"
                      : data.status == "partially_filled"
                      ? "badge badge-soft-info"
                      : "badge badge-soft-success"
                  }
                  style={{ width: "80px", textTransform: "capitalize" }}
                >
                  {data?.status == "partially_filled"
                    ? "partially filled"
                    : data?.status}
                </span>
              </div>
            </div>
            {/* {data.status == "pending" ? (
              <>
                <div>
                  <i className="ri-check-line text-success cursor-pointer"></i>
                </div>
                <div>
                  <i className="ri-close-line text-danger cursor-pointer"></i>
                </div>
              </>
            ) : (
              <>
                <div>
                  {" "}
                  <i className="ri-information-line fs-18"></i>
                </div>
              </>
            )} */}
          </div>
        </div>
      </>
    );
  }

  // const callStateApi = () => {
  //   setShowAdd(true);
  //   let stateApi = farming.farming_URL + cityIn + "all";
  //   axios
  //     .get(stateApi)
  //     .then((res) => {
  //       setStateData(res.data.state);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const callCityApi = (city) => {
    let apicity = farming.farming_URL + cityIn + city;

    axios
      .get(apicity)
      .then((res) => {
        setCityList(res.data.state);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeSupplyRequest = (e) => {
    if (e.label) {
      if (e.id == "state") {
        setSupplyCity({ ...supplycity, state: e.value, stateName: e.label });
        callCityApi(e.label);
      }
      if (e.id == "city") {
        setSupplyCity({ ...supplycity, city: e.value, city_id: e.value });
      }
    } else {
      const { name, value } = e.target;
      console.log(name, value, "supplycity");
      setSupplyCity({ ...supplycity, [name]: value });
    }
  };

  const handleSupplyRequest = (e) => {
    e.preventDefault();
    supplycity.sow_id = sowId;
    delete supplycity.stateName;
    delete supplycity.city;
    delete supplycity.state;

    if (!supplycity.city_id || !supplycity.count || !supplycity.sow_id) {
      toast("please fill all the details", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        className: "bg-warning text-white",
      });
      return "";
    }
    let sendsupplyapi = api.VENDOR_URL + create_supply_request;
    axios
      .post(sendsupplyapi, supplycity)
      .then((res) => {
        // setShowAdd(false);
        toast("success", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
        getSupplyRequest();
        setSupplyCity({});
      })
      .catch((err) => {
        toast("Something went wrong", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      });
  };

  console.log(stateData, "stateData");
  return (
    <div>
      {/* <DataTable
        columns={columns}
        data={data}
        noDataComponent="Empty Data"
        customStyles={customStyles}
        expandableRowDisabled={(d) => (d.sp_list.length > 0 ? false : true)}
        expandableRows={true}
        expandableRowsComponent={(d) => Testing(d)}
      /> */}

      <form onSubmit={handleSupplyRequest}>
        <Row
          // className="p-2"
          style={{
            width: "100%",
            marginTop: "-20px",
            // marginLeft: "10px",
          }}
        >
          <Col xs={3}>
            {showAdd ? (
              <>
                <Label>State</Label>
                <Select
                  aria-label=".form-select-sm example"
                  onChange={handleChangeSupplyRequest}
                  options={stateData}
                  isClearable={false}
                ></Select>{" "}
              </>
            ) : (
              ""
            )}
          </Col>
          <Col xs={3}>
            {showAdd ? (
              <>
                {" "}
                <Label>City</Label>
                <Select
                  aria-label=".form-select-sm example"
                  onChange={handleChangeSupplyRequest}
                  // options={cityList}
                  options={cityList}
                  value={supplycity.label}
                ></Select>
              </>
            ) : (
              ""
            )}
          </Col>
          <Col xs={3}>
            {showAdd ? (
              <>
                {" "}
                <Label>Count</Label>
                <input
                  type="number"
                  className="form-control"
                  id="emailInput"
                  onChange={handleChangeSupplyRequest}
                  name="count"
                />
              </>
            ) : (
              ""
            )}
          </Col>
          <Col xs={3}>
            <>
              <div>
                {showAdd ? (
                  <>
                    {" "}
                    <span
                      style={{
                        width: "140px",
                        marginTop: "27px",
                        height: "37px",
                      }}
                      type="submit"
                      className="btn btn-success"
                      onClick={handleSupplyRequest}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                          marginTop: "-3px",
                        }}
                      >
                        <div>
                          <i className="ri ri-checkbox-circle-line fs-18"></i>
                        </div>
                        <div>Submit</div>
                      </div>
                    </span>
                  </>
                ) : (
                  <>
                    {/* {" "}
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "140px",
                      }}
                      className="btn btn-success d-flex align-items-center gap-2 mt-4"
                      onClick={callStateApi}
                    >
                      <i className="ri ri-add-fill fs-18"></i>
                      Request
                    </button> */}
                  </>
                )}
              </div>
            </>
          </Col>
        </Row>
      </form>

      <Row className="mt-3">
        <Col xs={3}>
          <div className="mb-4 fs-18">Requested City</div>
          <div
            style={{
              display: "flex",
              placeContent: "center flex-start",
              placeItems: "center start",
              flexWrap: "wrap",
              gap: "15px",
              margin: "auto",
            }}
          >
            {data?.map((item) => (
              <div key={item.req_id}>
                <CardData data={item} />
              </div>
            ))}
          </div>
        </Col>

        <Col xs={4}>
          {clickedCardId == "" ? (
            ""
          ) : (
            <div>
              {dData?.sp_list?.length == 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  No Data Found
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      // justifyContent: "center",
                    }}
                  >
                    {/* <div className="text-muted"> City &nbsp;</div> */}
                    <h3>{"Requested Members"}</h3>
                  </div>
                  <div className="ms-3 mt-3">
                    {dData?.sp_list?.map((item, index) => (
                      <div
                        key={item.id}
                        className={
                          item.status == "approved"
                            ? "mb-2 bg bg-soft-success rounded-3 p-2 card"
                            : item.status == "rejected"
                            ? "mb-2 bg bg-soft-danger rounded-3 p-2 card"
                            : "mb-2 rounded-3 p-2 card"
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <div>
                            <img
                              // src={
                              //   item.profile_image.includes("https")
                              //     ? item.profile_image
                              //     : dummy
                              // }
                              src={
                                item.profile_image.substr(0, 4) === "http"
                                  ? item.profile_image
                                  : "/user-dummy-img.jpg"
                              }
                              alt="img"
                              className="rounded-circle avatar-sm"
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "150px",
                            }}
                          >
                            <div className="fs-14">{item.full_name} </div>
                            {/* <div className="text-muted fs-10">{item.city}</div> */}
                          </div>
                          <div>
                            {item.status == "pending" ? (
                              <>
                                <div
                                  style={{
                                    border: "1px solid black",
                                    padding: "1px",
                                    borderBottom: "0",
                                    paddingLeft: "2px",
                                    paddingRight: "2px",
                                    width: "30px",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div>
                                    <i
                                      className="ri-check-line text-success cursor-pointer fs-16"
                                      onClick={() =>
                                        handleApproveRejected(
                                          item,
                                          "approved",
                                          index
                                        )
                                      }
                                    ></i>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    border: "1px solid black",
                                    padding: "1px",
                                    paddingLeft: "2px",
                                    paddingRight: "2px",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div>
                                    {" "}
                                    <i
                                      className="ri-close-line text-danger cursor-pointer fs-16"
                                      onClick={() =>
                                        handleApproveRejected(
                                          item,
                                          "rejected",
                                          index
                                        )
                                      }
                                    ></i>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  onMouseEnter={() => setActiveTooltip(item.id)}
                                  style={{ cursor: "pointer" }}
                                  id={`tooltip-${item.id}`}
                                >
                                  <i className="ri-information-line fs-18"></i>
                                </div>

                                {
                                  <Tooltip
                                    isOpen={item.id === activeTooltip}
                                    placement="top"
                                    target={`tooltip-${item.id}`}
                                    toggle={() =>
                                      setActiveTooltip(
                                        activeTooltip === item.id
                                          ? null
                                          : item.id
                                      )
                                    }
                                  >
                                    {item.remark}
                                  </Tooltip>
                                }
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SupplyTableData;
