import React, { useState } from "react";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  QcMemberModal,
  QcMemberModal2,
  QcMemberModalEdit,
  QcRangeModal,
} from "./QcMemberModal";
import {
  TableColumnHeader,
  TableColumnRow,
} from "../QC Projects/QcTableColumn";
import { updateQcagent, getLanglist } from "../../assets/utils/farmingBase";
import { api, farming } from "../../globalConfig";
import axios from "axios";
import { toast } from "react-toastify";

const QcMembersTable = (props) => {
  const { data, switchData, getallqc } = props;

  const [open, setOpen] = React.useState(false);
  const [modal_langaugeModals, setmodal_langaugeModals] = React.useState(false);

  const [id, setId] = React.useState("");
  const [update, setUpdate] = React.useState({});
  const [editDetails, setEditDetails] = React.useState({});
  const [omitData, setOmitData] = React.useState(false);
  const [lang, setLang] = React.useState([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [dupId, setdupId] = React.useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState([]);
  console.log(id, "hii");

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const successnotify = () =>
    toast("successfully updated ", {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      className: "bg-success text-white",
    });

  const warningnotify = () =>
    toast("oops something went wrong", {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      className: "bg-warning text-white",
    });

  function tog_langaugeModals() {
    setmodal_langaugeModals(!modal_langaugeModals);
  }

  const updateQc = () => {
    const link = farming.farming_URL + updateQcagent;
    const body = update;
    axios
      .put(link, body)
      .then((res) => {
        if (res.data.error) {
          warningnotify();
        } else {
          // console.log(res?.data);
          successnotify();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLang = (id) => {
    const link = farming.farming_URL + getLanglist;
    const body = { id: id };
    axios
      .post(link, body)
      .then((res) => {
        setLang(res?.data?.data?.langlist);
        const ot = res?.data?.data?.langlist
          .filter((el) => el.assigned == "yes")
          .map((item) => item.id);

        setSelectedCheckboxes(ot);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "ID",
      width: "100px",
      selector: (row) => row.qc_admin_id,
      sortable: true,

      // width:'180px',
      center: true,
      cell: (d) => (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span
            style={{
              height: "10px",
              width: "10px",
              background: d.status === "active" ? "#00C851" : "#FF4444",
              borderRadius: "50%",
            }}
          ></span>
          {switchData ? <span>{d.id}</span> : <span>{d.qc_admin_id}</span>}
        </div>
      ),
    },

    {
      name: "Details",
      width: "150px",
      selector: (row) => row.full_name,
      sortable: true,

      //   width:'60px',
      // center: true,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "6px",
            // alignItems: "center",
            // width: "150px",
          }}
        >
          <div>{d.full_name}</div>
          <div>{d.number}</div>
        </div>
      ),
    },
    {
      name: "Email ID",
      selector: (row) => row.email_id,
      sortable: true,
      // center: true,
      alignItems: "left",
      // width: "280px",
    },

    {
      name: "Total",
      selector: (row) => row.total_leads_range,
      sortable: true,
      omit: switchData ? !omitData : omitData,
      center: true,
      width: "80px",
      cell: (d) => (
        <div className="d-flex">
          <div
            style={{
              background: "#9258C4",
              // background: "#1F99CC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
              padding: "4px 6px",
              minWidth: "45px",
            }}
          >
            {d.total_leads_range}
          </div>
        </div>
      ),
    },

    {
      name: <TableColumnHeader data="Approved" />,
      selector: (row) => row.approved_l1_leads_range,
      sortable: true,
      omit: switchData ? !omitData : omitData,
      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.approved_l1_leads_range}
          l2={d.approved_l2_leads_range}
          l3={d.approved_l3_leads_range}
        />
      ),
    },

    {
      name: <TableColumnHeader data="Rejected" />,
      selector: (row) => row.rejected_l1_leads_range,
      sortable: true,
      omit: switchData ? !omitData : omitData,
      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.rejected_l1_leads_range}
          l2={d.rejected_l2_leads_range}
          l3={d.rejected_l3_leads_range}
        />
      ),
    },
    {
      name: <TableColumnHeader data="Pending" />,
      selector: (row) => row.pending_l1_leads_range,
      sortable: true,
      omit: switchData ? !omitData : omitData,
      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.pending_l1_leads_range}
          l2={d.pending__l2_leads_range}
          l3={d.pending__l3_leads_range}
        />
      ),
    },
    {
      name: "Desperancy",
      selector: (row) => row.disperency_leads_range,
      sortable: true,
      omit: switchData ? !omitData : omitData,
      center: true,
      width: "80px",
      cell: (d) => (
        <div className="d-flex">
          <div
            style={{
              background: "grey",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
              padding: "4px 6px",
              minWidth: "45px",
            }}
          >
            {d.disperency_leads_range}
          </div>
        </div>
      ),
    },
    {
      name: "Manager",
      selector: (row) => row.manager,
      sortable: true,
      omit: switchData ? omitData : !omitData,

      alignItems: "center",
      center: true,
      // width: "280px",
    },
    {
      name: "Agency ID",
      selector: (row) => row.agency_id,
      sortable: true,
      omit: switchData ? omitData : !omitData,
      alignItems: "center",
      center: true,
      // width: "280px",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      omit: switchData ? omitData : !omitData,
      alignItems: "center",
      center: true,
      // width: "280px",
    },

    {
      name: "",
      right: true,
      width: "50px",

      cell: (d) => (
        <div
          onClick={() => {
            console.log(d, "onClickd");

            switchData ? setId(d.id) : setId(d.qc_admin_id);
            setEditDetails({
              ...editDetails,
              name: d.full_name,
              email: d.email_id,
              mobile: d.number,
              status: d.status,
            });
            handleLang(switchData ? d.id : d.qc_admin_id);
            setdupId(switchData ? d.id : d.qc_admin_id);
          }}
        >
          <Dropdown
            isOpen={
              (switchData ? d.id : d.qc_admin_id) == dupId
                ? dropdownOpen
                : false
            }
            toggle={toggle}
            className="dropdown d-inline-block"
            onClick={() => console.log(d, "oied")}
          >
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="edit-item-btn"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn"
                onClick={() => tog_langaugeModals()}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Language
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ),
    },
  ];
  const tableDataExtension = {
    columns: columns,
    data: data,
  };

  return (
    <div>
      <DataTableExtensions
        {...tableDataExtension}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      >
        <DataTable columns={columns} data={tableDataExtension} pagination />
      </DataTableExtensions>

      <QcMemberModalEdit
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        id={id}
        updateQc={updateQc}
        edit={editDetails}
        switchData={switchData}
      />
      {modal_langaugeModals && (
        <QcMemberModal2
          modal_langaugeModals={modal_langaugeModals}
          tog_langaugeModals={tog_langaugeModals}
          id={id}
          lang={lang}
          setLang={setLang}
          selectedCheckboxes={selectedCheckboxes}
          setSelectedCheckboxes={setSelectedCheckboxes}
          handleLang={handleLang}
        />
      )}
    </div>
  );
};

