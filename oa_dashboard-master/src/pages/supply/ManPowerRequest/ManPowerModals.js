import axios from "axios";
import React from "react";
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import avatar from "../../../../src/assets/images/users/avatar-1.jpg";
import {
  supply_req_list,
  bulkAddsupplyreq,
} from "../../../assets/utils/SupplyApi";
import { farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";
const ManPowerModals = ({ setOpen, open, userData }) => {
  const [selec, setSelec] = React.useState([]);
  const [supplyReqList, setSupplyReqList] = React.useState([]);
  const [check, setCheck] = React.useState(true);

  const handleChange = (e, id) => {
    if (e.target.checked && selec.length < userData.count) {
      if (selec.includes(id)) {
        setSelec(selec.filter((el) => el !== id));
      } else {
        setSelec([...selec, id]);
      }
    } else {
      setSelec(selec.filter((el) => el !== id));
    }
  };
  React.useEffect(() => {
    const link = farming.farming_URL + supply_req_list;

    axios
      .get(link)
      .then((res) => setSupplyReqList(res.data.supply_req))
      .catch((err) => console.log(err));
  }, [check]);

  const handleSupplyReq = () => {
    if (selec.length > 0) {
      const body = {
        tsms: selec,
        req_id: userData.req_id,
      };

      const link = farming.farming_URL + bulkAddsupplyreq;
      axios
        .post(link, body)
        .then((res) => {
          console.log(res.data);
          successnotify("success");
          setCheck(!check);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          warningnotify("oops something went wrong...!");
        });
    } else {
      warningnotify("Please make a selection to add");
    }
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
        toggle={() => {
          setOpen(false);
          setSelec([]);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setSelec([]);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Man Power</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            {supplyReqList?.map((item) => {
              return (
                <>
                  <Col sm={"4"}>
                    <Card className="card-body">
                      <div className="d-flex mb-4 align-items-center">
                        <div>
                          <label
                            key={item.asm_id}
                            style={{
                              transform: "scale(1.5)",
                              marginRight: "16px",
                              marginTop: "15px",
                            }}
                          >
                            <input
                              type="checkbox"
                              // value={item.id}
                              disabled={
                                selec.length > userData.count - 1 &&
                                !selec.includes(item.asm_id)
                              }
                              //   checked={selec.includes(item.asm_id)}
                              onChange={(e) => handleChange(e, item.asm_id)}
                            />
                          </label>
                        </div>
                        <div className="flex-shrink-0">
                          <img
                            src={item.profile_image}
                            alt="img"
                            className="avatar-sm rounded-circle"
                          />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <p className="card-title fs-14 mb-0">
                            {item.full_name}
                          </p>

                          <p className="text-muted fs-10 mb-0">{item.city}</p>
                          <span className="badge rounded-pill badge-soft-success mb-1 mt-1">
                            {item.asm_id}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </ModalBody>
        <ModalHeader className="justify-content-end pb-3">
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={handleSupplyReq}
          >
            Add
          </button>
        </ModalHeader>
      </Modal>
    </div>
  );
};

export { ManPowerModals };
