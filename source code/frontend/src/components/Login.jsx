import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

import "antd/dist/antd.css";
import "../css/Login.css";

const Login = (props) => {
  const [error, setError] = React.useState(" ");

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    const { UserName, Pass, person } = values;
    setError(" ");

    //console.log(UserName, Pass, person);

    //if person is a student i-e- student radio is selected
    if (person === "0") {
      axios
        .post("http://localhost:4000/api/auth", {
          UserName,
          Pass,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          props.history.push("/student");
        })
        .catch((err) => {
          setError(err.response.data.error[0]);
        });
    } else {
      if (person === "1") {
        //when admin is logged in
        axios
          .post("http://localhost:4000/api/adminauth", {
            UserName,
            Pass,
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("admintoken", res.data.token);

            props.history.push("/admin/dashboard");
          })
          .catch((err) => {
            setError(err.response.data.error[0]);
          });
      } else {
        //when instructor is logged in
        axios
          .post("http://localhost:4000/api/instructorauth", {
            UserName,
            Pass,
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("instructortoken", res.data.token);

            props.history.push("/instructor/dashboard");
          })
          .catch((err) => {
            setError(err.response.data.error[0]);
          });
      }
    }
  };

  return (
    <div className="outer d-flex align-items-center justify-content-center">
      <br />
      <Form
        name="normal_login"
        className="login-form shadow-lg p-4 bg-white border border-dark rounded"
        initialValues={{}}
        onFinish={onFinish}
      >
        <h5 className="d-flex justify-content-center">
          Sign In to BrainBuster
        </h5>
        <br />
        <Form.Item
          name="UserName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={
              <UserOutlined
                className="site-form-item-icon"
                style={{ color: "rgba(0,0,0,.25)" }}
              />
            }
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="Pass"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ color: "rgba(0,0,0,.25)" }}
              />
            }
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="person"
          rules={[
            {
              required: true,
              message: "Please select one!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="0">Student</Radio>
            <Radio value="1">Admin</Radio>
            <Radio value="2">Instructor</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br /> <br />
          Or <Link to="/register">register now!</Link>
          <label className="text-danger d-block">{error.msg}</label>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
