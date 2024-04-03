import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { useEffect, useState } from "react";
import "./Chat.css";
import { api } from "../../globalConfig";
import { extract_token } from "../../assets/utils/common";
import axios from "axios";

const Chat = (props) => {
  const [checkEmail, setcheckEmail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const pathName = api.VENDOR_URL + extract_token;
    setIsLoading(true);
    axios
      .get(pathName)
      .then((res) => {
        setcheckEmail({ ...res.data });
        // setUserName(res.data.full_name);
        // setUserProfile(res.data.profile_image);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <>loading</>
  ) : isError ? (
    <>something went wrong</>
  ) : (
    <>
      {/* {props.checkEmail.id ? ( */}
      <>
        {checkEmail.id && (
          <SendBirdApp
            appId={`0F28A255-6B2F-41B2-A213-B99227FD3BD2`} // Specify your Sendbird application ID.
            userId={`p${checkEmail?.id}`} // Specify your user ID.
            nickname={`Support`}
            profileUrl={checkEmail?.profile_image}
          />
        )}
      </>
      {/* ) : (
        <>Loading...</>
      )} */}
    </>
  );
};

export default Chat;
