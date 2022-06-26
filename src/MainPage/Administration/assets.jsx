import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddAsset from "../../_components/modelbox/AddAsset";
import AssetDetail from "./assetDetail";

const Assets = () => {
  // const [purchasedate, setPurchaseDate]=  useState("");
  const [assets, setAssets] = useState([]);
  const [data, setData] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [banks, setBanks] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isBankConnected, setIsBankConnected] = useState(false);

  const [asset_name, setAssetName] = useState("");
  const [asset_price, setAssetPrice] = useState("");
  const [purchase_from, setPurchaseFrom] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [method_of_payment, setPaymentMethod] = useState("");
  const [paid_by, setPaidBy] = useState("");
  const [note, setNote] = useState("");
  const [payment_bank, setPaymentBank] = useState("");

  async function handleAsset(id) {
    console.log(id);

    const response = await axios.get(
      `http://127.0.0.1:8000/inventory/inventory-list/${id}`
    );
    let data = await response.data;
    console.log(data);

    //   // set the values
    // setAssetName(data.asset_name);
    // setAssetPrice(data.asset_price);
    // setSerialNumber(data.serial_number);
    // setPurchaseDate(data.purchase_date);
    // setPurchaseFrom(data.purchase_from);
    // setNote(data.description);
    // setIsBankConnected(data.connect_with_bank);
    // setIsPaid(data.is_paid);
    // setIsPending(data.is_pending);
    // setIsRejected(data.is_rejected);
    // setBanks(data.payment_bank);
    // setEmployees(data.paid_by);
  }

  const paymentMethodHandler = e => {
    setPaymentMethod(e.target.value);
    // console.log(e.target.value);
  };

  const assetNameHandler = e => {
    setAssetName(e.target.value);
  };

  const serialHandler = e => {
    setSerialNumber(e.target.value);
  };
  const purchaseDateHandler = e => {
    setPurchaseDate(e.target.value);
  };
  const purchaseFromHandler = e => {
    setPurchaseFrom(e.target.value);
  };
  const priceHandler = e => {
    setAssetPrice(e.target.value);
  };

  const paymentBankHandler = e => {
    setPaymentBank(e.target.value);
    console.log(e.target.value);
  };

  const descriptionHandler = e => {
    setNote(e.target.value);
  };

  const isBankConnectHandler = () => {
    setIsBankConnected(!isBankConnected);
  };

  const isPaidHandler = () => {
    setIsPaid(!isPaid);
  };
  const isPendingHandler = () => {
    setIsPending(!isPending);
  };
  const isRejectedHandler = () => {
    setIsRejected(!isRejected);
  };

  // get single asset
  // let getSingleAsset = async () => {
  //   const response = await axios.get(
  //     `http://localhost:8000/inventory/inventory-detail/${singleAssetID}`
  //   );
  //   let data = await response.data;
  //   console.log(data);

  //   // set the values
  //   // setAssetName(data.asset_name);
  //   // setAssetPrice(data.asset_price);
  //   // setSerialNumber(data.serial_number);
  //   // setPurchaseDate(data.purchase_date);
  //   // setPurchaseFrom(data.purchase_from);
  //   // setNote(data.description);
  //   // setIsBankConnected(data.connect_with_bank);
  //   // setIsPaid(data.is_paid);
  //   // setIsPending(data.is_pending);
  //   // setIsRejected(data.is_rejected);
  //   // setBanks(data.payment_bank);
  //   // setEmployees(data.paid_by);
  // };
  // useEffect(() => {
  //   getSingleAsset();
  // }, []);

  // get the banks
  let getBanks = useCallback(async () => {
    let response = await fetch("http://127.0.0.1:8000/bank/bank-list/");
    let data = await response.json();
    setBanks(data);
  }, []);
  useEffect(() => {
    getBanks();
  }, [getBanks]);

  // 1. get all the employees from database
  let getEmployees = useCallback(async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/employees/employee-list/"
    );
    let data = await response.data;
    console.log(data);
    setEmployees(data);
  }, []);
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  // POST DATA from Submitted Form
  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("asset_name", asset_name);
    formData.append("asset_price", asset_price);
    formData.append("purchase_from", purchase_from);
    formData.append("purchase_date", purchase_date);
    formData.append("serial_number", serial_number);
    formData.append("method_of_payment", method_of_payment);
    formData.append("paid_by", paid_by);
    formData.append("note", note);
    formData.append("payment_bank", payment_bank);
    formData.append("paid_by", paid_by);
    formData.append("is_paid", isPaid);
    formData.append("is_pending", isPending);
    formData.append("is_rejected", isRejected);
    formData.append("connect_with_bank", isBankConnected);

    await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/inventory/inventory-list/",
      data: formData,
    }).then(response => {
      console.log(response.data);
    });
  };

  let getAssets = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:8000/inventory/inventory-list/"
    );
    let data = await response.data;
    console.log(data);
    // setAssets(data);
    setData(data);
  }, []);
  useEffect(() => {
    getAssets();
  }, []);
  console.log("datas: ", data);

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  // const [columns, setColumns] = useState([]);

  const columns = [
    // {
    //   title: "Asset User",
    //   dataIndex: "assetuser",
    //   sorter: (a, b) => a.assetuser.length - b.assetuser.length,
    // },

    {
      title: "Asset Name",
      dataIndex: "asset_name",
      // render: (text, record) => <p>{text}</p>,
      sorter: (a, b) => a.asset_name.length - b.asset_name.length,
    },
    {
      title: "Price",
      dataIndex: "asset_price",
      render: (text, record) => <span>&#2547;{text}</span>,
      sorter: (a, b) => a.asset_price.length - b.asset_price.length,
    },
    // {
    //   title: "Serial No.",
    //   dataIndex: "assetid",
    //   sorter: (a, b) => a.assetid.length - b.assetid.length,
    // },
    {
      title: "Purchase Date",
      dataIndex: "purchase_date",
      sorter: (a, b) => a.purchase_date.length - b.purchase_date.length,
    },
    {
      title: "Payment Method",
      dataIndex: "method_of_payment",
      // render: (text, record) => <p>{text}</p>,
      // sorter: (a, b) => a.asset_name.length - b.asset_name.length,
    },

    // {
    //   title: "Payment Bank",
    //   dataIndex: "payment_bank",
    //   // render: (text, record) => <p>{text}</p>,
    // },

    // {
    //   title: "Paid By",
    //   dataIndex: "paid_by",
    //   // render: (text, record) => <p>{text}</p>,
    //   sorter: (a, b) => a.asset_name.length - b.asset_name.length,
    // },

    {
      title: "Purchase From",
      dataIndex: "purchase_from",
      render: (text, record) => <strong>{text}</strong>,
      sorter: (a, b) => a.purchase_from.length - b.purchase_from.length,
    },

    {
      title: "Status",
      dataIndex: "is_paid",

      render: (text, record) => (
        <div className=' action-label text-center'>
          <a
            className='btn btn-white btn-sm btn-rounded'
            href='#'
            aria-expanded='false'
          >
            {text == true ? (
              <div>
                <i className='fa fa-dot-circle-o text-success' /> Paid
              </div>
            ) : (
              <div>
                <i className='fa fa-dot-circle-o text-danger' /> not
              </div>
            )}
          </a>
        </div>
      ),
    },

    // {
    //   title: "Warranty",
    //   dataIndex: "warranty",
    //   sorter: (a, b) => a.warranty.length - b.warranty.length,
    // },

    // {
    //   title: "Warranty End",
    //   dataIndex: "warrantyend",
    //   sorter: (a, b) => a.warrantyend.length - b.warrantyend.length,
    // },

    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (text, record) => (
    //     <div className='dropdown action-label text-center'>
    //       <a
    //         className='btn btn-white btn-sm btn-rounded dropdown-toggle'
    //         href='#'
    //         data-bs-toggle='dropdown'
    //         aria-expanded='false'
    //       >
    //         <i
    //           className={
    //             text === "Pending"
    //               ? "fa fa-dot-circle-o text-danger"
    //               : text === "Approved"
    //               ? "fa fa-dot-circle-o text-success"
    //               : "fa fa-dot-circle-o text-info"
    //           }
    //         />{" "}
    //         {text}
    //       </a>
    //       <div className='dropdown-menu dropdown-menu-right'>
    //         <a className='dropdown-item' href='#'>
    //           <i className='fa fa-dot-circle-o text-danger' /> Pending
    //         </a>
    //         <a className='dropdown-item' href='#'>
    //           <i className='fa fa-dot-circle-o text-success' /> Approved
    //         </a>
    //         <a className='dropdown-item' href='#'>
    //           <i className='fa fa-dot-circle-o text-info' /> Returned
    //         </a>
    //       </div>
    //     </div>
    //   ),
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },
    {
      title: "Action",
      dataIndex: "id",
      render: (text, record) => (
        <div className='dropdown dropdown-action text-end'>
          <a
            href='#'
            className='action-icon dropdown-toggle'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <i className='material-icons'>more_vert</i>
          </a>
          <div className='dropdown-menu dropdown-menu-right'>
            <a
              className='dropdown-item'
              data-bs-toggle='modal'
              data-bs-target='#edit_asset'
              onClick={() => handleAsset(text)}
            >
              <i className='fa fa-pencil m-r-5' /> Edit
            </a>
            <a
              className='dropdown-item'
              href='#'
              data-bs-toggle='modal'
              data-bs-target='#delete_asset'
            >
              <i className='fa fa-trash-o m-r-5' /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className='page-wrapper'>
      <Helmet>
        <title>Assets - Pacific Academy Admin</title>
        <meta name='description' content='Login page' />
      </Helmet>
      {/* Page Content */}
      <div className='content container-fluid'>
        {/* Page Header */}
        <div className='page-header'>
          <div className='row align-items-center'>
            <div className='col'>
              <h3 className='page-title'>Assets</h3>
              <ul className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/app/main/dashboard'>Dashboard</Link>
                </li>
                <li className='breadcrumb-item active'>Assets</li>
              </ul>
            </div>
            <div className='col-auto float-end ml-auto'>
              <a
                href='#'
                className='btn add-btn'
                data-bs-toggle='modal'
                data-bs-target='#add_asset'
              >
                <i className='fa fa-plus' /> Add Asset
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className='row filter-row'>
          <div className='col-sm-6 col-md-5'>
            <div className='form-group form-focus'>
              <input type='text' className='form-control floating' />
              <label className='focus-label'>Asset Name</label>
            </div>
          </div>
          {/* <div className="col-sm-6 col-md-3"> 
                <div className="form-group form-focus select-focus">
                  <select className="select floating"> 
                    <option value> -- Select -- </option>
                    <option value={0}> Pending </option>
                    <option value={1}> Approved </option>
                    <option value={2}> Returned </option>
                  </select>
                  <label className="focus-label">Status</label>
                </div>
              </div> */}
          <div className='col-sm-12 col-md-4'>
            <div className='row'>
              <div className='col-md-6 col-sm-6'>
                <div className='form-group form-focus select-focus'>
                  <div>
                    <input
                      className='form-control floating datetimepicker'
                      type='date'
                    />
                  </div>
                  <label className='focus-label'>From</label>
                </div>
              </div>
              <div className='col-md-6 col-sm-6'>
                <div className='form-group form-focus select-focus'>
                  <div>
                    <input
                      className='form-control floating datetimepicker'
                      type='date'
                    />
                  </div>
                  <label className='focus-label'>To</label>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-6 col-md-2'>
            <a href='#' className='btn btn-success btn-block w-100'>
              {" "}
              Search{" "}
            </a>
          </div>
        </div>
        {/* /Search Filter */}
        <div className='row'>
          <div className='col-md-12'>
            <div className='table-responsive'>
              <Table
                className='table-striped'
                pagination={{
                  total: data.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={data}
                rowKey={record => record.id}

                // onChange={this.handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Asset Modal */}
      <AddAsset />
      {/* /Add Asset Modal */}
      {/* Edit Asset Modal */}
      <div id='edit_asset' className='modal custom-modal fade' role='dialog'>
        <div className='modal-dialog modal-md' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Edit Asset</h5>
              <button
                type='button'
                className='close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <AssetDetail />
              <form>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Serial No.</label>
                      <input
                        className='form-control'
                        type='text'
                        onChange={serialHandler}
                        value={serial_number}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Asset Name</label>
                      <input
                        className='form-control'
                        type='text'
                        onChange={assetNameHandler}
                        value={asset_name}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Purchase Date</label>
                      <input
                        className='form-control datetimepicker'
                        type='date'
                        onChange={purchaseDateHandler}
                        value={purchase_date}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Purchase From</label>
                      <input
                        className='form-control'
                        type='text'
                        onChange={purchaseFromHandler}
                        value={purchase_from}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Manufacturer</label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Model</label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                </div> */}
                {/* <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Serial Number</label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Supplier</label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Condition</label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Warranty</label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='In Months'
                      />
                    </div>
                  </div>
                </div> */}
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Price</label>
                      <input
                        placeholder='bdt'
                        className='form-control'
                        type='number'
                        onChange={priceHandler}
                        value={asset_price}
                      />
                    </div>
                  </div>
                  {/* <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Asset User</label>
                      <select className='select'>
                        <option>John Doe</option>
                        <option>Richard Miles</option>
                      </select>
                    </div>
                  </div> */}
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label>Description</label>
                      <textarea
                        className='form-control'
                        onChange={descriptionHandler}
                        value={note}
                      />
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <label htmlFor=''>Payment Status</label>
                  </div>
                  <div className='col-sm-4'>
                    <div className='form-group'>
                      <label className='col-form-label'>Paid </label>
                      <div className='custom-control custom-switch'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='paidCheck'
                          defaultChecked={isPaid}
                          onChange={isPaidHandler}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='paidCheck'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-4'>
                    <div className='form-group'>
                      <label className='col-form-label'>Pending </label>
                      <div className='custom-control custom-switch'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='pendingCheck'
                          defaultChecked={isPending}
                          onChange={isPendingHandler}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='pendingCheck'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-4'>
                    <div className='form-group'>
                      <label className='col-form-label'>Rejected </label>
                      <div className='custom-control custom-switch'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='rejectCheck'
                          defaultChecked={isRejected}
                          onChange={isRejectedHandler}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='rejectCheck'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Payment Method</label>
                      <select
                        className='new-select'
                        onChange={paymentMethodHandler}
                      >
                        <option value=''>Select Payment Method</option>
                        <option value='Cash'>Cash</option>
                        <option value='Cheque'>Cheque</option>
                        <option value='Bank Transfer'>Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Paid By</label>
                      <select className='new-select'>
                        <option value=''>Select Employee</option>
                        {employees.map((employee, index) => (
                          <option key={index} value={employee.id}>
                            {employee.employee_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor=''>Bank Connection</label>
                    <div className='custom-control custom-switch'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='rejectCheck'
                        defaultChecked={isBankConnected}
                        onChange={isBankConnectHandler}
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='rejectCheck'
                      />
                    </div>
                  </div>
                  {isBankConnected && (
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label>Payment Bank</label>
                        <select
                          className='new-select'
                          onChange={paymentBankHandler}
                        >
                          <option>Select Bank</option>
                          {banks.map((bank, index) => (
                            <option key={index} value={bank.id}>
                              {bank.bank_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Status</label>
                      <select className='select'>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Deployed</option>
                        <option>Damaged</option>
                      </select>
                    </div>
                  </div> */}
                </div>
                <div className='submit-section'>
                  <button className='btn btn-primary submit-btn'>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Asset Modal */}
      {/* Delete Asset Modal */}
      <div className='modal custom-modal fade' id='delete_asset' role='dialog'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='form-header'>
                <h3>Delete Asset</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className='modal-btn delete-action'>
                <div className='row'>
                  <div className='col-6'>
                    <a href='' className='btn btn-primary continue-btn'>
                      Delete
                    </a>
                  </div>
                  <div className='col-6'>
                    <a
                      href=''
                      data-bs-dismiss='modal'
                      className='btn btn-primary cancel-btn'
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Asset Modal */}
    </div>
  );
};

export default Assets;
