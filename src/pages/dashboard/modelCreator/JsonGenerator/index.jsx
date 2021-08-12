import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi';
import { Button, Modal, Popconfirm } from 'antd';
import './index.css';

const ParameterField = ({ index, parameter, onChange, onDelete }) => {
  // const optionsAddHandler = () => {
  //   const newOptions = [...parameter.options, { name: '', value: '' }];
  //   onChange('options', newOptions);
  // };

  // const optionsDeleteHandler = (idx) => {
  //   const newOptions = parameter.options.filter((el, elIdx) => elIdx !== idx);
  //   onChange('options', newOptions);
  // };

  // const optionChangeHandler = (idx, key, value) => {
  //   const newOptions = parameter.options.map((el, elIdx) =>
  //     elIdx === idx ? { ...el, [key]: value } : el,
  //   );
  //   onChange('options', newOptions);
  // };

  return (
    <div className={'parametergroup'}>
      <div className={'parameterHeader'}>
        <h2>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.JsonGenerator.parameterGroup.parameterHeader',
          })}
          {index}
        </h2>
        <button onClick={onDelete}>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.JsonGenerator.parameterGroup.parameterHeader.button',
          })}
        </button>
      </div>
      <div className={'formRow'} style={{ marginBottom: '1.25rem' }}>
        <div className={'formGroup'}>
          <label>
            {formatMessage({
              id: 'pages.dashboard.modelCreator.JsonGenerator.parameterGroup.formRow.formGroup1',
            })}
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            value={parameter.name}
            autoComplete="off"
          />
        </div>
        <div className={'formGroup'}>
          <label>
            {formatMessage({
              id: 'pages.dashboard.modelCreator.JsonGenerator.parameterGroup.formRow.formGroup2',
            })}
          </label>
          <input
            type="text"
            name="ai_description"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            value={parameter.ai_description}
            autoComplete="off"
          />
        </div>
      </div>
      {/* <div className={'optionsGroup'}>
        {parameter.options.map((option, idx) => (
          <div className={'formRow'} key={idx}>
            <div className={'formGroup'}>
              <label>
                {formatMessage({
                  id: 'pages.dashboard.modelCreator.JsonGenerator.optionsGroup.formRow.formGroup1',
                })}
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => optionChangeHandler(idx, e.target.name, e.target.value)}
                value={option.name}
              />
            </div>
            <div className={'formGroup'}>
              <label>
                {formatMessage({
                  id: 'pages.dashboard.modelCreator.JsonGenerator.optionsGroup.formRow.formGroup2',
                })}
              </label>
              <input
                type="text"
                name="value"
                onChange={(e) => optionChangeHandler(idx, e.target.name, e.target.value)}
                value={option.value}
                autoComplete="off"
              />
            </div>
            <button onClick={() => optionsDeleteHandler(idx)} className={'formRowButton'}>
              {formatMessage({
                id: 'pages.dashboard.modelCreator.JsonGenerator.optionsGroup.formRow.button',
              })}
            </button>
          </div>
        ))}
        <button onClick={optionsAddHandler}>
          {formatMessage({ id: 'pages.dashboard.modelCreator.JsonGenerator.optionsGroup.button' })}
        </button>
      </div> */}
    </div>
  );
};

const MyComponents = React.forwardRef((props) => {
  const initialData = {
    // count: 2,
    total_param: 2,
    details: [
      {
        name: 'Gender',
        data_type: 0,
        ai_description: 'Your gender, 1-Female ; 2-Male',
      },
      {
        name: 'Vitamins',
        data_type: 0,
        ai_description: 'Do you take any supplements or vitamins? 1 - yes 2 - no',
      },
    ],
  };

  const [details, setDetails] = useState(initialData.details);
  const [json, setJson] = useState({});
  const [ifile, setFile] = useState('');

  useEffect(() => {
    setJson({
      total_param: details.length,
      details,
    });
  }, [details]);

  useEffect(() => {
    const file = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(json))}`;
    setFile(file);
  }, [json]);

  const parameterAddHandler = () => {
    setDetails((prev) => [...prev, { name: '', data_type: 0, ai_description: '' }]);
  };

  const parameterDeleteHandler = (idx) => {
    setDetails((prev) => prev.filter((el, elIdx) => elIdx !== idx));
  };

  const parameterChangeHandler = (idx, key, value) => {
    setDetails((prev) => prev.map((el, elIdx) => (elIdx === idx ? { ...el, [key]: value } : el)));
  };

  const resetForm = () => {
    setDetails([...initialData.details]);
  };

  return (
    <Modal
      title={formatMessage({ id: 'pages.dashboard.modelCreator.Modal2.title' })}
      centered
      width={888}
      onCancel={() => {
        props.setParentState({ JSONModalVisible: false });
      }}
      visible={props.visible}
      footer={[
        <Button
          key="back"
          onClick={() => {
            props.setParentState({ JSONModalVisible: false });
          }}
        >
          {formatMessage({ id: 'pages.dashboard.modelCreator.Modal2.footer.button1' })}
        </Button>,
        <Button
          key="submit"
          onClick={() => {
            console.log(json);
            props.setParentFormField({ JSONData: JSON.stringify(json) });
            props.setParentState({ JSONModalVisible: false });
          }}
        >
          {formatMessage({ id: 'pages.dashboard.modelCreator.Modal2.footer.button2' })}
        </Button>,
      ]}
    >
      <div>
        <div className={'container'}>
          <div>
            <h1>
              {formatMessage({
                id: 'pages.dashboard.modelCreator.JsonGenerator.container.header1',
              })}
            </h1>
            <div>
              {details.map((parameter, idx) => (
                <ParameterField
                  key={idx}
                  index={idx}
                  parameter={parameter}
                  onChange={parameterChangeHandler.bind(null, idx)}
                  onDelete={parameterDeleteHandler.bind(null, idx)}
                />
              ))}
            </div>
            <button onClick={parameterAddHandler}>
              {formatMessage({ id: 'pages.dashboard.modelCreator.JsonGenerator.container.button' })}
            </button>
          </div>
          <br />
          <div>
            <h1>
              {formatMessage({
                id: 'pages.dashboard.modelCreator.JsonGenerator.container.header2',
              })}
            </h1>
            <div style={{ width: '700px' }}>
              <pre>{JSON.stringify(json, null, 2)}</pre>
            </div>
            <div className={'footer'}>
              <a href={ifile} className={'downloadLink'} download="test.json">
                {formatMessage({
                  id: 'pages.dashboard.modelCreator.JsonGenerator.container.footer',
                })}
              </a>
              <Popconfirm
                title="Sure to Reset?"
                onConfirm={() => {
                  resetForm();
                  props.setParentFormField({ JSONData: '' });
                }}
              >
                <button className={'resetButton'}>
                  {formatMessage({
                    id: 'pages.dashboard.modelCreator.JsonGenerator.container.footer.button',
                  })}
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default MyComponents;
