import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Addagent = () => {
  let history = useHistory();
  function hide_modal() {
    if ($(".modal").length > 0) {
      var modalUniqueClass = ".modal";
      $(".modal").on("show.bs.modal", function (e) {
        var $element = $(this);
        var $uniques = $(modalUniqueClass + ":visible").not($(this));
        if ($uniques.length) {
          $uniques.modal("hide");
          $uniques.one("hidden.bs.modal", function (e) {
            $element.modal("show");
          });
          return false;
        }
      });
    }
  }

  const [agent_name, setAgentName] = useState("");
  const [agent_email, setAgentEmail] = useState("");
  const [agent_address, setAgentAddress] = useState("");
  const [agent_phone, setAgentPhone] = useState("");
  const [agent_salary, setAgentSalary] = useState("");
  const [agent_date_joined, setAgentDateJoined] = useState("");
  const [agent_photo, setAgentPhoto] = useState(null);

  const agentNameHandler = e => {
    console.log(e.target.value);
    setAgentName(e.target.value);
  };

  const emailHandler = e => {
    setAgentEmail(e.target.value);
  };
  const addressHandler = e => {
    setAgentAddress(e.target.value);
  };
  const phoneHandler = e => {
    setAgentPhone(e.target.value);
  };
  const salaryHandler = e => {
    console.log(e.target.value);
    setAgentSalary(e.target.value);
  };
  const joinDateHandler = e => {
    setAgentDateJoined(e.target.value);
  };

  const photoHandler = e => {
    setAgentPhoto(e.target.files[0]);
  };

  // Handle POST Request form submission
  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("agent_name", agent_name);
    formData.append("agent_email", agent_email);
    formData.append("agent_salary", agent_salary);
    formData.append("agent_address", agent_address);
    formData.append("agent_phone", agent_phone);
    formData.append("agent_date_joined", agent_date_joined);
    if (agent_photo !== null) {
      formData.append("agent_photo", agent_photo);
    }

    await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/employees/agent-list/",
      data: formData,
    }).then(response => {
      console.log(response.data);
      // history.push("");
      hide_modal();
    });
  };

  return (
    <>
      {/* Add Agent Modal */}
      <div id='add_agent' className='modal custom-modal fade' role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Agent</h5>
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
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label className='col-form-label'>
                        Agent Name<span className='text-danger'>*</span>
                      </label>
                      <input
                        onChange={agentNameHandler}
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
                  {/* <div className='col-sm-6'>
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
                  </div> */}
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
                        Agent Address <span className='text-danger'>*</span>
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
                  {/* <div className='col-sm-6'>
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
                  </div> */}
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
                      <label className='col-form-label'>Agent Photo</label>
                      <input
                        className='upload'
                        type='file'
                        onChange={photoHandler}
                      />
                      <img
                        className='inline-block'
                        src={agent_photo}
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

export default Addagent;
