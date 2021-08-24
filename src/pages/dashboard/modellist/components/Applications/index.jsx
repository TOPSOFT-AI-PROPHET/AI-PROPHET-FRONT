import { EditOutlined, ShareAltOutlined, LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, List, message, Tooltip } from 'antd';
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

  let timerID = null;

  useEffect(() => {
    request('/users/returnUsrID', { method: 'POST' }).then((result) => {
      request('/tasks/personalAImodel', {
        method: 'POST',
        data: { user_id: result.data.user_id },
      }).then((result2) => {
        setIlist(result2.data.list);
      });
    });
  }, [1]);

  useEffect(() => {
    timerID = setInterval(() => {
      request('/users/returnUsrID', { method: 'POST' }).then((result) => {
        request('/tasks/personalAImodel', {
          method: 'POST',
          data: { user_id: result.data.user_id },
        }).then((result2) => {
          setIlist(result2.data.list);
        });
      });
    }, 6000);

    return () => {
      clearInterval(timerID);
    };
  }, []);
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

  const getActions = (item) => {
    if (item.fields.ai_status === 0) {
      return [
        <Tooltip key={'entrance'}>
          <LoginOutlined
            onClick={() => {
              message.warn({
                content: '模型正在训练中....',
                // style:{marginTop:'42vh'}
              });
            }}
          />
        </Tooltip>,
        <Tooltip title={<FormattedMessage id="basic.modellist.edit" />} key="edit">
          <EditOutlined
            onClick={() => {
              message.warn({
                content: '模型正在训练中....',
                // style:{marginTop:'42vh'}
              });
            }}
          />
        </Tooltip>,
        <Tooltip title={<FormattedMessage id="basic.modellist.share" />} key="share">
          <ShareAltOutlined />
        </Tooltip>,
        <LoadingOutlined key={'loading'} />,
      ];
    }
    return [
      <Tooltip key={'entrance'}>
        <LoginOutlined
          onClick={() => {
            request('/tasks/validate', {
              method: 'POST',
              data: { ai_id: item.pk },
            }).then(() => {
              // if (result.code === 200) {
              //   history.push(`/dash/prediction/modelinfo/${item.pk}`);
              // } else {
              //   this.setcreditModalVisible(true);
              // }
              history.push(`/dash/prediction/modelinfo/${item.pk}`);
            });
          }}
        />
      </Tooltip>,
      <Tooltip title={<FormattedMessage id="basic.modellist.edit" />} key="edit">
        <EditOutlined
          onClick={() => {
            history.push(`/dash/model/editor/${item.pk}`);
          }}
        />
      </Tooltip>,
      <Tooltip title={<FormattedMessage id="basic.modellist.share" />} key="share">
        <ShareAltOutlined />
      </Tooltip>,
    ];
  };

  const getBadgesColors = (isPublish, status) => {
    if (status !== 100) {
      return 'orange';
    }
    if (isPublish === 1) {
      return 'green';
    }
    if (isPublish === 0) {
      return 'blue';
    }
    return '';
  };

  const getBadgesText = (isPublish, status) => {
    if (status !== 100) {
      return '训练中';
    }
    if (isPublish === 1) {
      return '上架中';
    }
    if (isPublish === 0) {
      return '未上架';
    }
    return '';
  };

  return (
    <List
      rowKey="id"
      className={stylesApplications.filterCardList}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      dataSource={ilist}
      renderItem={(item) => (
        <List.Item key={item.fields.pk}>
          <Badge.Ribbon
            text={getBadgesText(item.fields.ai_published, item.fields.ai_status)}
            color={true ? getBadgesColors(item.fields.ai_published, item.fields.ai_status) : 'red'}
          >
            <Card
              onClick={() => {}}
              hoverable={item.fields.ai_status !== 0}
              bodyStyle={{
                paddingBottom: 20,
              }}
              actions={getActions(item)}
              // cover={<img src={'https://www.topsoftaiprophet.com/assets/img/model-emp.jpg'}/>}
            >
              <Card.Meta
                // avatar={<Avatar size="small" src={item.fields.ai_url} />}
                avatar={
                  <Avatar
                    size="large"
                    src="https://prophetsrc-1305001068.cos.ap-chengdu.myqcloud.com/defalt.png"
                  />
                }
                title={item.fields.ai_name}
              />
              <div className={stylesApplications.cardItemContent}>
                <CardInfo activeUser={item.fields.ai_credit} newUser={item.fields.ai_usage} />
              </div>
            </Card>
          </Badge.Ribbon>
        </List.Item>
      )}
    />
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
}))(Applications);
