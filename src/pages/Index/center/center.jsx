import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Carousel } from 'antd';
import styles from './center.less';
import { queryCarousel } from '@/services/home';

class center extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    queryCarousel()
      .then((e) => {
        this.setState({
          data: e.data,
        });
      })
      .catch((e) => console.log(e));
  }

  homeOpenTab = (e) => {
    window.open(e);
  };

  render() {
    return (
      <PageContainer>
        <Carousel autoplay>
          {this.state.data.map((item, index) => {
            return (
              <div key={index} className={styles.carouselbox}>
                <div className={styles.contentstyle}>
                  <img width="100%" src={item.image_url} />
                </div>
                <div className={styles.contentstyle2}>
                  <span>
                    {item.f_span}
                    <br />
                    {item.s_span}
                    <br />
                    {item.t_span}
                  </span>
                  <br />
                  <Button
                    ghost
                    className={styles.buttonstyle}
                    onClick={this.homeOpenTab.bind(this, item.button_url)}
                    size="large"
                  >
                    {item.button_title}
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
