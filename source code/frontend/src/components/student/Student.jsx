import React, { Component } from "react";
import { Layout, PageHeader } from "antd";
import { Switch, Route } from "react-router-dom";

import TakeQuiz from "./TakeQuiz/TakeQuiz";
import Stages from "./Stages/Stages";
import Dashboard from "./Dashboard/Dashboard";
import Tutorials from "./Tutorials/Tutorials";
import FinalResult from "./FinalResult/FinalResult";
import Leaderboard from "./Leaderboard/Leaderboard";
import BrowseCourse from "./BrowseCourse/BrowseCourse";
import Sidebar from "./Common/Sidebar";

import "antd/dist/antd.css";
import "../../css/admin/AdminDashboard.css";

const { Content } = Layout;

class Student extends Component {
  state = {
    dashboardRendered1: false,
  };
  render() {
    return (
      <div style={{}}>
        <PageHeader
          style={{
            backgroundColor: "#2196F3",
          }}
          title={
            <div style={{ marginLeft: "40px" }}>
              <p
                style={{ display: "inline", color: "white", fontSize: "30px" }}
              >
                brain
              </p>
              <b
                style={{ display: "inline", color: "white", fontSize: "30px" }}
              >
                Buster
              </b>
            </div>
          }
        />
        {/* {console.log(this.props.student)} */}
        <Layout>
          {window.location.pathname === "/student" ? (
            <Sidebar dashboardRendered={true} />
          ) : (
            <Sidebar dashboardRendered={false} />
          )}
          {console.log(window.location.pathname)}

          <Content>
            <Switch>
              <Route exact path="/student" component={Dashboard} />
              <Route path="/student/takequiz/:stid" component={TakeQuiz} />
              {/* <Route path="/takequiz/:stid" render={(props) => <TakeQuiz {...props} />} /> */}
              <Route path="/student/stages" component={Stages} />
              <Route path="/student/tutorials" component={Tutorials} />
              <Route
                path="/student/finalresult"
                render={(props) => (
                  <FinalResult {...props} student={this.props.student} />
                )}
              />
              <Route path="/student/leaderboard" component={Leaderboard} />
              <Route path="/student/browsecourse" component={BrowseCourse} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Student;
