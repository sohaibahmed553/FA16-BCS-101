import React from "react";
import { Form, Input, Button, Select, Row, Col, message } from "antd";
import axios from "axios";

const { Option } = Select;

const Register = props => {
  const [error, setError] = React.useState(" ");

  const [form] = Form.useForm();
  const onFinish = values => {
    const { Gender, Email, UserName, NickName, Pass } = values;
    setError("");
    axios
      .post("http://localhost:4000/api/admins", {
        Gender,
        Email,
        UserName,
        NickName,
        Pass
      })
      .then(res => {
        //console.log(res);
        form.resetFields();
        message.success("Admin added successfully");
      })
      .catch(err => {
        setError(err.response.data.error[0]);
      });
    //console.log("Received values of form: ", values);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Form form={form} name="register" onFinish={onFinish}>
        <h5 className="d-flex justify-content-center">Add new admin</h5>
        <br />
        <Form.Item
          name="UserName"
          rules={[
            {
              required: true,
              message: "Please input User name!",
              whitespace: true
            }
          ]}
        >
          <Input placeholder="User Name" />
        </Form.Item>
        <Form.Item
          name="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input E-mail!"
            }
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>

        <Row>
          <Col span={11}>
            <Form.Item
              name="NickName"
              rules={[
                {
                  required: true,
                  message: "Please input nickname!",
                  whitespace: true
                }
              ]}
            >
              <Input placeholder="Nick Name" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item
              name="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="Select gender">
                <Option value="M">male</Option>
                <Option value="F">female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item
              name="Pass"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: "Please enter atleast 6 characters!"
                }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item
              name="confirm"
              dependencies={["Pass"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("Pass") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  }
                })
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </Col>
        </Row>
        <label>
          Use 6 or more characters with a mix of letters, numbers & symbols
        </label>
        <br />
        <label className="text-danger">{error.msg}</label>
        <Row>
          <Col span={11}></Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item>
              <Button className="w-100" type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
