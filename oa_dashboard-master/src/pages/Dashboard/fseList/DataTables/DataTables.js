import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  fse_leads_chart,
  sow_fse_list,
  sow_training,
  sow_user_details,
} from "../../../../assets/utils/sow";
import { api } from "../../../../globalConfig";

import {
  BasicTable,
  ScrollVertical,
  ScrollHorizontal,
  AlternativePagination,
  FixedHeaderDatatables,
  ModalDataDatatables,
  AjaxDatatables,
} from "./datatableCom";
import { Dialog, DialogContent } from "@mui/material";
import FseLeadsChart from "../FseLeadsChart";
import DataTableModel from "./DataTableModel";

const DataTables = ({ data }) => {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Project Data Payout
                    </h5>
                    <div className="flex-shrink-0"></div>
                  </div>
                </CardHeader>
                <CardBody>
                  <BasicTable data={data} setOpen={setOpen} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DataTables;
