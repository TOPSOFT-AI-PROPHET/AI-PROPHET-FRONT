import { DefaultFooter } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, formatMessage, connect, FormattedMessage } from 'umi';
import React from 'react';
import logo from '../assets/xzpt_b.png';
import styles from './UserLayout.less';
import defaultSettings from '../../config/defaultSettings';

const UserLayout = (props) => {
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  let { title } = defaultSettings;
  if (location.pathname === '/user/login') {
    title = `${formatMessage({ id: 'menu.login', defaultMessage: 'Login' })} | ${
      defaultSettings.title
    }`;
  }
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
              <Link to="/">
                <span className={styles.title}>THE PROPHET</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="Welcome to THE PROPHET | OFFICIAL - TOPSOFT AI"
              />
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter copyright={`${new Date().getFullYear()}  TOPSOFT-AI-PROPHET`} links={[]} />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
