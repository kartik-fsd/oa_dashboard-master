import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import moment from "moment";
const GetDataData = ({
  minDate1,
  maxDate1,
  checkdata,
  valu,
  id,
  // leads: { countes },
}) => {
  //   let disdate = JSON.parse(localStorage.getItem("disadate"));
  //   console.log("testtesttest", disdate);
  //   const [disdate, setDisaDate] = React.useState(
  //     JSON.parse(localStorage.getItem("disadate"))
  //   );

  const [state, setState] = React.useState(false);

  let countes = JSON.parse(localStorage.getItem("countes"));
  console.log(id, valu, countes, "testid");

  console.log(JSON.parse(localStorage.getItem("dates")), "testingoneeno");
  const handleChange = (e) => {
    if (e.length == 2) {
      let obj = {};
      obj.from = moment(e[0]).format("YYYY-MM-DD");
      obj.to = moment(e[1]).format("YYYY-MM-DD");
      obj.valu = valu.value;
      let dataLeads = 0;
      for (
        let i = Number(moment(e[0]).format("DD"));
        i <= Number(moment(e[1]).format("DD"));
        i++
      ) {
        console.log(i, "iiii");
        dataLeads +=
          Number(
            countes?.find((item) => item?.date?.split("-")[0] == i)
              ? countes?.filter((item) => item?.date?.split("-")[0] == i)[0]
                  .leads
              : 0
          ) || 0;
      }
      obj.leads = dataLeads;

      let otDisable = [...JSON.parse(localStorage.getItem("disadate")), obj];
      localStorage.setItem("disadate", JSON.stringify(otDisable));
      //   setDisaDate([...JSON.parse(localStorage.getItem("disadate")), obj]);
      //   disdate.push(obj);
      //   localStorage.setItem("disadate", JSON.stringify(disdate));
      let dateRange = JSON.parse(localStorage.getItem("dates"));

      let ot = dateRange.map((item) =>
        item.value == valu.value ? { ...item, dates: obj } : item
      );
      //   console.log(ot, "testindatad");
      localStorage.setItem("dates", JSON.stringify(ot));
      //   setDateRange(ot);
      setState(!state);
    }
  };

  const disableRangeDate = () => {
    let ot = [];
    let check = JSON.parse(localStorage.getItem("disadate"));

    for (let i = 0; i < check.length; i++) {
      ot.push({ from: check[i].from, to: check[i].to });
    }
    return ot;
  };

  return (
    <div>
      <Row style={{ alignItems: "center" }}>
        <Col>
          {" "}
          <div
            onClick={() => {
              if (
                !JSON.parse(localStorage.getItem("disadate"))
                  ?.map((item) => item.valu)
                  .includes(valu.value)
              ) {
                setState(!state);
              }
            }}
            disabled={
              JSON.parse(localStorage.getItem("disadate"))
                ?.map((item) => item.valu)
                .includes(valu.value) ?? false
            }
          >
            {!JSON.parse(localStorage.getItem("disadate"))
              .map((item) => item.valu)
              .includes(valu.value) ? (
              /* { valu.value == JSON.parse(localStorage.getItem('disadate')).includes() */
              <div>
                <Flatpickr
                  className="form-control"
                  id="exampleInputdate"
                  onChange={handleChange}
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",

                    minDate: new Date(minDate1),
                    maxDate: new Date(maxDate1),

                    disable:
                      JSON.parse(localStorage.getItem("disadate")).splice(
                        0,
                        Number(id)
                      ) || [],
                  }}
                />
              </div>
            ) : (
              <>
                {
                  JSON.parse(localStorage.getItem("disadate")).filter(
                    (item) => item.valu == valu.value
                  )[0].from
                }{" "}
                &nbsp;&nbsp;-&nbsp;&nbsp;{" "}
                {
                  JSON.parse(localStorage.getItem("disadate")).filter(
                    (item) => item.valu == valu.value
                  )[0].to
                }
              </>
            )}
          </div>
        </Col>
        <Col>
          <div style={{ fontSize: "18px", fontWeight: 600 }}>
            Leads :{" "}
            <span style={{ fontWeight: "300" }}>
              {JSON.parse(localStorage.getItem("disadate")).find(
                (item) => item.valu == valu.value
              )
                ? JSON.parse(localStorage.getItem("disadate")).filter(
                    (item) => item.valu == valu.value
                  )[0].leads
                : 0}
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GetDataData;
