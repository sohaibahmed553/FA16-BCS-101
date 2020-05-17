import React from "react";
import axios from "axios";
import { Form, Modal, Input, Button, Row, Col, Select, message } from "antd";

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

const AddLink = (props) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);
  const [totalCourses, setTotalCourses] = React.useState([]);
  const [totalStages, setTotalStages] = React.useState([]);

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
    const { stage, link } = values;
    axios
      .post("http://localhost:4000/api/links/", {
        stage,
        link,
      })
      .then((res) => {
        console.log(res);
        props.loadData();
        message.success("Link has been added.");
        form.resetFields();
      })
      .catch((err) => {});
  };

  const loadCourses = React.useCallback(async () => {
    await axios
      .get("http://localhost:4000/api/courses/" + props.instructor.InstructorID)
      .then((res) => {
        setTotalCourses(res.data);
        //console.log(res.data);
      });
  }, [props.instructor]);

  React.useEffect(() => {
    // console.log("Sending Axios Get");
    loadCourses();
  }, [loadCourses]);

  //-----------when any course is selected stages will be selected accordingly----------------

  const onCourseChange = (value) => {
    axios.get("http://localhost:4000/api/stages/" + value).then((res) => {
      setTotalStages(res.data);
    });
  };

  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        className="w-100"
        onClick={showModal}
      >
        Add Link
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
          <h5 className="d-flex justify-content-center">Add Link</h5>
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
          {/*--------------------------Badge Name--------------------- */}
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                message: "Please input badge name!",
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

export default AddLink;
