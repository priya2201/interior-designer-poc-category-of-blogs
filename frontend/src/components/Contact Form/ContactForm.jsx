import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

function ContactForm() {
  const [loading, setLoading] = useState(false);

  const onAdd = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:7000/interior/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);

      const data = await response.json();

      if (response.ok) {
        console.log("New Contact entry added:", data);
        message.success("New Contact entry added successfully", data);
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
      console.error("Error adding new Contact entry:", error.message);
      message.error("Failed to add new Contact entry");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h3>Contact Form</h3>
      <Form onFinish={onAdd}>
        <Form.Item
          name="firstName"
          label="First Name"
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
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneno"
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
          <Input />
        </Form.Item>{" "}
        <Form.Item name="message" label="Message" rules={[{ required: true }]}>
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ContactForm;
