import { UploadOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message, Space } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

// const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="accountandsettings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage
            id="accountandsettings.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload>
  </>
);

const validatorPhone = (value, callback) => {
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
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;
    console.log(currentUser);

    if (currentUser) {
      if (currentUser.profile_image_url) {
        return currentUser.profile_image_url;
      }

      const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
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
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountandsettings.basic.nickname-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user_sing"
              label={formatMessage({
                id: 'accountandsettings.basic.profile',
              })}
              rules={[
                {
                  required: true,
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
                  required: true,
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
              <PhoneView />
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
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="accountandsettings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))(BaseView);
