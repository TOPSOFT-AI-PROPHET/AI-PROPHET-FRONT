import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Descriptions,
  Statistic,
  Menu,
  Card,
  Space,
  Avatar,
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Empty,
} from 'antd';
import styles from './index.less';
import { FormattedMessage, formatMessage, history } from 'umi';
import { FileTextOutlined, ImportOutlined, DollarOutlined } from '@ant-design/icons';
import request from '@/utils/request';

export default class TransitionPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
      validateCode: 0,
      creditModalVisible: false,
      AIVisit: 0,
      author: '',
      data: [
        {
          fields: {},
        },
      ],
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
        author: result.author,
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

    request('/tasks/getAIMusage', {
      // 获取模型访问次数
      method: 'post',
      data: { ai_id: Number(this.props.match.params.id) },
    }).then((result) => {
      this.setState({
        AIVisit: result.data,
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

  handleModelType() {
    if (!this.state.data[0]) {
      return '';
    }
    if (this.state.data[0].fields.ai_type === 0 || this.state.data[0].fields.ai_type === 1) {
      return '数据集模型';
    }
    return '图片集模型';
  }

  render() {
    const { current } = this.state;
    const labels = [
      {
        key: 1,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels1' }),
        content: this.state.author,
      },
      {
        key: 2,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels2' }),
        content: this.state.data[0].fields.time_start,
      },
      {
        key: 3,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels3' }),
        content: this.handleModelType(),
      },
      {
        key: 4,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels4' }),
        content:
          this.state.data[0].fields.ai_type === 0
            ? 'Traditional ML Decision Tree'
            : 'Traditional ML Random Forest',
      },
      {
        key: 5,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels5' }),
        content: this.state.data[0].fields.ai_training_material_count,
      },
      {
        key: 6,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels6' }),
        content: this.state.data[0].fields.ai_output_unit,
      },
    ];
    const content = (
      <div className={styles.pageHeaderContent}>
        <Descriptions column={{ xs: 2, sm: 2, md: 2 }} size={'small'}>
          {labels.map((item) => {
            return (
              <Descriptions.Item key={item.key} labelStyle={{ color: 'grey' }} label={item.label}>
                {item.content}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <Statistic
            title={<FormattedMessage id="pages.dashboard.selectedModelPage.stats1" />}
            value={this.state.data[0].fields.ai_usage}
          />
        </div>
        <div className={styles.statItem}>
          <Statistic
            title={<FormattedMessage id="pages.dashboard.selectedModelPage.stats2" />}
            value={this.state.data[0].fields.ai_credit}
          />
        </div>
      </div>
    );

    if (this.state.data[0]) {
      return (
        <PageContainer content={content} extraContent={extraContent}>
          <div style={{ margin: '-24px -24px 24px -24px' }}>
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="mail" icon={<FileTextOutlined />} style={{ left: '6px' }}>
                {formatMessage({ id: 'pages.dashboard.selectedModelPage.Menu1' })}
              </Menu.Item>
            </Menu>
          </div>
          <Card
            title={formatMessage({ id: 'pages.dashboard.selectedModelPage.card1-title' })}
            style={{ margin: '0px 0px 24px 0px' }}
          >
            <p>{this.state.data[0].fields.ai_true_description}</p>
          </Card>
          <Card
            title={formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-title' })}
            style={{ margin: '0px 0px 24px 0px' }}
          >
            <div className={styles.card2Content}>
              <div className={styles.cardAvatar}>
                <Avatar size={48} />
              </div>
              <div className={styles.content}>
                <div className={styles.contentTitle}>{this.state.author}</div>
                <div>underdevelopment</div>
              </div>
              <div className={styles.sideContent}>
                <p>
                  {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para1' })}{' '}
                  <strong>{this.state.data[0].fields.ai_usage}</strong>{' '}
                  {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-paraUnit' })}
                </p>
                <p>
                  {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para2' })}{' '}
                  <strong>{this.state.AIVisit}</strong>{' '}
                  {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-paraUnit' })}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <Row justify="space-around" align="middle">
              <Col xs={16} sm={16} md={10} lg={10} xl={8}>
                <div>
                  <Form ref={this.formRef}>
                    <Form.Item>
                      <Input.TextArea
                        style={{ width: 'auto' }}
                        showCount
                        maxLength={50}
                        placeholder={formatMessage({
                          id: 'pages.dashboard.selectedModelPage.card3.input-placeholder',
                        })}
                        rows={5}
                        onChange={(e) => {
                          if (e) {
                            this.formRef.current.setFieldsValue({ modelinfo: e.target.value });
                          }
                        }}
                      />
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={16}>
                <div style={{ lineHeight: '120px', textAlign: 'center', alignItems: 'center' }}>
                  <Space size={50}>
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() => {
                        request('/tasks/validate', {
                          method: 'POST',
                          data: { ai_id: this.props.match.params.id },
                        }).then(() => {
                          if (this.state.validateCode === 200) {
                            history.push(
                              `/dash/prediction/newprediction/${this.props.match.params.id}`,
                            );
                          } else {
                            this.setcreditModalVisible(true);
                          }
                        });
                      }}
                      // onClick={() => {
                      //   if (this.state.validateCode === 200) {
                      //     history.push(
                      //       `/dash/prediction/newprediction/${this.props.match.params.id}`,
                      //     );
                      //   } else {
                      //     this.setcreditModalVisible(true);
                      //   }
                      // }}
                    >
                      {formatMessage({ id: 'pages.dashboard.selectedModelPage.card3.button1' })}
                    </Button>
                    <Button type="primary" shape="round">
                      {formatMessage({ id: 'pages.dashboard.selectedModelPage.card3.button2' })}
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
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
    return <Empty />;
  }
}
