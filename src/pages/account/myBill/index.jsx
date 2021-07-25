import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Popconfirm, Button } from 'antd';
import React from 'react';
import styles from './index.less';

export default class MyBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: '1',
          statement: '500',
          description: 'sdsfdsdf',
          time: '2021-07-14',
        },
        {
          key: '2',
          statement: '500',
          description: 'sdsfdsdf',
          time: '2021-07-14',
        },
      ],
    };
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
        title: '收支',
        dataIndex: 'statement',
        key: 'statement',
        // render: text => <a>{text}</a>,
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        // render: text => <a>{text}</a>,
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        // render: text => <a>{text}</a>,
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
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
            <div className={styles.div}>当前积分余额：</div>
            <Button type={'primary'} className={styles.button}>
              提现
            </Button>
          </div>
        ),
        style: styles.card1,
      },
      {
        key: 2,
        title: '账单详情',
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
