import axios from "axios";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { supply_data, supply_data_tsm } from "../../assets/utils/SupplyApi";
import { farming } from "../../globalConfig";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import BreadCrumb from "../../components/common/BreadCrumb";
import "./CmSupplyTable.css";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
      minWidth: "120px",
      center: true,
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  table: {
    style: {
      minHeight: "400px",
    },
  },
};
const DashboardSupplyTableInside = () => {
  let check = localStorage.getItem("check");

  const da = useParams();
  console.log(da, "da");
  const { id } = da;

  const location = useLocation();
  console.log(location, "testingloca");

  let loc = location.pathname.split("/");
  loc.pop();
  loc.shift();
  loc = loc.join("");
  console.log(loc, "loccc");
  if (loc == "cmdashboard") {
    localStorage.setItem("check", "true");
  }
  check = localStorage.getItem("check");
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [projectsData, setProjectsData] = React.useState([]);
  const [totalData, setTotalData] = React.useState([]);
  const getSupplyTabledataTsm = () => {
    let apiLink = farming.farming_URL + supply_data_tsm;
    setIsLoading(true);
    axios
      .get(apiLink, {
        params: {
          st_date: "2023-02-01",
          end_date: "2023-02-28",
          tsm_id: id,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProjectsData(res.data.projects);
        let ot = res.data.totalData.map((item, i) => ({
          ...item,
          id: Number(i + 1),
        }));
        setTotalData(ot);

        console.log(res.data, "testing");
        console.log(res);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const getSupplyTabledatacm = () => {
    let apiLink = farming.farming_URL + supply_data;
    setIsLoading(true);
    axios
      .get(apiLink, {
        params: {
          st_date: "2023-02-01",
          end_date: "2023-02-28",
          rm_id: "all",
          cm_id: id,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProjectsData(res.data.projects);
        let ot = res.data.totalData.map((item, i) => ({
          ...item,
          id: Number(i + 1),
        }));
        setTotalData(ot);

        console.log(res.data, "testing");
        console.log(res);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  React.useEffect(() => {
    console.log(check, "check");
    check == "false" ? getSupplyTabledataTsm() : getSupplyTabledatacm();
  }, [check, id]);

  let constCol = [
    {
      name: "Sl No",
      selector: (row) => row.id,
      // width: "30px",
      center: true,
    },
  ];

  check == "false"
    ? constCol.push({
        name: "User Info",
        width: "300px",
        center: "true",
        cell: (d) => {
          return (
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "250px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{d.full_name}</div>

                  <div>
                    <span
                      style={{ width: "50px" }}
                      className="badge badge-soft-success"
                    >
                      {d.user_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      })
    : constCol.push({
        name: "User Info",
        width: "300px",
        center: "true",
        cell: (d) => {
          return (
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "250px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{d.tsm}</div>

                  <div>
                    <span
                      style={{ width: "50px" }}
                      className="badge badge-soft-success"
                    >
                      {d.tsm_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      });
  let ot = projectsData
    .map((item) => ({
      name: item.ref_table_name,
      logo: item.brand_logo,
    }))
    .map((it, i) =>
      constCol.push({
        name: (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <img src={it.logo} alt="log" width="30px" height="30px" />
              </div>
              <div>
                <div className="text-capitalize">{it.name.split("_")[0]}</div>
              </div>
            </div>
          </div>
        ),
        // width: "100px",
        center: true,
        sortable: true,

        selector: (d) => d[it.name].split(",")[0],
        cell: (d) => {
          //   let itemtest = d.filter((item) => item.name == it.name);
          //   console.log(d, "dfasak", "item", it.name);
          return (
            <div>
              <div>
                <span
                  className="badge badge-soft"
                  style={{
                    width: "60px",
                    fontWeight: 600,
                    fontSize: "12px",
                    backgroundColor: "#f07d47",
                  }}
                >
                  {d[it.name].split(",")[0]}
                </span>

                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "2px",
                    marginLeft: "20px",
                    color: "#000",
                  }}
                >
                  +{d[it.name].split(",")[1]}
                </div>
              </div>
            </div>
          );
        },
      })
    );

  const tableData = {
    columns: constCol,
    data: totalData,
  };
  return (
    <div className="page-content">
      <BreadCrumb title={"Lead Details"} pageTitle="Project Leads" />
      <Container fluid>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title mb-0">
                  Lead Details &nbsp;
                  <span
                    style={{
                      minWidth: "100px",
                      maxWidth: "200px",
                      backgroundColor: "#f07d47",
                    }}
                    className="badge badge-soft"
                  >
                    {loc == "supplydashboard"
                      ? localStorage.getItem("tsmName")
                      : localStorage.getItem("cmName")}
                  </span>{" "}
                </h5>
                <div>
                  <div style={{ height: "30px" }}></div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <DataTableExtensions
                {...tableData}
                export={false}
                filterPlaceholder={`Search`}
                className="filter_text"
                style={{ paddingRight: "25px important" }}
              >
                <DataTable
                  className="my-data-table"
                  columns={constCol}
                  data={totalData}
                  customStyles={customStyles}
                  pagination
                  progressPending={isLoading}
                  onRowClicked={(d) => {
                    localStorage.setItem("check", "false");
                    if (loc == "cmdashboard") {
                      history.push(`/supply/dashboard/${d.tsm_id}`);
                    } else {
                      localStorage.setItem("check", "true");
                    }
                  }}
                />
              </DataTableExtensions>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default DashboardSupplyTableInside;
