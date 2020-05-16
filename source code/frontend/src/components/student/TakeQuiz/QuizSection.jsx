// import React, { Component } from "react";

// import { Card, Col, Row, Typography, Radio, Button, Icon, Alert, Collapse } from "antd";

// const { Text } = Typography;
// const { Panel } = Collapse;

// class QuizSection extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			selectedValue: "",
// 			submitted: "",
// 			isValid: false
// 		};
// 	}

// 	onRadioChange = e => {
// 		this.setState({ selecedValue: e.target.value });
// 	};

// 	onSubmitClick = e => {
// 		console.log(document.getElementById("radio1").checked);
// 		console.log(document.getElementById("radio1").disabled);
// 		if (
// 			document.getElementById("radio1").checked ||
// 			document.getElementById("radio2").checked ||
// 			document.getElementById("radio3").checked ||
// 			document.getElementById("radio4").checked
// 		) {
// 			this.setState({ submitted: true });
// 			e.target.disabled = true;
// 			e.target.style = null;
// 			if (this.state.selecedValue === "A" && this.props.questions[this.props.i].Answer === "A") {
// 				this.setState({ isValid: true });
// 				this.setState({ correct: this.state.correct + 1 });
// 				this.setState({ left: this.state.left - 1 });
// 				console.log("Option A is isValid");
// 			} else if (this.state.selecedValue === "B" && this.props.questions[this.props.i].Answer === "B") {
// 				this.setState({ isValid: true });
// 				this.setState({ correct: this.state.correct + 1 });
// 				this.setState({ left: this.state.left - 1 });
// 				console.log("Option B is isValid");
// 			} else if (this.state.selecedValue === "C" && this.props.questions[this.props.i].Answer === "C") {
// 				this.setState({ isValid: true });
// 				this.setState({ correct: this.state.correct + 1 });
// 				this.setState({ left: this.state.left - 1 });
// 				console.log("Option C is isValid");
// 			} else if (this.state.selecedValue === "D" && this.props.questions[this.props.i].Answer === "D") {
// 				this.setState({ isValid: true });
// 				this.setState({ correct: this.state.correct + 1 });
// 				this.setState({ left: this.state.left - 1 });
// 				console.log("Option D is isValid");
// 			} else {
// 				this.setState({ wrong: this.state.wrong + 1 });
// 				this.setState({ left: this.state.left - 1 });
// 			}
// 		}
// 	};

// 	onNextClick = () => {
// 		if (this.state.submitted) {
// 			this.setState({ i: this.state.i + 1 });
// 			document.getElementById("submitbtn").disabled = false;
// 			document.getElementById("submitbtn").style.backgroundColor = "#66BB6A";
// 			document.getElementById("submitbtn").style.color = "white";
// 			this.setState({ submitted: false });
// 		}
// 	};

// 	render() {
// 		return (
// 			<Row>
// 				{this.props.questions.length !== 0 && (
// 					<Col span={24}>
// 						<Card
// 							title={
// 								<Text
// 									style={{
// 										fontSize: "22px",
// 										fontFamily: "Oswald"
// 									}}
// 								>
// 									{"#" + (this.props.i + 1) + " " + this.props.questions[this.props.i].Questions}
// 								</Text>
// 							}
// 							bordered={false}
// 							style={{
// 								marginTop: "30px",
// 								textAlign: "left",
// 								fontSize: "15px",
// 								fontFamily: "Roboto"
// 							}}
// 						>
// 							{
// 								<Radio.Group
// 									onChange={e => this.onRadioChange(e)}
// 									// value={this.state.selectedValue}
// 									id="radio"
// 								>
// 									<Radio id="radio1" value={"A"}>
// 										{this.props.questions[this.props.i].A}
// 									</Radio>
// 									<br />
// 									<br />
// 									<Radio id="radio2" value={"B"}>
// 										{this.props.questions[this.props.i].B}
// 									</Radio>
// 									<br />
// 									<br />
// 									<Radio id="radio3" value={"C"}>
// 										{this.props.questions[this.props.i].C}
// 									</Radio>
// 									<br />
// 									<br />
// 									<Radio id="radio4" value={"D"}>
// 										{this.props.questions[this.props.i].D}
// 									</Radio>
// 									<br />
// 									<br />
// 								</Radio.Group>
// 							}
// 							<br />
// 							<Button
// 								id="submitbtn"
// 								size="large"
// 								style={{
// 									backgroundColor: "#66BB6A",
// 									color: "white"
// 								}}
// 								onClick={e => this.onSubmitClick(e)}
// 							>
// 								Submit
// 							</Button>
// 							<Button
// 								size="large"
// 								style={{
// 									float: "right",
// 									backgroundColor: "#66BB6A",
// 									color: "white"
// 								}}
// 								onClick={this.onNextClick}
// 							>
// 								Next
// 								<Icon type="right" />
// 							</Button>
// 							<br />
// 							<br />
// 							{this.state.isValid === true ? (
// 								<Alert type="success" message="Correct Answer" />
// 							) : (
// 								<Alert type="error" message="Incorrect Answer" />
// 							)}
// 							<br />
// 							<Collapse accordion>
// 								<Panel header={"See Answer"}>
// 									<b>Correct answer is:</b> <br />
// 									<p>{this.props.questions[this.props.i].Answer}</p>
// 									<b>Explanation:</b>
// 									<br />
// 									<p>{this.props.questions[this.props.i].Explanation}</p>
// 								</Panel>
// 							</Collapse>
// 						</Card>
// 					</Col>
// 				)}
// 			</Row>
// 		);
// 	}
// }

// export default QuizSection;
