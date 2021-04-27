import { Button, Input, Form, Skeleton } from 'antd';
import React, { Component } from 'react';
import { connect, formatMessage, FormattedMessage } from 'umi';
import styles from './style.less';

const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }
  return <div className={styles.pageHeaderContent}></div>;
};

class Basic extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAndbasic/fetchBasic',
    });
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
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            <FormattedMessage id="pages.profile.basic.submit" defaultMessage="Update Information" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ profileAndbasic, loading }) => ({
  profileAndbasic,
  loading: loading.effects['profileAndbasic/fetchBasic'],
}))(Basic);
