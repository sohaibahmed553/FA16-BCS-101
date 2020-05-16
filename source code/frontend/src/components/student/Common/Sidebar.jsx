import React from "react";
import { Layout, Menu } from "antd";
import { DesktopOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: false,
		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	sidebarContent = () => {
		return (
			<Sider style={{ overflow: "auto", height: "100vh" }}>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
					<Menu.Item key="1">
						<Link to="/student">
							<DesktopOutlined />
							<span>Dashboard</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/student/stages">
							<DesktopOutlined />
							<span>Stages</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/student/leaderboard">
							<DesktopOutlined />
							<span>LeaderBoard</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="4">
						<Link to="/student/browsecourse">
							<DesktopOutlined />
							<span>Browse Course</span>
						</Link>
					</Menu.Item>
					<SubMenu
						key="sub1"
						title={
							<span>
								<DesktopOutlined />
								<span>User</span>
							</span>
						}
					>
						<Menu.Item key="5">Tom</Menu.Item>
						<Menu.Item key="6">Bill</Menu.Item>
						<Menu.Item key="7">Alex</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub2"
						title={
							<span>
								<DesktopOutlined />
								<span>Team</span>
							</span>
						}
					>
						<Menu.Item key="8">Team 1</Menu.Item>
						<Menu.Item key="9">Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key="10">
						<DesktopOutlined />
						<span>Logout</span>
					</Menu.Item>
					<Menu.Item key="11">
						<Link to="/student/dashboard">
							<DesktopOutlined />
							<span>Dashboard</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="12">
						<Link to="/student/stages">
							<DesktopOutlined />
							<span>Stages</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="13">
						<Link to="/student/leaderboard">
							<DesktopOutlined />
							<span>LeaderBoard</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="14">
						<Link to="/student/browsecourse">
							<DesktopOutlined />
							<span>Browse Course</span>
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	};

	render() {
		return (
			<React.Fragment>
				{this.props.dashboardRendered ? (
					this.sidebarContent()
				) : (
					<Sidebar
						sidebar={this.sidebarContent()}
						open={this.state.sidebarOpen}
						onSetOpen={this.onSetSidebarOpen}
						styles={{ sidebar: { background: "white" } }}
					>
						<MenuOutlined
							style={{ fontSize: "30px", color: "white", padding: "18px" }}
							onClick={() => this.onSetSidebarOpen(true)}
						/>
						{/* <button >Open sidebar</button> */}
					</Sidebar>
				)}
			</React.Fragment>
		);
	}
}

export default Sidebar1;
