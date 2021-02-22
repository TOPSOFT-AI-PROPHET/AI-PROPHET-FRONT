import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Header from './Header/header';
import Center from './center/center';
import Footer from './footer/footer';

class Welcome extends Component {
  componentDidMount() {
    document.title = 'THE PROPHET | OFFICIAL - TOPSOFT AI';
  }

  render() {
    return (
      <PageContainer>
        <Header />
        <Center />
        <Footer />
      </PageContainer>
    );
  }
}

export default Welcome;
