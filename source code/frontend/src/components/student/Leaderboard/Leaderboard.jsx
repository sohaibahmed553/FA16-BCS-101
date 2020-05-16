import React, { Component } from "react";
import { Row, Col, Avatar, Typography } from "antd";
import axios from "axios";
import "./Leaderboard.css";
import PlayersList from "./PlayersList";
import ProgressBar from "react-customizable-progressbar";

const { Text } = Typography;

class FinalResult extends Component {
	state = {
		data: "",
	};

	UNSAFE_componentWillMount = () => {
		axios
			.get("http://localhost:4000/api/scores/leaderboard")
			.then((response) => {
				this.setState({ data: response.data });
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	_handle = () => {
		this.setState({ data: this.state.data.sort((a, b) => (a.score < b.score ? 1 : -1)) });
	};

	render() {
		const themeColor = "#2196F3";
		const progress = 60;
		return (
			<div className="body">
				<Row>
					<Col sm={24} md={10} className="sider">
						<Avatar size={64} className="avatar">
							User
						</Avatar>
						<br />
						<Text className="name">ali ahmad</Text>
						<br />
						<br />
						<br />
						<Row className="statsRow">
							<Col span={12} className="statsDiv">
								<Text className="statsHeading">Rank</Text>
								<br />
								<Text className="statsVal">1st</Text>
							</Col>
							<Col span={12}>
								<Text className="statsHeading">Score</Text>
								<br />
								<Text className="statsVal">536</Text>
							</Col>
						</Row>

						<div className="progressBarDiv">
							<ProgressBar
								radius={80}
								progress={progress}
								strokeWidth={8}
								strokeColor={themeColor}
								trackStrokeWidth={8}
								pointerRadius={8}
								pointerStrokeWidth={5}
								pointerStrokeColor={themeColor}
							>
								<div className="indicator">
									<div>{progress}%</div>
								</div>
							</ProgressBar>
						</div>
					</Col>
					<Col sm={24} md={14} className="content">
						<div className="innerdiv">
							{this.state.data && <PlayersList data={this.state.data} _handle={this._handle} />}
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default FinalResult;
