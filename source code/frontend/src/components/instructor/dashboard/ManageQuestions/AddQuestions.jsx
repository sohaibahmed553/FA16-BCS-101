import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const leftOptionsLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const rightOptionsLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 18,
    span: 4,
  },
};

const AddQuestions = (props) => {
  const [form] = Form.useForm();

  const [totalCourses, setTotalCourses] = React.useState([]);
  const [totalStages, setTotalStages] = React.useState([]);

  const onFinish = (values) => {
    const {
      //course,
      stage,
      question,
      a,
      b,
      c,
      d,
      answer,
      difficulty,
      explanation,
    } = values;

    axios
      .post("http://localhost:4000/api/questions", {
        stage,
        question,
        a,
        b,
        c,
        d,
        answer,
        difficulty,
        explanation,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.error[0]);
      });
    form.resetFields();
    message.success("Your question has been added.");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const loadData = React.useCallback(async () => {
    axios
      .get("http://localhost:4000/api/courses/" + props.instructor.InstructorID)
      .then((res) => {
        setTotalCourses(res.data);
        console.log(res.data);
      });
  }, [props.instructor]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  //-----------when any course is selected stages will be selected accordingly----------------

  const onCourseChange = (value) => {
    axios.get("http://localhost:4000/api/stages/" + value).then((res) => {
      setTotalStages(res.data);
    });
  };

  return (
    <Form
      {...layout}
      form={form}
      className="mt-1"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h5 className="d-flex justify-content-center">Add a new Question</h5>
      <br />
      {/*--------------------------Select Course and Stage--------------------- */}
      <Row>
        <Col span={12}>
          <Form.Item
            {...leftOptionsLayout}
            label="Course"
            name="course"
            rules={[{ required: true, message: "Please select course!" }]}
          >
            {/*----------------------geting courses data and maping to select----------------- */}

            <Select
              placeholder="Select Course"
              onChange={(option) => onCourseChange(option)}
            >
              {totalCourses.map((totalCourses) => (
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
        <Col span={12}>
          <Form.Item
            {...rightOptionsLayout}
            label="Stage"
            name="stage"
            rules={[{ required: true, message: "Please select Stage!" }]}
          >
            <Select placeholder="Select Stage">
              {totalStages.map((totalStages) => (
                <Option key={totalStages.StID} value={totalStages.StID}>
                  {totalStages.StTitle}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {/*--------------------------Question--------------------- */}
      <Form.Item
        label="Question"
        name="question"
        rules={[
          {
            required: true,
            message: "Please input question!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/*--------------------------option A and B--------------------- */}

      <Row>
        <Col span={12}>
          <Form.Item
            {...leftOptionsLayout}
            label="A"
            name="a"
            rules={[
              {
                required: true,
                message: "Please input first option!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...rightOptionsLayout}
            label="B"
            name="b"
            rules={[
              {
                required: true,
                message: "Please input second option!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/*--------------------------option C and D--------------------- */}

      <Row>
        <Col span={12}>
          <Form.Item
            {...leftOptionsLayout}
            label="C"
            name="c"
            rules={[
              {
                required: true,
                message: "Please input third option!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...rightOptionsLayout}
            label="D"
            name="d"
            rules={[
              {
                required: true,
                message: "Please input fourth option!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/*--------------------------Answer and Difficulty--------------------- */}

      <Row>
        <Col span={12}>
          <Form.Item
            {...leftOptionsLayout}
            label="Answer"
            name="answer"
            rules={[
              {
                required: true,
                message: "Please select answer!",
              },
            ]}
          >
            <Select placeholder="Answer">
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...rightOptionsLayout}
            label="Difficulty"
            name="difficulty"
            rules={[
              {
                required: true,
                message: "Please select difficulty!",
              },
            ]}
          >
            <Select placeholder="Select difficulty">
              <Option value="1">Easy</Option>
              <Option value="2">Medium</Option>
              <Option value="3">Hard</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/*--------------------------Question--------------------- */}
      <Form.Item
        label="Explanation"
        name="explanation"
        rules={[
          {
            required: true,
            message: "Please input explanation of the question!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" className="w-100">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddQuestions;
