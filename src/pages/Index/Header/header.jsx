import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import styles from './header.less';
import xxx from './xzpt.png';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

class Welcome extends Component {
  state = {
    current: 'mail',
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    return (
      <PageContainer>
        <Row>
          <Col span={8}>
            <img src={xxx} alt="" className={styles.img} />
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Menu selectedKeys="key" mode="horizontal" style={{ float: 'right' }}>
              <Menu.Item className={styles.item} key="home">
                Home
              </Menu.Item>
              <Menu.Item className={styles.item} key="products">
                Products
              </Menu.Item>
              <Menu.Item className={styles.item} key="team">
                Team
              </Menu.Item>
              <Menu.Item className={styles.item} key="login" icon={<UserOutlined />}></Menu.Item>
            </Menu>
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default Welcome;
