import React, { Component } from "react";
import { Row, Col, Card, Avatar } from "antd";

const { Meta } = Card;

class BrowseCourse extends Component {
	state = {};
	render() {
		return (
			<div style={{ backgroundColor: "#F5F6F7" }}>
				<Row>
					<Col
						md={12}
						style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}
					>
						<Card
							hoverable
							style={{ width: 440 }}
							cover={
								<Avatar
									shape="square"
									size="large"
									src="https://cdn3.icicletech.com/media/react-logo.png"
									style={{ height: "250px" }}
								/>
							}
						>
							<Meta title="Europe Street beat" description="www.instagram.com" />
						</Card>
					</Col>
					<Col
						md={12}
						style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}
					>
						<Card
							hoverable
							style={{ width: 440 }}
							cover={
								<Avatar
									shape="square"
									size="large"
									src="https://cdn3.icicletech.com/media/react-logo.png"
									style={{ height: "250px" }}
								/>
							}
						>
							<Meta title="Europe Street beat" description="www.instagram.com" />
						</Card>
					</Col>
				</Row>
				<Row>
					<Col
						md={12}
						style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}
					>
						<Card
							hoverable
							style={{ width: 440 }}
							cover={
								<Avatar
									shape="square"
									size="large"
									src="https://cdn3.icicletech.com/media/react-logo.png"
									style={{ height: "250px" }}
								/>
							}
						>
							<Meta title="Europe Street beat" description="www.instagram.com" />
						</Card>
					</Col>
					<Col
						md={12}
						style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}
					>
						<Card
							hoverable
							style={{ width: 440 }}
							cover={
								<Avatar
									shape="square"
									size="large"
									src="https://cdn3.icicletech.com/media/react-logo.png"
									style={{ height: "250px" }}
								/>
							}
						>
							<Meta title="Europe Street beat" description="www.instagram.com" />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default BrowseCourse;
