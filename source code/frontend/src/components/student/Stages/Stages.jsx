import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import "./Stages.css";
import SingleStage from "./SingleStage";

class Stages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stages: "",
			count: 1,
			locked: false,
		};
	}

	UNSAFE_componentWillMount() {
		axios
			.get("http://localhost:4000/api/stages")
			.then((response) => {
				this.setState({ stages: response.data });
				console.log(this.state.stages[0].StTitle);
			})
			.catch((err) => console.log(err));
	}

	colorSelector = (count) => {
		if (count % 7 === 0) {
			return "Color0";
		} else if (count % 7 === 1) {
			return "Color1";
		} else if (count % 7 === 2) {
			return "Color2";
		} else if (count % 7 === 3) {
			return "Color3";
		} else if (count % 7 === 4) {
			return "Color4";
		} else if (count % 7 === 5) {
			return "Color5";
		} else if (count % 7 === 6) {
			return "Color6";
		} else if (count % 7 === 7) {
			return "Color7";
		}
	};

	render() {
		return (
			<div className="parent">
				{this.state.stages.length !== 0 && (
					<Row className="listContainer">
						{this.state.stages.map((stage, key) => (
							<Col xl={8} md={12} sm={24} xs={24} key={key} className="lkeystItem">
								<SingleStage
									StID={key + 1}
									StTitle={stage.StTitle}
									Color={this.colorSelector(key + 1)}
									locked={this.state.locked}
								/>
							</Col>
						))}
					</Row>
				)}
			</div>
		);
	}
}

export default Stages;
