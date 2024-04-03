// import axios from "axios";
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Alert,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   Label,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Row,
// } from "reactstrap";
// import { sow_training } from "../../../../assets/utils/sow";
// import { api } from "../../../../globalConfig";

// import {
//   BasicTable,
//   ScrollVertical,
//   ScrollHorizontal,
//   AlternativePagination,
//   FixedHeaderDatatables,
//   ModalDataDatatables,
//   AjaxDatatables,
// } from "./datatableCom";

// const DataTables = ({ data }) => {
//   const { id } = useParams();

//   // document.title = "Datatables | Velzon - React Admin & Dashboard Template";
//   return (
//     <React.Fragment>
//       {/* <div className="page-content"> */}
//       <div>
//         <Container fluid>
//           {/* <BreadCrumb title="Datatables" pageTitle="Tables" /> */}
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardHeader>
//                   <div className="d-flex align-items-center">
//                     <h5 className="card-title mb-0 flex-grow-1">
//                       Project Data Payout
//                     </h5>
//                     <div className="flex-shrink-0">

//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardBody>
//                   <BasicTable data={data} />
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//     </React.Fragment>
//   );
// };

// export default DataTables;
