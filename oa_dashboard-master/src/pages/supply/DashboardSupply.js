import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import DashboardSupplyTable from "./DashboardSupplyTable";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Select from "react-select";
import { api, farming } from "../../globalConfig";
import axios from "axios";
import { search_clusters, supply_data } from "../../assets/utils/SupplyApi";
import ChartForEarning from "../Earnings/ChartForEarning";
const DashboardSupply = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [projectsData, setProjectsData] = React.useState([]);
  const [totalData, setTotalData] = React.useState([]);
  const [overall, setOverAll] = React.useState("");
  const [dataInsert, setDataInsert] = React.useState("");

  const [clusterType, setClusterType] = React.useState("");
  document.title = "OnX | Supply";
  const startdateGetter = () => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-1`;
  };

  const enddateGetter = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1, 1);
    date.setDate(date.getDate() - 1);
    const lastDayOfMonth = date.getDate();
    const month = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${month}-${lastDayOfMonth}`;
  };
  const [startDate, setStartDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [filter, setFilter] = React.useState(false);

  const [isStatus, setisStatus] = React.useState("all");

  const handleisStatus = (isStatus) => {
    setisStatus(isStatus);
    console.log(isStatus, "check");
  };

  const getSupplyTabledata = () => {
    let apiLink = farming.farming_URL + supply_data;
    setIsLoading(true);
    axios
      .get(apiLink, {
        params: {
          st_date: startDate,
          end_date: endDate,
          cluster_id: isStatus?.value ?? "all",
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProjectsData(res.data.projects);

        setTotalData(res.data.totalData);
        setOverAll(res.data.overall);
        console.log(res.data, "testing");
        setDataInsert({
          title: "Cluster Wise Performance",
          totalCluster: res?.data?.total_cluster,
          totalClusterPerformance: res?.data?.total_cluster_performance,
        });
        let obj = {
          title: "Cluster Wise Performance",
          totalCluster: res?.data?.total_cluster,
          totalClusterPerformance: res?.data?.total_cluster_performance,
        };
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getSupplyTabledata();
  }, [filter, isStatus]);

  React.useEffect(() => {
    let apilink = api.VENDOR_URL + search_clusters;
    axios
      .get(apilink)
      .then((res) => {
        let obj = { label: "all", value: "all" };
        let ot = res.data.cluster_list;
        ot.unshift(obj);
        setClusterType(ot);
      })
      .catch((err) => console.log(err));
  }, []);
  const allstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Unpaid", value: "Unpaid" },
        { label: "Paid", value: "Paid" },
        { label: "Cancel", value: "Cancel" },
        { label: "Refund", value: "Refund" },
      ],
    },
  ];
  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* <Col>
            <Card>
              <CardBody>
                <ChartForEarning dataInsert={dataInsert} />
              </CardBody>
            </Card>
          </Col> */}
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
                  <h5 className="card-title mb-0">Performance</h5>

                  <div style={{ marginLeft: "450px" }}>
                    <div className="input-light" style={{ width: "200px" }}>
                      <Select
                        defaultInputValue="all"
                        value={isStatus}
                        defaultValue={isStatus || "Select"}
                        onChange={(e) => {
                          handleisStatus(e);
                        }}
                        options={clusterType}
                        name="choices-single-default"
                        id="idStatus"
                      ></Select>
                    </div>
                  </div>
                  <div>
                    <div style={{ height: "35px", marginRight: "40px" }}>
                      <div style={{ width: "210px" }}>
                        <Flatpickr
                          // ref={refComp1}
                          className="form-control"
                          id="exampleInputdate"
                          // defaultValue={props.data.data?.start_date}
                          options={{
                            mode: "range",
                            // minDate: new Date("2023-01-16"),
                            // maxDate: new Date(Date.now() - 864e5)
                            maxDate: new Date(Date.now()),
                            defaultDate: [new Date(Date.now())],
                          }}
                          placeholder="Enter Filter Dates"
                          name="date"
                          onChange={(e) => {
                            console.log(e, "echeck");
                            if (e.length == 2) {
                              setFilter(!filter);
                            }

                            setStartDate(moment(e[0]).format("YYYY-MM-DD"));
                            setEndDate(moment(e[1]).format("YYYY-MM-DD"));
                          }}
                          // onChange={(e) => {
                          //   setStartDateDisp(e[0]);
                          //   setDate1(moment(e[0]).format("YYYY-MM-DD"));

                          // }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/* <ProjectLeadsTable data={projectList} /> */}
                <>
                  <ChartForEarning dataInsert={dataInsert} />
                </>
                <br />
                <>
                  <DashboardSupplyTable
                    startDate={startDate}
                    endDate={endDate}
                    filter={filter}
                    setFilter={setFilter}
                    clusterdata={isStatus?.value ?? "all"}
                    totalData={totalData}
                    projectsData={projectsData}
                    loader={isLoading}
                    overall={overall}
                  />
                </>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default DashboardSupply;
