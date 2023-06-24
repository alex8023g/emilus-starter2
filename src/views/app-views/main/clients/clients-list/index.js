import React, { Component } from 'react';
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import userData from 'assets/data/user-list.data.json';
import Loading from 'components/shared-components/Loading';
import { Navigate } from 'react-router-dom';

export class UserList extends Component {
  state = {
    users: [],
    // users: userData,
    userProfileVisible: false,
    selectedUser: null,
    isLoading: false,
    redirect: false,
  };

  componentDidMount() {
    // load stuff
    this.isLoading = true;
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => {
        console.log(users);
        users = users.map((user, i) => ({
          ...user,
          img: `/img/avatars/thumb-${i + 1}.jpg`,
        }));
        this.isLoading = false;
        this.setState({
          // loaded: true,
          users: users,
        });
      });
  }

  deleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((item) => item.id !== userId),
    });
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  render() {
    const { users, userProfileVisible, selectedUser } = this.state;

    const tableColumns = [
      {
        title: 'Клиент',
        dataIndex: 'name',
        render: (_, record) => (
          <div className='d-flex'>
            <AvatarStatus src={record.img} name={record.name} subTitle={record.email} />
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: 'Username',
        dataIndex: 'username',
        sorter: {
          compare: (a, b) => a.role.length - b.role.length,
        },
      },
      {
        title: 'Телефон',
        dataIndex: 'phone',
        // render: (date) => <span>{dayjs.unix(date).format('MM/DD/YYYY')} </span>,
        sorter: (a, b) => dayjs(a.lastOnline).unix() - dayjs(b.lastOnline).unix(),
      },
      {
        title: 'Вебсайт',
        dataIndex: 'website',
        render: (status) => (
          <Tag
            className='text-capitalize'
            // color={status === 'active' ? 'cyan' : 'red'}
          >
            {status}
          </Tag>
        ),
        sorter: {
          compare: (a, b) => a.status.length - b.status.length,
        },
      },
      {
        title: '',
        dataIndex: 'actions',
        render: (_, elm) => (
          <div className='text-right d-flex justify-content-end'>
            <Tooltip title='View'>
              <Button
                type='primary'
                className='mr-2'
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size='small'
              />
            </Tooltip>
            <Tooltip title='Delete'>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUser(elm.id);
                }}
                size='small'
              />
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <>
        {this.redirect && <Navigate to={`/app/apps/mail`} replace={true} />}
        <Card bodyStyle={{ padding: '0px' }}>
          <div className='table-responsive'>
            {this.isLoading && <Loading />}
            <Table
              columns={tableColumns}
              dataSource={users}
              rowKey='id'
              onRow={(el) => {
                return {
                  onClick: (e) => {
                    e.preventDefault();
                    console.log('click', el.id);
                    this.setState({
                      redirect: true,
                    });
                    // navigate(`/app/apps/mail/${params.category}/${elm.id}`)
                  },
                };
              }}
            />
          </div>
          <UserView
            data={selectedUser}
            visible={userProfileVisible}
            close={() => {
              this.closeUserProfile();
            }}
          />
        </Card>
      </>
    );
  }
}

export default UserList;
