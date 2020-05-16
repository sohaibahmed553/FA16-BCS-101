import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Select, message, Modal } from "antd";
import axios from "axios";

const { Option } = Select;

//layouts for form
const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
};

const leftOptionsLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};

const rightOptionsLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 18,
    span: 4
  }
};

const EditLink = props => {
  const [form] = Form.useForm();

  const [totalCourses, setTotalCourses] = React.useState([]);
  const [totalStages, setTotalStages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // console.log("Sending Axios Get");
    loadCourses();
  }, []);
  //load all courses
  const loadCourses = () => {
    axios.get("http://localhost:4000/api/courses").then(res => {
      setTotalCourses(res.data);
      //console.log(res.data);
    });
  };
  //-----------when any course is selected stages will be selected accordingly----------------

  const onCourseChange = value => {
    axios.get("http://localhost:4000/api/stages/" + value).then(res => {
      setTotalStages(res.data);
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const onFinish = values => {
    const { stage, link } = values;
    console.log(props.data);

    axios
      .put("http://localhost:4000/api/links/" + props.data.LinkID, {
        stage,
        link
      })
      .then(res => {
        //console.log(res);
        props.loadData();
        message.success("Link has been updated.");
      })
      .catch(err => {});

    //console.log(props.data.QID);

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
            link: props.data.Link
          }}
        >
          <h5 className="d-flex justify-content-center">Edit Link</h5>
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
            <Col span={12}>
              <Form.Item
                {...rightOptionsLayout}
                label="Stage"
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
          </Row>
          {/*--------------------------Question--------------------- */}
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                message: "Please input link!"
              }
            ]}
          >
            <Input />
          </Form.Item>

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

export default EditLink;
