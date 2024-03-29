import React, { useState, useEffect } from 'react';
import { Form, Button, Divider, Input } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import styles from './index.less';
import request from '@/utils/request';

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const Step1 = (props) => {
  const [ilist, setIlist] = useState([]);
  useEffect(() => {
    request('/tasks/getAIM', { method: 'POST', data: { ai_id: parseInt(props.modelid.id, 10) } })
      .then((result) => {
        setIlist(result.data.details);
      })
      .catch((e) => console.log(e));
  }, [1]);

  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }

  const { validateFields } = form;

  const onValidateForm = async () => {
    const values = await validateFields();
    console.log(values);
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: {
          ilist,
          values,
        },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        className={styles.stepForm}
        hideRequiredMark
      >
        {ilist.map((item) => {
          return (
            <Form.Item
              label={item.ai_description}
              name={item.name}
              key={item.name}
              rules={[{ required: true, message: 'Please enter the parameter !' }]}
            >
              <Input
                placeholder={formatMessage({
                  id: 'formandstep-form.getparam.input.option',
                })}
              />
            </Form.Item>
          );
        })}
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <br />
          <Button type="primary" onClick={onValidateForm}>
            <FormattedMessage id="formandstep-form.getparam.finishStep1" />
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
        <h3>说明</h3>
      </div>
    </>
  );
};

export default connect(({ formAndstepForm }) => ({
  data: formAndstepForm.step,
  modelid: formAndstepForm.mid,
}))(Step1);
