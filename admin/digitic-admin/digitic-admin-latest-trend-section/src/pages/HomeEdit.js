import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

const HomeEdit = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/home/${id}`
        );
        const data = await response.json();

        // Convert existing images to fileList format
        const fileList = data.images.map((image, index) => ({
          uid: index,
          name: image.split("/").pop(),
          status: "done",
          url: image,
        }));

        setImages(fileList);

        form.setFieldsValue({
          title: data.title,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, form]);

  const handleFileChange = ({ fileList }) => {
    // Keep only the last uploaded file in the fileList
    if (fileList.length > 0) {
      const newFileList = [fileList[fileList.length - 1]];
      setImages(newFileList);
    } else {
      setImages([]);
    }
  };

  const handleEdit = async (values) => {
    const { title, description } = values;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    images.forEach((image) => {
      if (image.originFileObj) {
        formData.append("images", image.originFileObj);
      }
    });

    try {
      const response = await fetch(
        `http://localhost:7000/interior/home/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        message.success("Home updated successfully");
        navigate("/admin/home");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        }
        message.error(data.message || "Failed to update home");
      }
    } catch (error) {
      console.error("Failed to update home:", error);
      message.error("Failed to update home");
    }
  };

  const customItemRender = (originNode, file) => {
    const imageURL =
      file.url ||
      (file.originFileObj && URL.createObjectURL(file.originFileObj));
    return (
      <div>
        <img
          src={imageURL}
          alt={file.name}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div>{file.name}</div>
      </div>
    );
  };

  return (
    <div>
      <h3>Edit Home</h3>
      <Form form={form} onFinish={handleEdit}>
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
        <Form.Item name="images" label="Images">
          <Upload
            multiple
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={images}
            listType="picture"
            itemRender={customItemRender}
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomeEdit;
