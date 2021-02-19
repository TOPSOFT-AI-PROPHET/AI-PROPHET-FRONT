import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './footer.less';

class footer extends Component {
  render() {
    return (
      <PageContainer className={styles.pre}>
        <label>@TOPSOFT AI | 2021 All Rights Reserved.</label>
      </PageContainer>
    );
  }
}

export default footer;
