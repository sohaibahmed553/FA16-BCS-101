import React, { Component } from "react";
import { Avatar, Typography, Badge, Progress } from "antd";
import axios from "axios";
import "./LeaderboardSmall.css";

const { Text } = Typography;

class LeaderboardSmall extends Component {
	state = {
		data: "",
	};

	UNSAFE_componentWillMount = () => {
		axios
			.get("http://localhost:4000/api/scores/leaderboard")
			.then((response) => {
				this.setState({ data: response.data });
			})
			.catch((err) => console.log(err));
	};

	findUserIndex = () => {
		for (let i = 0; i < this.state.data.length; i++) {
			if (this.state.data[i].NickName === this.props.logedInStudent.NickName) {
				return i;
			}
		}
	};

	createList = () => {
		let list = [];

		const index = this.findUserIndex();

		for (let i = index; i < index + 3; i++) {
			list.push(
				<li key={this.state.data[i].StdID} className="listContainer2">
					<div className="rankDiv2">{this.state.data[i].StdID}</div>

					<div className="nameDiv2" style={{ width: "92%" }}>
						<Avatar size={"large"} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
						<Text style={{ fontSize: "25px", float: "right", paddingTop: "10px" }}>
							{this.state.data[i].score}
						</Text>
						<Text className="playerName2">{this.state.data[i].NickName}</Text>

						<Progress percent={this.state.data[i].score * 0.5} status="active" />
					</div>
					{/* <div className="scoreDiv">{data.score}</div> */}
				</li>
			);
		}
		return list;
	};

	render() {
		return (
			<div className="body">
				{this.state.data && (
					<div className="upperDiv">
						<div className="col_1">
							<div>
								<Badge count={2} style={{ backgroundColor: "#52c41a" }}>
									<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
								</Badge>
								<br />
								<Text style={{ color: "white" }}>{this.state.data[1].NickName}</Text>
							</div>
						</div>
						<div className="col_1">
							<div>
								<Badge count={1} style={{ backgroundColor: "#52c41a" }}>
									<Avatar
										size={70}
										src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									/>
								</Badge>
								<br />
								<Text style={{ color: "white" }}>{this.state.data[0].NickName}</Text>
							</div>
						</div>
						<div className="col_1">
							<div>
								<Badge count={3} style={{ backgroundColor: "#52c41a" }}>
									<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
								</Badge>
								<br />
								<Text style={{ color: "white" }}>{this.state.data[2].NickName}</Text>
							</div>
						</div>
					</div>
				)}

				<div className="bottomDiv">
					<ul style={{ padding: "0px 15px 5px 15px" }}>{this.state.data && this.createList()}</ul>
				</div>
			</div>
		);
	}
}

export default LeaderboardSmall;
