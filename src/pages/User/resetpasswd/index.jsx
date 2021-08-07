import { Form, Button, Input, Popover, Progress, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, history, FormattedMessage, formatMessage, useIntl } from 'umi';
import styles from './style.less';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = ({ submitting, dispatch, userAndregister }) => {
  const [visible, setvisible] = useState(false);
  const [prefix] = useState('86');
  const [popover, setpopover] = useState(false);
  const confirmDirty = false;
  const intl = useIntl();
  let interval;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!userAndregister) {
      return;
    }

    console.log(userAndregister);
    if (userAndregister.code === 200) {
      // eslint-disable-next-line
      userAndregister.code = undefined;
      message.success('密码修改成功！');
      history.push({
        pathname: '/user/login',
      });
    } else if (userAndregister.code === 403) {
      message.error('用户名或邮箱不可用');
      history.push({
        pathname: '/user/register',
      });
    }
  }, [userAndregister]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const onFinish = (values) => {
    dispatch({
      type: 'userAndregister/submit',
      payload: { ...values, prefix },
    });
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        formatMessage({
          id: 'userandregister.password.twice',
        }),
      );
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject(
        formatMessage({
          id: 'userandregister.password.required',
        }),
      );
    } // 有值的情况

    if (!visible) {
      setvisible(!!value);
    }

    setpopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>
        <FormattedMessage id="userandregister.register.resetpasswd" />
      </h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <InputGroup compact>
          <FormItem
            style={{
              width: '100%',
            }}
            name="username"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'userandregister.Username.required',
                }),
              },
              {
                pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
                message: formatMessage({
                  id: 'userandregister.Username.wrong-format',
                }),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={formatMessage({
                id: 'userandregister.Username.required',
              })}
            />
          </FormItem>
        </InputGroup>

        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode;
            }

            return node;
          }}
          content={
            visible && (
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FormattedMessage id="userandregister.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({
                id: 'userandregister.password.placeholder',
              })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'userandregister.confirm-password.required',
              }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={formatMessage({
              id: 'userandregister.confirm-password.placeholder',
            })}
          />
        </FormItem>

        <FormItem>
          {/* {status === 'error' && !submitting && (
            <LoginMessage content="验证码错误" />
          )} */}
          <>
            <ProFormText
              name="email"
              placeholder={intl.formatMessage({
                id: 'pages.login.email.placeholder',
                defaultMessage: '请输入邮箱',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.email.required"
                      defaultMessage="请输入邮箱！"
                    />
                  ),
                },
                {
                  pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                  message: (
                    <FormattedMessage id="pages.login.email.invalid" defaultMessage="格式错误！" />
                  ),
                },
              ]}
            />
            <ProFormCaptcha
              captchaProps={{
                size: 'large',
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.captcha.placeholder',
                defaultMessage: '请输入验证码',
              })}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${intl.formatMessage({
                    id: 'pages.getCaptchaSecondText',
                    defaultMessage: '获取验证码',
                  })}`;
                }

                return intl.formatMessage({
                  id: 'pages.login.phoneLogin.getVerificationCode',
                  defaultMessage: '获取验证码',
                });
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.captcha.required"
                      defaultMessage="请输入验证码！"
                    />
                  ),
                },
              ]}
              // onGetCaptcha={async ( ) => {
              //   const result = await getFakeCaptcha( );

              //   if (result === false) {
              //     return;
              //   }

              //   message.success('获取验证码成功！验证码为：1234');
              // }}
            />
          </>
        </FormItem>

        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="userandregister.register.resetpasswd" />
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default connect(({ userAndregister, loading }) => ({
  userAndregister,
  submitting: loading.effects['userAndregister/submit'],
}))(Register);
