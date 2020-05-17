import React, { Component } from "react";
import { Layout, Modal } from "antd";
import "./Dashboard.css";
import RegisteredCourses from "./RegisteredCourses";
import ActiveHours from "./ActiveHours";
import LeaderboardSmall from "./LeaderboardSmall";
import Leaderboard from "../Leaderboard/Leaderboard";
import EarnedBadges from "./EarnedBadges";

const { Content } = Layout;

class Dashboard extends Component {
	state = { visible: false };

	showModal = () => {
		this.setState({
			visible: true,
		});
	};
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<Content className="contentDiv">
				<div className="column_1">
					<div className="activeHoursDiv">
						<ActiveHours />
					</div>
					<div className="coursesDiv">
						<RegisteredCourses />
					</div>
				</div>

				<div className="column_2">
					<div className="leaderboardDiv" onClick={this.showModal}>
						<div style={{ cursor: "pointer" }}>
							<LeaderboardSmall logedInStudent={this.props.logedInStudent} />
						</div>

						<Modal
							visible={this.state.visible}
							closable={false}
							footer={null}
							centered={true}
							onCancel={this.handleCancel}
							width={"900px"}
							bodyStyle={{ height: "600px", padding: "0" }}
						>
							<Leaderboard />
						</Modal>
					</div>
					<div className="rewardsDiv">
						<EarnedBadges />
					</div>
				</div>
			</Content>
		);
	}
}

export default Dashboard;
