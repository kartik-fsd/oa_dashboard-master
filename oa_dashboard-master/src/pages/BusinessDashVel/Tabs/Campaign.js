import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import AddCampaignMod from "./AddCampaignMod";
import company from "../../../assets/images/users/avatar-1.jpg";
import avatart from "../../../assets/images/users/avatar-1.jpg";
import { farming } from "../../../globalConfig";
import {
  addCampaignrequest,
  campaigncity,
  campaignPin,
  campaignstate,
  cluster,
  clusterlist,
  projectCampaign,
} from "../../../assets/utils/farmingBase";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AreYouSureModal from "../../../components/common/AreYouSureModal";
import { successnotify, warningnotify } from "../../Toasts";

const Campaign = () => {
  const { id } = useParams();
  const sowid = id?.split("-")[0];

  console.log(sowid, "sowid123");

  const [open, setIsOpen] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [selectedState, setSelectedState] = React.useState("");
  const [city, setCity] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState("");
  const [cluster, setCluster] = React.useState([]);
  const [clusterId, setClusterId] = React.useState(null);
  const [pinCode, setPincode] = React.useState([]);
  const [campList, setCampList] = React.useState([]);
  const [check, setCheck] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [campId, setCampId] = React.useState(null);

  // console.log(state, "datafasak");
  console.log(cluster, "clusterid");
  // console.log(pinCode, pinCode?.length, "pincode");

  // const link = {{far}}/campaign/state

  React.useEffect(() => {
    async function fetchState() {
      try {
        const link = farming.farming_URL + campaignstate;
        const data = await axios.get(link);

        setState(
          data.data.state?.map((item) => {
            return { ...item, label: item.state, value: item.state };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    async function getCamplist() {
      try {
        const link = farming.farming_URL + projectCampaign + sowid;
        const data = await axios.get(link);
        setCampList(data.data.projectCampaign);
        console.log(data.data.projectCampaign, "campaigndata");
      } catch (error) {
        console.log(error);
      }
    }
    getCamplist();
    fetchState();
  }, [check]);

  React.useEffect(() => {
    async function fetchCity() {
      try {
        const link = farming.farming_URL + campaigncity + selectedState;
        const data = await axios.get(link);
        setCity(
          data.data.city?.map((item) => {
            return { ...item, label: item.city, value: item.city };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchCity();
  }, [selectedState]);

  React.useEffect(() => {
    async function fetchCluster() {
      try {
        const link = farming.farming_URL + clusterlist + selectedCity;
        const data = await axios.get(link);
        setCluster(
          data.data.cluster?.map((item) => {
            return { ...item, label: item.name, value: item.cluster_id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchCluster();
  }, [selectedCity]);

  React.useEffect(() => {
    async function fetchPincode() {
      try {
        const link = farming.farming_URL + campaignPin + clusterId;
        const data = await axios.get(link);
        setPincode(data.data.pincode);
        // console.log(data.data.pincode ,"pincode");
      } catch (error) {
        console.log(error);
      }
    }
    fetchPincode();
  }, [clusterId]);

  const onSubmitClick = async (value) => {
    try {
      const link = farming.farming_URL + addCampaignrequest;
      const body = {
        campaign_id: value,
      };
      console.log(body, "body");
      const { data } = await axios.post(link, body);
      setShow(false);
      if (data.color === "warning") {
        warningnotify(data.message);
      } else {
        successnotify("success");
      }

      console.log(data, "res");
    } catch (error) {
      warningnotify("oops something went wrong...");
    }
  };

  const onCloseClick = () => {
    setShow(false);
  };

  return (
    <div>
      <Card>
        <CardHeader className="border-0 rounded">
          <Row className="g-2">
            <Col xl={3}>
              <div className="search-box">
                <Input
                  type="text"
                  className="form-control search"
                  placeholder="Search for campaign..."
                />{" "}
                <i className="ri-search-line search-icon"></i>
              </div>
            </Col>
            <Col xl={2} className="ms-auto">
              {/* <div>
                <select className="form-control">
                  <option value="">Select Categories</option>
                  <option value="All">All</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Health & Medicine">Health & Medicine</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Food Service">Food Service</option>
                  <option value="Computers & Electronics">
                    Computers & Electronics
                  </option>
                </select>
              </div> */}
            </Col>
            <div className="col-lg-auto">
              <div className="hstack gap-2">
                <button type="button" className="btn btn-danger">
                  {/* <i className="ri-equalizer-fill me-1 align-bottom"></i>{" "} */}
                  <i className="ri-filter-3-line me-1 align-bottom" />
                  Filters
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setIsOpen(!open);
                  }}
                >
                  <i className="ri-add-fill me-1 align-bottom"></i> Add Campaign
                </button>
              </div>
            </div>
          </Row>
        </CardHeader>
      </Card>
      <Row className="">
        {campList?.map((item) => {
          return (
            <>
              <Col xs="6">
                <Card className="card-body">
                  <div className="d-flex mb-3  justify-content-between">
                    <div className=" ms-1">
                      <h5
                        className="card-title mb-1"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.name}
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ textTransform: "capitalize" }}
                      >
                        Created By : {item.created_by}
                      </p>
                    </div>
                    <div>
                      <span
                        className={"badge rounded-pill"}
                        style={{ backgroundColor: "#ec5c24" }}
                      >
                        {item.cluster_name}
                      </span>
                      {/* <p className="card-text text-dark  m-0">{item.state}</p>
                      <p className="card-text text-dark ">{item.city}</p> */}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <p className="card-text text-dark  m-0">
                      State : {item.state}
                    </p>
                    <p className="card-text text-dark ">City : {item.city}</p>
                  </div>
                  <div className="my-2">
                    <span className="mb-2 text-dark font-weight-bold">
                      Pincodes :
                    </span>
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      {item?.pincode?.map((el) => (
                        <span
                          key={el.pincode}
                          className={"badge badge-soft"}
                          style={{ backgroundColor: "#f07d47" }}
                        >
                          {el.pincode}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-1">
                    <button
                      type="button"
                      className="btn waves-effect waves-light text-light btn-sm"
                      onClick={() => {
                        setShow(!show);
                        setCampId(item.campaign_id);
                      }}
                      style={{ backgroundColor: "#ec5c24" }}
                    >
                      Request Leads
                    </button>
                  </div>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
      <AddCampaignMod
        open={open}
        setIsOpen={setIsOpen}
        state={state}
        setSelectedState={setSelectedState}
        city={city}
        setSelectedCity={setSelectedCity}
        cluster={cluster}
        setClusterId={setClusterId}
        pinCode={pinCode}
        setPincode={setPincode}
        setCheck={setCheck}
        check={check}
      />

      <AreYouSureModal
        show={show}
        statement={"To Create A New Lead"}
        onSubmitClick={onSubmitClick}
        onCloseClick={onCloseClick}
        value={campId}
      />
    </div>
  );
};

export default Campaign;
