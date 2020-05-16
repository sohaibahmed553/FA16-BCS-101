import React from "react";
import { Button, Modal, message, Form, Input } from "antd";
import axios from "axios";

//layouts for form
const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 18,
    span: 4
  }
};

const EditBadge = props => {
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const onFinish = values => {
    message.success("Badged has been updated.");
    setVisible(false);
    onEdit(values);
  };

  const onEdit = values => {
    const { BName, BDetail } = values;
    axios
      .put("http://localhost:4000/api/badges/" + props.data.BID, {
        BName,
        BDetail
      })
      .then(res => {
        props.loadData();
      })
      .catch(err => {});
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
          className="mt-3"
          name="basic"
          initialValues={{
            BName: props.data.BName,
            BDetail: props.data.BDetail
          }}
        >
          {" "}
          <h5 className="d-flex justify-content-center">Edit Badge</h5>
          <br />
          {/*--------------------------Badge Name--------------------- */}
          <Form.Item
            label="Badge Name"
            name="BName"
            rules={[
              {
                required: true,
                message: "Please input badge name!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          {/*--------------------------Badge Detail--------------------- */}
          <Form.Item
            label="Badge Detail"
            name="BDetail"
            rules={[
              {
                required: true,
                message: "Please input badge detail!"
              }
            ]}
          >
            <Input.TextArea />
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

export default EditBadge;
