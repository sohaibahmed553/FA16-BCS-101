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

const AddBadge = props => {
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const onFinish = values => {
    setVisible(false);
    onAdd(values);
  };

  const onAdd = values => {
    const { BName, BDetail } = values;
    axios
      .post("http://localhost:4000/api/badges/", {
        BName,
        BDetail
      })
      .then(res => {
        message.success("Badge has been added.");
        props.loadData();
        form.resetFields();
      })
      .catch(err => {});
  };

  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        className="w-100"
        onClick={showModal}
      >
        Add Badge
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
          <h5 className="d-flex justify-content-center">Add Badge</h5>
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
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBadge;
