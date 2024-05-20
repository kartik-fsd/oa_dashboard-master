import axios from "axios";
import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {
  getInvtomove,
  getpaymentRequest,
  movetoInvoice,
} from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import Select from "react-select";
import { successnotify, warningnotify } from "../../Toasts";
import { useHistory } from "react-router-dom";

const MoveToInvModal = ({ open3, setOpen3, data, table }) => {
  const [InvoiceOptions, setInvoiceOptions] = React.useState([]);
  const [invoice, setInvoice] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    const link = farming.farming_URL + getInvtomove;
    const data = {};
    data.year = data.year;
    axios
      .post(link, data)
      .then((res) => {
        setInvoiceOptions(res.data.invoice);
        console.log(res.data, "ress");
      })
      .catch((err) => console.log(err));
  }, []);

  const link = farming.farming_URL + movetoInvoice;
  const handleMoveInvoiceSubmit = async () => {
    const body = {};
    body.invoice_id_before = data.invoice_id_before;
    body.invoice_id_after = invoice.value;
    body.id = table.req_id;

    //   axios
    //     .put(movetoInvoice, body, dataToken)
    //     .then((res) => console.log(res.message))
    //     .catch((err) => console.log(err));

    try {
      let res = await axios.put(movetoInvoice, body);
      if (res) {
        setOpen3(false);
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "success",
        //   text: `Request ${table.req_id}as moved from invoice ${state.invoice_id_before} to invoice ${invoice.value} `,
        //   showConfirmButton: true,
        // });
        successnotify(
          `Request ${table.req_id}as moved from invoice ${data.invoice_id_before} to invoice ${invoice.value}`
        );

        history.push("/invoice-2022");
      }
    } catch (error) {
      warningnotify("oops something went wrong...!");
    }
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open3}
        size="md"
        toggle={() => {
          setOpen3(false);
          setInvoice("");
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen3(false);
            setInvoice("");
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Move To Invoice</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="9">
              <Select
                aria-label=".form-select-sm example"
                options={InvoiceOptions}
                isClearable={false}
                onChange={(value) => {
                  setInvoice(value);
                }}
              ></Select>
            </Col>
            <Col xs="3">
              <button
                type="button"
                className="btn waves-effect waves-light text-light"
                style={{ backgroundColor: "#ec5c24" }}
                disabled={invoice == "" ? true : false}
              >
                Submit
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MoveToInvModal;
