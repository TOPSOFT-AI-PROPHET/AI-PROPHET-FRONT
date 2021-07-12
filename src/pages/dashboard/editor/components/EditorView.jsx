import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, Space, Checkbox, Select, message, Modal } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import styles from './EditorView.less';
import defaultSettings from '../../../../../config/defaultSettings';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import request from '@/utils/request';
// import Cropper from 'react-easy-crop'

export default class EditorView extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: {
        modelname: '',
        modelprice: undefined,
        modelinfo: '',
        modelType: '',
        stack: undefined,
        modalVisible: false,
      },
    };
  }

  setModalVisible = (boolean) => {
    this.setState({
      modalVisible: boolean,
    });
  };

  checkBoxOnChange = (e) => {
    this.setState({
      stack: !this.state.stack,
    });
    console.log(`checked = ${e.target.checked}`);
    if (e) {
      this.formRef.current.setFieldsValue({ stack: e.target.checked });
      console.log(this.formRef.current.getFieldValue());
    }
  };

  handleSubmit = async (id) => {
    console.log(id);
    const checkboxChoice = () => {
      if (this.state.stack) {
        return 1;
      }
      return 0;
    };
    try {
      const values = await this.formRef.current.validateFields();
      console.log('Success:', values);
      request('/tasks/updateAIauthor', {
        method: 'post',
        data: {
          ai_id: this.props.match.params.id,
          publish: checkboxChoice(),
        },
      }).then((result) => {
        if (result.code === 200) {
          message.success('success');
        } else {
          message.warn('提交失败');
        }
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.warn('提交校验失败');
    }
  };

  render() {
    const { Option } = Select;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            ref={this.formRef}
            layout="vertical"
            initialValues={this.state.data}
            hideRequiredMark
          >
            <Form.Item
              name="modelname"
              label={formatMessage({
                id: 'accountandsettings.basic.modelname',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.modelname-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input
                maxLength={18}
                placeholder={formatMessage({
                  id: 'accountandsettings.basic.modelname-placeHolder',
                })}
                onChange={(e) => {
                  if (e) {
                    this.formRef.current.setFieldsValue({ modelname: e.target.value });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              name="modelprice"
              label={formatMessage({
                id: 'accountandsettings.basic.modelprice',
              })}
              onChange={(e) => {
                if (e) {
                  this.formRef.current.setFieldsValue({ modelprice: e.target.value });
                }
              }}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.modelprice-message',
                    },
                    {},
                  ),
                },
                {
                  pattern: /^[1-9][0-9]*$/,
                  message: 'it should be a whole number',
                },
              ]}
            >
              <Input
                maxLength={18}
                placeholder={formatMessage({
                  id: 'accountandsettings.basic.modelprice-placeHolder',
                })}
                onChange={(e) => {
                  if (e) {
                    this.formRef.current.setFieldsValue({ nickname: e.target.value });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              name="modelinfo"
              label={formatMessage({
                id: 'accountandsettings.basic.modelinfo',
              })}
              onChange={(e) => {
                if (e) {
                  this.formRef.current.setFieldsValue({ modelinfo: e.target.value });
                }
              }}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.modelinfo-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input.TextArea
                showCount
                maxLength={50}
                placeholder={formatMessage({
                  id: 'accountandsettings.basic.modelinfo-placeHolder',
                })}
                rows={4}
                onChange={(e) => {
                  if (e) {
                    this.formRef.current.setFieldsValue({ modelinfo: e.target.value });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              name="modelType"
              onChange={(e) => {
                if (e) {
                  this.formRef.current.setFieldsValue({ modeType: e.target.value });
                }
              }}
              label={formatMessage({
                id: 'accountandsettings.basic.modeltype',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.modeltype-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Select>
                <Option value="jack">
                  {formatMessage({ id: 'accountandsettings.basic.modeltype-selectOption1' })}
                </Option>
                <Option value="lucy">
                  {formatMessage({ id: 'accountandsettings.basic.modeltype-selectOption2' })}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="stack"
              label={formatMessage({
                id: 'accountandsettings.basic.stack',
              })}
            >
              <Checkbox onChange={this.checkBoxOnChange}></Checkbox>
            </Form.Item>
            <br />
            <Form.Item>
              <Space size="middle">
                <Button
                  style={{ width: 68 }}
                  htmlType="submit"
                  type="primary"
                  onClick={() => {
                    this.handleSubmit(this.props.match.params.id);
                  }}
                >
                  <FormattedMessage
                    id="accountandsettings.basic.save"
                    // defaultMessage="Update Information"
                  />
                </Button>
                <Button style={{ width: 68 }}>
                  <FormattedMessage
                    id="accountandsettings.basic.back"
                    // defaultMessage="Update Information"
                  />
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>

        <div className={styles.right}>
          <>
            <div className={styles.avatar_title}>
              <FormattedMessage id="accountandsettings.basic.modelAvatar" defaultMessage="Avatar" />
            </div>
            <div className={styles.avatar}>
              <img src={this.state.imageURL} alt="cover" />
            </div>

            <>
              <Upload
                showUploadList={false}
                name="avatar"
                className="avatar-uploader"
                beforeUpload={this.beforeUpload}
                onChange={this.handleAvaterChange}
                action={
                  process.env.NODE_ENV !== 'development'
                    ? `${defaultSettings.backURL}/users/updateUserProfileImage`
                    : `/users/updateUserProfileImage`
                }
                method="POST"
                headers={{
                  authorization: `Bearer ${this.state.code}`,
                }}
              >
                <div className={styles.button_view}>
                  <Button
                    onClick={() => {
                      this.setModalVisible(true);
                    }}
                  >
                    {this.state.loading ? <LoadingOutlined /> : <UploadOutlined />}{' '}
                    <FormattedMessage
                      id="accountandsettings.basic.change-cover"
                      defaultMessage="Change cover"
                    />
                  </Button>
                </div>
              </Upload>
              <Modal
                visible={this.state.modalVisible}
                onCancel={() => {
                  this.setModalVisible(false);
                }}
                onOk={() => {}}
              ></Modal>
            </>
          </>
        </div>
      </div>
    );
  }
}
