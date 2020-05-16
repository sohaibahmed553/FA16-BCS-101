import React from "react";
import axios from "axios";
import { Form, Modal, Input, Button, message } from "antd";

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

const AddCourse = (props) => {
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
    console.log(props.instructor);
    const { coursename } = values;
    const status = 0;
    const instructorid = props.instructor.InstructorID;
    axios
      .post("http://localhost:4000/api/courses/", {
        coursename,
        status,
        instructorid,
      })
      .then((res) => {
        console.log(res);
        props.loadData();
        message.success("Course has been added.");
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
        Add Course
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
          <h5 className="d-flex justify-content-center">Add Course</h5>
          <br />
          {/*--------------------------Course Name--------------------- */}
          <Form.Item
            label="Course Name"
            name="coursename"
            rules={[
              {
                required: true,
                message: "Please input course name!",
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

export default AddCourse;
