import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import React from 'react';
import styles from './index.less';

export default class MyBill extends React.Component {
  render() {
    const data = [
      {
        key: '1',
        statement: '500',
        description: 'sdsfdsdf',
        time: '2021-07-140',
      },
      {
        key: '2',
        statement: '500',
        description: 'sdsfdsdf',
        time: '2021-07-140',
      },
    ];

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
        render: () => <a>Delect</a>,
      },
    ];

    const cards = [
      {
        key: 1,
        content: <div className={styles.card1.content}></div>,
        style: styles.card1,
      },
      {
        key: 2,
        title: '账单详情',
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