// const AllTaskerTable = (props) => {
//   const { data, switchData, getallqc } = props;

//   const [open, setOpen] = React.useState(false);
//   const [modal_langaugeModals, setmodal_langaugeModals] = React.useState(false);

//   const [id, setId] = React.useState("");
//   const [update, setUpdate] = React.useState({});
//   const [editDetails, setEditDetails] = React.useState({});
//   const [omitData, setOmitData] = React.useState(false);
//   const [lang, setLang] = React.useState([]);
//   const [dropdownOpen, setDropdownOpen] = React.useState(false);
//   const [selectedCheckboxes, setSelectedCheckboxes] = React.useState([]);
//   console.log(id, "hii");

//   const toggle = () => setDropdownOpen(!dropdownOpen);

//   const successnotify = () =>
//     toast("successfully updated ", {
//       position: "top-center",
//       hideProgressBar: true,
//       closeOnClick: false,
//       className: "bg-success text-white",
//     });

//   const warningnotify = () =>
//     toast("oops something went wrong", {
//       position: "top-center",
//       hideProgressBar: true,
//       closeOnClick: false,
//       className: "bg-warning text-white",
//     });

//   function tog_langaugeModals() {
//     setmodal_langaugeModals(!modal_langaugeModals);
//   }

//   const updateQc = () => {
//     const link = farming.farming_URL + updateQcagent;
//     const body = update;
//     axios
//       .put(link, body)
//       .then((res) => {
//         if (res.data.error) {
//           warningnotify();
//         } else {
//           // console.log(res?.data);
//           successnotify();
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleLang = (id) => {
//     const link = farming.farming_URL + getLanglist;
//     const body = { id: id };
//     axios
//       .post(link, body)
//       .then((res) => {
//         setLang(res?.data?.data?.langlist);
//         const ot = res?.data?.data?.langlist
//           .filter((el) => el.assigned == "yes")
//           .map((item) => item.id);

//         setSelectedCheckboxes(ot);
//       })
//       .catch((err) => console.log(err));
//   };

//   const columns = [
//     {
//       name: "ID",
//       width: "100px",
//       selector: (row) => row.qc_admin_id,
//       sortable: true,

//       // width:'180px',
//       center: true,
//       cell: (d) => (
//         <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
//           <span
//             style={{
//               height: "10px",
//               width: "10px",
//               background: d.status === "active" ? "#00C851" : "#FF4444",
//               borderRadius: "50%",
//             }}
//           ></span>
//           <span>{d.id}</span>
//         </div>
//       ),
//     },

//     {
//       name: "Details",
//       width: "150px",
//       selector: (row) => row.full_name,
//       sortable: true,

//       //   width:'60px',
//       // center: true,
//       cell: (d) => (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             gap: "6px",
//             // alignItems: "center",
//             // width: "150px",
//           }}
//         >
//           <div>{d.full_name}</div>
//           <div>{d.number}</div>
//         </div>
//       ),
//     },
//     {
//       name: "Email ID",
//       selector: (row) => row.email_id,
//       sortable: true,
//       // center: true,
//       alignItems: "left",
//       // width: "280px",
//     },

//     {
//       name: "Manager",
//       selector: (row) => row.manager,
//       sortable: true,

//       alignItems: "center",
//       center: true,
//       // width: "280px",
//     },
//     {
//       name: "Agency ID",
//       selector: (row) => row.agency_id,
//       sortable: true,

//       alignItems: "center",
//       center: true,
//       // width: "280px",
//     },
//     {
//       name: "Type",
//       selector: (row) => row.type,
//       sortable: true,

//       alignItems: "center",
//       center: true,
//       // width: "280px",
//     },

//     {
//       name: "",
//       right: true,
//       width: "50px",
//       cell: (d) => (
//         <div
//           key={d.id}
//           onClick={() => {
//             // switchData ? setId(d.id) : setId(d.qc_admin_id);
//             // setEditDetails({
//             //   ...editDetails,
//             //   name: d.full_name,
//             //   email: d.email_id,
//             //   mobile: d.number,
//             //   status: d.status,
//             // });
//             // handleLang(switchData ? d.id : d.qc_admin_id);
//           }}
//         >
//           <UncontrolledDropdown className="dropdown d-inline-block">
//             <DropdownToggle
//               className="btn btn-soft-secondary btn-sm"
//               tag="button"
//             >
//               <i className="ri-more-fill align-middle"></i>
//             </DropdownToggle>
//             <DropdownMenu className="dropdown-menu-end">
//               <DropdownItem
//                 className="edit-item-btn"
//                 onClick={() => {
//                   setOpen(true);
//                 }}
//               >
//                 <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
//                 Edit
//               </DropdownItem>
//               <DropdownItem
//                 className="edit-item-btn"
//                 onClick={() => tog_langaugeModals()}
//               >
//                 <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
//                 Language
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </div>
//       ),
//     },
//   ];
//   const tableDataExtension = {
//     columns: columns,
//     data: data,
//   };
//   return (
//     <>
//       <DataTableExtensions
//         {...tableDataExtension}
//         export={false}
//         filterPlaceholder={`Search`}
//         style={{ paddingRight: "25px important" }}
//       >
//         <DataTable columns={columns} data={tableDataExtension} pagination />
//       </DataTableExtensions>

//       <QcMemberModalEdit
//         open={open}
//         setOpen={setOpen}
//         update={update}
//         setUpdate={setUpdate}
//         id={id}
//         updateQc={updateQc}
//         edit={editDetails}
//         switchData={switchData}
//       />
//       {modal_langaugeModals && (
//         <QcMemberModal2
//           modal_langaugeModals={modal_langaugeModals}
//           tog_langaugeModals={tog_langaugeModals}
//           id={id}
//           lang={lang}
//           setLang={setLang}
//           selectedCheckboxes={selectedCheckboxes}
//           setSelectedCheckboxes={setSelectedCheckboxes}
//           handleLang={handleLang}
//         />
//       )}
//     </>
//   );
// };
export { QcMembersTable };
