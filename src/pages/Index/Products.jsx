import React from 'react';
import { Table } from 'antd';
import { getChildrenToRender, isImg } from './utils';
import { PageContainer } from '@ant-design/pro-layout';
import { Pricing20DataSource } from './products_data';
import Header from './Header/header';
import { Row, Col } from 'antd';
import Footer from './footer/footer';
import { formatMessage } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';

class Products extends React.PureComponent {
  getColumns = (columns) => {
    return columns.map((item) => {
      const { childWrapper, ...$item } = item;
      return {
        align: 'center',
        ...$item,
        title: <div {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</div>,
      };
    });
  };

  getDataSource = (dataSource, columns) =>
    dataSource.map((item, i) => {
      const obj = { key: i.toString() };
      item.children.forEach(($item, ii) => {
        if (columns[ii]) {
          obj[columns[ii].key] = (
            <div {...$item}>
              {typeof $item.children === 'string' && $item.children.match(isImg) ? (
                <img src={$item.children} alt="img" />
              ) : (
                $item.children
              )}
            </div>
          );
        }
      });
      return obj;
    });

  render() {
    const { Table: table } = Pricing20DataSource;
    const { columns, dataSource: tableData, ...$table } = table;
    const tableProps = {
      ...$table,
      columns: this.getColumns(columns.children),
      dataSource: this.getDataSource(tableData.children, columns.children),
    };
    return (
      <HelmetProvider>
        <Helmet>
          <title>
            {formatMessage({ id: 'menu.home.pricing', defaultMessage: 'Pricing' })} | THE PROPHET |
            OFFICIAL - TOPSOFT AI
          </title>
        </Helmet>
        <PageContainer>
          <Header />
          <div style={{ height: '70px' }}>&nbsp;</div>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <Table key="table" {...tableProps} pagination={false} bordered />
            </Col>
            <Col span={4}></Col>
          </Row>
          <Footer />
        </PageContainer>
      </HelmetProvider>
    );
  }
}

export default Products;
