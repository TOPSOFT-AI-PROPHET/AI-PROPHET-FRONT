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

const state = {
  size: 'large',
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

// const TagList = ({ tags }) => {
//   const ref = useRef(null);
//   const [newTags, setNewTags] = useState([]);
//   const [inputVisible, setInputVisible] = useState(false);
//   const [inputValue, setInputValue] = useState('');

//   const showInput = () => {
//     setInputVisible(true);

//     if (ref.current) {
//       // eslint-disable-next-line no-unused-expressions
//       ref.current?.focus();
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputConfirm = () => {
//     let tempsTags = [...newTags];

//     if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
//       tempsTags = [
//         ...tempsTags,
//         {
//           key: `new-${tempsTags.length}`,
//           label: inputValue,
//         },
//       ];
//     }

//     setNewTags(tempsTags);
//     setInputVisible(false);
//     setInputValue('');
//   };

//   return (
//     <div className={styles.tags}>
//       <div className={styles.tagsTitle}>标签</div>
//       {(tags || []).concat(newTags).map((item) => (
//         <Tag key={item.key}>{item.label}</Tag>
//       ))}
//       {inputVisible && (
//         <Input
//           ref={ref}
//           type="text"
//           size="small"
//           style={{
//             width: 78,
//           }}
//           value={inputValue}
//           onChange={handleInputChange}
//           onBlur={handleInputConfirm}
//           onPressEnter={handleInputConfirm}
//         />
//       )}
//       {!inputVisible && (
//         <Tag
//           onClick={showInput}
//           style={{
//             borderStyle: 'dashed',
//           }}
//         >
//           <PlusOutlined />
//         </Tag>
//       )}
//     </div>
//   );
// };

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

  input = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetch',
    });
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

export default connect(({ loading, accountAndcenter }) => ({
  currentUser: accountAndcenter.currentUser,
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
}))(Center);
