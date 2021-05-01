import { UploadOutlined, DollarOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message, Space, Empty } from 'antd';
import { connect, FormattedMessage, formatMessage, history } from 'umi';
import React, { Component } from 'react';
import PhoneView from './PhoneView';
import styles from './BaseView.less';
import request from '@/utils/request';
import defaultSettings from '../../../../../config/defaultSettings';
import {
  setAccessCode,
  getAccessCode,
  getAccessTime,
  getRefreshCode,
  setAccessTime,
} from '../../../../utils/authority';

// const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    // callback('Please input your area code!');
  }
  if (!values[1]) {
    // callback('Please input your phone number!');
  }
  callback();
};

class BaseView extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      loading: 'false',
      data: {},
      code: '',
    };
  }

  view = undefined;

  componentDidMount() {
    request('/users/getUserInfo', { method: 'POST' })
      .then((result) => {
        if (result.data) {
          this.setState({
            data: result.data,
          });
        }
      })
      .catch((e) => console.log(e));

    this.handleAccessCode(
      process.env.NODE_ENV !== 'development'
        ? `${defaultSettings.backURL}/users/uploadProfile`
        : `/users/uploadProfile`,
    ).then((result) => {
      this.setState({
        code: result,
      });
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
        nickname: this.formRef.current.getFieldValue('nickname'),
        contact_number: this.formRef.current.getFieldValue('contact_number'),
        email: this.formRef.current.getFieldValue('email'),
        user_sing: this.formRef.current.getFieldValue('user_sing'),
      },
    }).then((result) => {
      if (result.code) {
        if (result.code === 200) {
          message.success(
            formatMessage({
              id: 'accountandsettings.basic.update.success',
            }),
          );
        } else {
          message.error(
            formatMessage({
              id: 'accountandsettings.basic.update.fail',
            }),
          );
        }
      } else {
        message.error(
          formatMessage({
            id: 'accountandsettings.basic.update.fail',
          }),
        );
      }
    });
  };

  async handleAccessCode(url) {
    let AccessCode = getAccessCode();
    if (
      getAccessTime() <= Date.now() - 5 * 55 * 1000 &&
      url !== '/users/refresh' &&
      AccessCode !== '' &&
      getRefreshCode() !== ''
    ) {
      const data = await request('/users/refresh', {
        method: 'POST',
        data: {
          refresh: getRefreshCode(),
        },
      });
      setAccessCode(data.access);
      setAccessTime(Date.now());
      AccessCode = data.access;
      console.log('已更新 ACCESS 密钥');
    }
    if (AccessCode !== '') {
      return AccessCode;
    }
    // console.log(AccessCode)
    return AccessCode;
  }

  render() {
    const { currentUser } = this.props;
    if (this.state.data.username) {
      return (
        <div className={styles.baseView} ref={this.getViewDom}>
          <div className={styles.left}>
            <Form
              ref={this.formRef}
              layout="vertical"
              // onFinish={this.handleFinish}
              initialValues={this.state.data}
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
                  maxLength={18}
                  placeholder={formatMessage({
                    id: 'accountandsettings.basic.nickname-placeHolder',
                  })}
                  onChange={(e) => {
                    if (e) {
                      this.formRef.current.setFieldsValue({ nickname: e.target.value });
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
                  showCount
                  maxLength={50}
                  placeholder={formatMessage({
                    id: 'accountandsettings.basic.profile-placeholder',
                  })}
                  rows={4}
                  onChange={(e) => {
                    if (e) {
                      this.formRef.current.setFieldsValue({ user_sing: e.target.value });
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
                      this.formRef.current.setFieldsValue({ contact_number: e });
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

                  <Button
                    onClick={() => {
                      history.push('/dash/account/topup');
                    }}
                  >
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

              <>
                <Upload
                  showUploadList={false}
                  name="avater"
                  className="avatar-uploader"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleAvaterChange}
                  action={
                    process.env.NODE_ENV !== 'development'
                      ? `${defaultSettings.backURL}/users/uploadProfile`
                      : `/users/uploadProfile`
                  }
                  method="POST"
                  headers={{
                    authorization: `Bearer ${this.state.code}`,
                  }}
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
            </>
          </div>
        </div>
      );
    }
    return <Empty />;
  }
}

export default connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))(BaseView);
