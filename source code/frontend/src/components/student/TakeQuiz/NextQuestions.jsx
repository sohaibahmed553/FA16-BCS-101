import React, { Component } from "react";
import { Row, Col, Typography, Avatar } from "antd";

const { Text } = Typography;

class NextQuestions extends Component {
	render() {
		return (
			<>
				{this.props.i <= this.props.questions.length - 1 && (
					<div className={this.props.color}>
						<Row>
							<Col span={4}>
								<Avatar
									size={40}
									style={{
										backgroundColor: "white",
										color: "#59598E",
										border: "2px solid #ECECEC",
									}}
								>
									<Text>#{this.props.i}</Text>
								</Avatar>
							</Col>
							<Col span={20}>
								{this.props.questions.length !== 0 && (
									<div
										style={{
											wordWrap: "break-word",
											height: "45px",
											overflow: "hidden",
											padding: "0px 10px 0px 10px",
										}}
									>
										<Text style={{ color: this.props.textColor }}>
											{this.props.questions[this.props.i].Questions}
										</Text>
									</div>
								)}
							</Col>
						</Row>
					</div>
				)}
			</>
		);
	}
}

export default NextQuestions;
