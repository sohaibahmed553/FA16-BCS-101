import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./PopOver.css";
import OutsideClickHandler from "react-outside-click-handler";

class PopOver extends Component {
	state = {};

	render() {
		return (
			<OutsideClickHandler
				onOutsideClick={() => {
					this.props.popoverShowToggler(!this.props.popoverShow);
				}}
			>
				<div className="parentContainer">
					<Link to="/student/tutorials">
						<Button
							style={{ marginBottom: "10px", color: "white", borderColor: "white" }}
							type="Default"
							shape="round"
							size="large"
							block
							ghost
						>
							Tutorials
						</Button>
					</Link>
					<br />
					<Link to={`/student/takequiz/${this.props.StID}`}>
						<Button shape="round" size="large" block>
							Start
						</Button>
					</Link>
				</div>
			</OutsideClickHandler>
		);
	}
}

export default PopOver;
