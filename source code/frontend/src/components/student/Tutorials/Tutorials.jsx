import React, { Component } from "react";
import ReactPlayer from "react-player";

class Tutorials extends Component {
	state = {};
	render() {
		return (
			<div style={{ paddingTop: "70px" }}>
				<ReactPlayer url="youtube.com/watch?v=hdI2bqOjy3c" style={{ margin: "auto" }} />
			</div>
		);
	}
}

export default Tutorials;
