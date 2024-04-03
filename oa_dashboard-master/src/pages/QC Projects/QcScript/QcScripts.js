import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import React from "react";
import { Card, CardTitle, Container } from "reactstrap";
import { edit_sow } from "../../../assets/utils/mepApi";
import { api } from "../../../globalConfig";
import { successnotify } from "../Toasts";
import { useLocation } from "react-router-dom";
import { single_sow } from "../../../assets/utils/sow";
const QcScripts = () => {
  const [data, setData] = React.useState({});
  const [single, setSingle] = React.useState({});
  const { pathname } = useLocation();
  const sowId = pathname.slice(13, 17);
  console.log(sowId, "loc");
  console.log(data, "qwe");
  const handleSubmit = () => {
    const link = api.OA_URL + edit_sow;

    axios
      .patch(link, data)
      .then((res) => {
        console.log(res.data);
        successnotify("successfully submitted");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const link = api.VENDOR_URL + single_sow;
    axios
      .get(link, { params: { sow_id: sowId } })
      .then((res) => {
        setSingle(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Card className="mt-4 p-3">
        <CardTitle
          tag="h6"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "10px",
          }}
        >
          QC Script
        </CardTitle>

        <CKEditor
          editor={ClassicEditor}
          data={single.qc_script}
          // onReady={(editor) => {}}
          onChange={(event, editor) => {
            data.qc_script = editor.getData();
            data.sow_id = sowId;

            console.log(editor.getData(), "checkfasak");
            setData({ ...data });
          }}
        />

        <button
          className="btn btn-primary"
          style={{ display: "block", marginLeft: "auto", marginTop: "8px" }}
          onClick={handleSubmit}
        >
          Save{" "}
        </button>
      </Card>
    </div>
  );
};

export default QcScripts;
