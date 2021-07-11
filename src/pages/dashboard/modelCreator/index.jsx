import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { formatMessage, history } from 'umi';
import {
  Card,
  Checkbox,
  message,
  Modal,
  Input,
  Row,
  Col,
  Form,
  Upload,
  Button,
  TreeSelect,
} from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import request from '@/utils/request';

const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: '你确定要退出么？',
    icon: <ExclamationCircleOutlined />,
    content: '点击确定将返回我的模型管理',
    onOk() {
      history.push('/dash/model/model');
    },
    onCancel() {},
  });
}

export default class ModelCreator extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      selectValue: undefined,
      card3Para: undefined,
      loading: false,
      UploadYN: false,
      creditModalVisible: false,
    };
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  };

  uploadOnChange = (e) => {
    // 验证上传操作
    if (e.file.status === 'done') {
      console.log(123);
      this.setState({
        UploadYN: true,
      });
    }
  };

  onchangeInTreeSelect = (value) => {
    this.setState({
      selectValue: value,
    });
  };

  onCheck = async () => {
    try {
      const values = await this.formRef.current.validateFields();
      if (!this.state.UploadYN) {
        // 上传验证尚未完善
        message.warn('未上传数据集');
        this.scrollToAnchor('Upload');
        return;
      }
      console.log('Success:', values);
      request('/tasks/addAIM', {
        method: 'POST',
        data: {
          ai_name: this.formRef.current.getFieldValue('modelName'),
          ai_url: 'sdfsf',
          ai_status: 0,
          ai_description: {
            total_param: 0,
            detais: [
              {
                name: 'sdfsf',
                data_type: this.formRef.current.getFieldValue('JSONData'),
                ai_description: this.formRef.current.getFieldValue('intro'),
              },
            ],
          },
          ai_type: '',
          ai_credit: this.formRef.current.getFieldValue('price'),
        },
      }).then((result) => {
        if (result.code === 200) {
          message.success('success');
        } else {
          message.warn('fail to submit');
        }
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.warn('提交校验失败');
    }
  };

  beforeUpload = () => {};

  setcreditModalVisible(creditModalVisible) {
    this.setState({ creditModalVisible });
  }

  checkBoxOnChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e) {
      this.formRef.current.setFieldsValue({ checkBox: e.target.checked });
      console.log(this.formRef.current.getFieldValue());
    }
  };

  card3RenderPara = (treeData) => {
    let crtTitle = '';
    let crtLink = '';
    if (this.state.selectValue) {
      treeData.map((item) => {
        item.children.map((item1) => {
          if (item1.value === this.state.selectValue) {
            crtTitle = item1.title;
            crtLink = item1.link;
          }
          return 0;
        });
        return 0;
      });
      return (
        <div className={styles.para}>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.card3-content-para1',
          })}
          <strong>{crtTitle}</strong>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.card3-content-para2',
          })}
          <a href={crtLink} target="_blank" rel="noreferrer">
            {formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-para3',
            })}
            {crtTitle}
            {formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-para4',
            })}
          </a>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.card3-content-para5',
          })}
        </div>
      );
    }
    return (
      <div className={styles.para}>
        {formatMessage({ id: 'pages.dashboard.modelCreator.card3-content-para6' })}
      </div>
    );
  };

  render() {
    const content = (
      <div>
        {formatMessage({
          id: 'pages.dashboard.modelCreator.headerContent-textpara1',
        })}
        <a>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.headerContent-textpara2',
          })}
        </a>
        {formatMessage({
          id: 'pages.dashboard.modelCreator.headerContent-textpara3',
        })}
      </div>
    );

    const treeData = [
      {
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card3-content-treeSelect1' }),
        value: '0',
        selectable: false,
        children: [
          {
            title: formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-treeSelect1-1',
            }),
            value: 'DecisionTree',
            link: 'https://www.baidu.com',
          },
          {
            title: formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-treeSelect1-2',
            }),
            value: 'RandomForest',
            link: 'http://example.com/',
          },
        ],
      },
    ];
    const cards = [
      {
        key: 1,
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card1-title' }),
        content: (
          <div className={styles.content}>
            <Row gutter={[36, 36]} justify="space-around" align="middle">
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'cant be blank',
                    },
                  ]}
                  name="modelName"
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input1' })}
                >
                  <Input
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card1-content-input1-placeHolder',
                    })}
                  />
                </Form.Item>
                <Form.Item
                  name="price"
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input2' })}
                  rules={[
                    {
                      required: true,
                      message: 'cant be blank',
                    },
                    {
                      pattern: /^[1-9][0-9]*$/,
                      message: 'only can be number',
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      if (e) {
                        this.formRef.current.setFieldsValue({ price: e.target.value });
                        console.log(this.formRef.current.getFieldValue());
                      }
                    }}
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card1-content-input2-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  name="intro"
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input3' })}
                  rules={[
                    {
                      required: true,
                      message: 'cant be blank',
                    },
                  ]}
                >
                  <Input.TextArea
                    onChange={(e) => {
                      if (e) {
                        this.formRef.current.setFieldsValue({ intro: e.target.value });
                        console.log(this.formRef.current.getFieldValue());
                      }
                    }}
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    showCount
                    maxLength={50}
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card1-content-input3-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item name="checkBox">
                  <Checkbox onChange={this.checkBoxOnChange}>
                    {formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input4' })}
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </div>
        ),
        style: styles.card1,
      },
      {
        key: 2,
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card2-title' }),
        content: (
          <div>
            <Row gutter={[36, 36]} justify="space-around" align="middle">
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  name="JSONData"
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card2-content-input1' })}
                  rules={[
                    {
                      required: true,
                      message: 'cant be blank',
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      if (e) {
                        this.formRef.current.setFieldsValue({ JSONData: e.target.value });
                        console.log(this.formRef.current.getFieldValue());
                      }
                    }}
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card2-content-input1-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  name="Unit"
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card2-content-input2' })}
                  rules={[
                    {
                      required: true,
                      message: 'cant be blank',
                    },
                  ]}
                >
                  <Input
                    onChange={() => {
                      console.log(this.formRef.current.getFieldValue());
                    }}
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card2-content-input2-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ),
        style: styles.card2,
      },
      {
        key: 3,
        content: (
          <div className={styles.content}>
            <Row gutter={[36, 36]} justify="space-around" align="middle">
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  name="algorithm"
                  label={formatMessage({
                    id: 'pages.dashboard.modelCreator.card3-content-treeSelect-title',
                  })}
                  rules={[
                    {
                      required: true,
                      message: 'cant be blank',
                    },
                  ]}
                >
                  <TreeSelect
                    treeDefaultExpandAll
                    value={this.state.selectValue}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    onChange={this.onchangeInTreeSelect}
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card3-content-treeSelect-placeholder',
                    })}
                  ></TreeSelect>
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                {this.card3RenderPara(treeData)}
              </Col>
            </Row>
          </div>
        ),
        style: styles.card3,
      },
      {
        key: 4,
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card4-title' }),
        content: (
          <div id={'Upload'} className={styles.content}>
            <div className={styles.upload}>
              <Upload beforeUpload={this.beforeUpload} onChange={this.uploadOnChange}>
                <Button className={styles.button}>
                  {this.state.loading ? <LoadingOutlined /> : <UploadOutlined />}
                  {formatMessage({ id: 'pages.dashboard.modelCreator.card4-content-button' })}
                </Button>
              </Upload>
            </div>
            <div>
              <p>
                {formatMessage({ id: 'pages.dashboard.modelCreator.card4-content-uploadNote' })}
              </p>
            </div>
            <div className={styles.footer}>
              <p>{formatMessage({ id: 'pages.dashboard.modelCreator.card4-content-footer' })}</p>
            </div>
          </div>
        ),
        style: styles.card4,
      },
    ];
    return (
      <PageContainer content={content}>
        <div>
          <Form layout={'vertical'} ref={this.formRef}>
            {cards.map((item) => {
              return (
                <Card key={item.key} className={item.style} title={item.title}>
                  {item.content}
                </Card>
              );
            })}
            <div className={styles.bottomDiv}>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ float: 'right' }}
                  onClick={() => {
                    this.setcreditModalVisible(true);
                  }}
                >
                  提交
                </Button>
                <Button
                  type="primary"
                  style={{ float: 'right', marginRight: '20px' }}
                  onClick={() => {
                    showConfirm();
                  }}
                >
                  取消
                </Button>
              </Form.Item>
            </div>
          </Form>
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
                Back
              </Button>,
              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={() => {
                  this.onCheck();
                  this.setcreditModalVisible(false);
                }}
              >
                Submit
              </Button>,
            ]}
          >
            <p>你确认提交么？</p>
          </Modal>
        </div>
      </PageContainer>
    );
  }
}
