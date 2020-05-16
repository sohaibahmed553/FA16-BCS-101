import React, { Component } from "react";
import { Typography, Avatar, Progress, Empty, Button } from "antd";
import "./RegisteredCourses.css";

const { Text } = Typography;

class RegisteredCourses extends Component {
	state = {};
	render() {
		return (
			<div>
				<div className="courseTitle">
					<Button type="primary" style={{ float: "right", marginTop: "15px" }}>
						My courses
					</Button>
					<Text> Courses</Text>
					<br />
					<Text disabled style={{ fontSize: "12px" }}>
						YOUR RECENT COURSES
					</Text>
				</div>
				<div className="course">
					<Avatar
						shape="square"
						size="large"
						className="courseAvatar"
						src="https://cdn3.icicletech.com/media/react-logo.png"
					/>
					<div className="courseDetails">
						<Text className="courseName">Reactjs with redux</Text>
						<br />
						<Progress percent={30} size="small" style={{ width: "30%" }} />
					</div>
				</div>
				<div className="noData">
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: "0px" }} />
				</div>
			</div>
		);
	}
}

export default RegisteredCourses;
