import React from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useParams } from "react-router-dom";
import { api } from "../../../globalConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { add_campaign, campaign_stats } from "../../../assets/utils/dashboard";
import ModalFormCamp from "../ModalForm/ModalFormCamp";

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

const CampLeads = () => {
  const { id } = useParams();
  const sowId = id.split("-")[0];
  const [tableData, setTableData] = React.useState([]);
  const [linkData, setLinkData] = React.useState({});
  const [check, set_check] = React.useState(true);
  const [open, set_open] = React.useState(false);
  const [data, set_data] = React.useState(false);
  const [camp_stats, set_camp_stats] = React.useState({});

  const checkLeadsURL = api.OA_URL + `/camp_leads?sow_id=${sowId}`;
  const linkCheckURL = api.OA_URL + `/camp_link_check?sow_id=${sowId}`;
  const postCampaign = api.OA_URL + add_campaign;
  const campaignStatsURL = api.OA_URL + campaign_stats;

  React.useEffect(() => {
    axios
      .get(checkLeadsURL)
      .then((res) => setTableData(res.data?.leads))
      .catch((err) => console.log(err));
    axios
      .get(linkCheckURL)
      .then((res) => setLinkData(res.data?.camp_data))
      .catch((err) => console.log(err));
    axios
      .get(campaignStatsURL, { params: { sow_id: sowId } })
      .then((res) => {
        set_camp_stats(res.data?.campaign_stats);
      })
      .catch((err) => console.log(err));
  }, [check]);

  const handleHotLead = (data) => {
    set_open(true);
    set_data(data);
  };

  const columns = [
    // {
    //   name: "Lead ID",
    //   selector: (row) => row.lead_id,
    //   sortable: true,
    //   center: true,
    // },
    {
      name: "Lead Name",
      selector: (row) => row.merchant_name,
      sortable: true,
      left: true,
    },
    {
      name: "Lead Number",
      selector: (row) => row.merchant_number,
      sortable: true,
      center: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      center: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode,
      sortable: true,
      center: true,
    },
    {
      name: "Lead created",
      selector: (row) => row.add_lead,
      sortable: true,
      center: true,
      width: "120px",
      cell: (d) => {
        return (
          <div>
            {d.add_lead == "yes" ? (
              <i
                className="bx bx-check "
                style={{ fontSize: "24px", color: "green" }}
              ></i>
            ) : (
              <i
                className="bx bx-x"
                style={{ fontSize: "24px", color: "red" }}
              ></i>
            )}
          </div>
        );
      },
    },
    {
      name: "Hot Lead",
      selector: (row) => row.hot_lead,
      sortable: true,
      center: true,

      width: "120px",

      cell: (d) => {
        return (
          <div>
            {d.hot_lead == "yes" ? (
              <i
                className="bx bx-check"
                style={{ fontSize: "24px", color: "green" }}
              ></i>
            ) : (
              <i
                className="bx bx-x"
                style={{ fontSize: "24px", color: "red" }}
              ></i>
            )}
          </div>
        );
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      width: "100px",
      cell: (d) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {/* <DropdownItem
                className="d-flex align-items-center"
                // onClick={() => handleFetchFSE(d)}
                // disabled={true}
              >
                <i className="mdi mdi-truck-plus-outline align-bottom me-2 text-muted fs-14"></i>
                Create Leads
              </DropdownItem> */}
              <DropdownItem
                className="d-flex align-items-center"
                onClick={() => {
                  handleHotLead(d);
                }}
                // disabled={true}
              >
                <i className="mdi mdi-truck-snowflake me-2 text-muted fs-14"></i>
                Move to Hot Leads
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
      // width: "100px",
    },
  ];

  function copyDmLink(id, name) {
    console.log(id, name, "hiii");
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

  const handleAddCampaign = () => {
    const body = {};
    body.campaign_name = linkData?.campaign_name;
    body.sow_id = sowId;

    axios
      .post(postCampaign, body)
      .then((res) => {
        toast(`Campaign Link created`, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
        set_check(!check);
      })
      .catch((err) => console.log(err));
  };

  const Data = {
    columns: columns,
    data: tableData,
  };

  //, background: "#f3f3f8"
  return (
    <Container fluid>
      <Card className="crm-widget">
        <CardBody className="p-0">
          <Row className="row-cols-md-3 row-cols-1">
            <Col className={"col-lg border-end my-3"}>
              <div className="py-1 px-3 d-flex align-items-center justify-content-between">
                <h5 className="m-0 text-muted text-uppercase fs-13 d-flex align-items-center gap-2">
                  <i
                    className={"display-6 text-muted fs-20 ri-space-ship-line"}
                  ></i>
                  Campaign Leads
                </h5>
                <span className="fs-18 fw-bold">
                  {camp_stats?.campaign_count}
                </span>
              </div>
            </Col>
            <Col className={"col-lg border-end my-3"}>
              <div className="py-1 px-3 d-flex align-items-center justify-content-between">
                <h5 className="m-0 text-muted text-uppercase fs-13 d-flex align-items-center gap-2">
                  <i
                    className={
                      "display-6 text-muted fs-20 ri-git-repository-line"
                    }
                  ></i>
                  Moved to Hot Leads
                </h5>
                <span className="fs-18 fw-bold">
                  {camp_stats?.hot_lead_count}
                </span>
              </div>
            </Col>
            <Col className={"col-lg border-end my-3"}>
              <div className="py-1 px-3 d-flex align-items-center justify-content-between">
                <h5 className="m-0 text-muted text-uppercase fs-13 d-flex align-items-center gap-2">
                  <i
                    className={"display-6 text-muted fs-20 bx bx-store-alt"}
                  ></i>
                  Direct Conversion
                </h5>
                <span className="fs-18 fw-bold">
                  {camp_stats?.add_lead_count}
                </span>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader style={{ height: "64px" }}>
          {/* <h5>Hot Leads</h5> */}
          {linkData?.link === "" ? (
            <button
              style={{
                float: "right",
                marginTop: "-2px",
                marginRight: "220px",
              }}
              className="btn btn-primary "
              onClick={handleAddCampaign}
            >
              <i className="ri-add-line align-middle me-1"></i> Generate Link
            </button>
          ) : (
            <>
              <input
                className="d-none"
                type="text"
                value={linkData?.link}
                id={`dmlink${linkData?.campaign_id}`}
              />
              <button
                style={{
                  float: "right",
                  marginTop: "-2px",
                  marginRight: "220px",
                }}
                className="btn btn-primary "
                onClick={() => {
                  copyDmLink(
                    `dmlink${linkData?.campaign_id}`,
                    linkData?.campaign_name
                  );
                  console.log(
                    `dmlink${linkData?.campaign_id}`,
                    linkData?.campaign_name
                  );
                }}
              >
                <i className="bx bx-copy-alt align-middle me-1"></i> Copy Link
              </button>
            </>
          )}
        </CardHeader>
        <CardBody>
          <DataTableExtensions
            {...Data}
            export={false}
            filterPlaceholder={`Search`}
            className="filter_text"
            style={{ paddingRight: "25px important" }}
          >
            <DataTable
              columns={columns}
              data={Data}
              theme="VendorTable"
              pagination
              expandableRows={false}
              customStyles={customStyles}
              highlightOnHover={true}
            />
          </DataTableExtensions>
        </CardBody>
      </Card>
      <Modal
        isOpen={open}
        toggle={() => {
          set_open(false);
        }}
        centered={true}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            set_open(false);
          }}
        >
          Move to Hot Leads
        </ModalHeader>

        <ModalBody>
          <div className="mt-2">
            <ModalFormCamp data={data} set_open={set_open} open={open} />
          </div>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default CampLeads;
