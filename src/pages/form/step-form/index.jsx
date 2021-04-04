import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
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
        },
      });
    }
    setStepComponent(component);
  }, [props.current]);
  return (
    <PageContainer content="给出相应的ai model的输入参数栏">
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="输入参数" />
            <Step title="确认参数信息" />
            <Step title="完成" />
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
