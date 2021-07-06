import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { Card, Input, Row, Col, Form, Radio, Upload, Button, TreeSelect } from 'antd';
import styles from './index.less';
import { UploadOutlined } from '@ant-design/icons';

export default class ModelCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: undefined,
      card3Para: undefined,
    };
  }

  onchangeInTreeSelect = (value) => {
    this.setState({
      selectValue: value,
    });
  };

  card3RenderPara = (treeData) => {
    let crtTitle = '';
    let crtLink = '';
    if (this.state.selectValue) {
      treeData.map((item) => {
        item.children.map((item1) => {
          if (item1.value === this.state.selectValue) {
            crtTitle = item1.title;
            crtLink = item1.link;
          }
          return 0;
        });
        return 0;
      });
      return (
        <div>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.card3-content-para1',
          })}
          <strong>{crtTitle}</strong>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.card3-content-para2',
          })}
          <a href={crtLink} target="_blank" rel="noreferrer">
            {formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-para3',
            })}
            {crtTitle}
            {formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-para4',
            })}
          </a>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.card3-content-para5',
          })}
        </div>
      );
    }
    return <div>{formatMessage({ id: 'pages.dashboard.modelCreator.card3-content-para6' })}</div>;
  };

  render() {
    const content = (
      <div>
        {formatMessage({
          id: 'pages.dashboard.modelCreator.headerContent-textpara1',
        })}
        <a>
          {formatMessage({
            id: 'pages.dashboard.modelCreator.headerContent-textpara2',
          })}
        </a>
        {formatMessage({
          id: 'pages.dashboard.modelCreator.headerContent-textpara3',
        })}
      </div>
    );

    const treeData = [
      {
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card3-content-treeSelect1' }),
        value: '1',
        selectable: false,
        children: [
          {
            title: formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-treeSelect1-1',
            }),
            value: 'a',
            link: 'https://www.baidu.com',
          },
          {
            title: formatMessage({
              id: 'pages.dashboard.modelCreator.card3-content-treeSelect1-2',
            }),
            value: 'b',
            link: 'http://example.com/',
          },
        ],
      },
    ];
    const cards = [
      {
        key: 1,
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card1-title' }),
        content: (
          <div className={styles.content}>
            <Row gutter={[36, 36]} justify="space-around" align="middle">
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input1' })}
                >
                  <Input
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card1-content-input1-placeHolder',
                    })}
                  />
                </Form.Item>
                <Form.Item
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input2' })}
                >
                  <Input
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card1-content-input2-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input3' })}
                >
                  <Input.TextArea
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    showCount
                    maxLength={50}
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card1-content-input3-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card1-content-input4' })}
                >
                  <Radio />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ),
        style: styles.card1,
      },
      {
        key: 2,
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card2-title' }),
        content: (
          <div>
            <Row gutter={[36, 36]} justify="space-around" align="middle">
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card2-content-input1' })}
                >
                  <Input
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card2-content-input1-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  label={formatMessage({ id: 'pages.dashboard.modelCreator.card2-content-input2' })}
                >
                  <Input
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card2-content-input2-placeHolder',
                    })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ),
        style: styles.card2,
      },
      {
        key: 3,
        content: (
          <div className={styles.content}>
            <Row gutter={[36, 36]} justify="space-around" align="middle">
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                <Form.Item
                  label={formatMessage({
                    id: 'pages.dashboard.modelCreator.card3-content-treeSelect-title',
                  })}
                >
                  <TreeSelect
                    treeDefaultExpandAll
                    value={this.state.selectValue}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    onChange={this.onchangeInTreeSelect}
                    placeholder={formatMessage({
                      id: 'pages.dashboard.modelCreator.card3-content-treeSelect-placeholder',
                    })}
                  ></TreeSelect>
                </Form.Item>
              </Col>
              <Col xs={18} sm={16} md={12} lg={8} xl={8}>
                {this.card3RenderPara(treeData)}
              </Col>
            </Row>
          </div>
        ),
        style: styles.card3,
      },
      {
        key: 4,
        title: formatMessage({ id: 'pages.dashboard.modelCreator.card4-title' }),
        content: (
          <div className={styles.content}>
            <div className={styles.upload}>
              <Upload>
                <Button className={styles.button} icon={<UploadOutlined />}>
                  {formatMessage({ id: 'pages.dashboard.modelCreator.card4-content-button' })}
                </Button>
              </Upload>
            </div>
            <div>
              <p>
                {formatMessage({ id: 'pages.dashboard.modelCreator.card4-content-uploadNote' })}
              </p>
            </div>
            <div className={styles.footer}>
              <p>{formatMessage({ id: 'pages.dashboard.modelCreator.card4-content-footer' })}</p>
            </div>
          </div>
        ),
        style: styles.card4,
      },
    ];
    return (
      <PageContainer content={content}>
        <div>
          <Form layout={'vertical'}>
            {cards.map((item) => {
              return (
                <Card key={item.key} className={item.style} title={item.title}>
                  {item.content}
                </Card>
              );
            })}
            <div className={styles.bottomDiv}>
              <Form.Item>
                <Button type="primary" style={{ float: 'right' }}>
                  提交
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </PageContainer>
    );
  }
}
