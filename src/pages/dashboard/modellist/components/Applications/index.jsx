import { EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Tooltip } from 'antd';
import { React, useState, useEffect } from 'react';
import { connect, history, FormattedMessage } from 'umi';
// import numeral from 'numeral';
import stylesApplications from './index.less';
import request from '@/utils/request';

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let result = val;

  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }

  return result;
}

const Applications = () => {
  const [ilist, setIlist] = useState([]);
  const [iuserid, setIuserid] = useState([1]);

  useEffect(() => {
    request('/users/returnUsrID', { method: 'POST' }).then((result) => {
      setIuserid(result.data.user_id);
    });
  }, [1]);

  useEffect(() => {
    request('/tasks/personalAImodel', { method: 'POST', data: { user_id: iuserid } }).then(
      (result) => {
        setIlist(result.data.list);
      },
    );
  }, [1]);

  // const itemMenu = (
  //   <Menu>
  //     <Menu.Item>
  //       <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
  //         1st menu item
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
  //         2nd menu item
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
  //         3d menu item
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );

  const CardInfo = ({ activeUser, newUser }) => (
    <div className={stylesApplications.cardInfo}>
      <div>
        <p>
          <FormattedMessage id="basic.modellist.price" />
        </p>
        <p>
          {activeUser}
          <FormattedMessage id="basic.modellist.per" />
        </p>
      </div>
      <div>
        <p>
          <FormattedMessage id="basic.modellist.usage" />
        </p>
        <p>{newUser}</p>
      </div>
    </div>
  );

  // const [iainame, setIainame] = useState([]);
  // const [iurl, setIurl]

  // useEffect(() => {
  //   request('/users/personalAImodel', { method: 'POST' }).then((result) => {
  //     setIainame(result.data.list.fields.ai_name);
  //     setIurl(result.data.list.fields.ai_url);
  //   });

  // }, [1]);

  return (
    <List
      rowKey="id"
      className={stylesApplications.filterCardList}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={ilist}
      renderItem={(item) => (
        <List.Item key={item.fields.pk}>
          <Card
            hoverable
            bodyStyle={{
              paddingBottom: 20,
            }}
            actions={[
              <Tooltip title={<FormattedMessage id="basic.modellist.edit" />} key="edit">
                <EditOutlined
                  onClick={() => {
                    history.push(`/dash/model/editor/${item.id}`);
                  }}
                />
              </Tooltip>,
              <Tooltip title={<FormattedMessage id="basic.modellist.share" />} key="share">
                <ShareAltOutlined />
              </Tooltip>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar size="small" src={item.fields.ai_url} />}
              title={item.fields.ai_name}
            />
            <div className={stylesApplications.cardItemContent}>
              <CardInfo activeUser={item.fields.ai_credit} newUser={item.fields.ai_usage} />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
}))(Applications);
