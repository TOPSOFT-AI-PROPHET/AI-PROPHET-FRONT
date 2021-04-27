import { Button, Avatar, Card, Skeleton, Statistic } from 'antd';
import React, { Component } from 'react';
import { connect, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { FormattedMessage, formatMessage } from 'umi';
import styles from './style.less';
import request from '@/utils/request';
import { Empty } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

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
        <Avatar
          size="large"
          src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          Hello，
          {currentUser.nickname !== '' ? currentUser.nickname : 'John doe'}
        </div>
        <div>
          {currentUser.user_sing !== ''
            ? currentUser.user_sing
            : '仰天大笑出门去，我辈岂是蓬蒿人。'}
        </div>
      </div>
    </div>
  );
};

const ExtraContent = ({ currentUser, value }) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic
        title={
          <FormattedMessage
            id="pages.dashboardandworkplace.workplace.numtask"
            defaultMessage="Processed Predictions"
          />
        }
        value={value.num_of_finished_tasks}
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
        prefix="￥"
        value={currentUser.credit}
      />
    </div>
    <div>
      <Button
        onClick={() => {
          history.push('/dash/account/topup');
        }}
      >
        <DollarOutlined />
        {formatMessage({
          id: 'accountandsettings.basic.topup',
        })}
      </Button>
    </div>
  </div>
);

class Workplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_task: {
        num_of_task: '',
        num_of_finished_tasks: '',
      },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });

    request('/tasks/list', { method: 'POST', data: { page: 1 } })
      .then((result) => {
        this.setState({
          data: result.data.list.slice(0, 9),
        });
      })
      .catch((e) => console.log(e));

    request('/tasks/numTask', { method: 'POST' })
      .then((result) => {
        if (result.data) {
          this.setState({
            data_task: result.data,
          });
        }
      })
      .catch((e) => console.log(e));
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
        extraContent={<ExtraContent currentUser={currentUser} value={this.state.data_task} />}
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
                history.push('/dash/prediction/predictions');
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
                          size="large"
                          src="https://prophetsrc-1305001068.cos.ap-chengdu.myqcloud.com/defalt.png"
                        />
                        <a>{item.fields.ai_name}</a>
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
