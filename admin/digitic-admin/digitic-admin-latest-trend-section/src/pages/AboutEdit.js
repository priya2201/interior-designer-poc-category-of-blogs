import { Input, Button, Form, message, InputNumber } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AboutEdit() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/faq/${id}`
        );
        const data = await response.json();
        form.setFieldsValue({
          question: data.question,
          answer: data.answer,
          order: data.order,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [id, form]);

  const handleEdit = async (values) => {
    try {
      const response = await fetch(`http://localhost:7000/interior/faq/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(response, "resp from edit");
      if (response.ok) {
        message.success("About Updated Successfully");
        navigate("/admin/about");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        } else {
          message.error(`Failed to update about: ${data.message}`);
        }
      }
    } catch (error) {
      console.error("Failed to update about:", error.message);
      message.error(
        `Failed to update about. Please try again later ${error.message}`
      );
      navigate("/admin/about");
    }
  };

  return (
    <div>
      <h3>Edit About</h3>
      <Form form={form} onFinish={handleEdit}>
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="answer" label="Answer" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="order" label="Order" rules={[{ required: true }]}>
          <InputNumber />
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

export default AboutEdit;
