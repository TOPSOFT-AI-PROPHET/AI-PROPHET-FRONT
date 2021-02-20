import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import styles from './header.less';
import logo from './xzpt.png';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { history, SelectLang, formatMessage } from 'umi';

class Welcome extends Component {
  state = {
    current: 'mail',
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  toHome = () => {
    history.push('/');
  };

  toProducts = () => {
    history.push('/products');
  };

  toTeam = () => {
    history.push('/team');
  };

  toLogin = () => {
    history.push('/user/login');
  };

  render() {
    return (
      <PageContainer>
        <Row>
          <Col span={12}>
            <img src={logo} className={styles.img} />
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
