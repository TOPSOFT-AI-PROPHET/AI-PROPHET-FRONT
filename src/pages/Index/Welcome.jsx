import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Header from './Header/header';
import Center from './center/center';
import Footer from './footer/footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';

class Welcome extends Component {
  render() {
    return (
      <HelmetProvider>
        <Helmet>
          <title>THE PROPHET | OFFICIAL - TOPSOFT AI</title>
          <meta name="description" content="THE PROPHET | OFFICIAL - TOPSOFT AI" />
        </Helmet>
        <PageContainer>
          <Header />
          <Center />
          <Footer />
        </PageContainer>
      </HelmetProvider>
    );
  }
}

export default Welcome;
