import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Carousel } from 'antd';
import styles from './center.less';

const mockData = [
  {
    images: 'https://webdesignfacts.net/wp-content/uploads/2019/01/CSS-Background-Fireflies.gif',
    span1: 'Artificial',
    span2: 'Intelligence for',
    span3: 'Everyone',
    buttonTitle: 'Learn More',
    buttonLink: 'https://www.baidu.com/',
  },
  {
    images: 'https://webdesignfacts.net/wp-content/uploads/2019/01/CSS-Background-Fireflies.gif',
    span1: 'Artificial',
    span2: 'Intelligence for',
    span3: 'Everyone',
    buttonTitle: 'Learn More',
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
                  <br />
                  <span>
                    {item.span1}
                    <br />
                    {item.span2}
                    <br />
                    {item.span3}
                  </span>
                  <br />
                  <Button
                    className={styles.buttonstyle}
                    onClick={this.homeOpenTab.bind(this, item.buttonLink)}
                    size="large"
                  >
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
