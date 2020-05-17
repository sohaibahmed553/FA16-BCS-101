import React from "react";
import "antd/dist/antd.css";
import { Modal, Button, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

const DeleteChallenge = (props) => {
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this question?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .delete("http://localhost:4000/api/challenges/" + props.data.QID)
          .then((res) => {
            message.success("Question has been deleted.");
            props.onDeleteQuestion();
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      <Button onClick={showDeleteConfirm} type="link">
        delete
      </Button>
    </div>
  );
};

export default DeleteChallenge;
