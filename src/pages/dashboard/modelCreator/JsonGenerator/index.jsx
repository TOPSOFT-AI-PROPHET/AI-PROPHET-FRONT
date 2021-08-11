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
        name: 'Breakfast',
        data_type: 0,
        ai_description: 'Which sort of brakfast you prefer, 1-cereal option; 2-donut option',
      },
      {
        name: 'Calories_day',
        data_type: 0,
        ai_description:
          'Importance of consuming calories per day? 1 - i dont know how many calories i should consume 2 - it is not at all important 3 - it is moderately important 4 - it is very important',
      },
      {
        name: 'Coffee',
        data_type: 0,
        ai_description:
          'Which of the two sorts you associate with the word coffee? 1 - creamy frapuccino 2 - espresso shown',
      },
      {
        name: 'Cook',
        data_type: 0,
        ai_description:
          'How often do you cook? 1 - Every day 2 - A couple of times a week  3 - Whenever I can, but that is not very often   4 - I only help a little during holidays  5 - Never, I really do not know my way around a kitchen',
      },
      {
        name: 'Cuisine',
        data_type: 0,
        ai_description:
          'What type of cuisine did you eat growing up? 1 - Every day 2 - A couple of times a week 3 - Whenever I can, but that is not very often  4 - I only help a little during holidays 5 - Never, I really do not know my way around a kitchen',
      },
      {
        name: 'Drink',
        data_type: 0,
        ai_description:
          'Which sort do you associate with the word “drink”? 1 - orange juice 2 - soda',
      },
      {
        name: 'Eating_out',
        data_type: 0,
        ai_description:
          'Frequency of eating out in a typical week 1 - Never 2 - 1-2 times 3 - 2-3 times 4 - 3-5 times 5 - every day',
      },
      {
        name: 'Employment',
        data_type: 0,
        ai_description: 'Do you work? 1 - yes full time 2 - yes part time 3 – no 4  - other',
      },
      {
        name: 'Exercise',
        data_type: 0,
        ai_description:
          'How often do you exercise in a regular week? 1 - Everyday 2 - Twice or three times per week 3 - Once a week 4 - Sometimes 5 - Never',
      },
      {
        name: 'Fruit_day',
        data_type: 0,
        ai_description:
          'How likely to eat fruit in a regular day 1 - very unlikely 2 - unlikely 3 - neutral 4 - likely 5 - very likely',
      },
      {
        name: 'Greek_food',
        data_type: 0,
        ai_description:
          'How likely to eat greek food when available? 1 - very unlikely 2 - unlikely 3 - neutral 4 - likely 5 - very likely',
      },
      {
        name: 'Healthy_feel',
        data_type: 0,
        ai_description:
          'How likely are you to agree with the following statement:I feel very healthy! ? 1 to 10 where 1 is strongly agree and 10 is strongly disagree - scale',
      },
      {
        name: 'Ideal_diet_coded',
        data_type: 0,
        ai_description:
          ' Ideal diet coded: 1 – portion control 2 – adding veggies/eating healthier food/adding fruit 3 – balance 4 – less sugar 5 – home cooked/organic 6 – current diet 7 – more protein 8 – unclear',
      },
      {
        name: 'Income',
        data_type: 0,
        ai_description:
          'Your Yearly Income? 1 - less than $15,000 2 - $15,001 to $30,000 3 - $30,001 to $50,000 4 - $50,001 to $70,000 5 - $70,001 to $100,000 6 - higher than $100,000',
      },
      {
        name: 'Italian_food',
        data_type: 0,
        ai_description:
          'How likely are you to eat Italian food when available? 1 - very unlikely 2 - unlikely 3 - neutral 4 - likely 5 - very likely',
      },
      {
        name: 'Marital_status',
        data_type: 0,
        ai_description:
          'Marital status? 1 -Single 2 - In a relationship 3 - Cohabiting 4 - Married 5 - Divorced 6 - Widowed',
      },
      {
        name: 'On_off_campus',
        data_type: 0,
        ai_description:
          'Living situation 1 - On campus 2 - Rent out of campus 3 - Live with my parents and commute 4 - Own my own house',
      },
      {
        name: 'Pay_meal_out',
        data_type: 0,
        ai_description:
          'How much would you pay for meal out? 1 - up to $5.00 2 - $5.01 to $10.00 3 - $10.01 to $20.00 4 - $20.01 to $30.00 5 - $30.01 to $40.00 6 - more than $40.01',
      },
      {
        name: 'Self_perception_weight',
        data_type: 0,
        ai_description:
          'Self perception of weight 1 - i dont think myself in these terms 2 - overweight 3 - slightly overweight 4 - just right 5 - very fit 6 - slim',
      },
      {
        name: 'Sports',
        data_type: 0,
        ai_description: 'Do you do any sporting activity? 1 - Yes 2 - No',
      },
      {
        name: 'Veggies_day',
        data_type: 0,
        ai_description:
          'How likely to eat veggies in a day? 1 - very unlikely 2 - unlikely 3 - neutral 4- likely 5 - very likely',
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
    setDetails((prev) => [
      ...prev,
      { name: '', description: '', options: [{ name: '', value: '' }] },
    ]);
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
