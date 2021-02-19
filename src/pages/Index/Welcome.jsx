import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Input, Button } from 'antd';
import styles from './Welcome.less';

class Welcome extends Component {
  state = {
    x: 'test',
    x1: 5,
    x2: [{ test: 'test' }],
  };

  componentDidMount() {
    console.log('test');
  }

  clickb = () => {
    if (this.state.x === 'test') {
      this.setState({
        x: '666',
      });
    } else {
      this.setState({
        x: 'test',
      });
    }
  };

  onchange = (e) => {
    this.setState({
      x: e.target.value,
    });
  };

  render() {
    return (
      <PageContainer>
        首页还没有代码
        <p className={styles.pre}>{this.state.x}</p>
        <br />
        <Input onChange={this.onchange} placeholder="请输入" />
        <Button type="primary" onClick={this.clickb}>
          TEST
        </Button>
      </PageContainer>
    );
  }
}

export default Welcome;
