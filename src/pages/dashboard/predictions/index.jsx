import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Progress, Row, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import moment from 'moment';
import styles from './style.less';
import request from '@/utils/request';

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({
  data: {
    // eslint-disable-next-line
    fields: { time_start, status },
  },
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Start Time</span>
      {/* eslint-disable-next-line  */}
      <p>{moment(time_start).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress
        percent={status}
        status={status === 100 ? 'success' : 'active'}
        strokeWidth={6}
        style={{
          width: 180,
        }}
      />
    </div>
  </div>
);

export const BasicList = (props) => {
  const addBtn = useRef(null);
  const { loading } = props;
  const [ilist, setIlist] = useState([]);
  const [total, setTotal] = useState(1);
  const [numppage, setPpage] = useState(1);
  const [currentPage, setCurrentpage] = useState(1);
  useEffect(() => {
    request('/tasks/list', { method: 'POST', data: { page: 1 } })
      .then((result) => {
        setIlist(result.data.list);
        setTotal(result.data.totalCount);
        setPpage(result.data.numPerPage);
      })
      .catch((e) => console.log(e));
  }, [1]);

  const pageChange = (item) => {
    setCurrentpage(item);
    request('/tasks/list', { method: 'POST', data: { page: item } }).then((result) => {
      setIlist(result.data.list);
      setTotal(result.data.totalCount);
      setPpage(result.data.numPerPage);
    });
  };

  const paginationProps = {
    showQuickJumper: true,
    pageSize: numppage,
    total,
    onChange: pageChange.bind(this),
  };

  const showModal = () => {
    history.push('/dash/prediction/aimodels');
  };

  const extraContent = <div className={styles.extraContent}></div>;

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="Processed Predictions" value="0" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Balace" value="$0" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Total Tasks" value="0" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="My task list"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{
                width: '100%',
                marginBottom: 8,
              }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              ADD
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={ilist}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="Details"
                      onClick={() => {
                        history.push('/dash/prediction/details');
                      }}
                    >
                      Details
                    </a>,
                    <a
                      key="delete"
                      onClick={() => {
                        request('/tasks/del', { method: 'POST', data: { task_id: item.pk } }).then(
                          (result) => {
                            if (result.code === 200) {
                              pageChange(currentPage);
                            } else {
                              message.error('Delete failed due to unknown reason');
                            }
                          },
                        );
                      }}
                    >
                      Delete
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a>{item.fields.description}</a>}
                    description={item.fields.description}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};
export default connect(({ listAndbasicList, loading }) => ({
  listAndbasicList,
  loading: loading.models.listAndbasicList,
}))(BasicList);
