import axios from "axios";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import {
  leads_list_business,
  lead_cards,
} from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import AddLead from "./AddLead";
import BusinessLeadsTable from "./BusinessLeadsTable";

const BusinessLeads = () => {
  const [open, setOpen] = React.useState(false);
  const [leadList, setLeadList] = React.useState([]);
  const [leadCards, setLeadCards] = React.useState([]);
  const [filt, setFilt] = React.useState("all");
  const [check, setCheck] = React.useState(false);
  document.title = "Onx | Business";

  React.useEffect(() => {
    const link = api.ONX_URL + leads_list_business;

    axios
      .get(link, { params: { status: filt } })
      .then((res) => setLeadList(res.data.leads_list))
      .catch((err) => console.log(err));
  }, [filt, check]);

  React.useEffect(() => {
    const link = api.ONX_URL + lead_cards;

    axios
      .get(link)
      .then((res) => setLeadCards(res.data.leads_cards))
      .catch((err) => console.log(err));
  }, [check]);

  return (
    <div className="page-content">
      <div>
        <Row>
          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft text-dark rounded-circle fs-3">
                      <i
                        className={
                          "align-middle  ri-shopping-bag-line text-light"
                        }
                      ></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Total Leads
                    </p>
                    <h4 className=" mb-0">{leadCards[0]?.total_leads}</h4>
                  </div>
                  {/* <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft-success"}>
                      <i className={"align-middle me-1 ri-arrow-up-s-fill"}></i>
                      82 %<span></span>
                    </span>
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-success text-success rounded-circle fs-3">
                      <i className={"align-middle  bx bx-radio"}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Nurturing
                    </p>
                    <h4 className=" mb-0">{leadCards[0]?.lead_nurturing}</h4>
                  </div>
                  {/* <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft-danger me-1"}>
                      {leadCards[0]?.lead_nurturing_late}
                    </span>
                    <span className={"badge badge-soft-success"}>
                      {leadCards[0]?.lead_nurturing_early}
                    </span>
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span
                      className="avatar-title bg-light  rounded-circle fs-3"
                      style={{ color: "#b83016" }}
                    >
                      <i className={"align-middle  bx bx-user-circle"}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Maturing
                    </p>
                    <h4 className=" mb-0">{leadCards[0]?.lead_maturing}</h4>
                  </div>
                  {/* <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft-danger me-1"}>
                      {leadCards[0]?.lead_maturing_late}
                    </span>
                    <span className={"badge badge-soft-success"}>
                      {leadCards[0]?.lead_maturing_early}
                    </span>
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span
                      className="avatar-title bg-light  rounded-circle fs-3"
                      style={{ color: "#b83016" }}
                    >
                      <i className={"align-middle  bx bxs-hot"}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Hot Leads
                    </p>
                    <h4 className=" mb-0">{leadCards[0]?.hot_lead}</h4>
                  </div>
                  {/* <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft me-1"}>
                      {leadCards[0]?.hot_lead_late}
                    </span>
                    <span className={"badge badge-soft-"}>
                      {leadCards[0]?.hot_lead_early}
                    </span>
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h5 style={{ color: "#b83016" }}>My Leads</h5>
            <div style={{ marginRight: "228px" }}>
              <div>
                <button
                  type="button"
                  className="btn waves-effect waves-light text-light me-1"
                  style={{ backgroundColor: "#ec5c24" }}
                  onClick={() => setOpen(!open)}
                >
                  <i className=" ri-add-fill align-bottom me-1 fs-14"></i>
                  Add Lead
                </button>

                <UncontrolledDropdown className="dropdown d-inline-block">
                  <DropdownToggle className="btn  " tag="button">
                    <button
                      type="button"
                      className="btn  waves-effect waves-light text-light"
                      style={{ backgroundColor: "#ec5c24" }}
                    >
                      <i className=" ri-filter-3-line align-bottom fs-14 me-1"></i>
                      Filter
                    </button>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                      className="edit-item-btn d-flex align-items-center"
                      onClick={() => setFilt("nurturing")}
                    >
                      <i className=" ri-checkbox-circle-line fs-16 align-bottom me-2 text-muted"></i>
                      Nurturing
                    </DropdownItem>
                    <DropdownItem
                      className="edit-item-btn d-flex align-items-center"
                      onClick={() => setFilt("maturing")}
                    >
                      <i className=" ri-checkbox-circle-line fs-16 align-bottom me-2 text-muted"></i>
                      Maturing
                    </DropdownItem>
                    <DropdownItem
                      className="edit-item-btn d-flex align-items-center"
                      onClick={() => {
                        setFilt("hot_lead");
                      }}
                    >
                      <i className="  ri-edit-line align-bottom me-2 text-muted"></i>
                      Hot Lead
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <BusinessLeadsTable data={leadList} />
        </CardBody>
      </Card>
      <AddLead
        open={open}
        setOpen={setOpen}
        setCheck={setCheck}
        check={check}
      />
    </div>
  );
};

export default BusinessLeads;
