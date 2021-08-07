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
      credit: 0,
    };
  }

  componentDidMount() {
    request('/users/returnUsrID', {
      method: 'post',
    }).then((result) => {
      // console.log(result.data.user_id);
      request('/pay/personalTrans', {
        method: 'GET',
        data: {
          user_id: result.data.user_id,
        },
      }).then((result2) => {
        // console.log(result2.data.list);
        this.setState({
          data: result2.data.list,
        });
      });
    });

    request('/users/getUserInfo', { method: 'POST' })
      .then((result) => {
        this.setState({ credit: result.data.credit });
      })
      .catch((e) => console.log(e));
  }

  handleDelete = (pk) => {
    const data = [...this.state.data];
    // console.log(data);
    this.setState({
      data: data.filter((item) => item.pk !== pk),
    });
  };

  render() {
    const columns = [
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title1' }),
        dataIndex: ['fields', 'credit'],
        key: 'statement',
        render: (_, record) => {
          // console.log(_)
          // console.log(record)
          if (record.fields.method === 'charge') {
            return `+${_}`;
          }
          if (record.fields.method === 'deduction') {
            return `-${_}`;
          }
          return 'unknown';
        },
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title2' }),
        dataIndex: ['fields', 'method'],
        key: 'description',
        render: (text) => {
          if (text === 'charge') {
            return '充值';
          }
          if (text === 'deduction') {
            return '扣费';
          }
          return 'unknown';
        },
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title3' }),
        dataIndex: ['fields', 'create_time'],
        key: 'time',
        render: (text) => `${text}`,
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title4' }),
        key: 'action',
        render: (_, record) => {
          // console.log(record)
          return this.state.data.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.pk)}>
              <a>{formatMessage({ id: 'pages.account.myBill.card2.table.title4.button' })}</a>
            </Popconfirm>
          ) : null;
        },
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
              {this.state.credit}
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
