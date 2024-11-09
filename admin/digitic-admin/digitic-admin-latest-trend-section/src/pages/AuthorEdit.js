import { Input, Button, Form, message, InputNumber } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AuthorEdit() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/author/${id}`
        );
        const data = await response.json();
        form.setFieldsValue({
          firstName: data.firstName,
          lastName: data.lastName,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data",error);
      }
    };

    fetchData();
  }, [id, form]);

  const handleEdit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:7000/interior/author/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      console.log(response, "resp from edit");
      if (response.ok) {
        message.success("Author Updated Successfully");
        navigate("/admin/author");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        } else {
          message.error(`Failed to update author: ${data.message}`);
        }
      }
    } catch (error) {
      console.error("Failed to update author:", error.message);
      message.error(
        `Failed to update author. Please try again later ${error.message}`
      );
      navigate("/admin/author");
    }
  };

  return (
    <div>
      <h3>Edit Author</h3>
      <Form form={form} onFinish={handleEdit}>
        <Form.Item
          name="firstName"
          label="FirstName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="LastName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AuthorEdit;
