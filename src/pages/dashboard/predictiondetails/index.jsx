import { Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';
import request from '@/utils/request';
import moment from 'moment';

const progressColumns = [
  {
    title: '参数',
    dataIndex: 'para_name',
    key: 'para_name',
  },
  {
    title: '输入',
    dataIndex: 'para_value',
    key: 'para_value',
  },
];

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '加载中',
      aiurl: '加载中',
      airesult: '加载中',
      aistatus: 1,
      time: '加载中',
      cost: 1,
      aiparams: [],
    };
  }

  componentDidMount() {
    request('/tasks/details', {
      method: 'POST',
      data: { task_id: this.props.match.params.id },
    }).then((result) => {
      this.setState({
        description: result.description,
        aiurl: result.ai_url,
        airesult: result.ai_result,
        aistatus: result.status,
        time: moment(result.time_start).format('YYYY-MM-DD HH:mm'),
        cost: result.cost,
        aiparams: result.ai_params,
      });
    });
  }

  render() {
    return (
      <PageContainer>
        <Card bordered={false}>
          <Descriptions
            title="任务详情"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="任务ID">{this.props.match.params.id}</Descriptions.Item>
            <Descriptions.Item label="任务描述">{this.state.description}</Descriptions.Item>
            <Descriptions.Item label="AI模型">{this.state.aiurl}</Descriptions.Item>
            <Descriptions.Item label="提交时间">{this.state.time}</Descriptions.Item>
            <Descriptions.Item label="当前进度">{this.state.aistatus}%</Descriptions.Item>
            <Descriptions.Item label="任务花费">{this.state.cost}</Descriptions.Item>
            <Descriptions.Item label="预测结果">{this.state.airesult}</Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className={styles.title}>模型内容</div>
          <Table
            style={{
              marginBottom: 16,
            }}
            pagination={false}
            dataSource={this.state.aiparams}
            columns={progressColumns}
          />
        </Card>
      </PageContainer>
    );
  }
}

export default connect(({ profileAndbasic }) => ({
  profileAndbasic,
}))(Basic);
