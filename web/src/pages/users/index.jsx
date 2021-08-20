
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'umi';

import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Button, Divider, Modal } from 'antd';

import ProTableFormModal from '@/components/ProTableFormModal';
import { queryUsers, createUser, updateUser, deleteUser, followUser } from '@/services/user';

export default function Page() {

  const actionRef = useRef();
  const [formModalVisible, handleModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});

  const handleCreateOrModify = async (values) => {
    if (formValues && formValues._id) {
      return await updateUser(formValues._id, values);
    } else {
      return await createUser(values);
    }
  }

  const handleDelete = async (values) => {
    return await deleteUser(values._id);
  }

  const handleFollowOrCannel = async (values) => {
    return await followUser(values._id);
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      sorter: true,
      initialValue: formValues.name,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入姓名',
          },
        ]
      }
    },
    {
      title: 'dob',
      dataIndex: 'dob',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
      initialValue: formValues.dob,
    },
    {
      title: 'address',
      dataIndex: 'address',
      sorter: true,
      hideInSearch: true,
      initialValue: formValues.address,
    },
    {
      title: 'description',
      dataIndex: 'description',
      sorter: true,
      hideInSearch: true,
      initialValue: formValues.description,
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      initialValue: formValues.email,
    },
    {
      title: 'location',
      dataIndex: 'location',
      sorter: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'create_time',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: 'blog',
      dataIndex: 'blog',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      initialValue: formValues.blog,
    },
    {
      title: 'avatar_url',
      dataIndex: 'avatar_url',
      hideInForm: true,
      hideInSearch: true,
      render: (_, r) => {
        return (
          r.avatar_url ? <Image width={80} src={r.avatar_url} /> : ''
        )
      }
    },
    {
      title: 'option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true);
              setFormValues(record);
            }}
          >
            更改
          </a>
          <Divider type="vertical" />
          <a onClick={() => {
            Modal.confirm({
              title: '删除任务',
              content: '确定删除该任务吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleDelete(record);
                if (success && actionRef.current) {
                  actionRef.current.reload();
                }
              }
            });
          }}>删除</a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              await handleFollowOrCannel(record);
              actionRef.current.reload();
            }}
          >
            关注
          </a>
        </>
      ),
    },
  ]

  return (
    <PageContainer >
      <h1>Users</h1>
      <ProTable
        rowKey="_id"
        actionRef={actionRef}
        search={true}
        toolBarRender={() => [
          <Button type="primary" onClick={() => {
            handleModalVisible(true);
            setFormValues({});
          }
          }>
            <PlusOutlined /> Create User
          </Button>,
        ]}
        request={(params, sorter, filter) => queryUsers({ ...params, sorter, filter })}
        columns={columns}
      />

      <ProTableFormModal
        title={formValues && formValues._id ? 'Modify User' : 'Create User'}
        onCancel={() => handleModalVisible(false)} modalVisible={formModalVisible}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleCreateOrModify(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="_id"
          type="form"
          columns={columns}
        />
      </ProTableFormModal>
    </PageContainer>
  );
}
