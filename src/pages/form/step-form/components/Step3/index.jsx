import { Button, Result, Descriptions } from 'antd';
import React from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import styles from './index.less';

const Step3 = (props) => {
  const { data, dispatch } = props;

  if (!data) {
    return null;
  }

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        {data.ilist.map((item) => {
          return (
            <Descriptions.Item key={item.name} label={item.ai_description}>
              {data.values[item.name]}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        <FormattedMessage id="getparam.step3.again" />
      </Button>
      <Button>
        <FormattedMessage id="getparam.step3.backToList" />
      </Button>
    </>
  );
  return (
    <Result
      status="success"
      title={formatMessage({
        id: 'getparam.step3.completed',
      })}
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ formAndstepForm }) => ({
  data: formAndstepForm.step,
}))(Step3);
