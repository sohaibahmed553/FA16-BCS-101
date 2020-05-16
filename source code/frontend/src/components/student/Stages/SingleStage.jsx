import React, { Component } from "react";

import PopOver from "./PopOver";
import "./SingleStage.css";

class SingleStages extends Component {
	//States
	state = {
		popoverShow: false,
	};

	//Helper Method
	handleClick = () => {
		this.setState({ popoverShow: !this.state.popoverShow });
	};

	//Render Method
	render() {
		return (
			<div className={"stagebox stagebox" + this.props.Color}>
				{/* <Route exact path="/takequiz" component={TakeQuiz} /> */}
				{/* <Link to={{ pathname: `/takequiz/${stid}/${difficulty}`, dummy: "value", dummy2: "hhhhhhhhhhhh" }}> */}

				<div className="header" onClick={this.handleClick} style={{ cursor: "pointer" }}>
					<div
						className={"badge badge" + this.props.Color}
						style={{ borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }}
					>
						<h3 style={{ color: "white" }}>{this.props.StID}</h3>
					</div>
					<h5 className={"title" + this.props.Color} style={{ height: "45px" }}>
						{this.props.StTitle}
					</h5>
				</div>
				{/* </Link> */}
				{this.state.popoverShow && (
					<PopOver
						StID={this.props.StID}
						popoverShow={this.state.popoverShow}
						popoverShowToggler={(val) => this.setState({ popoverShow: val })}
					/>
				)}
				<p style={{ padding: "10px 30px 10px 30px", fontSize: "14px", textAlign: "justify" }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit itaque adipisci nisi architecto quod
					corporis beatae nemo expedita ducimus facere atque natus dolorem, sequi deserunt asperiores ullam
					quam alias temporibus.
				</p>
				{this.props.locked && (
					<div
						style={{
							position: "absolute",
							top: "0px",
							left: "0px",
							width: "330px",
							height: "250px",
							textAlign: "center",
							paddingTop: "40px",
						}}
					>
						<img
							src={require("./lock.png")}
							style={{ height: "170px", width: "170px", opacity: "0.9" }}
							alt="Not loaded"
						/>
					</div>
				)}
			</div>
		);
	}
}

export default SingleStages;
