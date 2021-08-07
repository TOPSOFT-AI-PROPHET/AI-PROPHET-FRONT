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
import MyComponents from './JsonGenerator';

const { confirm } = Modal;

function showConfirm() {
  confirm({
    style: { top: '30%' },
    title: formatMessage({ id: 'pages.dashboard.modelCreator.Form.FormItem.showConfirm.title' }),
    icon: <ExclamationCircleOutlined />,
    content: formatMessage({ id: 'pages.dashboard.modelCreator.Form.FormItem.showConfirm.title' }),
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
    this.parentRef = React.createRef();
    this.state = {
      JSONData: undefined,
      selectValue: undefined,
      card3Para: undefined,
      loading: false,
      UploadYN: false,
      submitModalVisible: false,
      JSONModalVisible: false,
      checkBox: true,
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
      selected: true,
    });
  };

  onCheck = async () => {
    // console.log(this.state);
    try {
      const values = await this.formRef.current.validateFields();
      console.log(values);
      if (!this.state.UploadYN) {
        // 上传验证尚未完善
        message.warn(
          formatMessage({
            id: 'pages.dashboard.modelCreator.Form.FormItem.onCheck.message.warn.upload',
          }),
        );
        this.scrollToAnchor('Upload');
        return;
      }
      console.log('Success:', values);
      request('/tasks/train', {
        method: 'POST',
        data: {
          ai_name: this.formRef.current.getFieldValue('modelName'),
          ai_price: Number(this.formRef.current.getFieldValue('price')),
          ai_true_desc: this.formRef.current.getFieldValue('intro'),
          ai_desc: this.formRef.current.getFieldValue('JSONData'),
          ai_opUnit: this.formRef.current.getFieldValue('Unit'),
          ai_type: this.formRef.current.getFieldValue('algorithm'),
          auto_active: this.state.checkBox ? 1 : 0,
          dataset: this.state.dataSet,
        },
      }).then((result) => {
        // console.log(result.code);
        if (result.code === 200) {
          message.success(
            formatMessage({
              id: 'pages.dashboard.modelCreator.Form.FormItem.onCheck.message.warn.submit.success',
            }),
          );
          history.push('/dash/model/model');
          console.log('success');
        } else {
          message.warn(
            formatMessage({
              id: 'pages.dashboard.modelCreator.Form.FormItem.onCheck.message.warn.submit',
            }),
          );
        }
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.warn(
        formatMessage({
          id: 'pages.dashboard.modelCreator.Form.FormItem.onCheck.message.warn.submit',
        }),
      );
    }
  };

  beforeUpload = (file) => {
    const suffix = file.name.split('.')[1];
    const isLt800M = file.size / 1024 / 1024 < 800; // limited picture size(not using)
    const isCSV = suffix.toLowerCase() === 'csv';
    if (!isLt800M) {
      message.error(
        formatMessage({
          id: 'pages.dashboard.modelCreator.Form.FormItem.beforeUpload.message.error',
        }),
      );
      // error message for valid size
      return Upload.LIST_IGNORE;
    }

    if (!isCSV) {
      message.error(
        formatMessage({
          id: 'pages.dashboard.modelCreator.Form.FormItem.beforeUpload.message.error.fileType',
        }),
      );
      // error message for valid size
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // console.log(reader)
    reader.onload = (e) => {
      // console.log(e);
      this.setState({
        dataSet: e.target.result,
      });
    };

    return false;
  };

  uploadOnRemove = () => {
    console.log('removed');
    // this.setState({
    // })
  };

  setSubmitModalVisible(submitModalVisible) {
    this.setState({ submitModalVisible });
  }

  setJSONModalVisible(JSONModalVisible) {
    this.setState({ JSONModalVisible });
  }

  checkBoxOnChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e) {
      // this.formRef.current.setFieldsValue({ checkBox: e.target.checked });
      this.setState({
        checkBox: !this.state.checkBox,
      });
      // console.log(this.formRef.current.getFieldValue());
    }
  };

  resetJsonData() {
    // this.formRef.current.setFieldsValue({
    //   JSONData: undefined,
    // })
  }

  card3RenderPara = (treeData) => {
    let crtTitle = '';
    let crtLink = '';
    // console.log(this.state.selectValue);

    if (this.state.selected) {
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
            value: 0,
            link: 'https://www.example1.com',
          },
          {
            title: formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-treeSelect1-2',
            }),
            value: 1,
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
                      min: 5,
                      message: '名称至少为 5 个字符',
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
                      message: "Can't be blank",
                    },
                    {
                      pattern: /^[1-9][0-9]*$/,
                      message: 'Only can be number',
                    },
                    {},
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      if (e) {
                        this.formRef.current.setFieldsValue({ price: e.target.value });
                        // console.log(this.formRef.current.getFieldValue());
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
                      min: 10,
                      message: '模型介绍至少为 10 个字符',
                    },
                  ]}
                >
                  <Input.TextArea
                    onChange={(e) => {
                      if (e) {
                        this.formRef.current.setFieldsValue({ intro: e.target.value });
                        // console.log(this.formRef.current.getFieldValue());
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
                  <Checkbox defaultChecked onChange={this.checkBoxOnChange}>
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
                      message: "You haven't generate JSON data",
                    },
                  ]}
                >
                  <Button
                    onClick={() => {
                      this.setJSONModalVisible(true);
                    }}
                  >
                    {formatMessage({ id: 'pages.dashboard.modelCreator.Modal2.title' })}
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  name="Unit"
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card2-content-input2' })}
                  rules={[
                    {
                      required: true,
                      message: "Can't be blank",
                    },
                  ]}
                >
                  <Input
                    onChange={() => {
                      // console.log(this.formRef.current.getFieldValue());
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
                      message: "Can't be blank",
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
              <Upload
                maxCount={1}
                beforeUpload={this.beforeUpload}
                onRemove={this.uploadOnRemove}
                onChange={this.uploadOnChange}
              >
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
                    this.setSubmitModalVisible(true);
                  }}
                >
                  {formatMessage({
                    id: 'pages.dashboard.modelCreator.Form.FormItem.Button.submit',
                  })}
                </Button>
                <Button
                  type="primary"
                  style={{ float: 'right', marginRight: '20px' }}
                  onClick={() => {
                    showConfirm();
                  }}
                >
                  {formatMessage({
                    id: 'pages.dashboard.modelCreator.Form.FormItem.Button.cancel',
                  })}
                </Button>
              </Form.Item>
            </div>
          </Form>
          <Modal // 防误触确认提交modal
            title={formatMessage({
              id: 'pages.dashboard.aimodels.cardModal.title',
            })}
            centered
            visible={this.state.submitModalVisible}
            onOk={() => this.setSubmitModalVisible(false)}
            onCancel={() => this.setSubmitModalVisible(false)}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  this.setSubmitModalVisible(false);
                }}
              >
                {formatMessage({ id: 'pages.dashboard.modelCreator.Modal1.footer.button1' })}
              </Button>,
              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={() => {
                  this.onCheck();
                  this.setSubmitModalVisible(false);
                }}
              >
                {formatMessage({ id: 'pages.dashboard.modelCreator.Modal1.footer.button2' })}
              </Button>,
            ]}
          >
            <p>你确认提交么？</p>
          </Modal>
          <Modal
            title={formatMessage({ id: 'pages.dashboard.modelCreator.Modal2.title' })}
            centered
            width={888}
            visible={this.state.JSONModalVisible}
            onOk={() => this.setJSONModalVisible(false)}
            onCancel={() => this.setJSONModalVisible(false)}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  this.setJSONModalVisible(false);
                }}
              >
                {formatMessage({ id: 'pages.dashboard.modelCreator.Modal2.footer.button1' })}
              </Button>,
              <Button
                key="submit"
                onClick={() => {
                  this.formRef.current.setFieldsValue({
                    JSONData: this.parentRef.current.innerHTML,
                  });
                  // console.log(this.formRef.current.getFieldsValue());
                  this.setJSONModalVisible(false);
                }}
              >
                {formatMessage({ id: 'pages.dashboard.modelCreator.Modal2.footer.button2' })}
              </Button>,
            ]}
          >
            <MyComponents ref={this.parentRef} />
          </Modal>
        </div>
      </PageContainer>
    );
  }
}
