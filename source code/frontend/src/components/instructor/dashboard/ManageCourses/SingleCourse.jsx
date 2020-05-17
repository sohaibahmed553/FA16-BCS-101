import React from "react";
import { Button, Modal, message } from "antd";
import axios from "axios";

import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const SingleCourse = (props) => {
  /*
  const checkAllowed = async () => {
    let allowed = 1;
    await axios
      .get("http://localhost:4000/api/courses/eachstage/" + props.data.CourseID)
      .then(async (res) => {
        for (let i = 0; i < res.data.length; i++) {
          await axios
            .get("http://localhost:4000/api/courses/allow/" + res.data[i].StID)
            .then(async (response) => {
              if (response.data === 0) {
                allowed = 0;
              }
            });
        }
      });
    return allowed;
  };*/

  const checkAllowed = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/courses/eachstage/${props.data.CourseID}`
    );
    const arrAllow = await Promise.all(
      data.map(async ({ StID }) => {
        return await axios.get(
          `http://localhost:4000/api/courses/allow/${StID}`
        );
      })
    );
    const allowFind = arrAllow.find((data) => data.data === 0);

    return !Boolean(allowFind) ? 1 : 0;
  };

  const changeCourseStatus = async () => {
    if (await checkAllowed()) {
      await axios
        .put("http://localhost:4000/api/courses/status/" + props.data.CourseID)
        .then((res) => {
          message.success("You course is now online.");
          props.loadData();
        });
    } else {
      message.warning(
        "Add atleast 20 questions in every difficulty of every stage to online your course."
      );
    }
  };

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
          .get(
            "http://localhost:4000/api/courses/countstages/" +
              props.data.CourseID
          )
          .then((res) => {
            if (res.data[0].totalStages >= 3) {
              changeCourseStatus();
            } else {
              message.warning("Add atleast 3 stages to online your course.");
            }
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
