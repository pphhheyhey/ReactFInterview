import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { Table, Button, Space, Popconfirm } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getContacts, deleteContact } from '../../utils/request';
import { message } from 'antd';

const ListPage = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({ name: '', phone: '', email: '', address: '', gender: '', age: '' });
  const navigate = useNavigate();

  // 查询过滤
  const filterData = (contacts, query) => {
    return contacts.filter(item => {
      return (
        (!query.name || item.name?.toLowerCase().includes(query.name.toLowerCase())) &&
        (!query.phone || item.phone?.includes(query.phone)) &&
        (!query.email || item.email?.toLowerCase().includes(query.email.toLowerCase())) &&
        (!query.address || item.address?.toLowerCase().includes(query.address.toLowerCase())) &&
        (!query.gender || item.gender === query.gender) &&
        (!query.age || String(item.age).includes(query.age))
      );
    });
  };

  const refresh = () => {
    const all = getContacts();
    setData(filterData(all, query));
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, [query]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: data => (
        <Space size="middle">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/contactsForm?id=${data.id}`)} />
          <Popconfirm
            title="Delete the contact"
            description="Make sure u want to delete?"
            onConfirm={() => {
              deleteContact(data.id);
              message.success('Deleted successfully');
              setData(getContacts());
            }}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form
        layout="inline"
        style={{ marginBottom: 16, flexWrap: 'wrap' }}
        onValuesChange={(_, allValues) => setQuery(allValues)}
        initialValues={query}
      >
        <Form.Item name="name" label="Name" style={{ marginBottom: 12, minWidth: 220 }}>
          <Input placeholder="Search name" allowClear />
        </Form.Item>
        <Form.Item name="gender" label="Gender" style={{ marginBottom: 12, minWidth: 160 }}>
          <Select placeholder="All" allowClear style={{ width: 100 }}>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="age" label="Age" style={{ marginBottom: 12, minWidth: 120 }}>
          <Input placeholder="Search age" allowClear style={{ width: 80 }} />
        </Form.Item>
        <Form.Item name="phone" label="Phone" style={{ marginBottom: 12, minWidth: 180 }}>
          <Input placeholder="Search phone" allowClear />
        </Form.Item>
        <Form.Item name="email" label="Email" style={{ marginBottom: 12, minWidth: 220 }}>
          <Input placeholder="Search email" allowClear />
        </Form.Item>
        <Form.Item name="address" label="Address" style={{ marginBottom: 12, minWidth: 220 }}>
          <Input placeholder="Search address" allowClear />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />
      <Outlet />
    </>
  );
};

export default ListPage;