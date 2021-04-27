import { Button, Input, Form, message } from 'antd';
import React, { Component } from 'react';
import { connect, formatMessage, FormattedMessage } from 'umi';
import styles from './style.less';
import request from '@/utils/request';

const PageHeaderContent = () => {
  return <div className={styles.pageHeaderContent}></div>;
};

class Basic extends Component {
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

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
          <Input value={this.state.value} onChange={this.handleChange} />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => {
              request('/pay/codecharge', { method: 'POST', data: { code: this.state.value } }).then(
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
