import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AllStudents from "./AllStudents";

const StudentsRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/allstudents`} />
    <Route path={`${match.url}/allstudents`} component={AllStudents} />
  </Switch>
);

export default StudentsRoute;
