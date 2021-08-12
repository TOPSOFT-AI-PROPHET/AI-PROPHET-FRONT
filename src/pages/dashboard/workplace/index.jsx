import { Avatar, Card, Skeleton, Statistic, Typography } from 'antd';
import React, { Component } from 'react';
import { connect, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { FormattedMessage, formatMessage } from 'umi';
import styles from './style.less';
import request from '@/utils/request';
import { Empty } from 'antd';
import COS from 'cos-js-sdk-v5';

const { Link } = Typography;

const PageHeaderContent = ({ currentUser, url }) => {
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
        <Avatar size="large" src={url} />
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
            defaultMessage="Credit"
          />
        }
        value={currentUser.credit}
      />
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
      imageURL: '',
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

    request('/users/getUserInfo', { method: 'POST' })
      .then((result) => {
        this.handleAvatar(result.data.profile_image_uuid);
      })
      .catch((e) => console.log(e));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  handleAvatar(uuid) {
    if (uuid) {
      const cos = new COS({
        SecretId: 'AKID21jLxxXtspX0FC9ax4h2C51kFoCNhWZg',
        SecretKey: 'HROJDscqncKP9g0zJMJ7Mo20oHTVJsRr',
      });
      cos.getObjectUrl(
        {
          Bucket: 'prophetsrc-1305001068' /* 必须 */,
          Region: 'ap-chengdu' /* 必须 */,
          Key: `${uuid}.jpg` /* 必须 */,
        },
        (err, data) => {
          this.setState({
            imageURL: data.Url,
          });
        },
      );
    } else {
      this.setState({
        imageURL: 'https://prophetsrc-1305001068.cos.ap-chengdu.myqcloud.com/defalutprofile.png',
      });
    }
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser || !currentUser.username) {
      return null;
    }
    return (
      <PageContainer
        content={<PageHeaderContent currentUser={currentUser} url={this.state.imageURL} />}
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
            <Link
              onClick={() => {
                history.push('/dash/prediction/predictions');
              }}
            >
              {formatMessage({ id: 'pages.dashboardandworkplace.workplace.extratxt' })}
            </Link>
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
                        <Link
                          onClick={() => {
                            history.push(`/dash/prediction/details/${item.pk}`);
                          }}
                        >
                          {item.fields.ai_name}
                        </Link>
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
