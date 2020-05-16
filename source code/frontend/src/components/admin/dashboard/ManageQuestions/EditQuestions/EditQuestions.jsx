import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Select, Form, Button } from "antd";

import EditSingleQuestion from "./EditSingleQuestion";
import Pagination from "./Pagination";

const { Option } = Select;

const EditQuestions = props => {
  const [form] = Form.useForm();

  const [data, setData] = React.useState([]);
  const [totalCourses, setTotalCourses] = React.useState([]);
  const [totalStages, setTotalStages] = React.useState([]);
  const [stageOnEdit, setStageOnEdit] = React.useState();
  const [difficultyOnEdit, setDifficultyOnEdit] = React.useState();
  const [loading, setLoading] = React.useState(true);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    // console.log("Sending Axios Get");
    loadCourses();
  }, []);

  const loadCourses = async () => {
    await axios.get("http://localhost:4000/api/courses").then(res => {
      setTotalCourses(res.data);
      //console.log(res.data);
    });
  };

  const onCourseChange = value => {
    axios.get("http://localhost:4000/api/stages/" + value).then(res => {
      setTotalStages(res.data);
    });
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async values => {
    const { stage, difficulty } = values;
    setStageOnEdit(stage);
    setDifficultyOnEdit(difficulty);
    await axios
      .get(
        "http://localhost:4000/api/questions/show/" + stage + "/" + difficulty
      )
      .then(res => {
        setData(res.data);
        setLoading(false);
        setCurrentPage(1);
      });
  };

  const onEditQuestions = () => {
    axios
      .get(
        "http://localhost:4000/api/questions/show/" +
          stageOnEdit +
          "/" +
          difficultyOnEdit
      )
      .then(res => {
        setData(res.data);
      });
  };

  //get current data/posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Form
        form={form}
        className="mt-1"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              name="course"
              rules={[{ required: true, message: "Please select course!" }]}
            >
              {/*----------------------geting courses data and maping to select----------------- */}

              <Select
                placeholder="Select Course"
                onChange={option => onCourseChange(option)}
              >
                {totalCourses.map(totalCourses => (
                  <Option
                    key={totalCourses.CourseID}
                    value={totalCourses.CourseID}
                  >
                    {totalCourses.CourseName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={1}></Col>

          <Col span={5}>
            <Form.Item
              name="stage"
              rules={[{ required: true, message: "Please select Stage!" }]}
            >
              <Select placeholder="Select Stage">
                {totalStages.map(totalStages => (
                  <Option key={totalStages.StID} value={totalStages.StID}>
                    {totalStages.StTitle}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={1}></Col>

          <Col span={5}>
            <Form.Item
              name="difficulty"
              rules={[
                {
                  required: true,
                  message: "Please select difficulty!"
                }
              ]}
            >
              <Select placeholder="Select Difficulty">
                <Option value="1">Easy</Option>
                <Option value="2">Medium</Option>
                <Option value="3">Hard</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={1}></Col>

          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100">
                Show
              </Button>
            </Form.Item>
          </Col>
          <Col span={1}></Col>
        </Row>
      </Form>
      <table className="table table-striped table-sm table-bordered small">
        <thead>
          <tr>
            <th>Question</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>Answer</th>
            <th>Explanation</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentPosts.map((data, index) => (
            <EditSingleQuestion
              data={data}
              key={index}
              onEditQuestions={onEditQuestions}
            />
          ))}
        </tbody>
      </table>
      {!loading && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default EditQuestions;
