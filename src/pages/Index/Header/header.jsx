import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import styles from './header.less';
import logo from './xzpt.png';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { SelectLang, formatMessage } from 'umi';

class Welcome extends Component {
  toHome = () => {
    window.location = '/';
  };

  toProducts = () => {
    window.location = '/products';
  };

  toTeam = () => {
    window.location = '/team';
  };

  toLogin = () => {
    window.location = '/user/login';
  };

  render() {
    return (
      <PageContainer>
        <Row>
          <Col span={12}>
            <a href="/">
              <img src={logo} className={styles.img} />
            </a>
          </Col>
          <Col span={12}>
            <div style={{ float: 'right' }}>
              <div style={{ display: 'inline-block', marginRight: '3vh' }}>
                <SelectLang />
              </div>
              <div style={{ display: 'inline-block', maxWidth: '40vh' }}>
                <Menu selectedKeys="key" mode="horizontal">
                  <Menu.Item onClick={this.toHome} className={styles.item} key="home">
                    {formatMessage({ id: 'menu.home.home', defaultMessage: 'Home' })}
                  </Menu.Item>
                  <Menu.Item onClick={this.toProducts} className={styles.item} key="products">
                    {formatMessage({ id: 'menu.home.pricing', defaultMessage: 'Pricing' })}
                  </Menu.Item>
                  <Menu.Item onClick={this.toTeam} className={styles.item} key="team">
                    {formatMessage({ id: 'menu.home.team', defaultMessage: 'Team' })}
                  </Menu.Item>
                  <Menu.Item
                    onClick={this.toLogin}
                    className={styles.item}
                    key="login"
                    icon={<UserOutlined />}
                  ></Menu.Item>
                </Menu>
              </div>
            </div>
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default Welcome;
