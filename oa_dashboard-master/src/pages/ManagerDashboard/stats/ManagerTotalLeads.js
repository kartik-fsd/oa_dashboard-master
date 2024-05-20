import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  DropdownItem,
  CardBody,
} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

import { useParams } from "react-router-dom";
import axios from "axios";
import UsersByDeviceCharts from "../../DashboardAnalytics/UsersByDeviceCharts";
import { api } from "../../../globalConfig";
import { sow_leads_chart } from "../../../assets/utils/sow";
import { APIClient } from "../../../assets/config/sessionToken";

const ManagerTotalLeads = ({ monthData }) => {
  console.log(monthData, "monthdatadata");
  const { id } = useParams();
  const [isUserDropdown, setUserDropdown] = useState(false);
  const [shimer, setShimer] = useState(false);
  const toggleDropdown = () => setUserDropdown(!isUserDropdown);
  const [pieData, setPieData] = useState(undefined);
  const [totalLeads, setTotalLeads] = useState(undefined);

  useEffect(() => {
    const sample = new APIClient();
    const pathName = api.OA_URL + sow_leads_chart;
    setShimer(true);
    sample
      .get(pathName, { sow_id: id, filter: "o", month: "v", year: "e" })
      .then((res) => {
        const total = res?.data?.data?.value.reduce((acc, i) => acc + i, 0);
        setTotalLeads(total);
        setPieData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDropDown = (item) => {
    const sample = new APIClient();
    const pathName = api.VENDOR_URL + sow_leads_chart;

    console.log(item, "item");

    sample
      .get(pathName, {
        sow_id: id,
        filter: item[0],
        month: item[1],
        year: item[2],
      })
      .then((res) => {
        console.log(res, "responsedatadata");
        const total = res?.data?.data?.value.reduce((acc, i) => acc + i, 0);
        setTotalLeads(total);
        setPieData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      {shimer ? (
        <Col
          xl={6}
          className="d-flex justify-content-start w-100"
          style={{ height: "100%" }}
        >
          <Card
            className="card-height-100"
            size="lg"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <CardHeader className="align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">QC Stats</h4>
              <div className="flex-shrink-0">
                <Dropdown
                  className="card-header-dropdown"
                  isOpen={isUserDropdown}
                  toggle={toggleDropdown}
                  direction="start"
                >
                  <DropdownToggle
                    tag="a"
                    className="text-reset dropdown-btn"
                    role="button"
                  >
                    <span className="text-muted fs-16">
                      <i className="mdi mdi-dots-vertical align-middle"></i>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    {/* <DropdownItem onClick={() => handleDropDown("year")}>
                    Today
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDropDown("week")}>
                    Current Week
                  </DropdownItem> */}
                    {/* <DropdownItem onClick={() => handleDropDown("month")}>
                    Current Month
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDropDown("last_month")}>
                    Last Month
                  </DropdownItem> */}

                    {monthData?.map((item) => (
                      <>
                        <DropdownItem
                          onClick={() =>
                            handleDropDown(["filter", item.value, item.year])
                          }
                        >
                          {item.label}
                        </DropdownItem>
                      </>
                    ))}
                    {/* <DropdownItem onClick={() => handleDropDown("year")}>
                    Current Year
                  </DropdownItem> */}
                    <DropdownItem
                      onClick={() => handleDropDown("overall", "0", "0")}
                    >
                      Overall
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardHeader>
            <CardBody>
              <div dir="ltr">
                {pieData && <UsersByDeviceCharts data={pieData} />}
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-borderless table-sm table-centered align-middle table-nowrap mb-0">
                  <tbody className="border-0">
                    <tr>
                      <td>
                        <h4 className="text-truncate fs-14 fs-medium mb-0">
                          <i className="ri-stop-fill align-middle fs-18 text-warning me-2"></i>
                          Pending Leads
                        </h4>
                      </td>
                      <td>
                        {/* <p className="text-muted mb-0">
                                            <FeatherIcon
                                                icon="users"
                                                className="me-2 icon-sm"
                                            />
                                            105.02k</p> */}
                      </td>
                      <td className="text-end">
                        <p className="text-warning fw-medium fs-12 mb-0">
                          <i className=" fs-5 align-middle"></i>
                          {(pieData?.value[0] == 0
                            ? 0
                            : (pieData?.value[0] * 100) / totalLeads
                          ).toFixed(2)}
                          %
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4 className="text-truncate fs-14 fs-medium mb-0">
                          <i className="ri-stop-fill align-middle fs-18 text-success me-2"></i>
                          Approved Leads
                        </h4>
                      </td>
                      <td>
                        {/* <p className="text-muted mb-0">
                                            <FeatherIcon
                                                icon="users"
                                                className="me-2 icon-sm"
                                            />
                                            78.56k</p> */}
                      </td>
                      <td className="text-end">
                        <p className="text-success fw-medium fs-12 mb-0">
                          <i className=" fs-5 align-middle "></i>
                          {(pieData?.value[1] == 0
                            ? 0
                            : (pieData?.value[1] * 100) / totalLeads
                          ).toFixed(2)}
                          %
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h4 className="text-truncate fs-14 fs-medium mb-0">
                          <i className="ri-stop-fill align-middle fs-18 text-danger me-2"></i>
                          Rejected Leads
                        </h4>
                      </td>
                      <td>
                        {/* <p className="text-muted mb-0">
                                            <FeatherIcon
                                                icon="users"
                                                className="me-2 icon-sm"
                                            />
                                            42.89k</p> */}
                      </td>
                      <td className="text-end">
                        <p className="text-danger fw-medium fs-12 mb-0">
                          <i className=" fs-5 align-middle"></i>
                          {(pieData?.value[2] == 0
                            ? 0
                            : (pieData?.value[2] * 100) / totalLeads
                          ).toFixed(2)}
                          %
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      ) : (
        <Card
          md={4}
          className="shine"
          style={{ width: "100%", height: "430px" }}
        ></Card>
      )}
    </React.Fragment>
  );
};

export default ManagerTotalLeads;
