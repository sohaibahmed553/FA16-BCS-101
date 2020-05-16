import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/admin/Admin";
import Student from "./components/student/Student";
import Instructor from "./components/instructor/Instructor";
import AdminRoute from "./components/admin/routing/AdminRoute";
import StudentRoute from "./components/student/routing/StudentRoute";
import InstructorRoute from "./components/instructor/routing/InstructorRoute";

import "./css/App.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <AdminRoute path="/admin" component={Admin} />
        <StudentRoute path="/student" component={Student} />
        <InstructorRoute path="/instructor" component={Instructor} />
      </Switch>
    </Router>
  );
};

export default App;
