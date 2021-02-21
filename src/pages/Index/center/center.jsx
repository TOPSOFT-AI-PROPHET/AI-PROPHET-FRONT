import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Carousel } from 'antd';
import styles from './center.less';
import { queryCarousel } from '@/services/home';

class center extends Component {
  state = {
    data: [],
    button_hover: false,
  };

  componentDidMount() {
    queryCarousel().then((e) => {
      this.setState({
        data: e.data,
      });
    });
  }

  homeOpenTab = (e) => {
    window.open(e);
  };

  toggleHoverE = () => {
    this.setState({ button_hover: true });
  };

  toggleHoverL = () => {
    this.setState({ button_hover: false });
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
                <div className={styles.contentstyle2} style={{ color: item.general_color }}>
                  <span>
                    {item.f_span}
                    <br />
                    {item.s_span}
                    <br />
                    {item.t_span}
                  </span>
                  <div style={{ height: '1vh' }}>&nbsp;</div>
                  <Button
                    ghost
                    className={styles.buttonstyle}
                    onClick={this.homeOpenTab.bind(this, item.button_url)}
                    ref={(element) => {
                      if (element) {
                        if (this.state.button_hover) {
                          element.style.setProperty(
                            'background-color',
                            item.general_color,
                            'important',
                          );
                          element.style.setProperty('color', item.hover_text_color);
                          element.style.setProperty('border', `1px solid ${item.general_color}`);
                        } else {
                          element.style.setProperty('color', item.general_color);
                          element.style.removeProperty('background-color');
                        }
                      }
                    }}
                    onMouseEnter={this.toggleHoverE}
                    onMouseLeave={this.toggleHoverL}
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
