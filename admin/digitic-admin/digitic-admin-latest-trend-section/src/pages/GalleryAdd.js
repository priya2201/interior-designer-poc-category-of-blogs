import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  InputNumber,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

function GalleryAdd() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://localhost:7000/interior/galleryCategory"
        );

        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categoriesData = await categoriesResponse.json();

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (values) => {
    const { categoryId, order } = values;
    try {
      const formData = new FormData();
      formData.append("categoryId", categoryId);
      formData.append("order", order);
      formData.append("image", image);
      console.log("image");
      const response = await fetch("http://localhost:7000/interior/gallery", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setImage(null);
        message.success("New entry added successfully");
        navigate("/admin/gallery");
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
        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
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

export default GalleryAdd;
