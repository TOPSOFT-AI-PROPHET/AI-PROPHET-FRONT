import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, formatMessage } from 'umi';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'confirm':
      return {
        step: 1,
        component: <Step2 />,
      };

    case 'result':
      return {
        step: 2,
        component: <Step3 />,
      };

    case 'info':
    default:
      return {
        step: 0,
        component: <Step1 />,
      };
  }
};

const StepForm = (props) => {
  // console.log(props)
  const [stepComponent, setStepComponent] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const { dispatch } = props;
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(props.current);
    setCurrentStep(step);
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveMid',
        payload: {
          id: props.match.params.id,
          notes: props.match.params.notes,
        },
      });
    }
    setStepComponent(component);
  }, [props.current]);
  return (
    <PageContainer content={formatMessage({ id: 'formandstep-form.getparam.rotation.title' })}>
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title={formatMessage({ id: 'formandstep-form.getparam.rotation.inputParam' })} />
            <Step title={formatMessage({ id: 'formandstep-form.getparam.rotation.checkParam' })} />
            <Step title={formatMessage({ id: 'formandstep-form.getparam.rotation.complete' })} />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageContainer>
  );
};

export default connect(({ formAndstepForm }) => ({
  current: formAndstepForm.current,
}))(StepForm);
