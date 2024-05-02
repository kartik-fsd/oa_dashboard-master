import React from "react";
import { Link, useParams } from "react-router-dom";

import avatar7 from "../../../assets/images/users/avatar-7.jpg";

import SimpleBar from "simplebar-react";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import axios from "axios";
import { api } from "../../../globalConfig";
import { chat_remark } from "../../../assets/utils/Business";

function CommentBox({ project_data }) {
  const { id } = useParams();

  const [messages, setMessages] = React.useState([]);
  const [messageBox, setMessageBox] = React.useState(null);
  const [text, setText] = React.useState(null);
  const [userId, setUserId] = React.useState(0);
  const [check, setCheck] = React.useState(false);

  const chatSentURL = "https://admin-api.taskmo.co/api/create-lead-remark";
  const chatURL = api.TASKMO_URL + chat_remark;

  React.useEffect(() => {
    setText("");

    axios
      .get(chatURL, { params: { project_id: id } })
      .then((res) => {
        setUserId(res.data?.portal_user_id);
        setMessages(res.data?.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [check]);
  const scrollToBottom = React.useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  React.useEffect(() => {
    if ((messages || []).length > 1) {
      scrollToBottom();
    }
  }, [check, messages]);

  const createMarkup = (data) => {
    return { __html: data };
  };

  const onSendMessage = () => {
    const dateEnter = [
      {
        lead_id: project_data,
        project_id: id,
        portal_user_id: userId,
        lead_remark_type: "project_introduction",
        lead_remark_comment: text,
      },
    ];
    const headerEnter = {
      headers: {
        "x-auth-key": "mxhyz-bsmnr-pqknt",
      },
    };
    axios
      .post(chatSentURL, dateEnter, headerEnter)
      .then((res) => {
        setCheck(!check);
      })
      .catch((err) => console.log(err, "response"));
  };

  return (
    <div>
      <Card>
        <CardHeader className="d-flex flex-column justify-content-start">
          <h4 className="card-title mb-0 flex-grow-1">Comments</h4>
        </CardHeader>
        <CardBody className="p-4">
          <PerfectScrollbar
            className="chat-conversation p-3"
            id="chat-conversation"
            style={{ height: "300px" }}
            containerRef={(ref) => setMessageBox(ref)}
          >
            {(messages || []).map((item, key) => (
              <div key={key}>
                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.img}
                      alt=""
                      className="avatar-xs rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-13 " style={{ color: "#b83016" }}>
                      {item.full_name}{" "}
                      <small className="text-muted">{item.sent_date}</small>
                    </h5>
                    <p className="text">
                      <div
                        dangerouslySetInnerHTML={createMarkup(item.message)}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </PerfectScrollbar>
          <form className="mt-2">
            <Row className="g-3">
              <Col xs={12}>
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label text-body"
                >
                  Leave a Comments
                </label>
                <textarea
                  className="form-control bg-light border-light"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Enter your comment..."
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  value={text}
                ></textarea>
              </Col>
              <Col xs={12} className="d-flex justify-content-between">
                <Col xs={6}>
                  <p className="text-warning fs-10 mt-2 m-0">
                    <span className="text-danger">Note :</span> Please maintain
                    a professional and courteous tone in all communications on
                    this chat window. Any inappropriate behavior, language or
                    content will not be tolerated and may result in disciplinary
                    action.
                  </p>
                </Col>
                <Col xs={6} className="text-end">
                  <Link
                    to="#"
                    className="btn btn-success"
                    onClick={() => onSendMessage()}
                  >
                    Post Comments
                  </Link>
                </Col>
                {/* <p className="text-warning fs-10 mt-2 m-0">
                  <span className="text-danger">Note :</span>Please maintain a
                  professional and courteous tone in all communications on this
                  chat window. Any inappropriate behavior, language or content
                  will not be tolerated and may result in disciplinary action.
                </p> */}
                {/* <button
                  type="button"
                  className="btn btn-ghost-secondary btn-icon waves-effect me-1"
                >
                  <i className="ri-attachment-line fs-16"></i>
                </button> */}
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CommentBox;
