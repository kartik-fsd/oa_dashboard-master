import React from "react";

function FseDetails({ rowData }) {
  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ fontWeight: "600", fontSize: "16px", gap: "15px" }}
      >
        {rowData?.profile_image ? (
          <img
            src={
              rowData?.profile_image.substr(0, 4) === "http"
                ? rowData?.profile_image
                : `https://isp.taskmo.in/fieldon_images/${rowData?.profile_image}`
            }
            alt="profile"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
            className="profile_table_images"
          />
        ) : (
          <div
            style={{
              background: "#240605 0% 0% no-repeat padding-box",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              alignItems: "center",
              display: "flex",
              marginLeft: "5px",
              textTransform: "uppercase",
              color: "aliceblue",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {rowData.full_name ? rowData?.full_name[0] : ""}
          </div>
        )}
        <div>
          <p
            style={{ margin: 0 }}
          >{`${rowData?.full_name} (${rowData?.user_id})`}</p>
          <p className="fs-6 text-muted">
            {rowData.city}
            {" - "}
            {rowData?.active_since}
            {" day"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FseDetails;
