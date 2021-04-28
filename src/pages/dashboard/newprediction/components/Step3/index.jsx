import { Button, Result, Descriptions } from 'antd';
import React, { useEffect } from 'react';
import { connect, FormattedMessage, formatMessage, history } from 'umi';
import styles from './index.less';
import request from '@/utils/request';

const Step3 = (props) => {
  const { data, dispatch } = props;

  useEffect(() => {
    const newilist = [];
    data.ilist.forEach((item) => {
      const obj = {};
      obj.value = data.values[item.name];
      newilist.push(obj);
    });
    request('/tasks/prediction', {
      method: 'POST',
      data: {
        ai_id: parseInt(props.modelid.id, 10),
        total_para: data.ilist.length,
        data: newilist,
      },
    }).then(() => {});
    console.log(newilist);
  }, [1]);

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
        <FormattedMessage id="formandstep-form.getparam.step3.again" />
      </Button>
      <Button
        onClick={() => {
          history.push('/dash/prediction/predictions');
        }}
      >
        <FormattedMessage id="formandstep-form.getparam.step3.backToList" />
      </Button>
    </>
  );
  return (
    <Result
      status="success"
      title={formatMessage({
        id: 'formandstep-form.getparam.step3.completed',
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
  modelid: formAndstepForm.mid,
}))(Step3);
