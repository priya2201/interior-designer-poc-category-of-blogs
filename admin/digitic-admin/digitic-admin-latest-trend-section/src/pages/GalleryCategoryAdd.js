import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";

function GalleryCategoryAdd() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onAdd = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:7000/interior/galleryCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);

      const data = await response.json();

      if (response.ok) {
        console.log("Category entry added:", data);
        message.success("Category entry added successfully", data);
        navigate("/admin/galleryCategory");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        }
        // throw new Error("Failed to add new FAQ entry");
        else {
          message.error(data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error adding new Category entry:", error.message);
      message.error("Failed to add new Category entry");
      navigate("/admin/galleryCategory");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h3>Add New Entry</h3>
      <Form onFinish={onAdd}>
        <Form.Item
          name="categoryName"
          label="CategoryName"
          rules={[{ required: true }]}
        >
          <Input />
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

export default GalleryCategoryAdd
