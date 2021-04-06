import React from 'react';
import { Form, Button, Descriptions, Divider } from 'antd';
import { connect, FormattedMessage } from 'umi';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;

  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: { ...data, ...values },
      });
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{
        password: '123456',
      }}
    >
      <Descriptions column={1}>
        {data.ilist.map((item) => {
          return (
            <Descriptions.Item key={item.name} label={item.ai_description}>
              {data.values[item.name]}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item
        style={{
          marginBottom: 8,
        }}
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
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          <FormattedMessage id="formandstep-form.getparam.finishAllSteps" />
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          <FormattedMessage id="formandstep-form.getparam.step2.laststep" />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ formAndstepForm, loading }) => ({
  submitting: loading.effects['formAndstepForm/submitStepForm'],
  data: formAndstepForm.step,
}))(Step2);
