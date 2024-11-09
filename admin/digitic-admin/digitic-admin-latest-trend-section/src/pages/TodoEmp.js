import { Form, Input, Button, Upload, Select, message } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

const TodoEmp = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [todoStatus, setTodoStatus] = useState("Pending");
  const handleFileChange = (info) => {
    console.log(info.file, "ff");
    if (info.file instanceof File) {
      setFile(info.file);
    }
  };
  const handleSave = async (values) => {
    const { title, description, todoStatus } = values;
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);
      formData.append("status", todoStatus);
      const response = await fetch("http://localhost:7000/interior/todoadd", {
        method: "POST",
        body: formData,
      });
      console.log(response, "resp");
      if (response.ok) {
        message.success("Todo added successfully");
        form.resetFields();
        setFile(null);
      } else {
        console.error("Error uploading file");
        message.error("Failed to add todo");
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <Form
        form={form}
        onFinish={handleSave}
        layout="vertical"
        initialValues={{ status: "Pending" }}
      >
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
        <Form.Item
          name="todoStatus"
          label="TodoStatus"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Pending or Completed">
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item name="file" label="File">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={file ? [file] : []}
          >
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Todo Entry
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoEmp;
