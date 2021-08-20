
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'umi';

import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Button, Badge } from 'antd';

import { ProColumns } from '@ant-design/pro-table';

import { queryRelation, followUser } from '@/services/user';

export default function Page() {

  const actionRef = useRef();
  const [activeKey, setActiveKey] = useState('following');
  const [count, setCount] = useState({ following: 0, followers: 0, friends: 0 });

  const handleFollowOrCannel = async (values) => {
    const id = activeKey === 'followers' ? values.owner._id : values.follower._id;
    return await followUser(id);
  }

  const columns = [
    {
      title: 'owner.name',
      dataIndex: 'owner.name',
      render: (dom, r) => {
        return r.owner ? r.owner.name : '';
      },
    },
    {
      title: 'follower.name',
      dataIndex: 'follower.name',
      sorter: true,
      render: (dom, r) => {
        return r.follower ? r.follower.name : '';
      },
    },
    {
      title: 'is_mutual',
      dataIndex: 'is_mutual',
      render: (dom, r) => {
        return (r.is_mutual).toString();
      },
    },
    {
      title: 'follow_time',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: 'option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              await handleFollowOrCannel(record);
              actionRef.current.reload();
            }}
          >
            { activeKey === 'followers' ? 'follow' : 'unfollow' }
          </a>
        </>
      ),
    },
  ]

  const renderBadge = (count, active = false) => {
    return (
      <Badge
        count={count}
        style={{
          marginTop: -2,
          marginLeft: 4,
          color: active ? '#1890FF' : '#999',
          backgroundColor: active ? '#E6F7FF' : '#eee',
        }}
      />
    );
  };

  return (
    <PageContainer>
      <h1>Friends Page</h1>

      <ProTable
        rowKey="_id"
        actionRef={actionRef}
        search={false}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: 'following',
                label: <span>Following{renderBadge(count.following, activeKey === 'following')}</span>,
              },
              {
                key: 'followers',
                label: <span>Followers{renderBadge(count.followers, activeKey === 'followers')}</span>,
              },
              {
                key: 'friends',
                label: <span>Friends{renderBadge(count.friends, activeKey === 'friends')}</span>,
              },
            ],
            onChange: (key) => {
              setActiveKey(key);
              actionRef.current.reload();
            },
          },
          // actions: [
          //   <Button key="primary" type="primary"></Button>,
          // ],
        }}
        request={async (params, sorter, filter) => {
          Object.assign(params, { type: activeKey })
          const result = await queryRelation({ ...params, sorter, filter })
          const _count = Object.assign({}, count);
          _count[activeKey] = result.total
          setCount(_count);
          return result;
        }}
        columns={columns}
      />

    </PageContainer>
  );
}
