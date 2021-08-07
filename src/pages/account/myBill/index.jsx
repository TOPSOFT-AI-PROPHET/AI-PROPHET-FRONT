import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Popconfirm, Button } from 'antd';
import React from 'react';
import styles from './index.less';
import { formatMessage } from 'umi';
import request from '@/utils/request';

export default class MyBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    request('/users/returnUsrID', {
      method: 'post',
    }).then((result) => {
      console.log(result.data.user_id);
      request('/pay/personaltrans', {
        method: 'GET',
        data: {
          user_id: result.data.user_id,
        },
      }).then((result2) => {
        console.log(result2.data.list);
        this.setState({
          data: result2.data.list,
        });
      });
    });
  }

  handleDelete = (key) => {
    const data = [...this.state.dataSource];
    this.setState({
      data: data.filter((item) => item.key !== key),
    });
  };

  render() {
    const columns = [
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title1' }),
        dataIndex: ['fields', 'credit'],
        key: 'statement',
        // render: text => <a>{text}</a>,
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title2' }),
        dataIndex: ['fields', 'order'],
        key: 'description',
        // render: text => <a>{text}</a>,
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title3' }),
        dataIndex: ['fields', 'create_time'],
        key: 'time',
        // render: text => <a>{text}</a>,
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title4' }),
        key: 'action',
        render: (_, record) =>
          this.state.data.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>{formatMessage({ id: 'pages.account.myBill.card2.table.title4.button' })}</a>
            </Popconfirm>
          ) : null,
      },
    ];

    const { data } = this.state;

    const cards = [
      {
        key: 1,
        content: (
          <div className={styles.content}>
            <div className={styles.div}>
              {formatMessage({
                id: 'pages.account.myBill.card1.content.div',
              })}
            </div>
            <Button type={'primary'} className={styles.button}>
              {formatMessage({
                id: 'pages.account.myBill.card1.content.button',
              })}
            </Button>
          </div>
        ),
        style: styles.card1,
      },
      {
        key: 2,
        title: formatMessage({ id: 'pages.account.myBill.card2.title' }),
        content: (
          <div className={styles.card2.content}>
            <Table columns={columns} dataSource={data} />
          </div>
        ),
        style: styles.card2,
      },
    ];

    return (
      <PageContainer>
        {cards.map((item) => {
          return (
            <Card key={item.key} title={item.title} className={item.style}>
              {item.content}
            </Card>
          );
        })}
      </PageContainer>
    );
  }
}
