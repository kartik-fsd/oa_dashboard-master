import axios from 'axios';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { accSummary } from '../../../assets/utils/farmingBase';
import { api, farming } from '../../../globalConfig';
import ProjectLeadsTable from '../../ManagerDashboard/ProjectLeadsTable';
import FinanceSummaryTable from './FinanceSummaryTable';
import './financesummary.css';
import DownloadAcc from './DownloadAcc';
import { extract_token } from '../../../assets/utils/common';
// test

const FinanceSummary = () => {
  const [data, setData] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setIsErr] = React.useState(false);
  const [filter, setFilter] = React.useState('receivables');
  const [loc, setLoc] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const token = sessionStorage.getItem('token');

  console.log(filter, 'qwd');
  console.log(window.location.pathname, 'chages');
  const getAccData = () => {
    let apiData = farming.farming_URL + accSummary + '/' + filter;
    setIsLoading(true);
    axios
      .get(apiData)
      .then((res) => {
        setData(res.data);
        console.log(res.data, 'rcnj');
      })
      .catch((err) => setIsErr(true))
      .finally(() => setIsLoading(false));
  };
  React.useEffect(() => {
    getAccData();
    setLoc(window.location.pathname);
  }, [filter, check]);
  const indianNumbers = (num, len) => {
    return (
      ' ₹ ' +
      Number(num).toLocaleString('en-IN', {
        maximumFractionDigits: len,
      })
    );
  };

  //loader
  const [isLoading1, setIsLoading1] = React.useState(false);
  const [isErr1, setIsErr1] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  console.log(userData, 'testingon');

  const getTokenDetails = () => {
    let tokenapi = api.VENDOR_URL + extract_token;
    setIsLoading1(true);
    axios
      .get(tokenapi)
      .then((res) => {
        setIsLoading1(false);
        setUserData({ role: res.data.role, type: res.data.type });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading1(false));
  };

  React.useEffect(() => {
    getTokenDetails();
  }, []);

  return isLoading1 ? (
    <>...loading</>
  ) : isErr1 ? (
    <>something went wrong</>
  ) : (
    <>
      <div className="page-content">
        <Container fluid>
          <Col lg={12}>
            <Card>
              <CardHeader style={{ padding: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h5
                    className="text-primary fw-600 fs-16"
                    style={{ letterSpacing: '2px', marginLeft: '15px' }}
                  >
                    Receivables Summary
                  </h5>
                  <div className="d-flex gap-3 align-items-center">
                    {window.location.pathname == '/management/ar-summary' ? (
                      <div>
                        <a
                          href={`${farming.farming_URL}/invoatoken/download/accSummary?type=client&token=${token}`}
                          download
                        >
                          <i
                            className=" ri-download-2-line text-primary"
                            style={{ fontSize: '24px', cursor: 'pointer' }}
                          ></i>
                        </a>
                      </div>
                    ) : (
                      <div>
                        <i
                          className=" ri-download-2-line text-primary"
                          style={{ fontSize: '24px', cursor: 'pointer' }}
                          onClick={() => setOpen(!open)}
                        ></i>
                      </div>
                    )}
                    <div
                      className="d-flex gap-2 align-items-center"
                      style={{ marginRight: '230px' }}
                    >
                      <div
                        style={{
                          height: '40px',
                          // marginRight: "230px",
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          className="badge badge-soft-primary d-flex align-items-center px-4  fs-16"
                          style={{ height: '40px' }}
                        >
                          Total : {indianNumbers(data.total?.toFixed(2))}
                        </span>
                      </div>
                      <div>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                          <DropdownToggle
                            style={{ background: '#fff', border: 'none' }}
                          >
                            {loc == '/finance/ar-summary' &&
                            (userData?.type == 'all' ||
                              userData?.type == 'fin') ? (
                              <button className="btn btn-primary">
                                <i
                                  className=" ri-filter-3-line align-bottom me-1  fs-14"
                                  // style={{
                                  //   fontSize: "13px",
                                  // }}
                                ></i>
                                Filter
                              </button>
                            ) : (
                              <></>
                            )}
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter('receivables');
                              }}
                            >
                              <i className=" ri-exchange-dollar-fill align-bottom me-2 text-muted"></i>
                              Receivables
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter('bad_debt');
                              }}
                            >
                              <i className=" ri-delete-back-2-line align-bottom me-2 text-muted"></i>
                              Bad Debt
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter('all');
                              }}
                            >
                              <i className=" ri-user-follow-line align-bottom me-2 text-muted"></i>
                              All
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <FinanceSummaryTable
                  check={check}
                  setCheck={setCheck}
                  data={data}
                  isLoading={isLoading}
                  err={err}
                  filter={filter}
                />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
      <DownloadAcc open={open} setOpen={setOpen} />
    </>
  );
};

export default FinanceSummary;
