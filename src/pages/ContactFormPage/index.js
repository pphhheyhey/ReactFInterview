import { Card, Form, Input, Button, message, Radio, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveContact, getContactById } from '../../utils/request';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ContactForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // re fill
  useEffect(() => {
    if (id) {
      const contact = getContactById(id);
      if (contact) {
        form.setFieldsValue(contact);
        if (contact.avatar) {
          setFileList([
            {
              uid: '-1',
              name: 'avatar.png',
              status: 'done',
              url: contact.avatar,
            },
          ]);
        }
      }
    } else {
      setFileList([]);
    }
  }, [form, id]);

  // base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadChange = async ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      const file = newFileList[0];
      if (!file.url && file.originFileObj) {
        file.url = await getBase64(file.originFileObj);
      }
      setFileList([file]);
    } else {
      setFileList([]);
    }
  };

  const onFinish = (values) => {
    const avatar = fileList[0]?.url || '';
    if (id) {
      saveContact({ id, ...values, avatar });
    } else {
      const newId = Date.now().toString();
      saveContact({ id: newId, ...values, avatar });
    }
    message.success(`${id ? 'Edit successful' : 'Add successful'}`);
    navigate('/');
  };


  const onUpdate = async () => {
    try {
      const values = await form.validateFields();
      if (!id) {
        message.warning('No contact to update.');
        return;
      }
      const avatar = fileList[0]?.url || '';
      saveContact({ id, ...values, avatar });
      message.success('Update successful!');
      navigate('/');
    } catch (e) { }
  };


  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <Card title="Edit Contact">
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="please enter name" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'please choice the gender' }]}
          >
            <Radio.Group>
              <Radio value="Male">male</Radio>
              <Radio value="Female">female</Radio>
              <Radio value="Other">other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'please enter age' }]}
          >
            <Input type="number" placeholder="please enter age" min={0} max={120} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{
              required: true,
              message: 'please enter phone number'
            }, {
              pattern: /^\d{10,15}$/,
              message: 'please enter correct phone number'
            }]}
          >
            <Input placeholder="please enter the phone" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'please enter email' },
              // {
              //   pattern: /\^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
              //   message: 'please enter correct email'
              // }
            ]}
          >
            <Input placeholder="please enter email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'please enter address' }]}
          >
            <Input placeholder="please enter address" />
          </Form.Item>
          <Form.Item label="Avatar" name="avatar">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              submit
            </Button>
            {id && (
              <Button type="default" onClick={onUpdate}>
                update
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ContactForm;