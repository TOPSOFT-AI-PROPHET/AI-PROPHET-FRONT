import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, Space, Radio, Select } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import styles from './EditorView.less';
import defaultSettings from '../../../../../config/defaultSettings';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

export default class EditorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickState: false,
    };
  }

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
                    this.formRef.current.setFieldsValue({ nickname: e.target.value });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              name="modelprice"
              label={formatMessage({
                id: 'accountandsettings.basic.modelprice',
              })}
              rules={[
                {
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.modelprice-message',
                    },
                    {},
                  ),
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
              rules={[
                {
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
              label={formatMessage({
                id: 'accountandsettings.basic.modeltype',
              })}
              rules={[
                {
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.modeltype-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Select defaultValue="jack">
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
              <Radio checked={this.state.clickState} />
            </Form.Item>
            <br />
            <Form.Item>
              <Space size="middle">
                <Button style={{ width: 68 }} htmlType="submit" onClick={this.handleSubmit}>
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
              <ImgCrop grid rotate shape={'rect'} beforeCrop={this.beforeCrop} aspect={10 / 1}>
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
                    <Button>
                      {this.state.loading ? <LoadingOutlined /> : <UploadOutlined />}{' '}
                      <FormattedMessage
                        id="accountandsettings.basic.change-cover"
                        defaultMessage="Change cover"
                      />
                    </Button>
                  </div>
                </Upload>
              </ImgCrop>
            </>
          </>
        </div>
      </div>
    );
  }
}
