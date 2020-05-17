import React, { Component } from "react";
import { Avatar, Typography, Badge, Progress } from "antd";
import axios from "axios";
import "./LeaderboardSmall.css";

const { Text } = Typography;

class LeaderboardSmall extends Component {
  state = {
    data: "",
  };

  UNSAFE_componentWillMount = () => {
    axios
      .get("http://localhost:4000/api/leaderboard/getplayers")
      .then((response) => {
        this.setState({ data: response.data });
        console.log(this.state.data[0].id);
      })
      .catch((err) => console.log(err));
  };

  createList = () => {
    let list = [];

    for (let i = 0; i < 3; i++) {
      list.push(
        <li key={this.state.data[i].id} className="listContainer2">
          <div className="rankDiv2">{this.state.data[i].id}</div>

          <div className="nameDiv2" style={{ width: "92%" }}>
            <Avatar
              size={"large"}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <Text
              style={{ fontSize: "25px", float: "right", paddingTop: "10px" }}
            >
              733
            </Text>
            <Text className="playerName2">{this.state.data[i].Name}</Text>

            <Progress percent={80} status="active" />
          </div>
          {/* <div className="scoreDiv">{data.score}</div> */}
        </li>
      );
    }
    return list;
  };

  render() {
    return (
      <div className="body">
        <div className="upperDiv">
          <div className="col_1">
            <div>
              <Badge count={2} style={{ backgroundColor: "#52c41a" }}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </Badge>
              <br />
              <Text>ali_ahmad</Text>
            </div>
          </div>
          <div className="col_1">
            <div>
              <Badge count={1} style={{ backgroundColor: "#52c41a" }}>
                <Avatar
                  size={70}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </Badge>
              <br />
              <Text>sohaib_ahmad</Text>
            </div>
          </div>
          <div className="col_1">
            <div>
              <Badge count={3} style={{ backgroundColor: "#52c41a" }}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </Badge>
              <br />
              <Text>rizwan_rajpoot</Text>
            </div>
          </div>
        </div>

        <div className="bottomDiv">
          <ul style={{ padding: "0px 15px 5px 15px" }}>
            {this.state.data && this.createList()}
          </ul>
        </div>
      </div>
    );
  }
}

export default LeaderboardSmall;
