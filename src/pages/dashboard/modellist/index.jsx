import { Button, Form, Avatar, Menu, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, FormattedMessage } from 'umi';
import style from './style.less';
import request from '@/utils/request';
import {
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const state = {
  size: 'large',
};

const PageHeaderContent = () => {
  return <div className={style.pageHeaderContent}></div>;
};
const PageLeftContent = () => {
  const [inickname, setInickname] = useState([]);
  const [iurl, setIurl] = useState([]);
  const [ibalance, setIbalance] = useState([1]);
  useEffect(() => {
    request('/users/getUserInfo', { method: 'POST' }).then((result) => {
      setInickname(result.data.nickname);
      setIurl(result.data.profile_url);
      setIbalance(result.data.balance);
    });
  }, [1]);

  return (
    <div className={style.lefttab}>
      <div>
        <div className={style.avatar}>
          <Avatar size="large" src={iurl} />
        </div>
        <div className={style.tittle}>{inickname}</div>
        <div className={style.tittle2}>
          <FormattedMessage id="basic.modellist.balance" />
          {`:  ¥${ibalance}`}
        </div>
        <div className={style.tittle2}>
          <FormattedMessage id="basic.modellist.modelused" />: 100次
        </div>
        <div className={style.tittle2}>
          <FormattedMessage id="basic.modellist.pageviewed" />: 100次
        </div>
        <div>
          <Button
            type="primary"
            shape="round"
            size={state.size}
            style={{ marginTop: '50px', marginLeft: '130px' }}
          >
            <FormattedMessage id="basic.modellist.buildmodel" />
          </Button>
        </div>
      </div>
    </div>
  );
};
const statee = {
  current: 'mail',
};
const handleClick = (e) => {
  console.log('click ', e);
  this.setState({ current: e.key });
};

const PageRightContent = () => {
  return (
    <div className={style.righttab}>
      <Menu onClick={handleClick} selectedKeys={[statee.current]} mode="horizontal">
        <Menu.Item key="mail">
          <FormattedMessage id="basic.modellist.mymodel" />
        </Menu.Item>
      </Menu>
      <Card
        style={{ width: 300 }}
        size="small"
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <DownloadOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <ShareAltOutlined key="share" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
      ,
    </div>
  );
};

class modellist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_task: {
        num_of_task: '',
        num_of_finished_tasks: '',
      },
      imageURL: '',
    };
  }

  render() {
    return (
      <div>
        <Form content={<PageHeaderContent />} layout="vertical" style={{ display: 'flex' }}>
          <div>
            <PageLeftContent url={this.state.imageURL} />
          </div>
          <div style={{ padding: '0 50px' }}>
            <PageRightContent />
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(({ profileAndbasic }) => ({
  profileAndbasic,
}))(modellist);
