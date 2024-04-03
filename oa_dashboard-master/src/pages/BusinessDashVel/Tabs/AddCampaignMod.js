import React from "react";
import {
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Select from "react-select";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { farming } from "../../../globalConfig";
import { addcampaign } from "../../../assets/utils/farmingBase";
import axios from "axios";
import { successnotify, warningnotify } from "../../Toasts";

const AddCampaignMod = (props) => {
  const {
    open,
    setIsOpen,
    state,
    setSelectedState,
    city,
    setSelectedCity,
    cluster,
    setClusterId,
    pinCode,
    setPincode,
    setCheck,
    check,
  } = props;
  // const modState = state?.map((item) => {
  //   return { ...item, label: item.state, value: item.state };
  // });
  // const modCity = city?.map((item) => {
  //   return { ...item, label: item.city, value: item.city };
  // });
  // const modCluster = cluster?.map((item) => {
  //   return { ...item, label: item.name, value: item.cluster_id };
  // });

  const { id } = useParams();
  const sowid = id?.split("-")[0];

  const [data, setData] = React.useState({});
  console.log(id?.split("-")[0], "sowid");

  const toggle = () => {
    setIsOpen(false);
    setClusterId(null);
    setPincode([]);
  };
  console.log(pinCode?.length, "array");
  // console.log(data, "datacmapaign");

  const addCampaign = async () => {
    try {
      data.sow_id = sowid;
      console.log(data, "datacmapaign");
      const link = farming.farming_URL + addcampaign;
      const create = await axios.post(link, data);
      successnotify("Campaign added successfully");
      setCheck(!check);
      toggle();
    } catch (error) {
      warningnotify("oops something went wrong...!");
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle} centered={true} size={"lg"}>
      <ModalHeader toggle={toggle}>Add Campaign</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="6">
            <div>
              <label htmlFor="basiInput" className="form-label">
                Campaign Name
              </label>
              <input
                type="text"
                className="form-control"
                id="basiInput"
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e?.target.value,
                  });
                }}
              />
            </div>
          </Col>
          <Col xs="6">
            <Label
              htmlFor="choices-multiple-remove-button"
              className="form-label"
            >
              Select State
            </Label>

            <Select
              aria-label=".form-select-sm example"
              onChange={(e) => {
                setSelectedState(e.value);
                setData({ ...data, state: e.value });
              }}
              options={state}
              //   formatOptionLabel={formatOptionData}
              //   isClearable
              //   getOptionValue={(option) => option?.data?.brand_name}
            ></Select>
          </Col>

          <Col xs="6" className="mt-4">
            <Label
              htmlFor="choices-multiple-remove-button"
              className="form-label"
            >
              Select City
            </Label>

            <Select
              aria-label=".form-select-sm example"
              onChange={(e) => {
                setSelectedCity(e.value);
                setData({
                  ...data,
                  city: e?.value,
                });
              }}
              options={city}
              //   formatOptionLabel={formatOptionData}
              //   isClearable
              //   getOptionValue={(option) => option?.data?.brand_name}
            ></Select>
          </Col>
          <Col xs="6" className="mt-4">
            <Label
              htmlFor="choices-multiple-remove-button"
              className="form-label"
            >
              Select Cluster
            </Label>

            <Select
              aria-label=".form-select-sm example"
              onChange={(e) => {
                setClusterId(e.value);
                setData({
                  ...data,
                  cluster_id: e?.value,
                });
              }}
              //   onChange={(e) => {
              //     setAll({
              //       ...all,
              //       company_id: e?.data?.company_id,
              //     });
              //   }}
              options={cluster}
              //   formatOptionLabel={formatOptionData}
              //   isClearable
              //   getOptionValue={(option) => option?.data?.brand_name}
            ></Select>
          </Col>
          {pinCode?.length > 0 && (
            <Col xs="12" className="mt-4">
              <div className="d-flex flex-column">
                <label htmlFor="basiInput" className="form-label">
                  Pincode
                </label>
                <div className="d-flex gap-3 flex-wrap">
                  {pinCode?.map((item) => {
                    return (
                      <>
                        <span
                          className="badge bg-primary"
                          style={{ minWidth: "130px" }}
                        >
                          <p className="m-0 fs-12 d-flex justify-content-start">
                            Area&nbsp; &nbsp; &nbsp; &nbsp;:&nbsp; {item.area}
                          </p>
                          <p className="m-0 fs-12 mt-2  d-flex justify-content-start">
                            Pincode&nbsp;:&nbsp; {item.pincode}
                          </p>
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-primary" onClick={addCampaign}>
          <i className=" ri-save-line align-middle me-1"></i>
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AddCampaignMod;
