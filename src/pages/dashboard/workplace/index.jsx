import { Avatar, Card, List, Skeleton, Statistic } from 'antd';
import React, { Component } from 'react';
import { connect, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { FormattedMessage } from 'umi';
import styles from './style.less';
import request from '@/utils/request';

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
          {currentUser.nickname !== '' ? currentUser.nickname : '路人甲'}
        </div>
        <div>你看你妈呢</div>
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
            defaultMessage="已完成预测"
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
            defaultMessage="余额"
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
      newdata: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });

    request('/tasks/list', { method: 'POST' }).then((result) => {
      this.setState({
        data: result.data.slice(0, 9),
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  renderActivities = (item) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const { currentUser, projectLoading } = this.props;

    if (!currentUser || !currentUser.username) {
      return null;
    }

    return (
      <PageContainer
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent currentUser={currentUser} />}
      >
        <p>{console.log(this.state.data)}</p>

        <Card
          className={styles.projectList}
          style={{
            marginBottom: 24,
          }}
          title="My Predictions"
          bordered={false}
          extra={
            <a
              onClick={() => {
                history.push('/dash/dashboard/list/basic-list');
              }}
            >
              Total Predictions
            </a>
          }
          loading={projectLoading}
          bodyStyle={{
            padding: 0,
          }}
        >
          {this.state.data.map((item) => (
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
                  <p> {item.fields.time_start} </p>
                </div>
              </Card>
            </Card.Grid>
          ))}
        </Card>
      </PageContainer>
    );
  }
}

export default connect(
  ({ dashboardAndworkplace: { currentUser, projectNotice, activities, radarData }, loading }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['dashboardAndworkplace/fetchUserCurrent'],
    projectLoading: loading.effects['dashboardAndworkplace/fetchProjectNotice'],
    activitiesLoading: loading.effects['dashboardAndworkplace/fetchActivitiesList'],
  }),
)(Workplace);
