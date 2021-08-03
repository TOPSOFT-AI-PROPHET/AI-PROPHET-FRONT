import React, { useState, useEffect } from 'react';

const ParameterField = ({ index, parameter, onChange, onDelete }) => {
  const optionsAddHandler = () => {
    const newOptions = [...parameter.options, { name: '', value: '' }];
    onChange('options', newOptions);
  };

  const optionsDeleteHandler = (idx) => {
    const newOptions = parameter.options.filter((el, elIdx) => elIdx !== idx);
    onChange('options', newOptions);
  };

  const optionChangeHandler = (idx, key, value) => {
    const newOptions = parameter.options.map((el, elIdx) =>
      elIdx === idx ? { ...el, [key]: value } : el,
    );
    onChange('options', newOptions);
  };

  return (
    <div className="parameterGroup">
      <div className="parameterHeader">
        <h2>Parameter {index}</h2>
        <button onClick={onDelete}>Delete</button>
      </div>
      <div className="formRow" style={{ marginBottom: '1.25rem' }}>
        <div className="formGroup">
          <label>Parameter Name:</label>
          <input
            type="text"
            name="name"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            value={parameter.name}
            autoComplete="off"
          />
        </div>
        <div className="formGroup">
          <label>Parameter Description:</label>
          <input
            type="text"
            name="description"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            value={parameter.description}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="optionsGroup">
        {parameter.options.map((option, idx) => (
          <div className="formRow" key={idx}>
            <div className="formGroup">
              <label>Option Name:</label>
              <input
                type="text"
                name="name"
                onChange={(e) => optionChangeHandler(idx, e.target.name, e.target.value)}
                value={option.name}
              />
            </div>
            <div className="formGroup">
              <label>Options Value:</label>
              <input
                type="text"
                name="value"
                onChange={(e) => optionChangeHandler(idx, e.target.name, e.target.value)}
                value={option.value}
                autoComplete="off"
              />
            </div>
            <button onClick={() => optionsDeleteHandler(idx)} className="formRowButton">
              Delete
            </button>
          </div>
        ))}
        <button onClick={optionsAddHandler}>Add Option</button>
      </div>
    </div>
  );
};

const MyComponents = React.forwardRef((props, ref) => {
  const initialData = {
    count: 2,
    parameters: [
      {
        name: 'gender',
        description: 'What is your gender?',
        options: [
          {
            name: 'Male',
            value: 'male',
          },
          {
            name: 'Female',
            value: 'female',
          },
        ],
      },
      {
        name: 'breakfast',
        description: 'What do you most often eat for breakfast?',
        options: [
          {
            name: 'Healthy (cereal, fruit)',
            value: 'healthy',
          },
          {
            name: 'Unhealthy (donuts, pancakes)',
            value: 'unhealthy',
          },
        ],
      },
    ],
  };

  const [parameters, setParameters] = useState(initialData.parameters);
  const [json, setJson] = useState({});
  const [ifile, setFile] = useState('');

  useEffect(() => {
    setJson({
      count: parameters.length,
      parameters,
    });
  }, [parameters]);

  useEffect(() => {
    const file = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(json))}`;
    setFile(file);
  }, [json]);

  const parameterAddHandler = () => {
    setParameters((prev) => [
      ...prev,
      { name: '', description: '', options: [{ name: '', value: '' }] },
    ]);
  };

  const parameterDeleteHandler = (idx) => {
    setParameters((prev) => prev.filter((el, elIdx) => elIdx !== idx));
  };

  const parameterChangeHandler = (idx, key, value) => {
    setParameters((prev) =>
      prev.map((el, elIdx) => (elIdx === idx ? { ...el, [key]: value } : el)),
    );
  };

  const resetForm = () => {
    setParameters([...initialData.parameters]);
  };

  return (
    <div>
      <div className="container">
        <div>
          <h1>Parameter Fields</h1>
          <div>
            {parameters.map((parameter, idx) => (
              <ParameterField
                key={idx}
                index={idx}
                parameter={parameter}
                onChange={parameterChangeHandler.bind(null, idx)}
                onDelete={parameterDeleteHandler.bind(null, idx)}
              />
            ))}
          </div>
          <button onClick={parameterAddHandler}>Add Parameter</button>
        </div>
        <div>
          <h1>JSON Preview</h1>
          <div>
            <pre ref={ref}>{JSON.stringify(json, null, 2)}</pre>
          </div>
        </div>
      </div>
      <a href={ifile} className="downloadLink" download="test.json">
        Download as JSON
      </a>
      <br />
      <button onClick={resetForm.bind(this)}>Reset</button>
    </div>
  );
});

export default MyComponents;
