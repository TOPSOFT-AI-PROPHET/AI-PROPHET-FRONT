import react from 'react';
import styles from './styles.less';
import { Descriptions, Menu, Card, Result } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { FileTextOutlined } from '@ant-design/icons';

export default class AnalyzePage extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'API',
    };
  }

  render() {
    const { current } = this.state;

    const descs = [
      {
        key: 1,
        color: 'grey',
        label: '模型名称',
        content: '',
      },
      {
        key: 2,
        color: 'grey',
        label: '模型定价',
        content: '',
      },
    ];
    const cardDescs = [
      {
        key: 1,
        color: 'grey',
        label: '训练数据集特征个数',
        content: '',
      },
      {
        key: 2,
        color: 'grey',
        label: '准确率校验方式',
        content: '',
      },
      {
        key: 3,
        color: 'grey',
        label: '训练数据实例个数',
        content: '',
      },
      {
        key: 4,
        color: 'grey',
        label: '准确率',
        content: '',
      },
      {
        key: 5,
        color: 'grey',
        label: '数据集分割率',
        content: '',
      },
      {
        key: 6,
        color: 'grey',
        label: '训练算法',
        content: '',
      },
      {
        key: 7,
        color: 'grey',
        label: '交叉验证网络尺寸',
        content: '',
      },
      {
        key: 8,
        color: 'grey',
        label: '最佳训练算法',
        content: '',
      },
      {
        key: 9,
        color: 'grey',
        label: '训练耗时',
        content: '',
      },
    ];

    const content = (
      <div>
        <Descriptions column={{ xs: 1, sm: 1, md: 1 }} size={'small'}>
          {descs.map((item) => {
            return (
              <Descriptions.Item
                key={item.key}
                labelStyle={{ color: item.color }}
                label={item.label}
              >
                {item.content}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <a className={styles.link}>回归模型</a>
      </div>
    );

    return (
      <PageContainer content={content} extraContent={extraContent}>
        <Menu
          style={{ margin: '-24px -24px 24px -24px' }}
          mode={'horizontal'}
          selectedKeys={[current]}
        >
          <Menu.Item key="API" icon={<FileTextOutlined />} style={{ left: '6px' }}>
            {'API监控'}
          </Menu.Item>
        </Menu>
        <Card title={'分析结果'}>
          <div className={styles.cardBody}>
            <div className={styles.cardDescsPart}>
              <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                {cardDescs.map((item) => {
                  return (
                    <Descriptions.Item
                      key={item.key}
                      labelStyle={{ color: item.color }}
                      label={item.label}
                    ></Descriptions.Item>
                  );
                })}
              </Descriptions>
            </div>
            <div className={styles.cardResultPart}>
              <Result
                status="success"
                title={
                  <div>
                    训练已完成
                    <br />
                    模型准确率较高
                  </div>
                }
              />
            </div>
          </div>
          {/* <Row>
                        <Col span={16}>
                            <div className={styles.cardDescsPart}>
                                <Descriptions xs={2}>
                                    {cardDescs.map((item) => {
                                        return (
                                            <Descriptions.Item key={item.key} labelStyle={{ color: item.color }} label={item.label}>

                                            </Descriptions.Item>
                                        )
                                    })}
                                </Descriptions>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.cardResultPart}>
                                <Result
                                    status='success'
                                    title={'训练已完成\n模型准确率较高'}
                                />
                            </div>
                        </Col>
                    </Row> */}

          <div className={styles.cardBodyBottom}>
            <a>下载完整训练输出日志</a>
          </div>
        </Card>
      </PageContainer>
    );
  }
}
