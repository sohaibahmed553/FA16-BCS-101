import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {
  LaptopOutlined,
  DashboardOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LinkOutlined,
  GiftOutlined,
} from "@ant-design/icons";

import Profile from "./Profile";
import Dashboard from "./dashboard/Dashboard/Dashboard";
import AddQuestions from "./dashboard/ManageQuestions/AddQuestions";
import EditQuestions from "./dashboard/ManageQuestions/EditQuestions/EditQuestions";
import AddChallenges from "./dashboard/ManageChallenges/AddChallenges";
import EditChallenges from "./dashboard/ManageChallenges/EditChallenges/EditChallenges";
import ManageLinks from "./dashboard/ManageLinks/ManageLinks";
import AddAdmin from "./dashboard/AddAdmin";
import Logout from "./dashboard/Logout";

import "antd/dist/antd.css";
import "../../css/admin/AdminDashboard.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Admin = (props) => {
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
              {props.admin.UserName}
              <Link to="/admin/profile" />
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
                <Link to="/admin/dashboard" />
              </Menu.Item>

              {/*----------------Manage Questions----------------- */}
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <LaptopOutlined />
                    Manage Questions
                  </span>
                }
              >
                <Menu.Item key="2">
                  Add
                  <Link to="/admin/addquestions" aria-current="page" />
                </Menu.Item>
                <Menu.Item key="3">
                  Edit
                  <Link to="/admin/editquestions" aria-current="page" />
                </Menu.Item>
              </SubMenu>

              {/*----------------Manage Challenges----------------- */}
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <GiftOutlined />
                    Manage Challenges
                  </span>
                }
              >
                <Menu.Item key="4">
                  Add
                  <Link to="/admin/addchallenges" aria-current="page" />
                </Menu.Item>
                <Menu.Item key="5">
                  Edit
                  <Link to="/admin/editchallenges" aria-current="page" />
                </Menu.Item>
              </SubMenu>

              {/*----------------Manage Links----------------- */}
              <Menu.Item key="6">
                <span>
                  <LinkOutlined />
                  Manage Links
                </span>
                <Link to="/admin/managelinks" aria-current="page" />
              </Menu.Item>

              {/*----------------Add Admin----------------- */}

              <Menu.Item key="7">
                <span>
                  <UserAddOutlined />
                  Add Admin
                </span>
                <Link to="/admin/addadmin" aria-current="page" />
              </Menu.Item>

              {/*----------------Logout----------------- */}
              <Menu.Item key="8">
                <span>
                  <LogoutOutlined />
                  Logout
                </span>
                <Link to="/admin/logout" aria-current="page" />
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
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/addquestions" component={AddQuestions} />
                <Route path="/admin/editquestions" component={EditQuestions} />
                <Route path="/admin/manageLinks" component={ManageLinks} />
                <Route path="/admin/addadmin" component={AddAdmin} />
                <Route path="/admin/logout" component={Logout} />
                <Route path="/admin/addchallenges" component={AddChallenges} />
                <Route
                  path="/admin/editchallenges"
                  component={EditChallenges}
                />

                <Route path="/admin/profile">
                  <Profile admin={props.admin} />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Admin;
