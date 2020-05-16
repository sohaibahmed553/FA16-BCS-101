import React, { Component } from "react";
import { Result } from "antd";
import axios from "axios";
// import FlipMove from "react-flip-move";
import "./FinalResult.css";

class FinalResult extends Component {
	state = {
		data: "",
	};

	UNSAFE_componentWillMount = () => {
		axios
			.post("http://localhost:4000/api/scores/score", null, {
				params: {
					StdID: this.props.student.StdID,
					StID: this.props.location.StID,
					Score: this.props.location.score,
				},
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				if (err) throw err;
			});
	};

	render() {
		return (
			<div>
				<Result
					status="success"
					title="Successfully Completed Stage!"
					subTitle="Your next stage is unlocked now"
					extra={[
						<div key="1">
							<h4>Total: </h4>
							<p>{this.props.location.total}</p>
							<h4>Correct: </h4>
							<p>{this.props.location.correct}</p>
							<h4>Wrong: </h4>
							<p>{this.props.location.wrong}</p>
							<h1>Score: </h1>
							<p>{this.props.location.score}</p>
						</div>,
					]}
				/>
				{console.log(this.props.student)}
			</div>
		);
	}
}

export default FinalResult;
