import React from "react";
import { Card, CardTitle, Col, Container, Row } from "reactstrap";
import {
  sow_qc_note,
  create_qc_note,
  get_sow_qc_notes,
  sow_qc_script,
} from "../../../assets/utils/mepApi";
import { api } from "../../../globalConfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Qcscript.css";
import { EditModal, ScriptModal } from "./QcScriptModal";
import { Interweave } from "interweave";
import { successnotify, warningnotify } from "../Toasts";
const ImageDesc = () => {
  const [sowqc, setSowQc] = React.useState([]);
  const [openScriptModal, setOpenScriptModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [script, setScript] = React.useState("");
  const [imgkey, setImgkey] = React.useState("");
  const [intrtext, setIntrtext] = React.useState("");
  const [subqc, setSubQc] = React.useState(false);
  const [editqc, setEditQc] = React.useState(false);
  const [getsowqc, setGetsowqc] = React.useState([]);
  const [sowscript, setSowscript] = React.useState("");
  const [id, setId] = React.useState();
  const [editscript, setEditScript] = React.useState(sowscript);
  const [edited, setEdited] = React.useState(false);

  const { id: sowid } = useParams();

  const sowId = sowid?.slice(0, 4);
  console.log(sowqc, "qc");
  console.log(getsowqc, "script");
  const getSowqc = () => {
    const link = api.VENDOR_URL + sow_qc_note;
    axios
      .get(link, { params: { sow_id: sowId } })
      .then((res) => {
        setSowQc(res?.data?.selectQC);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getSowqc();
  }, [subqc]);

  const handleCreateqc = () => {
    const link = api.VENDOR_URL + create_qc_note;
    const body = {};
    body.sow_id = sowId;
    body.script = script;
    body.image_key = imgkey;
    console.log(body, "bodycreateqc");
    axios
      .post(link, body)
      .then((res) => {
        console.log(res.data);
        setEditQc(!editqc);
        setSubQc(!subqc);
        handleScriptModalClose();
        successnotify("successfully submitted");
      })
      .catch((err) => {
        console.log(err);
        warningnotify("oops something went wrong");
      });
  };

  const getSowqcnotes = () => {
    const link = api.VENDOR_URL + get_sow_qc_notes;
    console.log(link, "checklink");
    axios
      .get(link, { params: { sow_id: sowId } })
      .then((res) => {
        console.log(res.data, "resting");
        setGetsowqc(res?.data?.script);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    console.log(get_sow_qc_notes + `?sow_id=${sowId}`, "test");

    getSowqcnotes();
  }, [editqc]);

  const update = () => {
    const link = api.OA_URL + sow_qc_script;
    const body = {};

    body.id = id;
    body.script = editscript;
    console.log(body, "checkkkk");
    axios
      .put(link, body)
      .then((res) => {
        console.log(res.data);
        setEditQc(!editqc);
        handleCloseEditModal();
        successnotify("edited successfully");
      })
      .catch((err) => {
        console.log(err);
        warningnotify("oops something went wrong");
      });
  };

  const handleUpdate = () => {
    update();
  };

  const handleScriptModalClose = () => {
    setOpenScriptModal(!openScriptModal);
    setScript("");
  };

  const handleCloseEditModal = () => {
    setEditModal(!editModal);
  };

  const handleDelete = (id) => {
    console.log(id, "id123");
    const link = api.OA_URL + sow_qc_script;
    const body = {};
    body.id = id;
    body.status = "inactive";

    axios
      .put(link, body)
      .then((res) => {
        console.log(res, "res.data");

        setEditQc(!editqc);
        setSubQc(!subqc);
        warningnotify("successfully deleted");
      })
      .catch((err) => {
        console.log(err);
        warningnotify("oops something went wrong");
      });
  };
  return (
    <div>
        <Card className="mt-4 p-3">
          <div style={{ padding: "12px" }}>
            <CardTitle
              tag="h5"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "0px",
              }}
            >
              Title
            </CardTitle>
            <Row>
              {sowqc?.map((sowqc) => {
                let str1 = sowqc.split("_");
                let str = str1.splice(0, str1.length - 1).join(" ");
                str = str
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ");
                return (
                  <Col
                    sm="3"
                    style={{ padding: "12px 12px 0px 12px" }}
                    key={sowqc.id}
                  >
                    <div
                      className="img_title"
                      onClick={() => {
                        handleScriptModalClose();
                        setIntrtext(str);
                        setImgkey(sowqc);
                      }}
                    >
                      <p
                        style={{
                          margin: "0px",
                          padding: "8px ",
                          textAlign: "center",
                          color: "#000",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {str}
                      </p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Card>
        <h5
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "24px",
          }}
        >
          Completed
        </h5>

        {getsowqc.map((getsowqc) => {
          let str2 = getsowqc.image_key.split("_");
          let imgkey = str2.splice(0, str2.length - 1).join(" ");
          imgkey = imgkey
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
          return (
            <>
              <Card style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    padding: "18px",
                  }}
                >
                  <div
                    onClick={() => {
                      setSowscript(getsowqc.script);
                      setId(getsowqc.id);
                    }}
                    style={{ marginBottom: "24px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <h6
                        style={{
                          margin: "0px",
                          fontWeight: "550",
                          textDecoration: "underline",
                        }}
                      >
                        {imgkey}
                      </h6>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary  "
                          onClick={() => {
                            setEditModal(!editModal);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-primary  "
                          onClick={() => {
                            handleDelete(getsowqc.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "21px",
                        display: "block",
                        textAlign: "start",
                      }}
                    >
                      <Interweave content={getsowqc.script} />
                    </div>
                  </div>
                </div>
              </Card>
            </>
          );
        })}
      <ScriptModal
        openScriptModal={openScriptModal}
        handleScriptModalClose={handleScriptModalClose}
        script={script}
        setScript={setScript}
        handleCreateqc={handleCreateqc}
        intrtext={intrtext}
      />
      <EditModal
        editModal={editModal}
        handleCloseEditModal={handleCloseEditModal}
        setScript={setScript}
        editscript={editscript}
        setEditScript={setEditScript}
        edited={edited}
        setEdited={setEdited}
        handleUpdate={handleUpdate}
        sowscript={sowscript}
      />
    </div>
  );
};

export default ImageDesc;
