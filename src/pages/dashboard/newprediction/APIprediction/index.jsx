import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Menu, Card, Button, Modal, Result } from 'antd';
import styles from './index.less';
import { formatMessage, history } from 'umi';
import { FileTextOutlined, ImportOutlined, DollarOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import COS from 'cos-js-sdk-v5';

export default class TransitionPg extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      current: 'mail',
      validateCode: 0,
      creditModalVisible: false,
      personal_ai_model_usage: 0,
      AIVisit: '-',
      author: undefined,
      author_id: undefined,
      author_uuid: undefined,
      author_sing: undefined,
      author_level: 't5',
      data: [
        {
          fields: {},
        },
      ],
      sucessStatus: 0,
    };
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  setcreditModalVisible(creditModalVisible) {
    this.setState({ creditModalVisible });
  }

  componentDidMount() {
    // let userID;
    // request('/users/returnUsrID', { method: 'POST' }).then((result) => {
    //   userID = result.data.user_id;
    // });

    request('/tasks/modelAuthor', {
      method: 'post',
      data: { ai_id: Number(this.props.match.params.id) },
    }).then((result) => {
      this.setState({
        author_id: result.user_id,
        author_uuid: result.uuid,
        author: result.author,
        author_sing: result.user_singnature,
      });
      this.handleAvatar(result.uuid);

      request('/tasks/personalAImodelUsage', {
        method: 'POST',
        data: { user_id: Number(result.user_id) },
      }).then((result2) => {
        this.setState({
          personal_ai_model_usage: result2.ai_model_usage,
        });
      });
    });

    request('/tasks/validate', {
      method: 'POST',
      data: { ai_id: this.props.match.params.id },
    }).then((result) => {
      this.setState({
        validateCode: result.code,
      });
    });

    request('/tasks/modeldetail', {
      method: 'POST',
      data: { ai_id: this.props.match.params.id },
    })
      .then((result) => {
        console.log(result);
        this.setState({
          data: result.data,
        });
      })
      .catch((e) => console.log(e));
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
            author_profile_url: data.Url,
          });
        },
      );
    } else {
      this.setState({
        author_profile_url:
          'https://prophetsrc-1305001068.cos.ap-chengdu.myqcloud.com/defalutprofile.png',
      });
    }
  }

  handleModelType() {
    if (!this.state.data[0]) {
      return '';
    }
    if (this.state.data[0].fields.ai_type === 0 || this.state.data[0].fields.ai_type === 1) {
      return '数据集模型';
    }
    return '图片集模型';
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  };

  onCheck = async () => {
    try {
      const values = await this.formRef.current.validateFields();
      console.log('Success:', values);

      request('/tasks/validate', {
        method: 'POST',
        data: { ai_id: this.props.match.params.id },
      }).then(() => {
        if (this.state.validateCode === 200) {
          history.push({
            pathname: `/dash/prediction/newprediction/${this.props.match.params.id}`,
            query: {
              notes: `${this.formRef.current.getFieldValue('notes')}`,
            },
          });
        } else {
          this.setcreditModalVisible(true);
        }
      });
    } catch (e) {
      console.log('Fail', e);
      this.scrollToAnchor('notes');
    }
  };

  render() {
    const { current } = this.state;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          请按照<a href={'https://www.example.com'}>《先知系统API文档》</a>
          将先知系统能力接入您的应用程序。该文档包含接口调用入口和返回值内容，以及调用格式，请严格遵守文档内的传参格式。
          <br />
          <br />
          您的模型密钥:asd-fsdfa-sdgvasd-sdga-dfsdf
          <br />
          <br />
          模型ID:29
        </p>
      </div>
    );

    console.log(this.state.sucessStatus);
    if (this.state.data[0] && this.state.sucessStatus === 0) {
      console.log(this.state.data[0]);

      return (
        <PageContainer content={content}>
          <div style={{ margin: '-24px -24px 24px -24px' }}>
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="mail" icon={<FileTextOutlined />} style={{ left: '6px' }}>
                {formatMessage({ id: 'pages.dashboard.selectedModelPage.Menu2' })}
              </Menu.Item>
            </Menu>
          </div>

          <Card
            title={`${formatMessage({
              id: 'pages.dashboard.selectedModelPage.card2-title-key',
            })}(ajsda-asdfasf-dfsdf-dsga)`}
            style={{ margin: '0px 0px 24px 0px' }}
          >
            <div className={styles.card2Content}>
              <div className={styles.content}>
                <Result status="success" title="OK!!!" />,
              </div>

              <div className={styles.sideContent} style={{ margin: '95px 24px 24px 24px' }}>
                <p>
                  {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para3' })}{' '}
                  <strong>
                    {this.state.personal_ai_model_usage === 'None'
                      ? 0
                      : this.state.personal_ai_model_usage}
                  </strong>{' '}
                </p>
                <p>
                  {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para4' })}{' '}
                  <strong>{this.state.AIVisit}</strong>{' '}
                </p>

                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ sucessStatus: 1 });
                  }}
                >
                  切换状态
                </Button>
              </div>
            </div>
          </Card>
          <Modal
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
          </Modal>
        </PageContainer>
      );
    }

    return (
      <PageContainer content={content}>
        <div style={{ margin: '-24px -24px 24px -24px' }}>
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="mail" icon={<FileTextOutlined />} style={{ left: '6px' }}>
              {formatMessage({ id: 'pages.dashboard.selectedModelPage.Menu2' })}
            </Menu.Item>
          </Menu>
        </div>

        <Card
          title={`${formatMessage({
            id: 'pages.dashboard.selectedModelPage.card2-title-key',
          })}(ajsda-asdfasf-dfsdf-dsga)`}
          style={{ margin: '0px 0px 24px 0px' }}
        >
          <div className={styles.card2Content}>
            <div className={styles.content}>
              <Result status="error" title="NOT OK!!!" />,
            </div>

            <div className={styles.sideContent} style={{ margin: '95px 24px 24px 24px' }}>
              <p>
                {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para3' })}{' '}
                <strong>
                  {this.state.personal_ai_model_usage === 'None'
                    ? 0
                    : this.state.personal_ai_model_usage}
                </strong>{' '}
              </p>
              <p>
                {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para4' })}{' '}
                <strong>{this.state.AIVisit}</strong>{' '}
              </p>

              <Button
                type="primary"
                onClick={() => {
                  this.setState({ sucessStatus: 0 });
                }}
              >
                切换状态
              </Button>
            </div>

            <div style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ color: 'rgb(255, 0, 50)' }}>
                您的接口已停用，先知系统会忽略来自该密钥的所有请求，请检查您的账户余额
              </p>
            </div>
          </div>
        </Card>

        <Modal
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
        </Modal>
      </PageContainer>
    );
  }
}
