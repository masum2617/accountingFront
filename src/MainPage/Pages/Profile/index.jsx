/**
 * Tables Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import EmployeeProfile from "./employeeprofile";
import AgentProfile from "./agentprofile";
import ClientProfile from "./clientprofile";
import StudentProfile from "./studentprofile";

const subscriptionroute = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/employee-profile`}
    />
    <Route
      path={`${match.url}/employee-profile/:id`}
      component={EmployeeProfile}
    />
    <Route path={`${match.url}/agent-profile/:id`} component={AgentProfile} />
    <Route path={`${match.url}/client-profile`} component={ClientProfile} />
    <Route
      path={`${match.url}/student-profile/:id`}
      component={StudentProfile}
    />
  </Switch>
);

export default subscriptionroute;
