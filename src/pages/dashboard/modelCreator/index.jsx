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
    style: { top: '30%' },
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
      checkBox: false,
      dataSet: undefined,
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
    console.log(e);
    // 验证上传操作
    if (e.fileList.length === 1) {
      console.log('done');
      this.setState({
        UploadYN: true,
      });
    } else {
      this.setState({
        UploadYN: false,
      });
    }
    // console.log(e)
  };

  onchangeInTreeSelect = (value) => {
    this.setState({
      selectValue: value,
    });
  };

  onCheck = async () => {
    console.log(this.state);
    try {
      const values = await this.formRef.current.validateFields();
      if (!this.state.UploadYN) {
        // 上传验证尚未完善
        message.warn('未上传数据集');
        this.scrollToAnchor('Upload');
        return;
      }
      console.log('Success:', values);
      request('/tasks/train', {
        method: 'POST',
        data: {
          ai_name: this.formRef.current.getFieldValue('modelName'),
          ai_price: this.formRef.current.getFieldValue('price'),
          ai_true_desc: this.formRef.current.getFieldValue('intro'),
          ai_desc: this.formRef.current.getFieldValue('JSONData'),
          ai_opUnit: this.formRef.current.getFieldValue('Unit'),
          ai_type: this.formRef.current.getFieldValue('algorithm'),
          auto_active: this.state.checkBox ? 1 : 0,
          dataset: this.state.dataSet,
        },
      }).then((result) => {
        console.log(result.code);
        if (result.code === 200) {
          message.success('Success');
          console.log('success');
        } else {
          message.warn('fail to submit');
        }
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.warn('提交校验失败');
    }
  };

  beforeUpload = (file) => {
    // console.log(file)
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    // console.log(reader)
    reader.onload = (e) => {
      console.log(e);
      this.setState({
        dataSet: e.target.result,
      });
    };
  };

  setcreditModalVisible(creditModalVisible) {
    this.setState({ creditModalVisible });
  }

  checkBoxOnChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e) {
      this.formRef.current.setFieldsValue({ checkBox: e.target.checked });
      this.setState({
        checkBox: !this.state.checkBox,
      });
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
        value: 'a',
        selectable: false,
        children: [
          {
            title: formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-treeSelect1-1',
            }),
            value: '0',
            link: 'https://www.baidu.com',
          },
          {
            title: formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-treeSelect1-2',
            }),
            value: '1',
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
              <Upload maxCount={1} beforeUpload={this.beforeUpload} onChange={this.uploadOnChange}>
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
