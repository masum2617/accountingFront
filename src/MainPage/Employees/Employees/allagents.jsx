import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Addagent from "../../../_components/modelbox/Addagent";
import Header from "../../../initialpage/Sidebar/Header";
import Sidebar from "../../../initialpage/Sidebar/Sidebar";

const AllAgents = () => {
  const [menu, setMenu] = useState(false);
  const [agents, setAgents] = useState([]);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  //   get all agents
  // 1. get all the employees from database
  let getAgents = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:8000/employees/agent-list/"
    );
    let data = await response.data;
    console.log(data);
    setAgents(data);
  }, []);
  useEffect(() => {
    getAgents();
  }, [getAgents]);

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={value => toggleMobileMenu()} />
      <Sidebar />
      <div className='page-wrapper'>
        <Helmet>
          <title>Agents - Pacific Academy Admin</title>
          <meta name='description' content='Login page' />
        </Helmet>
        {/* Page Content */}
        <div className='content container-fluid'>
          {/* Page Header */}
          <div className='page-header'>
            <div className='row align-items-center'>
              <div className='col'>
                <h3 className='page-title'>Agent</h3>
                <ul className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/app/main/dashboard'>Dashboard</Link>
                  </li>
                  <li className='breadcrumb-item active'>Agent</li>
                </ul>
              </div>
              <div className='col-auto float-end ml-auto'>
                <a
                  href='#'
                  className='btn add-btn'
                  data-bs-toggle='modal'
                  data-bs-target='#add_agent'
                >
                  <i className='fa fa-plus' /> Add Agent
                </a>
                <div className='view-icons'>
                  <Link
                    to='/app/employee/allemployees'
                    className='grid-view btn btn-link active'
                  >
                    <i className='fa fa-th' />
                  </Link>
                  <Link
                    to='/app/employee/employees-list'
                    className='list-view btn btn-link'
                  >
                    <i className='fa fa-bars' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className='row filter-row'>
            <div className='col-sm-6 col-md-4'>
              <div className='form-group form-focus'>
                <input type='text' className='form-control floating' />
                <label className='focus-label'>Agent ID</label>
              </div>
            </div>
            <div className='col-sm-6 col-md-4'>
              <div className='form-group form-focus'>
                <input type='text' className='form-control floating' />
                <label className='focus-label'>Agent Name</label>
              </div>
            </div>

            <div className='col-sm-6 col-md-4'>
              <a href='#' className='btn btn-success btn-block w-100'>
                {" "}
                Search{" "}
              </a>
            </div>
          </div>
          {/* Search Filter */}
          <div className='row staff-grid-row'>
            {/* single agent list start */}
            {agents.map((agent, index) => (
              <div
                key={index}
                className='col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3'
              >
                <div className='profile-widget'>
                  <div className='profile-img'>
                    <Link
                      to={`/app/profile/agent-profile/${agent.id}`}
                      className='avatar'
                    >
                      <img src={agent.agent_photo} alt='' />
                    </Link>
                  </div>
                  <div className='dropdown profile-action'>
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
                        href='#'
                        data-bs-toggle='modal'
                        data-bs-target='#edit_employee'
                      >
                        <i className='fa fa-pencil m-r-5' /> Edit
                      </a>
                      <a
                        className='dropdown-item'
                        href='#'
                        data-bs-toggle='modal'
                        data-bs-target='#delete_employee'
                      >
                        <i className='fa fa-trash-o m-r-5' /> Delete
                      </a>
                    </div>
                  </div>
                  <h4 className='user-name m-t-10 mb-0 text-ellipsis'>
                    <Link to={`/app/profile/agent-profile/${agent.id}`}>
                      {agent.agent_name}
                    </Link>
                  </h4>
                </div>
              </div>
            ))}

            {/* end of single employee list */}
          </div>
        </div>
        {/* Add Employee Modal */}
        <Addagent />
        {/* /Add Employee Modal */}
      </div>
    </div>
  );
};

export default AllAgents;
