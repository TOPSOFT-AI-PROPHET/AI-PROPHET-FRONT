import { HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Button } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect, FormattedMessage, history } from 'umi';
// import Projects from './components/Projects';
// import Articles from './components/Articles';
import Applications from './components/Applications';
import styles from './Center.less';
import style from './style.less';
import request from '@/utils/request';
import COS from 'cos-js-sdk-v5';

const state = {
  size: 'large',
};

const PageLeftContent = ({ url }) => {
  const [inickname, setInickname] = useState([]);
  // const [iurl, setIurl] = useState([]);
  const [icredit, setIcredit] = useState([1]);

  useEffect(() => {
    request('/users/getUserInfo', { method: 'POST' }).then((result) => {
      setInickname(result.data.nickname);
      // setIurl(result.data.profile_image_url);
      setIcredit(result.data.credit);
    });
  }, [1]);

  return (
    <div className={style.lefttab}>
      <div>
        <div className={style.avatar}>
          <Avatar size="large" src={url} />
        </div>
        <div className={style.tittle}>{inickname}</div>
        <div className={style.tittle2}>
          <FormattedMessage id="basic.modellist.balance" />
          {`:  ${icredit}`}
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
            style={{ marginTop: '20px', marginLeft: '75px', height: '50px', width: '200px' }}
            onClick={() => {
              history.push('/dash/model/creator');
            }}
          >
            <FormattedMessage id="basic.modellist.buildmodel" />
          </Button>
        </div>
        <div className={style.tittle2} style={{ padding: ' 100px 0 0 0' }}>
          先世界，而知万物
        </div>
        <div style={{ fontSize: '12px', textAlign: 'center', width: '80%', marginLeft: '40px' }}>
          We believe our diversity is our stength. With people from every background, gender, creed
          and religion
        </div>
      </div>
    </div>
  );
};

const operationTabList = [
  // {
  //   key: 'articles',
  //   tab: (
  //     <span>
  //       文章{' '}
  //       <span
  //         style={{
  //           fontSize: 14,
  //         }}
  //       >
  //         (8)
  //       </span>
  //     </span>
  //   ),
  // },
  {
    key: 'applications',
    tab: (
      <span>
        应用{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
  // {
  //   key: 'projects',
  //   tab: (
  //     <span>
  //       项目{' '}
  //       <span
  //         style={{
  //           fontSize: 14,
  //         }}
  //       >
  //         (8)
  //       </span>
  //     </span>
  //   ),
  // },
];

class Center extends Component {
  // static getDerivedStateFromProps(
  //   props: accountAndcenterProps,
  //   state: accountAndcenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;
  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }
  //   return null;
  // }
  state = {
    tabKey: 'articles',
  };

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

  input = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetch',
    });
    request('/users/getUserInfo', { method: 'POST' })
      .then((result) => {
        this.handleAvatar(result.data.profile_image_uuid);
      })
      .catch((e) => console.log(e));
  }

  handleAvatar(uuid) {
    if (uuid) {
      const cos = new COS({
        SecretId: 'AKID21jLxxXtspX0FC9ax4h2C51kFoCNhWZg',
        SecretKey: 'HROJDscqncKP9g0zJMJ7Mo20oHTVJsRr',
      });
      cos.getObjectUrl(
        {
          Bucket: 'prophetsrc-1305001068' /* 必须 */,
          Region: 'ap-chengdu' /* 必须 */,
          Key: `${uuid}.jpg` /* 必须 */,
        },
        (err, data) => {
          this.setState({
            imageURL: data.Url,
          });
        },
      );
    } else {
      this.setState({
        imageURL: 'https://prophetsrc-1305001068.cos.ap-chengdu.myqcloud.com/defalutprofile.png',
      });
    }
  }

  onTabChange = (key) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = (tabKey) => {
    if (tabKey === 'projects') {
      return <Applications />;
    }

    if (tabKey === 'applications') {
      return <Applications />;
    }

    if (tabKey === 'articles') {
      return <Applications />;
    }

    return null;
  };

  renderUserInfo = (currentUser) => (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.title}
      </p>
      <p>
        <ClusterOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.group}
      </p>
      <p>
        <HomeOutlined
          style={{
            marginRight: 8,
          }}
        />
        {
          (
            currentUser.geographic || {
              province: {
                label: '',
              },
            }
          ).province.label
        }
        {
          (
            currentUser.geographic || {
              city: {
                label: '',
              },
            }
          ).city.label
        }
      </p>
    </div>
  );

  render() {
    const { tabKey } = this.state;
    // const { currentUser = {}, currentUserLoading } = this.props;
    // const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            {/* <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  {this.renderUserInfo(currentUser)}
                  <Divider dashed />
                  <TagList tags={currentUser.tags || []} />
                  <Divider
                    style={{
                      marginTop: 16,
                    }}
                    dashed
                  />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map((item) => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              )}
            </Card> */}
            <PageLeftContent url={this.state.imageURL} />
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(({ loading }) => ({
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
}))(Center);
