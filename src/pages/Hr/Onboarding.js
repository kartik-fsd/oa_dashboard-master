import axios from "axios";

import React from "react";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { sp_document_list } from "../../assets/utils/mepApi";
import { api } from "../../globalConfig";
import CmOverview from "../supply/Cluster/CmOverview";
import CmTable from "../supply/Cluster/CmTable";

const Onboarding = () => {
  return (
    <div>
      {/* <ToastContainer /> */}

      <Container fluid>
        <CmOverview />
      </Container>
    </div>
  );
};

export default Onboarding;
