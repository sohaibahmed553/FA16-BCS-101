import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {
  LaptopOutlined,
  DashboardOutlined,
  CopyOutlined,
  BookOutlined,
  LogoutOutlined,
  LinkOutlined,
  GiftOutlined,
} from "@ant-design/icons";

import "../../css/admin/AdminDashboard.css";

import ManageStages from "./dashboard/ManageStages/ManageStages";
import ManageCourses from "./dashboard/ManageCourses/ManageCourses";
import AddQuestions from "./dashboard/ManageQuestions/AddQuestions";
import EditQuestions from "./dashboard/ManageQuestions/EditQuestions/EditQuestions";
import AddChallenges from "./dashboard/ManageChallenges/AddChallenges";
import EditChallenges from "./dashboard/ManageChallenges/EditChallenges/EditChallenges";
import ManageLinks from "./dashboard/ManageLinks/ManageLinks";
import Logout from "./dashboard/Logout";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Instructor = (props) => {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <span className="text-white">BrainBuster</span>
          <Menu
            className="float-right"
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1" className="text-white">
              {props.instructor.UserName}
              <Link to="/instructor/profile" />
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                {" "}
                <span>
                  <DashboardOutlined />
                  Dashboard
                </span>
                <Link to="/instructor/dashboard" />
              </Menu.Item>
              {/*----------------Manage Courses----------------- */}

              <Menu.Item key="2">
                <span>
                  <LaptopOutlined />
                  Manage Courses
                </span>{" "}
                <Link to="/instructor/managecourses" aria-current="page" />
              </Menu.Item>

              {/*----------------Manage Stages----------------- */}
              <Menu.Item key="3">
                <span>
                  <BookOutlined />
                  Manage Stages
                </span>{" "}
                <Link to="/instructor/managestages" aria-current="page" />
              </Menu.Item>
              {/*----------------Manage Links----------------- */}
              <Menu.Item key="4">
                <span>
                  <LinkOutlined />
                  Manage Links
                </span>{" "}
                <Link to="/instructor/managelinks" aria-current="page" />
              </Menu.Item>

              {/*----------------Manage Questions----------------- */}
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <CopyOutlined />
                    Manage Questions
                  </span>
                }
              >
                <Menu.Item key="5">
                  Add
                  <Link to="/instructor/addquestions" aria-current="page" />
                </Menu.Item>
                <Menu.Item key="6">
                  Edit
                  <Link to="/instructor/editquestions" aria-current="page" />
                </Menu.Item>
              </SubMenu>

              {/*----------------Manage Challenges----------------- */}
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <GiftOutlined />
                    Manage Challenges
                  </span>
                }
              >
                <Menu.Item key="7">
                  Add
                  <Link to="/instructor/addchallenges" aria-current="page" />
                </Menu.Item>
                <Menu.Item key="8">
                  Edit
                  <Link to="/instructor/editchallenges" aria-current="page" />
                </Menu.Item>
              </SubMenu>
              {/*----------------Logout----------------- */}
              <Menu.Item key="9">
                <span>
                  <LogoutOutlined />
                  Logout
                </span>
                <Link to="/instructor/logout" aria-current="page" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route
                  path="/instructor/managecourses"
                  component={() => (
                    <ManageCourses instructor={props.instructor} />
                  )}
                />
                <Route
                  path="/instructor/addquestions"
                  component={() => (
                    <AddQuestions instructor={props.instructor} />
                  )}
                />
                <Route
                  path="/instructor/editquestions"
                  component={() => (
                    <EditQuestions instructor={props.instructor} />
                  )}
                />
                <Route
                  path="/instructor/addchallenges"
                  component={() => (
                    <AddChallenges instructor={props.instructor} />
                  )}
                />
                <Route
                  path="/instructor/editchallenges"
                  component={() => (
                    <EditChallenges instructor={props.instructor} />
                  )}
                />
                <Route
                  path="/instructor/managestages"
                  component={() => (
                    <ManageStages instructor={props.instructor} />
                  )}
                />

                <Route
                  path="/instructor/managelinks"
                  component={() => (
                    <ManageLinks instructor={props.instructor} />
                  )}
                />

                <Route path="/instructor/logout" component={Logout} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Instructor;
