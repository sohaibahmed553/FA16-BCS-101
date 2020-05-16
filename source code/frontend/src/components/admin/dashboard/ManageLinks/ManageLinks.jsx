import React from "react";
import { Row, Col, Select, Form, Button } from "antd";

import axios from "axios";

import SingleLink from "./SingleLink";
import AddLink from "./AddLink";

const { Option } = Select;

const ManageLinks = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState([]);
  const [totalCourses, setTotalCourses] = React.useState([]);
  const [totalStages, setTotalStages] = React.useState([]);
  const [stageOnEdit, setStageOnEdit] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    await axios.get("http://localhost:4000/api/courses").then((res) => {
      setTotalCourses(res.data);
      setLoading(false);
      //console.log(res.data);
    });
  };

  const onCourseChange = (value) => {
    setLoading(true);
    axios.get("http://localhost:4000/api/stages/" + value).then((res) => {
      setTotalStages(res.data);
      setLoading(false);
    });
  };

  const onFinish = async (values) => {
    const { stage } = values;
    setStageOnEdit(stage);
    await axios.get("http://localhost:4000/api/links/" + stage).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const loadData = () => {
    axios.get("http://localhost:4000/api/links/" + stageOnEdit).then((res) => {
      setData(res.data);
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
                <Form.Item
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
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item
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
              <AddLink loadData={loadData} />
            </Col>
            <Col span={2}></Col>{" "}
          </Row>
        </Col>
      </Row>

      <table className="table table-striped table-sm table-bordered small">
        <thead>
          <tr>
            <th className="w-100">Link</th>
            <th>Action</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {data.map((data, index) => (
              <SingleLink data={data} key={index} loadData={loadData} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ManageLinks;
