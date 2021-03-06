import React, { useState, useEffect } from "react";
import axios from "axios";

const Addemployee = () => {
  const [employee_name, setEmployeeName] = useState("");
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_address, setEmployeeAddress] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_salary, setEmployeeSalary] = useState("");
  const [employee_date_joined, setEmployeeDateJoined] = useState("");
  const [employee_role, setEmployeeRole] = useState(null);
  const [employee_photo, setEmployeePhoto] = useState(null);

  const employeeNameHandler = e => {
    console.log(e.target.value);
    setEmployeeName(e.target.value);
  };
  const roleHandler = e => {
    console.log(e.target.value);
    setEmployeeRole(e.target.value);
  };
  const emailHandler = e => {
    setEmployeeEmail(e.target.value);
  };
  const addressHandler = e => {
    setEmployeeAddress(e.target.value);
  };
  const phoneHandler = e => {
    setEmployeePhone(e.target.value);
  };
  const salaryHandler = e => {
    console.log(e.target.value);
    setEmployeeSalary(e.target.value);
  };
  const joinDateHandler = e => {
    setEmployeeDateJoined(e.target.value);
  };

  const photoHandler = e => {
    setEmployeePhoto(e.target.files[0]);
  };

  // Handle POST Request form submission
  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employee_name", employee_name);
    formData.append("employee_email", employee_email);
    formData.append("employee_role", employee_role);
    formData.append("employee_salary", employee_salary);
    formData.append("employee_address", employee_address);
    formData.append("employee_phone", employee_phone);
    formData.append("employee_date_joined", employee_date_joined);
    if (employee_photo !== null) {
      formData.append("employee_photo", employee_photo);
    }

    await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/employees/employee-list/",
      data: formData,
    }).then(response => {
      console.log(response.data);
    });
  };

  return (
    <>
      {/* Add Employee Modal */}
      <div id='add_employee' className='modal custom-modal fade' role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Employee</h5>
              <button
                type='button'
                className='close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>??</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={submitHandler}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>
                        Employee Name<span className='text-danger'>*</span>
                      </label>
                      <input
                        onChange={employeeNameHandler}
                        className='form-control'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>
                        Email <span className='text-danger'>*</span>
                      </label>
                      <input
                        onChange={emailHandler}
                        className='form-control'
                        type='email'
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>
                        Phone <span className='text-danger'>*</span>
                      </label>
                      <input
                        onChange={phoneHandler}
                        className='form-control'
                        type='number'
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>
                        Salary <span className='text-danger'>*</span>
                      </label>
                      <input
                        onChange={salaryHandler}
                        className='form-control'
                        type='number'
                      />
                    </div>
                  </div>
                  {/* <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label">Password</label>
                         <input className="form-control" type="password" />
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label">Confirm Password</label>
                         <input className="form-control" type="password" />
                       </div>
                     </div> */}
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>
                        Employee Address <span className='text-danger'>*</span>
                      </label>
                      <input
                        onChange={addressHandler}
                        type='text'
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>Joining Date</label>
                      <div>
                        <input
                          onChange={joinDateHandler}
                          className='form-control datetimepicker'
                          type='date'
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label">Phone </label>
                         <input className="form-control" type="text" />
                       </div>
                     </div> */}
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>Designation</label>
                      <br />
                      <select onChange={roleHandler} className='new-select'>
                        <option>Select Designation</option>
                        <option value='Staff'>Staff</option>
                        <option value='Manager'>Manager</option>
                        <option value='Accountant'>Accountant</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                       <div className="form-group">
                         <label>Department <span className="text-danger">*</span></label>
                         <select className="select">
                           <option>Select Department</option>
                           <option>Web Development</option>
                           <option>IT Management</option>
                           <option>Marketing</option>
                         </select>
                       </div>
                     </div> */}
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>Employee Photo</label>
                      <input
                        className='upload'
                        type='file'
                        onChange={photoHandler}
                      />
                      <img
                        className='inline-block'
                        src={employee_photo}
                        alt='user'
                      />
                    </div>
                  </div>
                  {/* <div className='col-md-6'>
                    <div className='form-group'>
                      <label>
                        Employee Role <span className='text-danger'>*</span>
                      </label>
                      <select onChange={roleHandler} className='select'>
                        <option value='staff'>Staff</option>
                        <option value='manager'>Manager</option>
                        <option value='accountant'>Accountant</option>
                      </select>
                    </div>
                  </div> */}
                </div>
                {/* <div className="table-responsive m-t-15">
                     <table className="table table-striped custom-table">
                       <thead>
                         <tr>
                           <th>Module Permission</th>
                           <th className="text-center">Read</th>
                           <th className="text-center">Write</th>
                           <th className="text-center">Create</th>
                           <th className="text-center">Delete</th>
                           <th className="text-center">Import</th>
                           <th className="text-center">Export</th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr key={1}>
                           <td>Holidays</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                         <tr key={2}>
                           <td>Leaves</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                         <tr key={3}>
                           <td>Clients</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                         <tr key={4}>
                           <td>Projects</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                         <tr key={5}>
                           <td>Tasks</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                         <tr key={6}>
                           <td>Chats</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                         <tr key={7}>
                           <td>Assets</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                         <tr key={8}>
                           <td>Timing Sheets</td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input defaultChecked type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                           <td className="text-center">
                             <input type="checkbox" />
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div> */}
                <div className='submit-section'>
                  <button type='submit' className='btn btn-primary submit-btn'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Employee Modal */}
    </>
  );
};

export default Addemployee;
