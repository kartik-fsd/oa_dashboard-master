import axios from "axios";
import moment from "moment";
import React, { useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useParams } from "react-router-dom";
import { Context } from "../../../App";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import { chat_remark } from "../../../assets/utils/Business";
import { extract_token } from "../../../assets/utils/common";
import { api } from "../../../globalConfig";

const dashboardChat = [
  // {
  //   id: 1,
  //   isLeft: true,
  //   img: avatar2,
  //   message: "Good morning 😊",
  //   time: "09:07 am",
  // },
  // {
  //   id: 2,
  //   isLeft: false,
  //   message: "Good morning 😊",
  //   time: "09:08 am",
  // },
];

function ChatSmall({ project_data }) {
  const { id } = useParams();

  const [context, setContext] = useContext(Context);

  const [messages, setMessages] = React.useState([...dashboardChat]);
  const [messageBox, setMessageBox] = React.useState(null);
  const [text, setText] = React.useState(null);
  const [userId, setUserId] = React.useState(0);
  const [check, setCheck] = React.useState(false);

  const chatURL = api.ONX_URL + chat_remark;
  const pathName = api.VENDOR_URL + extract_token;
  const chatSentURL = "https://admin-api.taskmo.co/api/create-lead-remark";

  const current_date = new Date();
  const date_format = moment(current_date);
  const scrollToBottom = React.useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  const createMarkup = (data) => {
    return { __html: data };
  };

  React.useEffect(() => {
    if ((messages || []).length > 1) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

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
    <div id="users-chat">
      <PerfectScrollbar
        className="chat-conversation p-3"
        id="chat-conversation"
        style={{ marginBottom: "1rem", maxHeight: "400px" }}
        containerRef={(ref) => setMessageBox(ref)}
      >
        <ul
          className="list-unstyled chat-conversation-list chat-sm"
          id="users-conversation"
        >
          {(messages || []).map((item, key) => (
            <li
              className={item.isLeft ? "chat-list left" : "chat-list right"}
              key={key}
            >
              <div className="conversation-list">
                {item.img ? (
                  <div className="chat-avatar">
                    <img src={item.img} alt="" />
                  </div>
                ) : null}
                <div className="user-chat-content">
                  <div className="ctext-wrap">
                    <React.Fragment>
                      <div
                        className="ctext-wrap-content"
                        style={{ textAlign: "left" }}
                      >
                        <p
                          className="mb-0 ctext-content fs-12  mb-2"
                          style={{ color: "#b83016" }}
                        >
                          {item.full_name}
                        </p>
                        <p className="mb-0 ctext-content fs-11">
                          <div
                            dangerouslySetInnerHTML={createMarkup(item.message)}
                          />
                        </p>
                      </div>
                    </React.Fragment>
                  </div>
                  {/* <div className="conversation-name">
                    <small className="text-muted time">{item.time}</small>{" "}
                    <span className="text-success check-message-icon">
                      <i className="ri-check-double-line align-bottom"></i>
                    </span>
                  </div> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </PerfectScrollbar>
      {context.oaDetials?.work_id != 0 && (
        <div className="border-top border-top-dashed">
          <div className="row g-2 mx-3 mt-2 mb-3">
            <div className="col">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control border-light bg-light"
                  placeholder="Enter Message..."
                  value={text}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      onSendMessage();
                    }
                  }}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-info"
                onClick={() => onSendMessage()}
              >
                <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
                <i className="mdi mdi-send float-end"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSmall;
