import React, { Component } from 'react';
import { history, FormattedMessage, SelectLang } from 'umi';
import styles from './Welcome.less';

class Welcome extends Component {
  createLink(rel, type, href) {
    const e = document.createElement('link');
    e.rel = rel;
    e.type = type;
    e.href = href;
    return e;
  }

  createScript(src) {
    const e = document.createElement('script');
    e.src = src;
    return e;
  }

  removeCss(href) {
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i += 1) {
      if (links[i] && links[i].href && links[i].href.indexOf(href) !== -1) {
        links[i].parentNode.removeChild(links[i]);
      }
    }
  }

  removeScript(src) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) !== -1) {
        scripts[i].parentNode.removeChild(scripts[i]);
      }
    }
  }

  goLogin() {
    if (process.env.NODE_ENV !== 'development') {
      window.location.href = '/user/login';
    } else {
      window.location.href = '/#/user/login';
    }
  }

  componentWillUnmount() {
    this.removeCss('assets/css/bootstrap.min.css');
    this.removeCss('assets/css/custom.css');
    this.removeCss('assets/css/animate.css');
    this.removeCss('assets/css/owl.carousel.css');
    this.removeCss('assets/css/owl.theme.css');
    this.removeCss('assets/css/owl.transitions.css');
    this.removeCss('assets/css/magnific-popup.css');
    this.removeCss('assets/themify-icons/themify-icons.css');
    this.removeScript('assets/js/jquery-1.11.1.min.js');
    this.removeScript('assets/js/bootstrap.min.js');
    this.removeScript('assets/js/jquery.easing.1.3.min.js');
    this.removeScript('assets/js/owl.carousel.min.js');
    this.removeScript('assets/js/jquery.magnific-popup.min.js');
    this.removeScript('assets/js/jquery.ajaxchimp.min.js');
    this.removeScript('assets/js/jquery.backstretch.min.js');
    this.removeScript('assets/js/wow.min.js');
    this.removeScript('assets/js/jquery.textrotator.min.js');
    this.removeScript('assets/js/custom.js');
  }

  componentDidMount() {
    document.title = 'THE PROPHET | OFFICIAL - TOPSOFT AI';
    document
      .getElementsByTagName('head')[0]
      .appendChild(this.createLink('stylesheet', 'text/css', 'assets/css/bootstrap.min.css'));
    document
      .getElementsByTagName('head')[0]
      .appendChild(this.createLink('stylesheet', 'text/css', 'assets/css/custom.css'));
    document
      .getElementsByTagName('head')[0]
      .appendChild(this.createLink('stylesheet', 'text/css', 'assets/css/animate.css'));
    document
      .getElementsByTagName('head')[0]
      .appendChild(this.createLink('stylesheet', 'text/css', 'assets/css/owl.carousel.css'));
    document
      .getElementsByTagName('head')[0]
      .appendChild(this.createLink('stylesheet', 'text/css', 'assets/css/owl.theme.css'));
    document
      .getElementsByTagName('head')[0]
      .appendChild(this.createLink('stylesheet', 'text/css', 'assets/css/owl.transitions.css'));
    document
      .getElementsByTagName('head')[0]
      .appendChild(this.createLink('stylesheet', 'text/css', 'assets/css/magnific-popup.css'));
    document
      .getElementsByTagName('head')[0]
      .appendChild(
        this.createLink('stylesheet', 'text/css', 'assets/themify-icons/themify-icons.css'),
      );
    const jq = document
      .getElementsByTagName('body')[0]
      .appendChild(this.createScript('assets/js/jquery-1.11.1.min.js'));
    jq.onload = () => {
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/bootstrap.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/jquery.easing.1.3.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/owl.carousel.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/jquery.magnific-popup.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/jquery.ajaxchimp.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/jquery.backstretch.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/wow.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/jquery.textrotator.min.js'));
      document
        .getElementsByTagName('body')[0]
        .appendChild(this.createScript('assets/js/custom.js'));
    };
  }

  render() {
    return (
      <div id="page-top" className="index">
        {/* Header */}
        <header id="background-slider" className="header-img">
          <div className="home-fullscreen">
            <div className="fullscreen">
              <div className="fullscreen-wrap">
                <div className="container">
                  <div className="row text-center">
                    <div className="col-md-12">
                      <img
                        src="assets/img/logo_w_pph.png"
                        style={{ height: '160px', width: '160px' }}
                      />
                      <h1>
                        THE PROPHET<span className="dot">.</span>
                      </h1>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-center">
                      <ul id="intro">
                        <li>
                          <h2>
                            <FormattedMessage id="welcomepage.slogan1" />
                          </h2>
                        </li>
                        <li>
                          <h2>
                            <FormattedMessage id="welcomepage.slogan2" />
                          </h2>
                        </li>
                        <li>
                          <h2>
                            <FormattedMessage id="welcomepage.slogan3" />
                          </h2>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row text-center">
                    <div className="col-md-12 store-margin">
                      <a className="page-scroll" href="#navigation">
                        <span className="arrow ti-arrow-circle-down"></span>
                      </a>
                    </div>
                    <SelectLang className={styles.action} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* End Header */}

        {/* Navigation */}
        <div id="navigation">
          <nav className="navbar navbar-default navbar-static-top" id="nav">
            <div className="container">
              <div className="navbar-header page-scroll">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                {/* Brand */}
                <a className="navbar-brand page-scroll logo" href="#page-top">
                  <img src="assets\img\logo_g_pph.png" style={{ height: '20px', width: '20px' }} />
                </a>
                <a className="navbar-brand page-scroll logo" href="#page-top">
                  THE PROPHET<span className="dot">.</span>
                </a>
              </div>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a className="page-scroll" href="#page-top">
                      <FormattedMessage id="welcomepage.button.home" />
                    </a>
                  </li>

                  <li>
                    <a className="page-scroll" href="#features">
                      <FormattedMessage id="welcomepage.button.features" />
                    </a>
                  </li>

                  <li>
                    <a className="page-scroll" href="#extra">
                      <FormattedMessage id="welcomepage.button.team" />
                    </a>
                  </li>

                  <li>
                    <a className="page-scroll" href="http://1.15.48.81:8889/">
                      <FormattedMessage id="welcomepage.button.infocenter" />
                    </a>
                  </li>
                  <li>
                    <a className="page-scroll" onClick={this.goLogin}>
                      <FormattedMessage id="welcomepage.button.login" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* End Navigation */}

        {/* Services */}
        <section id="services">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h2 className="headline wow fadeInDown">
                  <FormattedMessage id="welcomepage.secondpage.introduction1" />
                  <span className="dot">.</span>
                </h2>
                <div className="custom-style">
                  <span className="ti-announcement"></span>
                </div>
              </div>
            </div>
            <div className="row top-pad">
              <div
                className="col-md-3 col-sm-6 text-center wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="services">
                  <span className="services-icon-style ti-heart"></span>
                  <h3>
                    <FormattedMessage id="welcomepage.secondpage.introduction2" />
                  </h3>
                  <p>
                    <FormattedMessage id="welcomepage.secondpage.introduction3" />
                  </p>
                  <div className="divider center-block"></div>
                </div>
              </div>
              <div
                className="col-md-3 col-sm-6 text-center wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay=".5s"
              >
                <div className="services">
                  <span className="services-icon-style ti-mobile"></span>
                  <h3>
                    <FormattedMessage id="welcomepage.secondpage.introduction4" />
                  </h3>
                  <p>
                    <FormattedMessage id="welcomepage.secondpage.introduction5" /> &amp;{' '}
                    <FormattedMessage id="welcomepage.secondpage.introduction6" />
                  </p>
                  <div className="divider center-block"></div>
                </div>
              </div>
              <div
                className="col-md-3 col-sm-6 text-center wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay=".7s"
              >
                <div className="services">
                  <span className="services-icon-style ti-pencil-alt"></span>
                  <h3>
                    <FormattedMessage id="welcomepage.secondpage.introduction7" />
                  </h3>
                  <p>
                    <FormattedMessage id="welcomepage.secondpage.introduction8" />
                  </p>
                  <div className="divider center-block"></div>
                </div>
              </div>
              <div
                className="col-md-3 col-sm-6 text-center wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay=".9s"
              >
                <div className="services">
                  <span className="services-icon-style ti-support"></span>
                  <h3>
                    <FormattedMessage id="welcomepage.secondpage.introduction9" />
                  </h3>
                  <p>
                    <FormattedMessage id="welcomepage.secondpage.introduction10" />
                  </p>
                  <div className="divider center-block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Services */}

        {/* Features */}
        <section id="features">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h2 className="headline wow fadeInDown">
                  <FormattedMessage id="welcomepage.thirdpage.systemintroduction1" /> &{' '}
                  <FormattedMessage id="welcomepage.thirdpage.systemintroduction2" />
                  <span className="dot">.</span>
                </h2>
                <div className="custom-style">
                  <img
                    src="assets\img\logo_g_pph_pt.png"
                    style={{ height: '80px', width: '80px' }}
                  />
                </div>
              </div>
            </div>
            <div className="row top-pad">
              <div className="col-md-5">
                <img
                  src="assets/img/tsai_01.jpg"
                  alt="phone"
                  className="img-responsive image_front center-block wow fadeInLeft"
                  data-wow-duration="2s"
                  data-wow-delay=".2s"
                />
              </div>
              <div className="col-md-7">
                <div className="features">
                  <h3 className="wow fadeInDown">
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction3" />{' '}
                  </h3>
                  <p className="wow fadeIn">
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction4" />
                  </p>
                </div>

                <div className="features">
                  <h3 className="wow fadeInDown">
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction5" />
                  </h3>
                  <p className="wow fadeIn">
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction6" />
                  </p>
                </div>

                <div className="features">
                  <h3 className="wow fadeInDown">
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction7" />
                  </h3>
                  <p className="wow fadeIn">
                    &quot;
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction8" />
                    &quot;
                  </p>
                </div>

                <div className="features">
                  <h3 className="wow fadeInDown">
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction9" />
                  </h3>
                  <p className="wow fadeIn">
                    <FormattedMessage id="welcomepage.thirdpage.systemintroduction10" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Features */}

        {/* Video */}
        <section id="video">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h2 className="wow fadeInDown">
                  <FormattedMessage id="welcomepage.video" />
                  <span className="dot">.</span>
                </h2>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div className="app-video" data-mfp-src="">
                  <span className="play-icon ti-control-play"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Video */}

        {/* TEAMS */}
        <section id="extra">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h2 className="headline wow fadeInDown">
                  <FormattedMessage id="welcomepage.fourthpage.teamintroduction" />
                  <span className="dot">.</span>
                </h2>
                <div className="custom-style">
                  <span className="ti-flickr-alt"></span>
                </div>
              </div>
            </div>
            <div className="row top-pad extra-slider">
              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername1" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction1" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction2" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/syh.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername5" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction10" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction11" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/kql.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername13" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction24" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/xhx.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername15" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction26" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/cmy.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername17" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction28" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/tn.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername2" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction3" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction4" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/chy.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername3" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction5" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction6" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction7" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/ds.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername6" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction12" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction13" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/lyl.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername7" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction14" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction15" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/lym.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername8" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction16" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction17" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/yy.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername9" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction18" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction19" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/zsp.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername10" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction20" />
                      <br /> <FormattedMessage id="welcomepage.fourthpage.memberintroduction21" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/zy.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername11" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction22" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/zxd.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername12" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction23" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/lxy.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername14" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction25" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/xbw.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="item">
                <div className="col-md-4">
                  <div className="features">
                    <h3>
                      <FormattedMessage id="welcomepage.fourthpage.membername16" />
                    </h3>
                    <p>
                      <FormattedMessage id="welcomepage.fourthpage.memberintroduction27" />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/matt.jpg"
                    alt="phone"
                    className="img-responsive center-block wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Extra Features */}

        {/* MODULES */}
        <section id="screenshots">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h2 className="headline wow fadeInDown">
                  <FormattedMessage id="welcomepage.fifthpage.aimodules" />
                  <span className="dot">.</span>
                </h2>
                <div className="custom-style">
                  <span className="ti-palette"></span>
                </div>
              </div>
            </div>
            <div className="row top-pad">
              <div className="col-md-12 text-center">
                <div id="screenshot">
                  {/* Screenshot 1 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot1"
                      src="assets/img/model1.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/model1.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 1 */}
                  {/* Screenshot 2 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot2"
                      src="assets/img/model2.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/model2.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 2 */}
                  {/* Screenshot 3 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot3"
                      src="assets/img/model-emp.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/model-emp.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 3 */}
                  {/* Screenshot 4 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot4"
                      src="assets/img/model-emp.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/model-emp.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 4 */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Screenshots */}

        {/* Search */}
        <section id="newsletter">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h2 className="headline wow fadeInDown">
                  <FormattedMessage id="welcomepage.fifthpage.searchmodules" />
                  <span className="dot">.</span>
                </h2>
                <div className="custom-style">
                  <span className="ti-search"></span>
                </div>
              </div>
            </div>
            <div className="row top-pad">
              <div className="col-md-8 col-md-offset-2">
                <form id="subscribe" className="form-horizontal">
                  <div className="form-group">
                    <div
                      className="col-md-8 col-sm-8 newsletter wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay=".1s"
                    >
                      <input
                        className="form-control"
                        type="text"
                        id="AI_name"
                        placeholder="ie.Stanford Uni. Emotion Module"
                        required="required"
                      />
                    </div>
                    <div
                      className="col-md-4 col-sm-4 text-center wow fadeInDown"
                      data-wow-duration="1s"
                      data-wow-delay=".1s"
                    >
                      <button
                        type="submit"
                        className="btn custom-button-1"
                        onClick={() => {
                          history.push(`/user/login`);
                        }}
                      >
                        <span className="subscribe ti-mouse"></span>GO
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-push-4 text-center">
                <p className="subscribe-error"></p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 col-md-push-2 text-center">
                <p className="subscribe-success"></p>
              </div>
            </div>
          </div>
        </section>
        {/* End Newsletter */}
        {/* Footer */}
        <footer>
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <a
                  href="https://topsoft-ai-prophet.github.io/TOPSOFTAI-MAIN/"
                  style={{ color: '#000000' }}
                >
                  <FormattedMessage id="welcomepage.button.mainweb" />
                </a>
                <p>
                  <FormattedMessage id="welcomepage.fifthpage.bottom" />
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* End Footer */}

        {/* Scroll Top */}
        <div className="scroll-top">
          <a className="page-scroll" href="#page-top">
            <span className="ti-arrow-up"></span>
          </a>
        </div>
        {/* End Scroll Top */}
      </div>
    );
  }
}

export default Welcome;
