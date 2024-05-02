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
import {
  company_list_dropdown,
  search_company_gst,
  update_client_company_details,
} from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import { successnotify, warningnotify } from "../../Toasts";

const Compantdetils = ({ open, setOpen, data, setCheck, check }) => {
  const [compDet, setCompDet] = React.useState({});
  const [compList, setCompList] = React.useState([]);
  const [gstList, setGstList] = React.useState([]);
  const [compId, setCompId] = React.useState("");
  const [compGst, setCompGst] = React.useState("");

  const { id } = useParams();

  console.log(compId, compGst, id, "tiger");

  const companyList = () => {
    const link = api.TASKMO_URL + company_list_dropdown;

    axios
      .get(link)
      .then((res) => setCompList(res.data.company_list))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    companyList();
  }, []);

  //   const handleCompanyList = (e) => {
  //     const link = api.TASKMO_URL + search_company_gst;
  //     // console.log(e.value, "eee");
  //     setCompId(e.value);
  //     axios
  //       .get(link, { params: { company_id: e.value } })
  //       .then((res) => setGstList(res.data.company_gst))
  //       .catch((err) => console.log(err));
  //   };

  const handleCompanyList = (e) => {
    if (e) {
      const link = api.TASKMO_URL + search_company_gst;
      setCompId(e.value);
      axios
        .get(link, { params: { company_id: e.value } })
        .then((res) => setGstList(res.data.company_gst))
        .catch((err) => console.log(err));
    } else {
      // Handle clear action
      setCompId(null); // Clear the selected company ID
      setGstList([]); // Clear the GST list or reset it to the initial state
    }
  };

  const handleGst = (e) => {
    if (e) {
      setCompGst(e.value);
    } else {
      setCompGst("");
    }
  };

  const handleUpdate = () => {
    const link = api.TASKMO_URL + update_client_company_details;
    let body = {
      client_id: id,
      company_id: compId,
      company_gst_id: compGst,
    };
    console.log(Object.values(body), "hehe");

    if (Object.values(body)?.includes("")) {
      warningnotify("Please Select All Details");
    } else {
      axios
        .patch(link, body)
        .then((res) => {
          successnotify("success");
          setOpen(false);
          setCheck(!check);
        })
        .catch((err) =>
          console.log(warningnotify("oops something went wrong...!"))
        )
        .finally((body = {}));
    }
  };

  return (
    <div>
      {" "}
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(false);
          setCompId("");
          setCompGst("");
        }}
        centered={true}
        size={"xl"}
      >
        <ModalHeader toggle={() => setOpen(false)}>Company Details</ModalHeader>
        <ModalBody>
          {/* <h5 className="mb-3">Company Details</h5> */}

          <Row>
            <Col lg={6}>
              <Label className="mt-1">Company</Label>
              <Select
                aria-label=".form-select-sm example"
                onChange={handleCompanyList}
                options={compList}
                isClearable={true}
              ></Select>
            </Col>
            <Col lg={6}>
              <Label className="mt-1">GST</Label>
              <Select
                aria-label=".form-select-sm example"
                onChange={handleGst}
                options={gstList}
                isClearable
              ></Select>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn  waves-effect waves-light"
            style={{ backgroundColor: "#ec5c24" }}
            // disabled={Object.keys(compDet)?.length > 0 ? false : true}
            onClick={handleUpdate}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Compantdetils;
