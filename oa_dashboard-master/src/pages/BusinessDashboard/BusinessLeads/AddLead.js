import React, { useRef, useState } from "react";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import img from "../../../assets/images/users/avatar-1.jpg";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { api } from "../../../globalConfig";
import {
  create_lead,
  search_client_list,
  search_company_list,
} from "../../../assets/utils/OnxUrl";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { use } from "i18next";
import { toast } from "react-toastify";
import { dangernotify, successnotify, warningnotify } from "../../Toasts";
import AddClientMod from "./AddClientMod";
const AddLead = (props) => {
  const history = useHistory();
  const { open, setOpen, setCheck, check } = props;
  const [brandData, setBrandData] = React.useState(null);
  const [clientDataList, setclientDataList] = React.useState([]);
  const [clientId, setClientId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [data, SetData] = React.useState([]);
  const [sourceofLead, setSourceOfLead] = useState("");
  const [descriptiondata, setDescriptiondata] = useState("");
  const [open2, setOpen2] = useState(false);
  const [but, setbut] = React.useState(false);

  console.log(open2, "open");

  const selectInputRef = useRef();

  console.log(companyName, "clientId");

  const onClear = () => {
    selectInputRef.current.select.clearValue();
  };

  const handleClickAddDetails = () => {
    let body =
      sourceofLead.length > 0
        ? {
            company_id: companyId,
            client_id: clientId,
            source_of_lead: sourceofLead,
            lead_description: descriptiondata,
          }
        : {};

    let apiData = api.ONX_URL + create_lead;
    console.log(body, "body");
    let comp = Object.values(body);
    // console.log(comp,'testingcomp')
    if (comp?.length >= 4 && !comp?.includes("") && !comp?.includes(null)) {
      axios
        .post(apiData, body)
        .then((res) => {
          if (res.data?.error) {
            warningnotify(res.data.message);
          } else {
            setOpen(false);
            successnotify("Success");
            setSourceOfLead("");
            setCheck(!check);
          }
        })
        .catch((err) => {
          dangernotify("something went wrong");
        })
        .finally(() => {
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
  const sourceLeadOpt = [
    // { value: "source_of_lead", label: "source_of_lead" },
    { value: "Email Campaign", label: "Email Campaign" },
    { value: "Referrals", label: "Referrals" },
    { value: " LinkedIn Approach", label: " LinkedIn Approach" },
    { value: " Telemarketing ", label: " Telemarketing " },
    { value: "  Cross Marketing ", label: "  Cross Marketing " },
    { value: "Referral (Client) ", label: "Referral (Client) " },
    { value: " Website Traffic", label: " Website Traffic" },
    { value: "  Google Ads ", label: "  Google Ads " },
    { value: "  Quess cross selling ", label: "  Quess cross selling  " },
    { value: "  Google Ads ", label: "  Google Ads " },
    { value: "  Quess cross selling ", label: "  Quess cross selling " },
    { value: "  Google Ads ", label: "  Google Ads " },
    { value: "  WhatsApp marketing  ", label: "  WhatsApp marketing " },
    { value: "  Quess Mail Shoot ", label: "  Quess Mail Shoot " },
    { value: "  WhatsApp marketing  ", label: "  WhatsApp marketing " },
    {
      value: "  Internal cross selling   ",
      label: "  Internal cross selling  ",
    },
    {
      value: "  Inbound And Content Marketing  ",
      label: "   Inbound And Content Marketing  ",
    },
    { value: "   Public Relations ", label: "    Public Relations  " },
    { value: "   Public Relations ", label: "    Public Relations  " },
    { value: "   SEO  ", label: "    SEO   " },
    { value: "   Social Media  ", label: "    Social Media   " },
    { value: "   SEO  ", label: "    SEO   " },
    { value: "   Social Media Ads  ", label: "    Social Media Ads   " },
    { value: "    Event and Outrage  ", label: "     Event and Outrage   " },
  ];

  const formatOptionData = (it) => {
    return (
      <div>
        <img
          src={it?.brand_logo}
          height="30px"
          alt=""
          width="30px"
          style={{ borderRadius: "50%" }}
        />
        <span className="text-dark fw-semibold text-capitalize mx-2">
          {it?.brand_name}
        </span>
      </div>
    );
  };

  const formatOptionData2 = (it) => {
    console.log(it, "tesing123");
    let dataToShow = it?.data;
    return (
      <div style={{ display: "flex" }}>
        <div>{dataToShow?.client_name}</div>
        <div>&nbsp;-&nbsp;</div>
        <div>
          <span
            className="badge badge-soft"
            style={{
              backgroundColor: "#f07d47",
            }}
          >
            {dataToShow?.client_designation}
          </span>
        </div>
      </div>
    );
  };

  const getCompanyList = () => {
    let apiData = api.ONX_URL + search_company_list;
    axios
      .get(apiData)
      // .then((res) => {
      //   SetData(res.data?.companies);
      // })
      .then((res) => {
        const dataEnter = [];
        res.data?.companies.forEach((item) => {
          const sample = {
            value: item.brand_name,
            label: item.brand_name,
            data: { ...item },
          };
          dataEnter.push(sample);
        });

        SetData(res.data?.companies);
      })
      .catch((err) => console.log(err, "err"));
  };

  const getClientList = (id) => {
    let apiData = api.ONX_URL + search_client_list;
    axios
      .get(apiData, { params: { company_id: id } })
      .then((res) => {
        console.log("resresponse", res?.data?.companies);
        let it = res?.data?.companies;
        let arr = [];
        it.map((item) =>
          arr.push({
            value: item.client_name,
            label: item.client_name,
            data: item,
          })
        );
        setclientDataList(arr);
      })
      .catch((err) => console.log(err, "err"));
  };
  React.useEffect(() => {
    getCompanyList();
  }, []);
  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => {
          setBrandData(null);
          setOpen(false);
        }}
        centered={true}
        size={"xl"}
      >
        <ModalHeader
          toggle={() => {
            setBrandData(null);
            setOpen(false);
          }}
          style={{ color: "#b83016" }}
        >
          Add Lead
        </ModalHeader>
        <ModalBody>
          <div>
            <label htmlFor="basiInput" className="form-label">
              Company
            </label>

            <div className="mb-3">
              <Select
                aria-label=".form-select-sm example"
                onChange={(e) => {
                  setBrandData(e);
                  setCompanyId(e?.company_id);
                  setCompanyName(e?.company_name);
                  getClientList(e?.company_id);
                }}
                options={data}
                formatOptionLabel={formatOptionData}
                isClearable
                getOptionValue={(option) => option.brand_name}
                noOptionsMessage={() => {
                  return (
                    <div
                      onClick={() =>
                        history.push("/business-dashboard/addcompany")
                      }
                    >
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          borderColor: "#EBEBEB",
                          color: "black",
                        }}
                      >
                        Add Company
                      </Button>
                    </div>
                  );
                }}
              ></Select>
            </div>
          </div>
          {brandData && sourceofLead.length > 0 && (
            <div
              className="mb-3 p-3 d-flex align-items-start gap-3"
              style={{ border: "1px solid #e6e9ec" }}
            >
              <div
                className="d-flex flex-column gap-2 justify-content-center align-items-center "
                style={{ flex: "0.6 1 0" }}
              >
                <img
                  src={brandData?.brand_logo}
                  alt=""
                  className="rounded-circle avatar-sm"
                />
                <span
                  className="badge badge-soft"
                  style={{ fontSize: "9px", backgroundColor: "#f07d47" }}
                >
                  {brandData?.company_unique_id}
                </span>
              </div>
              <div
                className="company_details d-flex flex-column gap-1 "
                style={{ flex: "1 1 0" }}
              >
                <div className="d-flex ">
                  <span className="fs-10" style={{ flexBasis: "75px" }}>
                    Company
                  </span>

                  <div
                    className="fs-11 text-secondary"
                    style={{
                      fontWeight: "500",
                      flexGrow: "1",
                      wordBreak: "break-all",
                      // textIndent: "4px",
                    }}
                  >
                    <span style={{ display: "inline-block" }}>
                      &#58;{brandData?.company_name}
                    </span>
                  </div>
                </div>
                <div className="d-flex ">
                  <span className="fs-10" style={{ flexBasis: "75px" }}>
                    Brand
                  </span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;{brandData?.brand_name}
                  </span>
                </div>
                <div className="d-flex">
                  <span className="fs-10" style={{ flexBasis: "75px" }}>
                    Industry Type
                  </span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;{brandData?.industry_type}
                  </span>
                </div>
              </div>
              <div
                className="d-flex flex-column gap-1"
                style={{ flex: "1 1 0" }}
              >
                <div>
                  <span className="fs-10">Company City</span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;{brandData?.company_city}
                  </span>
                </div>
                <div>
                  <span className="fs-10">Company Phone</span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;{brandData?.company_phone}
                  </span>
                </div>
                <div>
                  <span className="fs-10">Company Email</span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;{brandData?.company_email}
                  </span>
                </div>
              </div>
              <div
                className="d-flex flex-column gap-1"
                style={{ flex: "1 1 0" }}
              >
                <div>
                  <span className="fs-10">Creation Date</span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;{brandData?.created_at}
                  </span>
                </div>
                <div>
                  <span className="fs-10">Funding Status</span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;{brandData?.funding_status}
                  </span>
                </div>
                <div>
                  {/* <span className="fs-10">Company Start Date</span>
                  <span className="fs-11" style={{ fontWeight: "500" }}>
                    &#58;&nbsp;26-04-2015
                  </span> */}
                </div>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="basiInput" className="form-label">
              Client
            </label>
            {
              <Select
                aria-label=".form-select-sm example"
                onChange={(e) => {
                  // setBrandData(e);
                  console.log(e, "bodyyy");
                  setClientId(e?.data?.client_id);
                }}
                options={clientDataList}
                formatOptionLabel={formatOptionData2}
                ref={selectInputRef}
                isClearable
                getOptionValue={(option) => {
                  return option.value;
                }}
                noOptionsMessage={() => {
                  return (
                    <div
                      // onClick={() => history.push("/business-dashboard/")}
                      onClick={() => setOpen2(!open2)}
                    >
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          borderColor: "#EBEBEB",
                          color: "black",
                        }}
                        onClick={() => {
                          setOpen2(!open2);
                          console.log("hii");
                        }}
                      >
                        Add Client Details
                      </Button>
                    </div>
                  );
                }}
              ></Select>
            }
          </div>
          <div className="mt-3">
            <label htmlFor="basiInput" className="form-label">
              Source Of Lead
            </label>

            <Select
              aria-label=".form-select-sm example"
              onChange={(e) => {
                setSourceOfLead(e?.value.trim());
              }}
              options={sourceLeadOpt}
              isClearable
            ></Select>
          </div>
          <div className="mt-3">
            <label htmlFor="exampleFormControlTextarea5" className="form-label">
              Description
            </label>
            <textarea
              onChange={(e) => setDescriptiondata(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea5"
              rows="3"
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              onClick={() => {
                handleClickAddDetails();
                setbut(true);
              }}
              disabled={but}
              type="button"
              className="btn  btn-label waves-effect waves-light w-xs px-2 text-light"
              style={{ marginLeft: "10px", backgroundColor: "#ec5c24" }}
            >
              <i className=" bx bx-save  align-middle fs-14 me-1 "></i>
              Save
            </button>
          </div>
        </ModalBody>
      </Modal>

      <Modal>
        <ModalHeader></ModalHeader>
        <ModalBody></ModalBody>
      </Modal>
      <AddClientMod
        setOpen={setOpen2}
        open={open2}
        companyId={companyId}
        companyName={companyName}
      />
    </div>
  );
};

export default AddLead;
