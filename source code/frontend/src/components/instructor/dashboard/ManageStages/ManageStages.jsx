import React from "react";
import { Row, Col, Select, Form, Button } from "antd";

import axios from "axios";

import AddStage from "./AddStage";
import SingleStage from "./SingleStage";

const { Option } = Select;

const ManageStages = (props) => {
  const [form] = Form.useForm();
  const [courses, setCourses] = React.useState([]);
  const [stages, setStages] = React.useState([]);
  const [courseOnEdit, setCourseOnEdit] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const loadCourses = React.useCallback(async () => {
    await axios
      .get(
        "http://localhost:4000/api/courses/managestages/" +
          props.instructor.InstructorID
      )
      .then((res) => {
        setCourses(res.data);
        //setLoading(false);
      });
  }, [props.instructor]);

  const loadStages = async (courseid) => {
    //setLoading(true);
    await axios
      .get("http://localhost:4000/api/stages/" + courseid)
      .then((res) => {
        setStages(res.data);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const onFinish = async (values) => {
    const { course } = values;
    setCourseOnEdit(course);
    loadStages(course);
  };

  const loadData = () => {
    axios
      .get("http://localhost:4000/api/stages/" + courseOnEdit)
      .then((res) => {
        setStages(res.data);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row>
        <Col span={20}>
          <Form
            form={form}
            className="mt-1"
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {" "}
            <Row>
              <Col span={1}></Col>
              <Col span={7}>
                {/*----------------------geting courses data and maping to select----------------- */}

                <Form.Item
                  name="course"
                  rules={[{ required: true, message: "Please select course!" }]}
                >
                  <Select placeholder="Select Course">
                    {courses.map((courses) => (
                      <Option key={courses.CourseID} value={courses.CourseID}>
                        {courses.CourseName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={7}></Col>
              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-100">
                    Show
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={4}>
          <Row>
            <Col span={2}></Col>{" "}
            <Col span={20}>
              <AddStage loadData={loadData} instructor={props.instructor} />
            </Col>
            <Col span={2}></Col>{" "}
          </Row>
        </Col>
      </Row>

      <table className="table table-striped table-sm table-bordered small">
        <thead>
          <tr>
            <th className="w-100">Stage Title</th>
            <th>Action</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {stages.map((stage, index) => (
              <SingleStage
                stage={stage}
                key={index}
                loadData={loadData}
                instructor={props.instructor}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ManageStages;
