import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import logo from '../assets/xzpt_b.png';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <a href="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </a>
              <a href="/">
                <span className={styles.title}>THE PROPHET</span>
              </a>
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
