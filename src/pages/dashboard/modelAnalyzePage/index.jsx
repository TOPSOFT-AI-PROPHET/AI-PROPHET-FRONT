import react from 'react';
import styles from './styles.less';
import { Descriptions, Menu, Card, Result } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { FileTextOutlined } from '@ant-design/icons';
import request from '@/utils/request';

export default class AnalyzePage extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'API',
      modelName: '',
      modelPrice: 0,
      modelType: 0,
    };
  }

  componentDidMount() {
    request('/tasks/modeldetail', {
      method: 'post',
      data: { ai_id: this.props.match.params.id },
    }).then((result) => {
      this.setState({
        modelName: result.data[0].fields.ai_name,
        modelPrice: result.data[0].fields.ai_credit,
        modelType: result.data[0].fields.ai_type,
      });
    });
  }

  render() {
    const { current } = this.state;

    const descs = [
      {
        key: 1,
        color: 'grey',
        label: '模型名称',
        content: this.state.modelName,
      },
      {
        key: 2,
        color: 'grey',
        label: '模型定价',
        content: this.state.modelPrice,
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
        <a className={styles.link}>{this.state.modelType ? '分类模型' : '回归模型'}</a>
      </div>
    );

    const resultList = (text) => [
      {
        key: 1,
        status: 'warning',
        title: (
          <div>
            训练未知
            <br />
            模型准确率未知
          </div>
        ),
      },
      {
        key: 2,
        status: 'success',
        title: (
          <div>
            训练已完成
            <br />
            模型准确率{text}
          </div>
        ),
      },
      {
        key: 3,
        status: 'info',
        title: (
          <div>
            训练已完成
            <br />
            模型准确率{text}
          </div>
        ),
      },
    ];

    const getResult = (accuracy) => {
      if (accuracy) {
        const text = () => {
          if (accuracy > 70) {
            // 准确度判断  返回对应 字段 and result.key
            return ['很高', 2];
          }
          return ['良好', 3];
        };
        // console.log(text()[0])
        // console.log(resultList(text()[0]))
        const result = resultList(text()[0]).find((element) => element.key === text()[1]);

        // console.log(result)
        return <Result status={result.status} title={result.title} />;
      }
      return (
        // 返回默认result
        <Result
          status="warning"
          title={
            <div>
              训练状态未知
              <br />
              模型准确率未知
            </div>
          }
        />
      );
    };

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
              <Descriptions column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}>
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
              {/* 获取模型状态 - 需传入参数 关于准确值（待定） */}
              {getResult()}
              {/* {console.log(getResult(80))} */}
            </div>
          </div>
          <br />
          <div className={styles.cardBodyBottom}>
            <a>下载完整训练输出日志</a>
          </div>
        </Card>
      </PageContainer>
    );
  }
}
