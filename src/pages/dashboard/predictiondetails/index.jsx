import { Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, FormattedMessage, formatMessage } from 'umi';
import styles from './style.less';
import request from '@/utils/request';
import moment from 'moment';

const progressColumns = [
  {
    title: formatMessage({ id: 'details.form.description' }),
    dataIndex: 'para_name',
    key: 'para_name',
  },
  {
    title: formatMessage({ id: 'details.form.paramters' }),
    dataIndex: 'para_value',
    key: 'para_value',
  },
];

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: formatMessage({ id: 'details.info.description' }),
      aiurl: formatMessage({ id: 'details.info.aiurl' }),
      airesult: formatMessage({ id: 'details.info.airesult' }),
      aistatus: 1,
      time: formatMessage({ id: 'details.info.time' }),
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
            title={formatMessage({ id: 'details.title.taskinfo' })}
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label={formatMessage({ id: 'details.label.taskid' })}>
              {this.props.match.params.id}
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'details.label.taskdescription' })}>
              {this.state.description}
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'details.label.AImodels' })}>
              {this.state.aiurl}
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'details.label.updatetime' })}>
              {this.state.time}
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'details.label.status' })}>
              {this.state.aistatus}%
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'details.label.cost' })}>
              {this.state.cost}
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'details.label.result' })}>
              {this.state.airesult}
            </Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className={styles.title}>
            <FormattedMessage id="details.title.content" />
          </div>
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
