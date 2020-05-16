import React from "react";
import { Modal, Button, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

const DeleteBadge = props => {
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this badge?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .delete("http://localhost:4000/api/badges/" + props.data.BID)
          .then(res => {
            message.success("Badge has been deleted.");
            props.loadData();
          });
      },
      onCancel() {
        console.log("Cancel");
      }
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

export default DeleteBadge;
