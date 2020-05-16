import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Select, message, Modal } from "antd";
import axios from "axios";

const { Option } = Select;

//layouts for form
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 18,
    span: 4,
  },
};

const EditStage = (props) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);

  const [courses, setCourses] = React.useState([]);

  //load all courses of the instructor
  const loadCourses = React.useCallback(async () => {
    await axios
      .get(
        "http://localhost:4000/api/courses/managestages/" +
          props.instructor.InstructorID
      )
      .then((res) => {
        setCourses(res.data);
      });
  }, [props.instructor]);

  React.useEffect(() => {
    // console.log("Sending Axios Get");
    loadCourses();
  }, [loadCourses]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const onUpdate = (values) => {
    const { course, stage } = values;
    axios
      .put("http://localhost:4000/api/stages/" + props.data.StID, {
        course,
        stage,
      })
      .then((res) => {
        props.loadData();
        message.success("Stage has been updated.");
      })
      .catch((err) => {});
  };

  const onFinish = (values) => {
    onUpdate(values);
    setVisible(false);
  };

  return (
    <div>
      <Button type="link" onClick={showModal}>
        edit
      </Button>
      <Modal
        className="w-50"
        centered
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={onFinish}
          {...layout}
          form={form}
          className="mt-1"
          name="basic"
          initialValues={{
            stage: props.data.StTitle,
          }}
        >
          <h5 className="d-flex justify-content-center">Edit Stage</h5>
          <br />
          {/*--------------------------Select Course and Stage--------------------- */}
          <Row>
            <Col span={24}>
              <Form.Item
                label="Select Course"
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
            <Col span={24}>
              <Form.Item
                label="Stage Title"
                name="stage"
                rules={[
                  {
                    required: true,
                    message: "Please input Stage Title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="w-100">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditStage;
