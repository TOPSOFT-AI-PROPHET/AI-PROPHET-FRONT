import { UploadOutlined, DollarOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message, Space } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import PhoneView from './PhoneView';
import styles from './BaseView.less';
import request from '@/utils/request';

// const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

class BaseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      contact_number: '',
      user_sing: '',
      loading: 'false',
    };
  }

  view = undefined;

  componentDidMount() {
    const { currentUser } = this.props;

    this.setState({
      nickname: currentUser.nickname,
      contact_number: currentUser.contact_number,
      user_sing: currentUser.user_sing,
    });
  }

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (currentUser.profile_image_url) {
        return currentUser.profile_image_url;
      }

      const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  handleAvaterChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // update avater for uesr
      this.setState({
        loading: false,
        // imageUrl,
      });
    }
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  getViewDom = (ref) => {
    this.view = ref;
  };

  handleFinish = () => {
    message.success(
      formatMessage({
        id: 'accountandsettings.basic.update.success',
      }),
    );
  };

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2; // limited picture size(not using)
    if (!isLt2M) {
      // error message for valid size
    }
    return isJpgOrPng && isLt2M;
  }

  handleSubmit = () => {
    request('/users/updateUserProfile', {
      method: 'POST',
      data: {
        nickname: this.state.nickname,
        contact_number: this.state.contact_number,
        // user_sing: this.state.user_sing,
      },
    }).then(() => {});
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            {/* <Form.Item
              name="email"
              label={formatMessage({
                id: 'accountandsettings.basic.email',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.email-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              name="nickname"
              label={formatMessage({
                id: 'accountandsettings.basic.nickname',
              })}
              rules={[
                {
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.nickname-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input
                placeholder={formatMessage({
                  id: 'accountandsettings.basic.nickname-placeHolder',
                })}
                onChange={(e) => {
                  if (e) {
                    this.setState({
                      nickname: e.target.value,
                    });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              name="user_sing"
              label={formatMessage({
                id: 'accountandsettings.basic.profile',
              })}
              rules={[
                {
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.profile-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input.TextArea
                placeholder={formatMessage({
                  id: 'accountandsettings.basic.profile-placeholder',
                })}
                rows={4}
                onChange={(e) => {
                  if (e) {
                    this.setState({
                      user_sing: e.target.value,
                    });
                  }
                }}
              />
            </Form.Item>

            {/* <Form.Item
              name="country"
              label={formatMessage({
                id: 'accountandsettings.basic.country',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.country-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Select
                style={{
                  maxWidth: 220,
                }}
              >
                <Option value="China">中国</Option>
              </Select>

            </Form.Item>
            <Form.Item
              name="geographic"
              label={formatMessage({
                id: 'accountandsettings.basic.geographic',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.geographic-message',
                    },
                    {},
                  ),
                },
                {
                  validator: validatorGeographic,
                },
              ]}
            >
              <GeographicView />
            </Form.Item>
            <Form.Item
              name="address"
              label={formatMessage({
                id: 'accountandsettings.basic.address',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.address-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item> */}

            <Form.Item
              name="contact_number"
              label={formatMessage({
                id: 'accountandsettings.basic.phone',
              })}
              rules={[
                {
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.phone-message',
                    },
                    {},
                  ),
                },
                {
                  validator: validatorPhone,
                },
              ]}
            >
              <PhoneView
                onChange={(e) => {
                  if (e) {
                    this.setState({
                      contact_number: e,
                    });
                  }
                }}
              />
            </Form.Item>

            <div>
              <Space size={12} align={'center'}>
                {formatMessage({
                  id: 'accountandsettings.basic.credit',
                })}

                {/* currentUser.credit */}
                <Input
                  prefix="￥"
                  placeholder={currentUser.credit}
                  suffix="RMB"
                  disabled
                  bordered={false}
                />

                <Button>
                  <DollarOutlined />
                  {formatMessage({
                    id: 'accountandsettings.basic.topup',
                  })}
                </Button>
              </Space>
            </div>
            <br />

            <Form.Item>
              <Button htmlType="submit" type="primary" onClick={this.handleSubmit}>
                <FormattedMessage
                  id="accountandsettings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <>
            <div className={styles.avatar_title}>
              <FormattedMessage id="accountandsettings.basic.avatar" defaultMessage="Avatar" />
            </div>
            <div className={styles.avatar}>
              <img src={this.getAvatarURL()} alt="avatar" />
            </div>
            <Upload
              showUploadList={false}
              name="avater"
              className="avatar-uploader"
              beforeUpload={this.beforeUpload}
              onChange={this.handleAvaterChange}
              action="/users/uploadProfile"
              method="POST"
            >
              <div className={styles.button_view}>
                <Button>
                  {this.state.loading ? <UploadOutlined /> : <LoadingOutlined />}{' '}
                  <FormattedMessage
                    id="accountandsettings.basic.change-avatar"
                    defaultMessage="Change avatar"
                  />
                </Button>
              </div>
            </Upload>
          </>
        </div>
      </div>
    );
  }
}

export default connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))(BaseView);
