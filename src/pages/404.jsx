import { Button, Result } from 'antd';
import React from 'react';
import { useIntl, history } from 'umi';

const NoFoundPage = () => {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({
        id: 'exception.e404.subtitle',
        defaultMessage: 'Sorry, the page you visited does not exist.',
      })}
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          {formatMessage({
            id: 'exception.e404.button',
            defaultMessage: 'Back Home',
          })}
        </Button>
      }
    />
  );
};

export default NoFoundPage;
