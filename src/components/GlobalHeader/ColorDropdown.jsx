import { Menu } from 'antd';
import React from 'react';
import { connect, formatMessage } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class ColorDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;
    let styleLink = document.getElementById('theme-style');
    const body = document.getElementsByTagName('body')[0];
    if (styleLink) {
      styleLink.href = `/theme/${key}.css`;
      body.className = `body-wrap-${key}`;
    } else {
      // 不存在的话，则新建一个
      styleLink = document.createElement('link');
      styleLink.type = 'text/css';
      styleLink.rel = 'stylesheet';
      styleLink.id = 'theme-style';
      styleLink.href = `/theme/${key}.css`;
      body.className = `body-wrap-${key}`;
      document.body.append(styleLink);
    }
  };

  render() {
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="daybreak">
          {formatMessage({
            id: 'app.setting.themecolor.daybreak',
          })}
        </Menu.Item>
        <Menu.Item key="dust">
          {formatMessage({
            id: 'app.setting.themecolor.dust',
          })}
        </Menu.Item>
        <Menu.Item key="volcano">
          {formatMessage({
            id: 'app.setting.themecolor.volcano',
          })}
        </Menu.Item>
        <Menu.Item key="sunset">
          {formatMessage({
            id: 'app.setting.themecolor.sunset',
          })}
        </Menu.Item>
        <Menu.Item key="cyan">
          {formatMessage({
            id: 'app.setting.themecolor.cyan',
          })}
        </Menu.Item>
        <Menu.Item key="green">
          {formatMessage({
            id: 'app.setting.themecolor.green',
          })}
        </Menu.Item>
        <Menu.Item key="geekblue">
          {formatMessage({
            id: 'app.setting.themecolor.geekblue',
          })}
        </Menu.Item>
        <Menu.Item key="purple">
          {formatMessage({
            id: 'app.setting.themecolor.purple',
          })}
        </Menu.Item>
      </Menu>
    );
    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <span className={`${styles.name} anticon`}>
            {formatMessage({
              id: 'app.setting.themecolor',
            })}
          </span>
        </span>
      </HeaderDropdown>
    );
  }
}

export default connect()(ColorDropdown);
