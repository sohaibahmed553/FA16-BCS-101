import React, { Component } from "react";
import { Card, Col, Typography, Radio, Button, Alert, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Panel } = Collapse;

class QuestionSection extends Component {
	render() {
		return (
			<Col span={24}>
				<Card
					title={
						<Text
							style={{
								fontSize: "22px",
								fontFamily: "Oswald",
							}}
						>
							{"#" + (this.props.count + 1) + " " + this.props.questions[this.props.i].Questions}
						</Text>
					}
					bordered={false}
					style={{
						marginTop: "30px",
						textAlign: "left",
						fontSize: "15px",
						fontFamily: "Roboto",
					}}
				>
					{
						<Radio.Group
							onChange={(e) => this.props.onRadioChange(e)}
							value={this.props.selecedValue}
							id="radio"
						>
							<Radio id="radio1" value={"A"}>
								{this.props.questions[this.props.i].A}
							</Radio>
							<br />
							<br />
							<Radio id="radio2" value={"B"}>
								{this.props.questions[this.props.i].B}
							</Radio>
							<br />
							<br />
							<Radio id="radio3" value={"C"}>
								{this.props.questions[this.props.i].C}
							</Radio>
							<br />
							<br />
							<Radio id="radio4" value={"D"}>
								{this.props.questions[this.props.i].D}
							</Radio>
							<br />
							<br />
						</Radio.Group>
					}
					<br />

					<Button
						id="submitbtn"
						size="large"
						style={{
							backgroundColor: "#66BB6A",
							color: "white",
						}}
						onClick={(e) => this.props.onSubmitClick(e)}
					>
						Submit
					</Button>
					<Button
						id="nextBtn"
						size="large"
						style={{
							// float: "right",
							backgroundColor: "#66BB6A",
							color: "white",
						}}
						onClick={this.props.onNextClick}
					>
						Next
						<CaretRightOutlined />
					</Button>
					<br />
					<br />
					{this.props.isValid === true ? (
						<div ref={this.props.alertRef} style={{ display: "none" }}>
							<Alert type="success" message="Correct Answer" />
						</div>
					) : (
						<div ref={this.props.alertRef} style={{ display: "none" }}>
							<Alert type="error" message="Incorrect Answer" />
						</div>
					)}
					<br />
					<div ref={this.props.explanationRef} style={{ display: "none" }}>
						<Collapse accordion>
							<Panel header={"See Answer"}>
								<b>Correct answer is:</b> <br />
								<p>{this.props.questions[this.props.i].Answer}</p>
								<b>Explanation:</b>
								<br />
								<p>{this.props.questions[this.props.i].Explanation}</p>
							</Panel>
						</Collapse>
					</div>
				</Card>
			</Col>
		);
	}
}

export default QuestionSection;
