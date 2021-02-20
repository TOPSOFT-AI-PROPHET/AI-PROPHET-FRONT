import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Header from './Header/header';
import { getChildrenToRender } from './utils';
import { Row, Col } from 'antd';
import { Teams30DataSource } from './team_data';
import Footer from './footer/footer';
import './team.less';

class Team extends Component {
  getBlockTopChildren = (data) =>
    data.map((item, i) => {
      const { titleWrapper, ...$item } = item;
      return (
        <Col key={i.toString()} {...$item}>
          {titleWrapper.children.map(getChildrenToRender)}
        </Col>
      );
    });

  render() {
    const listTopChildren = this.getBlockTopChildren(Teams30DataSource.blockTop.children);
    return (
      <PageContainer className="teams3-wrapper">
        <Header />
        <div className="teams3">
          <Row className="block-top-wrapper">{listTopChildren}</Row>
        </div>
        <Footer />
      </PageContainer>
    );
  }
}

export default Team;
