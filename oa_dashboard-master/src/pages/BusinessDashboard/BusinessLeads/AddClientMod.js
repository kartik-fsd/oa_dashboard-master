import axios from "axios";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  check_client_email,
  client_list_business,
  create_client,
} from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import AreadyexistsMod from "./AreadyexistsMod";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { successnotify, warningnotify } from "../../Toasts";

const AddClientMod = ({
  open,
  setOpen,
  companyId,
  companyName,
  setCheck,
  check,
}) => {
  const [data, setData] = React.useState({});
  const [mail, setMail] = React.useState("");
  const [search, setSearch] = React.useState([]);
  const [openAlr, setOpenAlr] = React.useState(false);
  const [ext, setExt] = React.useState(false);
  const [but, setbut] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();

  console.log(companyId, "dta");
  console.log(window.location.pathname, "resclt");

  const handleCheckClient = (e) => {
    e.preventDefault();
    const link = api.ONX_URL + check_client_email;
    axios
      .get(link, { params: { email: mail } })
      .then((res) => {
        setSearch(res.data.search);
        setExt(true);
        if (res.data.search?.length > 0) {
          setOpenAlr(true);
        } else setOpenAlr(false);
      })
      .catch((err) => console.log(err));
  };

  const client = () => {
    const clientLink = api.ONX_URL + client_list_business;
    axios
      .get(clientLink)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const link = api.ONX_URL + create_client;

    if (id == undefined) {
      data.company_id = companyId;
    } else {
      data.company_id = id;
    }

    console.log(data);
    const comp = Object.keys(data);

    if (comp?.length >= 7) {
      axios
        .post(link, data)
        .then((res) => {
          successnotify("success");
          setOpen(false);
          client();
          setCheck(!check);
        })
        .catch((err) => warningnotify("oops something went wrong"))
        .finally(() => {
          setData({});
          setTimeout(() => {
            setbut(false);
          }, 1000);
        });
    } else {
      warningnotify("Please fill all the details");
      setTimeout(() => {
        setbut(false);
      }, 1000);
    }
  };

  return (
    <>
      <div>
        <Modal
          isOpen={open}
          toggle={() => {
            setOpen(false);
            setExt(false);
            setMail("");
            setSearch([]);
            setOpenAlr(false);
            setData({});
          }}
          centered={true}
          size={"lg"}
        >
          <ModalHeader
            toggle={() => {
              setOpen(false);
              setExt(false);
              setMail("");
              setSearch([]);
              setOpenAlr(false);
              setData({});
            }}
          >
            <h5 className=" m-0" style={{ color: "#b83016" }}>
              Add Client
            </h5>
          </ModalHeader>
          <ModalBody>
            <Row>
              <form onSubmit={(e) => handleCheckClient(e)}>
                <Col xs="12">
                  <Label>Enter Email Address</Label>
                  <div className="input-group">
                    <input
                      type="email"
                      required
                      className="form-control"
                      aria-label="Recipient's username with two button addons"
                      onChange={(e) => {
                        setMail(e.target.value);
                        setData({ ...data, client_email: e.target.value });
                      }}
                    />

                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#ec5c24",
                        color: "whitesmoke",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#dd4319")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#ec5c24")
                      }
                      type="submit"
                      //   onClick={() => handleCheckClient()}
                    >
                      check
                    </button>
                  </div>
                </Col>
              </form>
            </Row>
            {ext && search?.length == 0 ? (
              <Row className="mt-4 ">
                <h5 className="m-0 " style={{ color: "#b83016" }}>
                  Client Details
                </h5>
                <Col xs="6" className="mt-4">
                  <div>
                    <label htmlFor="labelInput" className="form-label">
                      Client Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="labelInput"
                      onChange={(e) =>
                        setData({ ...data, client_name: e.target.value })
                      }
                    />
                  </div>
                </Col>
                <Col xs="6" className="mt-4">
                  <div>
                    <label htmlFor="labelInput" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="labelInput"
                      onInput={(e) =>
                        (e.target.value = Math.max(
                          0,
                          parseInt(e.target.value).toString().slice(0, 10)
                        ))
                      }
                      onChange={(e) =>
                        setData({ ...data, client_phone: e.target.value })
                      }
                    />
                  </div>
                </Col>
                <Col xs="6" className="mt-4">
                  <div>
                    <label htmlFor="labelInput" className="form-label">
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="labelInput"
                      onChange={(e) =>
                        setData({ ...data, client_designation: e.target.value })
                      }
                    />
                  </div>
                </Col>
                <Col xs="6" className="mt-4">
                  {/* <div>
                    <label htmlFor="labelInput" className="form-label">
                      Since
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="labelInput"
                      onChange={(e) =>
                        setData({ ...data, since: e.target.value })
                      }
                    />
                  </div> */}
                  <div>
                    <Label className="form-label ">Join Date</Label>
                    <Flatpickr
                      className="form-control"
                      options={{
                        dateFormat: "d M, Y",
                      }}
                      onChange={(e) => {
                        setData({
                          ...data,
                          client_since: moment(e[0]).format("YYYY-MM-DD"),
                        });
                        // console.log(moment(e[0]).format("YYYY-MM-DD"), "ee");
                      }}
                    />
                  </div>
                </Col>
                <Col xs="6" className="mt-4">
                  <div>
                    <label htmlFor="labelInput" className="form-label">
                      Linkedin
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="labelInput"
                      onChange={(e) =>
                        setData({ ...data, client_linkedIn: e.target.value })
                      }
                    />
                  </div>
                </Col>
                <Col xs="6" className="mt-4">
                  <div>
                    <label htmlFor="labelInput" className="form-label">
                      Company
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="labelInput"
                      readOnly
                      value={companyName}
                      onChange={(e) =>
                        setData({ ...data, company: e.target.value })
                      }
                    />
                  </div>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            {openAlr && (
              <div
                className="text-center mt-4 bg-soft-success "
                style={{ padding: "45px" }}
              >
                <p className="fs-20">Client already exists</p>
                <Button
                  color="link"
                  onClick={() =>
                    history.push(
                      `/business-dashboard/addclient/${search[0]?.client_id}`
                    )
                  }
                >
                  Client Details
                </Button>
              </div>
            )}
          </ModalBody>
          {ext && search?.length == 0 ? (
            <ModalFooter>
              <button
                type="button"
                className="btn  waves-effect waves-light"
                style={{
                  backgroundColor: "#ec5c24",
                }}
                disabled={but}
                onClick={() => {
                  handleSubmit();
                  setbut(true);
                }}
              >
                save
              </button>
            </ModalFooter>
          ) : (
            <></>
          )}
        </Modal>
      </div>
      {/* <AreadyexistsMod open={openAlr} setOpen={setOpenAlr} search={search} /> */}
    </>
  );
};

export default AddClientMod;
