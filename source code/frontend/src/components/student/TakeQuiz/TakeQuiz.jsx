import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { Prompt } from "react-router";

import "./TakeQuiz.css";
import NextQuestions from "./NextQuestions";
import Stats from "./Stats";
import QuestionSection from "./QuestionSection";
import Timer from "react-compound-timer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import {
  Col,
  Row,
  Breadcrumb,
  List,
  Typography,
  Modal,
  Button,
  message,
} from "antd";
import { RiseOutlined } from "@ant-design/icons";

const { Text } = Typography;

// const deadline = Date.now() + 60 * 30;
//const deadline = Date.now() + 1000 * 60 * 30;

class TakeQuiz extends Component {
  constructor(props) {
    super(props);
    this.alertRef = React.createRef();
    this.explanationRef = React.createRef();
    this.countdownRef = React.createRef();
    this.state = {
      questions: "",
      i: 0,
      count: 0,
      selecedValue: "",
      isValid: false,
      total: 0,
      correct: 0,
      wrong: 0,
      left: 0,
      correctSequence: 1,
      score: 0,
      submitted: "",
      over: false,
      returnToStages: false,
      visible: false,
      passed: false,
      timeFinished: false,
      oops: false,
      renderer: false,
      index: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:4000/api/questions/${params.stid}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ questions: response.data });
        this.setState({ total: response.data.length });
        this.setState({ left: response.data.length });
      })
      .catch((err) => console.log(err));
    // this.countdownRef.current.start();
  }

  onRadioChange = (e) => {
    this.setState({ selecedValue: e.target.value });
  };

  onSubmitClick = (e) => {
    console.log(document.getElementById("radio1").checked);
    // this.countdownRef.current.start();
    if (
      document.getElementById("radio1").checked ||
      document.getElementById("radio2").checked ||
      document.getElementById("radio3").checked ||
      document.getElementById("radio4").checked
    ) {
      this.alertRef.current.style.display = "block";
      this.explanationRef.current.style.display = "block";
      this.countdownRef.current.pause();
      this.setState({ submitted: true });
      e.target.disabled = true;
      e.target.style = null;
      if (
        (this.state.i + 1 === 9 && this.state.score < 20) ||
        (this.state.i + 1 === 25 && this.state.score < 80)
      ) {
        this.setState({ visible: true });
      }
      if (this.state.score === 120) {
        this.setState({ index: this.state.i });
        this.setState({ passed: true });
        // if (this.state.index !== 0 && this.state.index === this.state.i) {
        // 	this.setState({ passed: true });
        // }
      }
      if (this.state.i + 1 === this.state.total || this.state.score === 200) {
        document.getElementById("nextBtn").innerHTML = "See Result";
      }
      if (
        this.state.selecedValue === this.state.questions[this.state.i].Answer
      ) {
        this.setState({ isValid: true });
        this.setState({ correct: this.state.correct + 1 });
        this.setState({ left: this.state.left - 1 });
        this.setState({ correctSequence: this.state.correctSequence + 1 });
        if (this.state.i < 9) {
          this.setState({ score: this.state.score + 4 });
        } else if (this.state.i >= 9 && this.state.i < 25) {
          this.setState({ score: this.state.score + 6 });
        } else {
          this.setState({ score: this.state.score + 8 });
        }

        // if (this.state.correctSequence === 1 || this.state.correctSequence === 2) {
        // 	this.setState({ score: this.state.score + 12 });
        // } else {
        // 	this.setState({ score: this.state.score + 10 });
        // }
      } else {
        this.setState({ wrong: this.state.wrong + 1 });
        this.setState({ left: this.state.left - 1 });
        this.setState({ correctSequence: 0 });
        if (this.state.i < 9) {
          if (this.state.score - 4 < 0) {
            this.setState({ score: 0 });
          } else {
            this.setState({ score: this.state.score - 4 });
          }
        }
        if (this.state.i >= 9 && this.state.i < 25) {
          if (this.state.score - 6 < 20) {
            this.setState({ score: 20 });
          } else {
            this.setState({ score: this.state.score - 6 });
          }
        }
        if (this.state.i >= 25 && this.state.i < 40) {
          if (this.state.score - 8 < 80) {
            this.setState({ score: 80 });
          } else {
            this.setState({ score: this.state.score - 6 });
          }
        }
      }
    }
  };

  onNextClick = () => {
    // let history = useHistory();
    if (this.state.i + 1 === this.state.total || this.state.score === 200) {
      this.setState({ over: true });
      // this.props.history.push("/student/finalresult");
    } else if (this.state.submitted) {
      this.setState({ i: this.state.i + 1 });
      if (this.state.score >= 20 && this.state.score < 80) {
        if (this.state.i < 9) {
          //moving to medium
          this.setState({ i: 9 });
          toast.success(
            <>
              <span>
                <RiseOutlined style={{ fontSize: "22px" }} />
              </span>
              <p>Congratulations! you are upgraded to the Medium level</p>
            </>
          );
        }
      }
      if (this.state.score >= 80) {
        if (this.state.i >= 9 && this.state.i < 25) {
          //moving to hard
          this.setState({ i: 25 });
          toast.success(
            <>
              <span>
                <RiseOutlined style={{ fontSize: "22px" }} />
              </span>
              <p>Congratulations! you are upgraded to the Hard level</p>
            </>
          );
        }
      }

      this.setState({ count: this.state.count + 1 });
      document.getElementById("submitbtn").disabled = false;
      document.getElementById("submitbtn").style.backgroundColor = "#66BB6A";
      document.getElementById("submitbtn").style.color = "white";
      this.setState({ submitted: false });
      this.setState({ isValid: "false" });
      this.alertRef.current.style.display = "none";
      this.explanationRef.current.style.display = "none";
      this.countdownRef.current.start();
    } else {
      message.info("please submit the answer first");
    }
  };

  quizOver = () => {
    const { params } = this.props.match;
    if (this.state.over) {
      return (
        <Redirect
          to={{
            pathname: "/student/finalresult",
            StID: params.stid,
            total: this.state.total,
            correct: this.state.correct,
            wrong: this.state.wrong,
            score: this.state.score,
          }}
        />
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* <Prompt when={true} message="You have unsaved changes, are you sure you want to leave?" /> */}
        <Row className="font">
          <Col span={19}>
            {this.quizOver()}
            {/* <p>{this.props.location.dummy}</p> */}
            <div
              style={{
                background: "#ECECEC",
                padding: "30px 70px 30px 70px",
                minHeight: "100vh",
              }}
            >
              <h1>{this.state.score}</h1>
              <Breadcrumb style={{ boxAlign: "left" }}>
                <Breadcrumb.Item>
                  <a href="facebook.com">HOME</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>QUIZ</Breadcrumb.Item>
              </Breadcrumb>
              <br />
              <Stats
                total={this.state.total}
                correct={this.state.correct}
                wrong={this.state.wrong}
                left={this.state.left}
              />
              <Row>
                {this.state.questions.length !== 0 &&
                  this.state.i < this.state.questions.length && (
                    <QuestionSection
                      questions={this.state.questions}
                      i={this.state.i}
                      count={this.state.count}
                      isValid={this.state.isValid}
                      selecedValue={this.state.selecedValue}
                      onRadioChange={this.onRadioChange}
                      onSubmitClick={this.onSubmitClick}
                      onNextClick={this.onNextClick}
                      alertRef={this.alertRef}
                      explanationRef={this.explanationRef}
                    />
                  )}
              </Row>
            </div>
          </Col>

          <Col span={5} style={{ backgroundColor: "White", padding: "0px" }}>
            <br />
            <br />
            <Text className="font" style={{ marginLeft: "20px" }}>
              TIME LEFT
            </Text>
            <div style={{ marginLeft: "20px", color: "red" }}>
              <Timer
                ref={this.countdownRef}
                initialTime={1000000}
                startImmediately={true}
                direction="backward"
                checkpoints={[
                  {
                    time: 0,
                    callback: () => {
                      this.setState({ timeFinished: true });
                      this.setState({ visible: true });
                    },
                  },
                ]}
              >
                <Timer.Hours />:
                <Timer.Minutes />:
                <Timer.Seconds />
              </Timer>
            </div>
            <br />
            <Text className="font" style={{ marginLeft: "20px" }}>
              Pending
            </Text>
            <br />
            <List>
              <NextQuestions
                questions={this.state.questions}
                i={this.state.i + 2}
                color={"color1 color2"}
                textColor={"white"}
              />
              <NextQuestions
                questions={this.state.questions}
                i={this.state.i + 3}
                color={"color1"}
              />
              <NextQuestions
                questions={this.state.questions}
                i={this.state.i + 4}
                color={"color1"}
              />
              <NextQuestions
                questions={this.state.questions}
                i={this.state.i + 5}
                color={"color1"}
              />
            </List>

            <Modal
              title={
                this.state.timeFinished
                  ? "Sorry! your time is finished"
                  : "Sorry! You cannot go to the next level"
              }
              visible={this.state.visible}
              closable={false}
              maskClosable={false}
              footer={
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ oops: true });
                  }}
                >
                  Return to stages
                </Button>
              }
            >
              <p>You can attemp it again!</p>
            </Modal>
            <Modal
              title="Congratulations! You have passed this stage."
              visible={this.state.passed}
              onOk={() => {
                this.setState({ passed: false });
              }}
              onCancel={() => {
                this.setState({ passed: false });
              }}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
            <ToastContainer
              position="bottom-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            {this.state.oops && <Redirect to="/student/stages" />}
          </Col>
          {/* {this.state.submitted && <Redirect to="/student/finalresult" />} */}
        </Row>
      </React.Fragment>
    );
  }
}

export default TakeQuiz;
