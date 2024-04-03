import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { training_chart_daily } from "../../../assets/utils/sow";
import { api } from "../../../globalConfig";
import { SalesForecastCharts } from "../OptionsChart/BarChartOptions";

function BarChart({ graphData, monthData }) {
  const params = useParams();
  let id = params.id.split("-")[0];

  const [dataInsert, setDataInsert] = React.useState(graphData);
  const [isUserDropdown, setUserDropdown] = React.useState(false);

  const handleDropDown = (e) => {
    const trainingDailyUrl =
      api.OA_URL +
      training_chart_daily +
      `?sow_id=${id}&type=${e[0]}&month=${e[1]}&year=${e[2]}`;
    axios
      .get(trainingDailyUrl)
      .then((res) => {
        setDataInsert({
          type: "2",
          title: "Training stats overall",
          data: res.data?.data,
          colors: [
            "#683395",
            "#3F5189",
            "#09B29C",
            "#F6B84B",
            "#FF0100",
            "#EF6547",
          ],
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Card style={{ height: "95%", display: "grid" }}>
        <CardHeader className="d-flex justify-content-between">
          <h4 className="card-title mb-0">{dataInsert?.title}</h4>
          <div className="flex-shrink-0">
            <Dropdown
              className="card-header-dropdown"
              isOpen={isUserDropdown}
              toggle={() => setUserDropdown(!isUserDropdown)}
              direction="start"
            >
              <DropdownToggle
                tag="a"
                className="text-reset dropdown-btn"
                role="button"
              >
                <span className="text-muted fs-16">
                  <i className="mdi mdi-dots-vertical align-middle"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                {/* <DropdownItem onClick={() => handleDropDown("month", "5")}>
                  Current Month
                </DropdownItem>
                <DropdownItem onClick={() => handleDropDown("last_month", "5")}>
                  Last Month
                </DropdownItem> */}
                {monthData?.map((item) => (
                  <>
                    <DropdownItem
                      onClick={() =>
                        handleDropDown(["filter", item.value, item.year])
                      }
                    >
                      {item.label}
                    </DropdownItem>
                  </>
                ))}
                <DropdownItem
                  onClick={() => handleDropDown(["overall", "0", "0"])}
                >
                  Overall
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>

        <CardBody>
          {Object.keys(dataInsert).length > 0 ? (
            <SalesForecastCharts data={dataInsert} />
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default BarChart;
