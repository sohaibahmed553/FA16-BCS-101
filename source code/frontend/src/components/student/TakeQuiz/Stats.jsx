import React, { Component } from "react";
import { Row, Col, Card, Typography } from "antd";

const { Text } = Typography;

class Stats extends Component {
	state = {};
	render() {
		return (
			<Row gutter={1}>
				<Col span={6}>
					<Card bordered={false} style={{ textAlign: "center" }}>
						<b style={{ fontSize: "20px" }}>{this.props.total}</b>
						<br />
						<Text disabled>TOTAL</Text>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ textAlign: "center" }}>
						<b
							style={{
								fontSize: "20px",
								color: "#67BB6B"
							}}
						>
							{this.props.correct}
						</b>
						<br />
						<Text disabled>CORRECT</Text>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ textAlign: "center" }}>
						<b
							style={{
								fontSize: "20px",
								color: "#F66C62"
							}}
						>
							{this.props.wrong}
						</b>
						<br />
						<Text disabled>WRONG</Text>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ textAlign: "center" }}>
						<b
							style={{
								fontSize: "20px",
								color: "#2196F3"
							}}
						>
							{this.props.left}
						</b>
						<br />
						<Text disabled>LEFT</Text>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default Stats;
