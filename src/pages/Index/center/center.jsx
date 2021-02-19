import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Carousel } from 'antd';
import styles from './center.less';

const mockData = [
  {
    images: 'https://webdesignfacts.net/wp-content/uploads/2019/01/CSS-Background-Fireflies.gif',
    span1: '测试1',
    span2: '我觉得可以',
    buttonTitle: '点击进入',
    buttonLink: 'https://www.baidu.com/',
  },
  {
    images: 'https://webdesignfacts.net/wp-content/uploads/2019/01/CSS-Background-Fireflies.gif',
    span1: '测试2',
    span2: '我觉得可以',
    buttonTitle: '点击进入',
    buttonLink: 'https://www.baidu.com/',
  },
];

class center extends Component {
  homeOpenTab = (e) => {
    window.open(e);
  };

  render() {
    return (
      <PageContainer>
        <Carousel autoplay>
          {mockData.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className={styles.contentstyle}
                  style={{ backgroundImage: `url(${item.images})` }}
                >
                  <span>
                    {item.span1}
                    <br />
                    {item.span2}
                  </span>
                  <br />
                  <Button onClick={this.homeOpenTab.bind(this, item.buttonLink)} size="large">
                    {item.buttonTitle}
                  </Button>
                </div>
              </div>
            );
          })}
        </Carousel>
      </PageContainer>
    );
  }
}

export default center;
