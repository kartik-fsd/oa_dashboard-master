import React from 'react';
import {
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';
import Select from 'react-select';
import {
  createInv,
  createProjectInvoice,
  digital_client_dropdown,
  getClient,
  gst_list,
} from '../../../assets/utils/farmingBase';
import axios from 'axios';
import { farming } from '../../../globalConfig';
import { successnotify, warningnotify } from '../../Toasts';

const InvoiceModal = ({ open, setOpen, data }) => {
  const [clientId, setClientId] = React.useState('');
  const [poNum, setPoNum] = React.useState('');
  const [poDate, setPoDate] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [clientData, setClientData] = React.useState([]);
  const [tds, setTds] = React.useState('0');
  const [loader, setLoader] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [gstDataList, setGstDataList] = React.useState([]);
  const [selectedGstValue, setSelectedGstValue] = React.useState('');

  const gstList = async () => {
    let apiData = farming.farming_URL + gst_list;
    setLoader(true);
    try {
      let gstdata = await axios.get(`${apiData}/${data.client_id}`);
      setGstDataList(gstdata?.data?.data);
      setLoader(false);
    } catch (error) {
      setIsErr(false);
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    gstList();
  }, []);

  console.log(tds, 'tds');

  const colorStyles = {
    control: (styles) => ({ ...styles, height: '38px' }),
  };

  const onStartDateChange = (e) => {
    const startdate = moment(e[0]).format('YYYY-MM-DD');
    setStartDate(startdate);
  };

  const onEndDateChange = (e) => {
    const enddate = moment(e[0]).format('YYYY-MM-DD');
    setEndDate(enddate);
  };
  const onDueDateChange = (e) => {
    const enddate = moment(e[0]).format('YYYY-MM-DD');
    setDueDate(enddate);
  };

  const handleChangeId = (e) => {
    console.log(e);
    setClientId(e.value);
  };

  const poNumChange = (e) => {
    setPoNum(e.target.value);
  };

  const poDateChange = (e) => {
    console.log(e);
    const podate = moment(e[0]).format('YYYY-MM-DD');
    setPoDate(podate);
  };

  const today = new Date();

  const currentYear = today.getFullYear();
  const financialYearStart = new Date(currentYear, 3, 1); // April 1st
  const currentFinancialYear =
    today < financialYearStart ? currentYear - 1 : currentYear;

  console.log(currentFinancialYear, 'year');

  const handleCreateInv = () => {
    const link = farming.farming_URL + createProjectInvoice;
    if (selectedGstValue == '' || !selectedGstValue) {
      warningnotify('please Select GST');
    }
    const body = {
      client_id: data.client_id,
      project_acc: data.invoice_id,
      sow_id: data.sow_id,
      is_manual: 'yes',
      po_no: poNum,
      po_date: poDate,
      start_date: startDate,
      end_date: endDate,
      due_date: dueDate,
      billing_status: 'billed',
      year: currentFinancialYear,
      tds_per: tds,
      gst_id: selectedGstValue,
    };

    if (
      body.start_date == '' ||
      body.end_date == '' ||
      body.due_date == '' ||
      body.tds_per == ''
    ) {
      warningnotify('please fill the details');
    } else {
      axios
        .post(link, body)
        .then((res) => {
          console.log(res.data);
          successnotify('success');
          setOpen(false);
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    let link = farming.farming_URL + digital_client_dropdown;
    axios
      .get(link)
      .then((res) => {
        setClientData(res.data.client);
      })
      .catch((err) => console.log(err));
  }, []);

  return loader ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
        toggle={() => {
          setOpen(false);
          setPoDate('');
          setPoNum('');
          setStartDate('');
          setEndDate('');
          setSelectedGstValue('');
          setDueDate('');
          setTds('0');
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
          }}
        >
          <h5 style={{ color: '#3f5289 ' }}>Create Invoice</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            {/* <Col xs="6">
              <div>
                <label
                  htmlFor="updateclientid"
                  id="updateclientid"
                  className="form-label"
                >
                  Client Id
                </label>
                <Select
                  styles={colorStyles}
                  id="updateclientid"
                  options={clientData}
                  isSearchable
                  onChange={handleChangeId}
                />
                <input
                  type="number"
                  className="form-control"
                  name="client_id"
                  id="client_id"
                  readOnly
                  value={data.sow_id}
                />
              </div>
            </Col> */}
            <Col xs="6">
              <div>
                <label htmlFor="ponumber" id="ponumber" className="form-label">
                  PO Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="po_no"
                  id="ponumber"
                  onChange={poNumChange}
                />
              </div>
            </Col>
            <Col xs="6">
              <div>
                <Label className="form-label " htmlFor="podate" id="podate">
                  PO Date
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: 'd M, Y',
                  }}
                  name="po_date"
                  id="podate"
                  onChange={poDateChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4" htmlFor="podate1" id="podate1">
              <div>
                <Label className="form-label ">Billing Start Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: 'd M, Y',
                  }}
                  name="start_date"
                  id="podate1"
                  onChange={onStartDateChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label " htmlFor="podate2" id="podate2">
                  Billing End Date
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: 'd M, Y',
                  }}
                  name="end_date"
                  id="podate2"
                  onChange={onEndDateChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label " htmlFor="podate2" id="podate2">
                  Due Date
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: 'd M, Y',
                  }}
                  name="end_date"
                  id="podate2"
                  onChange={onDueDateChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <Label className="form-label " htmlFor="podate2" id="podate2">
                Tds per
              </Label>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                onChange={(e) => {
                  setTds(e.target.value);
                }}
              >
                {/* <option selected disabled>
                  select
                </option> */}
                <option value="0" selected>
                  0
                </option>

                <option value=".25">0.25</option>
                <option value="0.5">0.5</option>
                <option value="0.75">0.75</option>
                <option value="1">1</option>

                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Label className="form-label " htmlFor="podate2" id="podate2">
                GST
              </Label>
              <Select
                options={gstDataList}
                onChange={(e) => setSelectedGstValue(e?.value)}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              handleCreateInv();
            }}
          >
            Create
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InvoiceModal;
