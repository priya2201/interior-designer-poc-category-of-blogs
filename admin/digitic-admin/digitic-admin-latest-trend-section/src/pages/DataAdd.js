import { Form, message, Input, Button, Upload, Select, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function DataAdd() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleAdd = async (values) => {
    const { title, description, subtitle, number, faqId } = values;
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('subtitle', subtitle);
      formData.append('number', number);
      formData.append('faqId', faqId);
      images.forEach((image) => {
        formData.append('images', image.originFileObj);
      });

      const response = await fetch("http://localhost:7000/interior/dataAdd", {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        message.success(data.message || 'hi data added');
        setImages([]);
        navigate('/'); // Redirect after successful submission
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        } else {
          message.error(data.message || 'Unknown error');
        }
      }
    } catch (error) {
      message.error(error.message || 'Error from catch');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:7000/interior/faq');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleFile = (info) => {
    setImages(info.fileList);
  };

  return (
    <div>
      <h3>Add New Data Dummy Entry</h3>
      <Form onFinish={handleAdd}>
        <Form.Item
          name='title'
          label='Title'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Images" name='images'>
          <Upload
            multiple
            beforeUpload={() => false}
            onChange={handleFile}
            fileList={images}
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Number" name="number">
          <InputNumber />
        </Form.Item>

        <Form.Item name="faqId" label="FAQ">
          <Select placeholder="Select a FAQ">
            {data.map((d) => (
              <Option key={d._id} value={d._id}>
                {d.question}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DataAdd;
