import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Progress, Row, message } from 'antd';
import { findDOMNode } from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history, formatMessage, FormattedMessage } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
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
      <span>
        <FormattedMessage id="basic.list.starttime" />
      </span>
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
  const { loading, dispatch } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current] = useState(undefined);
  const [ilist, setIlist] = useState([]);
  const [total, setTotal] = useState(1);
  const [numppage, setPpage] = useState(1);
  const [currentPage, setCurrentpage] = useState(1);
  const [balance, setBalance] = useState(1);
  const [numtask, setNumTask] = useState(undefined);
  const [numfinishedtasks, setNumFinishedTasks] = useState(undefined);
  useEffect(() => {
    request('/tasks/list', { method: 'POST', data: { page: 1 } }).then((result) => {
      setIlist(result.data.list);
      setTotal(result.data.totalCount);
      setPpage(result.data.numPerPage);
    });

    // dispatch({
    //  type: 'listAndbasicList/fetch',
    //  payload: {
    //    count: 5,
    //  },
    // });
  }, [1]);

  const pageChange = (item) => {
    setCurrentpage(item);
    request('/tasks/list', { method: 'POST', data: { page: item } }).then((result) => {
      setIlist(result.data.list);
      setTotal(result.data.totalCount);
      setPpage(result.data.numPerPage);
    });
  };

  useEffect(() => {
    request('/users/getUserInfo', { method: 'POST' }).then((result) => {
      setBalance(result.data.credit);
    });
  }, [1]);

  useEffect(() => {
    request('/tasks/numTask', { method: 'POST' }).then((result) => {
      setNumTask(result.data.num_of_task);
      setNumFinishedTasks(result.data.num_of_finished_tasks);
    });
  }, [1]);

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

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current);
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values) => {
    const id = current ? current.id : '';
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'listAndbasicList/submit',
      payload: {
        id,
        ...values,
      },
    });
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info
                  title={formatMessage({ id: 'basic.list.prediction' })}
                  value={numfinishedtasks}
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info
                  title={formatMessage({ id: 'basic.list.balance' })}
                  value={`¥${balance}`}
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info title={formatMessage({ id: 'basic.list.numtask' })} value={numtask} />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title={formatMessage({ id: 'basic.list.tasklist' })}
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
              <FormattedMessage id="basic.list.add" />
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
                        history.push('/dash/prediction/details/' + item.pk);
                      }}
                    >
                      <FormattedMessage id="basic.list.details" />
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
                      <FormattedMessage id="basic.list.delete" />
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a>{item.fields.ai_name}</a>}
                    description={item.fields.description}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default connect(({ listAndbasicList, loading }) => ({
  listAndbasicList,
  loading: loading.models.listAndbasicList,
}))(BasicList);
