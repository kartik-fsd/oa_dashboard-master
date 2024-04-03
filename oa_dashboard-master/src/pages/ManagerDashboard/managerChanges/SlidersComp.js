import React, { useState } from "react";
import Slider from "react-rangeslider";
import { Col, Input, Label, Row } from "reactstrap";
import "react-rangeslider/lib/index.css";
import { set } from "lodash";
const SlidersComp = ({ loop, set_loop, ind }) => {
  console.log(loop, ind, "checkingloopdata");
  const [def, setdef] = useState(60);
  const [def2, setdef2] = useState(25);
  const [es1, setEs1] = useState(0);
  const [es2, setEs2] = useState(0);
  const [es3, setEs3] = useState(0);
  const [es4, setEs4] = useState(0);
  const [es5, setEs5] = useState(0);
  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);
  const [err3, setErr3] = useState(false);
  const [err4, setErr4] = useState(false);
  const [err5, setErr5] = useState(false);
  const [tslot, setTSlot] = useState("");
  const [total, setTotal] = useState(100);
  return (
    <div>
      <Row style={{ alignItems: "center" }}>
        <Col lg={6} className="mt-2">
          <div
            className="p-1"
            style={
              {
                //   border: "1px solid #3478f1",
                //   borderRadius: "6px",
              }
            }
          >
            <p style={{ marginBottom: "-8px" }} className="fs-13">
              Direct
            </p>
            <div className="d-flex  justify-content-between"></div>
            <Slider
              step={10}
              value={def}
              onChange={(value) => {
                setdef(value);
                loop[ind] = {
                  ...loop[ind],
                  tasker_ratio: def,
                  sp_ratio: 100 - def,
                };
              }}
              min={0}
              max={100}
              tooltip={true}
              orientation="horizontal"
              className="rage-success size-sm"
            />
          </div>
        </Col>

        <Col lg={6} className="mt-2">
          <div
            className="p-1"
            style={
              {
                //   border: "1px solid #3478f1",
                //   borderRadius: "6px",
              }
            }
          >
            <p style={{ marginBottom: "-8px" }} className="fs-13">
              Earning
            </p>

            <Slider
              step={10}
              value={def2}
              onChange={(value) => {
                setdef2(value);
                loop[ind] = {
                  ...loop[ind],
                  es_stats: def2,
                };
              }}
              min={0}
              max={100}
              tooltip={true}
              orientation="horizontal"
              className="rage-success size-sm"
            />
          </div>
        </Col>

        {/* <Col lg={6} className="mt-2">
          <Label className="fs-13 mb-4">Training</Label>
          <Input
            type="text"
            name="projecttitle"
            defaultValue={0}
            className="mb-4"
            onChange={(e) => {
              setTSlot(e.target.value);
              loop[ind] = {
                ...loop[ind],
                training_slot: e.target.value,
              };
            }}
          />
        </Col> */}
      </Row>
      {/* <Row>
        <div className="fs-13">Earning Ratio</div>
      </Row> */}
      {/* <Row>
        <Col lg={6}>
          <p style={{ margin: "0px" }}>ES1-{es1}</p>
          <Slider
            min={0}
            max={100 - es5 - es2 - es3 - es4}
            size={"small"}
            tooltip={false}
            value={es1}
            orientation="horizontal"
            onChange={(value) => {
              setEs1(value);
              setCont(cont + value);
            }}
          />
        </Col>
        <Col lg={6}>
          <p style={{ margin: "0px" }}>ES2-{es2}</p>
          <Slider
            min={0}
            max={100 - es1 - es5 - es3 - es4}
            value={es2}
            tooltip={false}
            size={"small"}
            orientation="horizontal"
            onChange={(value) => {
              setEs2(value);
              setCont(cont + value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p style={{ margin: "0px" }}>ES3-{es3}</p>
          <Slider
            min={0}
            max={100 - es1 - es2 - es5 - es4}
            value={es3}
            tooltip={false}
            size={"small"}
            orientation="horizontal"
            onChange={(value) => {
              setEs3(value);
              setCont(cont + value);
            }}
          />
        </Col>
        <Col lg={6}>
          <p style={{ margin: "0px" }}>ES4-{es4}</p>
          <Slider
            value={es4}
            tooltip={false}
            min={0}
            max={100 - es1 - es2 - es3 - es5}
            size={"small"}
            orientation="horizontal"
            onChange={(value) => {
              setEs4(value);
              setCont(cont + value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p style={{ margin: "0px" }}>ES5-{es5}</p>
          <Slider
            min={0}
            max={100 - es1 - es2 - es3 - es4}
            value={es5}
            tooltip={false}
            size={"small"}
            orientation="horizontal"
            onChange={(value) => {
              setEs5(value);
              setCont(cont + value);
            }}
          />
        </Col>
      </Row> */}
      <Row>
        {/* <Col lg={6}>
          <Label>ES - 2</Label>
          <Input
            type="number"
            className="form-control"
            id="es2"
            value={es2}
            name="es2"
            onChange={(e) => {
              setEs2(e.target.value);
              if (e.target.value > total) {
                setErr2(true);
              } else {
                setErr2(false);
                setTotal(100 - es1 - es3 - es4 - es5);
                loop[ind] = { ...loop[ind], es_2: e.target.value };
              }
            }}
          />
          {err2 && (
            <div
              id="passwordHelpBlock"
              className="form-text"
              style={{ color: "red" }}
            >
              {`Number cannot be greater than ${total}`}
            </div>
          )}
        </Col> */}
      </Row>
      {/* <Row>
        <Col lg={6}>
          <Label>ES - 3</Label>
          <Input
            type="number"
            className="form-control"
            id="es3"
            name="es3"
            value={es3}
            onChange={(e) => {
              setEs3(e.target.value);
              if (e.target.value > total) {
                setErr3(true);
              } else {
                setErr3(false);
                setTotal(100 - es2 - es1 - es4 - es5);
                loop[ind] = { ...loop[ind], es_3: e.target.value };
              }
            }}
          />
          {err3 && (
            <div
              id="passwordHelpBlock"
              className="form-text"
              style={{ color: "red" }}
            >
              {`Number cannot be greater than ${total}`}
            </div>
          )}
        </Col>
        <Col lg={6}>
          <Label>ES - 4</Label>
          <Input
            type="number"
            className="form-control"
            id="es4"
            name="es4"
            value={es4}
            onChange={(e) => {
              setEs4(e.target.value);
              if (e.target.value > total) {
                setErr4(true);
              } else {
                setErr4(false);
                setTotal(100 - es2 - es3 - es1 - es5);
                loop[ind] = { ...loop[ind], es_4: e.target.value };
              }
            }}
          />
          {err4 && (
            <div
              id="passwordHelpBlock"
              className="form-text"
              style={{ color: "red" }}
            >
              {`Number cannot be greater than ${total}`}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Label>ES - 5</Label>
          <Input
            type="number"
            className="form-control"
            id="es5"
            name="es5"
            value={es5}
            onChange={(e) => {
              setEs5(e.target.value);
              if (e.target.value > total) {
                setErr5(true);
              } else {
                setErr5(false);
                setTotal(100 - es2 - es3 - es4 - es1);
                loop[ind] = { ...loop[ind], es_5: e.target.value };
              }
            }}
          />
          {err5 && (
            <div
              id="passwordHelpBlock"
              className="form-text"
              style={{ color: "red" }}
            >
              {`Number cannot be greater than ${total}`}
            </div>
          )}
        </Col>
      </Row> */}
    </div>
  );
};

export default SlidersComp;
