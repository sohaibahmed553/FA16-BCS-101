import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Form, Input, Button, Select, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Option } = Select;

const Profile = props => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    try {
      const jwt = localStorage.getItem("admintoken");
      const admin = jwtDecode(jwt);

      axios
        .get("http://localhost:4000/api/admins/" + admin.admin.AdminID)
        .then(res => {
          setData(res.data);
        });
    } catch (err) {}
  };

  const onUpdate = (values, id) => {
    const { Gender, Email, NickName, Pass } = values;

    axios
      .put("http://localhost:4000/api/adminauth/" + id, {
        Gender,
        Email,
        NickName,
        Pass
      })
      .then(res => {
        console.log(res);
        loadAdminData();
        form.setFieldsValue({
          Pass: "",
          confirm: ""
        });
        message.success("Your profile has been updated successfully");
      });
  };

  const onFinish = values => {
    console.log("Received values of form: ", values);

    onUpdate(values, data[0].AdminID);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();

  return (
    <div className="d-flex justify-content-center">
      {data.length && (
        <Form
          form={form}
          name="profile"
          className="login-form p-4 bg-white mt-0"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            NickName: data[0].NickName,
            Email: data[0].Email,
            Gender: data[0].Gender
          }}
        >
          <h5 className="d-flex justify-content-center">Profile</h5>
          <br />
          {/*--------------------NickName-------------- */}
          <label className="d-inline ">NickName:</label>

          <Form.Item
            name="NickName"
            rules={[
              {
                required: true,
                message: "Please input your Nickname!"
              }
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
            />
          </Form.Item>
          {/*--------------------Email-------------- */}
          <label className="d-inline ">Email:</label>

          <Form.Item
            name="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your Email!"
              }
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
            />
          </Form.Item>
          {/*--------------------Gender-------------- */}
          <label className="d-inline">Gender:</label>

          <Form.Item
            name="Gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select>
              <Option value="M">male</Option>
              <Option value="F">female</Option>
            </Select>
          </Form.Item>
          {/*--------------------Pass-------------- */}
          <label className="d-inline">Password:</label>

          <Form.Item
            name="Pass"
            rules={[
              {
                required: true,
                min: 6,
                message: "Please enter atleast 6 characters!"
              }
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
            />
          </Form.Item>
          {/*--------------------Confirm Pass-------------- */}
          <label className="d-inline ">Confirm Password:</label>
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
            <Input.Password
              prefix={
                <LockOutlined
                  className="site-form-item-icon"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Update
            </Button>
            <br /> <br />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default Profile;
