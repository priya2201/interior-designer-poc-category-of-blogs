import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MainAboutAdd = () => {
  const [image, setImage] = useState(null); // Changed to null to hold single image
  const navigate = useNavigate();

  const handleAdd = async (values) => {
    const { title, subtitle, description } = values;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle); // Added subtitle to formData
      formData.append("description", description);
      formData.append("image", image);
      console.log("image", image);

      const response = await fetch("http://localhost:7000/interior/aboutus", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImage(null);
        message.success("New entry added successfully");
        navigate("/admin/aboutus");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        }
        console.error("Error:", data.message);
        message.error(data.message);
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
  const beforeUpload = (file) => {
    // Return false to prevent the file from being uploaded
    message.error("Upload failed: File upload is not allowed.");
    return false;
  };

  return (
    <div>
      <h3>Add New Entry</h3>
      <Form onFinish={handleAdd}>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="subtitle" label="Subtitle">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
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
};

export default MainAboutAdd;
