import { Card, List, Typography } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history, formatMessage } from 'umi';
import request from '@/utils/request';
import styles from './style.less';
import { CoffeeOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { FormattedMessage } from 'umi';

const { Paragraph } = Typography;

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    request('/tasks/listAIM', { method: 'POST' })
      .then((result) => {
        if (result.data) {
          this.setState({
            data: result.data,
          });
        }
      })
      .catch((e) => console.log(e));
  }

  render() {
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          <FormattedMessage id="accountandsettings.headerContent" />
        </p>
        <div className={styles.contentLink}>
          <a>
            <CoffeeOutlined />{' '}
            {formatMessage({ id: 'pages.dash.dashboard.list.card-list.contentlink' })}
          </a>
          {/* <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a> */}
        </div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageContainer content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={this.state.data.list}
            renderItem={(item) => {
              return (
                <List.Item key={item.pk}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a
                        key="option1"
                        onClick={() => {
                          history.push(`/dash/prediction/newprediction/${item.pk}`);
                        }}
                      >
                        <FormattedMessage id="accountandsettings.option1" />
                      </a>,
                      <a key="option2">
                        <FormattedMessage id="accountandsettings.option2" />
                      </a>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardAvatar}>
                          <Avatar
                            size={'large'}
                            src={
                              'https://prophetsrc-1305001068.cos.ap-chengdu.myqcloud.com/defalt.png'
                            }
                          />
                          <a
                            onClick={() => {
                              history.push(`/dash/prediction/newprediction/${item.pk}`);
                            }}
                          >
                            {item.fields.ai_name}
                          </a>
                        </div>
                      }
                      description={
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.fields.ai_true_description}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
      </PageContainer>
    );
  }
}

export default connect(({ listAndcardList }) => ({
  listAndcardList
}))(CardList);
