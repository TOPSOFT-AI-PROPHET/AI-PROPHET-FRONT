import { Menu } from 'antd';
import React from 'react';
import { connect } from 'umi';
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
        <Menu.Item key="daybreak">拂晓蓝（默认）</Menu.Item>
        <Menu.Item key="dust">薄暮</Menu.Item>
        <Menu.Item key="volcano">火山</Menu.Item>
        <Menu.Item key="sunset">日暮</Menu.Item>
        <Menu.Item key="cyan">明青</Menu.Item>
        <Menu.Item key="green">极光绿</Menu.Item>
        <Menu.Item key="geekblue">极客蓝</Menu.Item>
        <Menu.Item key="purple">酱紫</Menu.Item>
      </Menu>
    );
    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <span className={`${styles.name} anticon`}>主题</span>
        </span>
      </HeaderDropdown>
    );
  }
}

export default connect()(ColorDropdown);
