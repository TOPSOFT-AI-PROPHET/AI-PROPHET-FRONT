import React from 'react';
import { Input, Select } from 'antd';
import { formatMessage } from 'umi';

const PhoneView = (props) => {
  const { value, onChange } = props;
  let values = ['', ''];
  if (value) {
    values = value.split('-');
  }

  const prefixSelector = (
    <Select
      style={{ width: 100 }}
      value={values[0]}
      onChange={(e) => {
        if (e) {
          onChange(`${e}-${values[1]}`);
        }
      }}
    >
      <Select.Option value="+86">
        {formatMessage({
          id: 'accountandsettings.areaCodeCN',
        })}
      </Select.Option>
      <Select.Option value="+44">
        {formatMessage({
          id: 'accountandsettings.areaCodeUK',
        })}
      </Select.Option>
    </Select>
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
