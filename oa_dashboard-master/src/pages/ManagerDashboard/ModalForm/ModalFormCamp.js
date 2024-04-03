import React from "react";
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

function ModalFormCamp({ data, set_open, open }) {
  const params = useParams();
  let id = params.id.split("-")[0];

  const [data_enter, set_data_enter] = React.useState({
    sow_id: id,
    merchant_name: data.merchant_name,
    merchant_number: data.merchant_number,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    set_data_enter({ ...data_enter, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(moveToHotLead, data_enter)
      .then((res) => {
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
        } else {
          toast(`Success`, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          set_open(!open);
        }
      })
      .catch((err) => {});
  };
  return (
    <Row className="d-flex mx-1">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Label htmlFor="placeholderInput" className="form-label">
              Lead Name
            </Label>
            <Input
              type="text"
              className="form-control"
              id="placeholderInput"
              placeholder={data.merchant_name}
              name="merchant_name"
              readOnly
            />
          </Col>
          <Col md={6}>
            <Label htmlFor="placeholderInput" className="form-label">
              Lead Number
            </Label>
            <Input
              type="text"
              className="form-control"
              id="placeholderInput"
              placeholder={data.merchant_number}
              name="merchant_number"
              readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Label htmlFor="placeholderInput" className="form-label">
              Category
            </Label>
            <Input
              type="text"
              className="form-control"
              id="placeholderInput"
              placeholder="Enter Category"
              name="category"
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={6}>
            <Label htmlFor="placeholderInput" className="form-label">
              Sub Category
            </Label>
            <Input
              type="text"
              className="form-control"
              id="placeholderInput"
              placeholder="Enter Category"
              name="sub_category"
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Label htmlFor="placeholderInput" className="form-label">
              Language
            </Label>
            <Input
              type="text"
              className="form-control"
              id="placeholderInput"
              placeholder="Enter Category"
              name="language"
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={6}>
            <Label htmlFor="placeholderInput" className="form-label">
              Latitude
            </Label>
            <Input
              type="text"
              className="form-control"
              id="placeholderInput"
              placeholder="Enter Latitude"
              name="latitude"
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Label htmlFor="placeholderInput" className="form-label">
              longitude
            </Label>
            <Input
              type="text"
              className="form-control"
              id="placeholderInput"
              placeholder="Enter Latitude"
              name="longitude"
              onChange={handleChange}
              required
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <div className="w-100 d-flex justify-content-end mt-2">
            <button className="btn btn-primary">Submit</button>
          </div>
        </Row>
      </Form>
    </Row>
  );
}

export default ModalFormCamp;
