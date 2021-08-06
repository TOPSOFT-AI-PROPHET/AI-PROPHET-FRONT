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
      dataSource: [
        // {
        //   key: '1',
        //   statement: '500',
        //   description: 'sdsfdsdf',
        //   time: '2021-07-14',
        // },
        // {
        //   key: '2',
        //   statement: '500',
        //   description: 'sdsfdsdf',
        //   time: '2021-07-14',
        // },
      ],
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
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  render() {
    const columns = [
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title1' }),
        dataIndex: 'statement',
        key: 'statement',
        // render: text => <a>{text}</a>,
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title2' }),
        dataIndex: 'description',
        key: 'description',
        // render: text => <a>{text}</a>,
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title3' }),
        dataIndex: 'time',
        key: 'time',
        // render: text => <a>{text}</a>,
      },
      {
        title: formatMessage({ id: 'pages.account.myBill.card2.table.title4' }),
        key: 'action',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>{formatMessage({ id: 'pages.account.myBill.card2.table.title4.button' })}</a>
            </Popconfirm>
          ) : null,
      },
    ];

    const { dataSource } = this.state;

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
            <Table columns={columns} dataSource={dataSource} />
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
