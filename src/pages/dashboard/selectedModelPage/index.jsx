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
} from 'antd';
import styles from './index.less';
import { FormattedMessage, formatMessage, history } from 'umi';
import { FileTextOutlined } from '@ant-design/icons';
import request from '@/utils/request';

export default class TransitionPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
      validateCode: 0,
      creditModalVisible: false,
      AIusage: 0,
    };
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    request('/tasks/getAIMusage', {
      method: 'post',
      data: { ai_id: this.props.match.params.id },
    }).then((result) => {
      this.setState({
        AIusage: result.data,
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
  }

  render() {
    const { current } = this.state;
    const labels = [
      {
        key: 1,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels1' }),
        content: '',
      },
      {
        key: 2,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels2' }),
        content: '',
      },
      {
        key: 3,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels3' }),
        content: '',
      },
      {
        key: 4,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels4' }),
        content: '',
      },
      {
        key: 5,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels5' }),
        content: '',
      },
      {
        key: 6,
        label: formatMessage({ id: 'pages.dashboard.selectedModelPage.labels6' }),
        content: '',
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
            value={0}
          />
        </div>
        <div className={styles.statItem}>
          <Statistic
            title={<FormattedMessage id="pages.dashboard.selectedModelPage.stats2" />}
            value={0}
          />
        </div>
      </div>
    );
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
          <p>underdevelopment</p>
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
              <div className={styles.contentTitle}>大帅比</div>
              <div>黄小薇永远的神</div>
            </div>
            <div className={styles.sideContent}>
              <p>
                {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para1' })}{' '}
                <strong>{this.state.AIusage}</strong>{' '}
                {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-paraUnit' })}
              </p>
              <p>
                {formatMessage({ id: 'pages.dashboard.selectedModelPage.card2-para2' })}{' '}
                <strong>{100}</strong>{' '}
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
                      if (this.state.validateCode === 200) {
                        history.push(
                          `/dash/prediction/newprediction/${this.props.match.params.id}`,
                        );
                      } else {
                        this.setcreditModalVisible(true);
                      }
                    }}
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
      </PageContainer>
    );
  }
}
