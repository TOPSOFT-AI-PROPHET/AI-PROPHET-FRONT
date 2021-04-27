import { Button, Input, Form, message } from 'antd';
import React, { Component } from 'react';
import { connect, formatMessage, FormattedMessage } from 'umi';
import styles from './style.less';
import request from '@/utils/request';
import { Item } from 'gg-editor';

const PageHeaderContent = () => {
  return <div className={styles.pageHeaderContent}></div>;
};

class Basic extends Component {
  componentDidMount() {}

  render() {
    return (
      <Form content={<PageHeaderContent />} layout="vertical">
        <Form.Item
          name="activation code"
          style={{ width: '30%' }}
          label={formatMessage({
            id: 'pages.profile.basic.activationcode',
          })}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => {
              request('/pay/codecharge', { method: 'POST', data: { code: Item.code } }).then(
                (result) => {
                  if (result.code === 200) {
                    message.success(result.message);
                  } else {
                    message.error(result.message);
                  }
                },
              );
            }}
          >
            <FormattedMessage id="pages.profile.basic.submit" defaultMessage="Update Information" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ profileAndbasic }) => ({
  profileAndbasic,
}))(Basic);
