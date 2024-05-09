import React from "react";
import ProjectOverView from "../BusinessDashVel/ProjectOverView";

const EditShowProjDet = ({ projectId }) => {
  console.log(projectId, "testingonemore");
  return (
    <div>
      <ProjectOverView projectId={projectId} />
    </div>
  );
};

export default EditShowProjDet;
