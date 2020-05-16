import React from "react";
import axios from "axios";
import { Form, Modal, Input, Button, message, Select } from "antd";

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

const { Option } = Select;

const AddStage = (props) => {
  const [courses, setCourses] = React.useState([]);

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
    loadCourses();
  }, [loadCourses]);

  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const onFinish = (values) => {
    onAdd(values);
    setVisible(false);
  };

  const onAdd = (values) => {
    const { course, stage } = values;
    axios
      .post("http://localhost:4000/api/stages/", {
        course,
        stage,
      })
      .then((res) => {
        console.log(res);
        props.loadData();
        message.success("Stage has been added.");
        form.resetFields();
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        className="w-100"
        onClick={showModal}
      >
        Add Stage
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
          className="mt-3"
          name="basic"
        >
          {" "}
          <h5 className="d-flex justify-content-center">Add Stage</h5>
          <br />
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
          {/*--------------------------Stage Title--------------------- */}
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="w-100">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddStage;
