import React, { useState } from "react";
import { Form, Input, Button, Upload, message, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

function TrendAdd() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAdd = async (values) => {
    const { title, description, order } = values;
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("order", order);

      formData.append("image", image);
      console.log("image");
      const response = await fetch("http://localhost:7000/interior/trends", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setImage(null);
        message.success("New entry added successfully");
        navigate("/admin/trend");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        } else {
          message.error(data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      message.error(error.message);
    }
  };
  const handleFileChange = (info) => {
    if (info.file instanceof File) {
      setImage(info.file);
    }
  };
  return (
    <div>
      <h3>Add New Entry</h3>
      <Form onFinish={handleAdd}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="order" label="Order" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={image ? [image] : []}
          >
            <Button icon={<UploadOutlined />}>Upload Single Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Entry
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default TrendAdd;
