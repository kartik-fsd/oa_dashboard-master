import React from "react";
import Cluster from "./Cluster";
import CmOverview from "./CmOverview";

const ClusterMain = () => {
  const role = sessionStorage.getItem("role");

  return (
    <>
      <Cluster />
    </>
  );
};

export default ClusterMain;
