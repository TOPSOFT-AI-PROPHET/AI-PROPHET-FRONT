import { Avatar, Card, Skeleton, Typography, List } from 'antd';
import React, { Component } from 'react';
import { connect, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
// import moment from 'moment';
import { FormattedMessage } from 'umi';
// import styles from '@/pages/dashboard/workplace/style.less';
import styles from './style.less';
import request from '@/utils/request';

import COS from 'cos-js-sdk-v5';

// const { Link } = Typography;
const { Paragraph, Link } = Typography;

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
    <div
      className={styles.pageHeaderContent}
      style={{ justifyContent: 'center', flexDirection: 'column' }}
    >
      <div className={styles.avatar}>
        <Avatar size="large" src={url} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {currentUser.nickname !== '' ? currentUser.nickname : 'John doe'}
          <img
            src="assets/img/t0.png"
            alt=""
            className={styles.level}
            style={{ width: '50px', height: '26px' }}
          />
        </div>
      </div>
      <div className={styles.icon}>
        <img src="assets/img/weibo-logo.png" alt="" />
        <img src="assets/img/GitHub-logo.png" alt="" />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '25px 0 0 0',
          color: 'rgb(206, 206, 206)',
          fontSize: '16px',
        }}
      >
        于2021年八月成为先知用户
      </div>
    </div>
  );
};

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
      usage: '',
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });

    request('/users/returnUsrID', { method: 'POST' })
      .then((result) => {
        request('/tasks/personalAImodelUsage', {
          method: 'POST',
          data: { user_id: result.data.user_id },
        }).then((result2) => {
          if (result2.ai_model_usage !== 'None') {
            this.setState({
              usage: result2.ai_model_usage,
            });
          }
        });
      })
      .catch((e) => console.log(e));

    request('/tasks/modelAuthor', {
      method: 'POST',
      data: { ai_id: this.props.match.params.id },
    }).then((result) => {
      request('/tasks/personalAImodel', {
        method: 'POST',
        data: { user_id: result.user_id },
      })
        .then((result2) => {
          this.setState({
            data: result2.data.list,
          });
        })
        .catch((e) => console.log(e));

      this.handleAvatar(result.uuid);
      this.setState({
        currentUser: {
          nickname: result.author,
        },
      });
    });

    request('/tasks/numTask', { method: 'POST' })
      .then((result) => {
        if (result.data) {
          this.setState({
            data_task: result.data,
          });
        }
      })
      .catch((e) => console.log(e));

    request('/users/getUserInfo', { method: 'POST' }) // 非本人id
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
        content={
          <PageHeaderContent currentUser={this.state.currentUser} url={this.state.imageURL} />
        }
        // extraContent={<ExtraContent currentUser={currentUser} value={this.state.data_task} />}
      >
        <div className={styles.cardList}>
          {/* <FormattedMessage id="accountandsettings.headerContent" /> */}
          <p
            style={{
              padding: '35px 0',
              color: 'darkgray',
              fontStyle: 'italic',
              marginBottom: '2px',
            }}
          >
            <FormattedMessage id="account.center.des" />
            {this.state.usage}
            <FormattedMessage id="account.center.times" />
          </p>
          <List
            rowKey="id"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={this.state.data}
            renderItem={(item) => {
              return (
                <List.Item key={item.pk}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a
                        key="option1"
                        onClick={() => {
                          request('/tasks/validate', {
                            method: 'POST',
                            data: { ai_id: item.pk },
                          }).then(() => {
                            // if (result.code === 200) {
                            //   history.push(`/dash/prediction/modelinfo/${item.pk}`);
                            // } else {
                            //   this.setcreditModalVisible(true);
                            // }
                            history.push(`/dash/prediction/modelinfo/${item.pk}`);
                          });
                        }}
                      >
                        <FormattedMessage id="accountandsettings.option1" />
                      </a>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div>
                          <Avatar
                            size={'large'}
                            src={
                              'https://prophetsrc-1305001068.cos.ap-chengdu.myqcloud.com/defalt.png'
                            }
                          />
                          <Link
                            onClick={() => {
                              request('/tasks/validate', {
                                method: 'POST',
                                data: { ai_id: item.pk },
                              }).then((result) => {
                                if (result.code === 200) {
                                  history.push(`/dash/prediction/modelinfo/${item.pk}`);
                                } else {
                                  this.setcreditModalVisible(true);
                                }
                              });
                            }}
                          >
                            {item.fields.ai_name}
                          </Link>
                        </div>
                      }
                      description={
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.fields.ai_true_description}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
          />
          {/* <Modal
            title={formatMessage({
              id: 'pages.dashboard.aimodels.cardModal.title',
            })}
            centered
            visible={this.state.creditModalVisible}
            onOk={() => this.setcreditModalVisible(false)}
            onCancel={() => this.setcreditModalVisible(false)}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  this.setcreditModalVisible(false);
                }}
              >
                <ImportOutlined />
                {formatMessage({
                  id: 'pages.dashboard.aimodels.button1',
                })}
              </Button>,
              <Button
                key="TopUp"
                onClick={() => {
                  history.push(`/dash/account/topup`);
                }}
              >
                <DollarOutlined />
                {formatMessage({
                  id: 'accountandsettings.basic.topup',
                })}
              </Button>,
            ]}
          >
            <p>
              {formatMessage({
                id: 'pages.dashboard.aimodels.modalcontent1',
              })}
            </p>
            <p>
              {formatMessage({
                id: 'pages.dashboard.aimodels.modalcontent2',
              })}
            </p>
          </Modal> */}
        </div>
      </PageContainer>
    );
  }
}

export default connect(({ dashboardAndworkplace: { currentUser }, loading }) => ({
  currentUser,
  currentUserLoading: loading.effects['dashboardAndworkplace/fetchUserCurrent'],
}))(Workplace);
