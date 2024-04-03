import React, { useEffect } from "react";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { moveToHotLead } from "../../../assets/utils/abhiApi";
import { toast } from "react-toastify";
import Select from "react-select";
import { api } from "../../../globalConfig";
import { create_oa_sow, spoc_list } from "../../../assets/utils/dashboard";

function ModalFormSpocs(props) {
  const params = useParams();
  let id = params.id.split("-")[0];

  const SinglePermissionOptions = [
    { value: "admin", label: "Internal access" },
    { value: "client", label: "Client access" },
  ];

  const [data_enter, set_data_enter] = React.useState({});
  const [select_permission, set_select_permission] = React.useState("");
  const [select_spoc, set_select_spoc] = React.useState("");
  const [spoc_list_data, set_spoc_list_data] = React.useState([]);

  const allSpocURL = api.VENDOR_URL + spoc_list;
  const AddSpocURL = api.VENDOR_URL + create_oa_sow;

  const handleChange = (e) => {
    const { name, value } = e.target;
    set_data_enter({ ...data_enter, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get(allSpocURL)
      .then((res) => {
        set_spoc_list_data(res.data?.spoc_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSelectSingle(e) {
    set_select_permission(e);
  }

  const handleSubmitSpoc = () => {
    const dataEnter = {
      sow_id: props.sow_id,
      oa_id: select_spoc.value,
    };

    axios
      .post(AddSpocURL, dataEnter)
      .then((res) => {
        if (res.data?.error) {
          toast(res.data?.message, {
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
          props.set_open(!props.open);
        }
      })
      .catch();
  };

  return (
    <Row className="d-flex mx-1">
      <Row>
        <Label
          htmlFor="choices-single-default"
          className="form-label text-muted"
        >
          Permission
        </Label>
        <Select
          value={select_permission}
          onChange={(e) => handleSelectSingle(e)}
          options={SinglePermissionOptions}
        />
      </Row>
      {select_permission?.value == "admin" ? (
        <Row className="mt-3">
          <div>
            <Label
              htmlFor="choices-single-default"
              className="form-label text-muted"
            >
              Please select support associate
            </Label>
            <Select
              value={select_spoc}
              onChange={(e) => set_select_spoc(e)}
              options={spoc_list_data}
            />
          </div>
          <div className="d-flex justify-content-end">
            <div className="w-100 d-flex justify-content-end mt-3">
              <button className="btn btn-primary" onClick={handleSubmitSpoc}>
                Submit
              </button>
            </div>
          </div>
        </Row>
      ) : select_permission?.value == "client" ? (
        <>
          <Form onSubmit={handleSubmit}>
            <Row className="mt-3">
              <Col md={6}>
                <Label htmlFor="placeholderInput" className="form-label">
                  Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="placeholderInput"
                  placeholder="Enter name"
                  name="full_name"
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6}>
                <Label htmlFor="placeholderInput" className="form-label">
                  Email ID
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="placeholderInput"
                  placeholder="Enter email"
                  name="email_id"
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Label htmlFor="placeholderInput" className="form-label">
                  Phone Number
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="placeholderInput"
                  placeholder="Enter number"
                  name="mobile_number"
                  onChange={handleChange}
                  minLength={10}
                  maxLength={10}
                  required
                />
              </Col>
              <Col md={6}></Col>
            </Row>

            <Row>
              <div className="w-100 d-flex justify-content-end mt-2">
                <button className="btn btn-primary">Submit</button>
              </div>
            </Row>
          </Form>
        </>
      ) : (
        <></>
      )}
    </Row>
  );
}

export default ModalFormSpocs;
