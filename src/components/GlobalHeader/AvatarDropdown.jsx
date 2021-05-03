import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect, formatMessage } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import request from '@/utils/request';
import COS from 'cos-js-sdk-v5';

class AvatarDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
    };
  }

  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/dash/account/${key}`);
  };

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

  componentDidMount() {
    request('/users/getUserInfo', { method: 'POST' })
      .then((result) => {
        if (result.data) {
          this.handleAvatar(result.data.profile_image_uuid);
        }
      })
      .catch((e) => console.log(e));
  }

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        ) */}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            {formatMessage({
              id: 'component.globalHeader.AvatarDropdown.settings',
            })}
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          {formatMessage({
            id: 'component.globalHeader.AvatarDropdown.signOut',
          })}
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.nickname ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={this.state.imageURL} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
