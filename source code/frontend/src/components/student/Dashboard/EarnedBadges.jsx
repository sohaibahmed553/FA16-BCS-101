import React, { Component } from "react";
import { Typography } from "antd";
import "./EarnedBadges.css";

const { Text } = Typography;

class EarnedBadges extends Component {
	state = {};
	render() {
		return (
			<div>
				<Text className="rewards">Rewards</Text>
				<br />
				<img className="badges" src={require("../badges/badge1.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge2.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge3.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge4.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge5.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge6.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge7.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge8.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge9.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge10.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge11.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge12.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge13.png")} alt="not loaded" />
				<img className="badges" src={require("../badges/badge14.png")} alt="not loaded" />
			</div>
		);
	}
}

export default EarnedBadges;
