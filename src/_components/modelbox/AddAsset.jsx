import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const AddAsset = () => {
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

  return (
    <>
      {/* Add Asset Modal */}
      <div id='add_asset' className='modal custom-modal fade' role='dialog'>
        <div className='modal-dialog modal-md' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Asset</h5>
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
              <form onSubmit={submitHandler}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Asset Name</label>
                      <input
                        onChange={assetNameHandler}
                        className='form-control'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Serial Number</label>
                      <input
                        onChange={serialHandler}
                        className='form-control'
                        type='text'
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Purchase Date</label>
                      <input
                        onChange={purchaseDateHandler}
                        className='form-control datetimepicker'
                        type='date'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Purchase From</label>
                      <input
                        onChange={purchaseFromHandler}
                        className='form-control'
                        type='text'
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Manufacturer</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Model</label>
                <input className="form-control" type="text" />
              </div>
            </div>
          </div> */}
                {/* <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Serial Number</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Supplier</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Condition</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Warranty</label>
                <input className="form-control" type="text" placeholder="In Months" />
              </div>
            </div>
          </div> */}
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Price</label>
                      <input
                        onChange={priceHandler}
                        placeholder='BDT'
                        className='form-control'
                        type='number'
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-6">
              <div className="form-group">
                <label>Asset User</label>
                <select className="select">
                  <option>John Doe</option>
                  <option>Richard Miles</option>
                </select>
              </div>
            </div> */}
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label>Description</label>
                      <textarea
                        onChange={descriptionHandler}
                        className='form-control'
                        defaultValue={""}
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
                </div>
                <div className='submit-section'>
                  <button className='btn btn-primary submit-btn'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Asset Modal */}
    </>
  );
};

export default AddAsset;
