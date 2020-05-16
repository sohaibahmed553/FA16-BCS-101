import React from "react";
import { Button, Modal, message } from "antd";
import axios from "axios";

import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const SingleCourse = (props) => {
  const toogleOnline = () => {
    confirm({
      title: "Warning...",
      icon: <ExclamationCircleOutlined />,
      content:
        "You can't revert this change and can't do any further changes in this course.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .put(
            "http://localhost:4000/api/courses/status/" + props.data.CourseID
          )
          .then((res) => {
            message.success("You course is now online.");
            props.loadData();
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const toogleOffline = () => {
    message.warning("You can't change the online course.");
  };

  const statusButton = (status) => {
    if (status)
      return (
        <Button type="primary" onClick={toogleOffline}>
          online
        </Button>
      );
    else
      return (
        <Button type="primary" danger onClick={toogleOnline}>
          offline
        </Button>
      );
  };

  return (
    <tr>
      <td className="align-middle ">{props.data.CourseName}</td>
      <td className="align-middle ">{statusButton(props.data.Status)}</td>
    </tr>
  );
};

export default SingleCourse;
