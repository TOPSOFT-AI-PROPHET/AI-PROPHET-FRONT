import React from 'react';
import { Input, Form, Select } from 'antd';

const PhoneView = (props) => {
  // console.log(props);
  const { value, onChange } = props;
  let values = ['', ''];
  if (value) {
    values = value.split('-');
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 70 }}
        defaultValue={values[0]}
        onChange={(e) => {
          // console.log(onChange);
          if (e) {
            onChange(`${e}-${values[1]}`);
          }
        }}
      >
        <Select.Option value="+86">+86</Select.Option>
        <Select.Option value="+44">+44</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Input
        addonBefore={prefixSelector}
        // className={styles.phone_number}
        onChange={(e) => {
          // console.log(e.target);
          if (onChange) {
            onChange(`${values[0]}-${e.target.value}`);
          }
        }}
        value={values[1]}
      />
    </>
  );
};

export default PhoneView;
