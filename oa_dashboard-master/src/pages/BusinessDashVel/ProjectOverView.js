import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { project_details } from "../../assets/utils/Business";
import BreadCrumb from "../../components/common/BreadCrumb";
import { api } from "../../globalConfig";
import ProjectOverViewSection from "./ProjectOverViewSection";
// import Section from "./Section";

const ProjectOverView = ({ projectId }) => {
  const [overViewData, setOverViewData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const location = useLocation();

  let fileHead = location.pathname.split("/")[1];

  const { id } = useParams();
  document.title = "OnX| Business-Dashboard";
  const getProjectsApi = () => {
    let projectDetailsURL = api.ONX_URL + project_details;
    setIsLoading(true);
    axios
      .get(projectDetailsURL, {
        params: { project_id: fileHead == "editsow" ? projectId : id },
      })
      .then((res) => {
        if (res?.data?.error) {
          setIsError(true);
        } else {
          setIsLoading(false);
          setOverViewData(res?.data?.project_details);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProjectsApi();
  }, [check]);

  return isLoading ? (
    <>...loading</>
  ) : isError ? (
    <>something went wrong</>
  ) : (
    <React.Fragment>
      {fileHead == "editsow" ? (
        <>
          <ProjectOverViewSection
            data={overViewData}
            setCheck={setCheck}
            check={check}
          />
        </>
      ) : (
        <>
          {" "}
          <div className="page-content">
            {
              <BreadCrumb
                title={"Project Overview"}
                pageTitle="Project Leads"
              />
            }
            <Container fluid>
              {/* <Section /> */}
              <ProjectOverViewSection
                data={overViewData}
                setCheck={setCheck}
                check={check}
              />
            </Container>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default ProjectOverView;
