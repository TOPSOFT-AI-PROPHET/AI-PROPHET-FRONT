import { Avatar, Card, Skeleton, Statistic } from 'antd';
import React, { Component } from 'react';
import { connect, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { FormattedMessage, formatMessage } from 'umi';
import styles from './style.less';
import request from '@/utils/request';
import { Empty } from 'antd';

const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.profile_url} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          Hello，
          {currentUser.nickname !== '' ? currentUser.nickname : 'John doe'}
        </div>
        <div>仰天大笑出门去，我辈岂是蓬蒿人。</div>
      </div>
    </div>
  );
};

const ExtraContent = ({ currentUser }) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic
        title={
          <FormattedMessage
            id="pages.dashboardandworkplace.workplace.numtask"
            defaultMessage="Processed Predictions"
          />
        }
        value={currentUser.total_tasks}
      />
    </div>
    <div className={styles.statItem}>
      <Statistic
        title={
          <FormattedMessage
            id="pages.dashboardandworkplace.workplace.balance"
            defaultMessage="Balance"
          />
        }
        value={currentUser.balance}
      />
    </div>
  </div>
);

class Workplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });

    request('/tasks/list', { method: 'POST', data: { page: 1 } }).then((result) => {
      this.setState({
        data: result.data.list.slice(0, 9),
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  render() {
    const { currentUser } = this.props;

    if (!currentUser || !currentUser.username) {
      return null;
    }

    return (
      <PageContainer
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent currentUser={currentUser} />}
      >
        <Card
          className={styles.projectList}
          style={{
            marginBottom: 24,
          }}
          title={<FormattedMessage id="pages.dashboardandworkplace.workplace.cardtitle" />}
          bordered={false}
          extra={
            <a
              onClick={() => {
                history.push('/dash/dashboard/list/basic-list');
              }}
            >
              {formatMessage({ id: 'pages.dashboardandworkplace.workplace.extratxt' })}
            </a>
          }
          bodyStyle={{
            padding: 0,
          }}
        >
          {this.state.data.length === 0 ? (
            <>
              <br />
              <Empty />
              <br />
            </>
          ) : (
            this.state.data.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.pk}>
                <Card
                  bodyStyle={{
                    padding: 0,
                  }}
                  bordered={false}
                >
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Avatar
                          size="small"
                          src="http://m.imeitou.com/uploads/allimg/2020031310/tt42dal51ms.jpeg"
                        />
                        <a>{item.model}</a>
                      </div>
                    }
                    description={item.fields.description}
                  />
                  {/* <p>{item.fields.description}</p> */}
                  <div style={{ textAlign: 'right', fontSize: 12 }}>
                    {/* <span  className = {styles.datatime} >
                    {item.fields.time_start}
                  </span>
                  {/*item.updatedAt && (
                    <span className={styles.datetime} title={item.updatedAt}>
                      {moment(item.updatedAt).fromNow()}
                    </span>
                  )} */}
                    <p> {moment(item.fields.time_start).fromNow()} </p>
                  </div>
                </Card>
              </Card.Grid>
            ))
          )}
        </Card>
      </PageContainer>
    );
  }
}

export default connect(({ dashboardAndworkplace: { currentUser }, loading }) => ({
  currentUser,
  currentUserLoading: loading.effects['dashboardAndworkplace/fetchUserCurrent'],
}))(Workplace);
