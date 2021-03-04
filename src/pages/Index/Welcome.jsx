import React, { Component } from 'react';

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
                          <h2>Artificial Intelligence For Everyone</h2>
                        </li>
                        <li>
                          <h2>Explore The Future</h2>
                        </li>
                        <li>
                          <h2>Dataset From Entire World</h2>
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
                  <img src="assets\img\logo_g_pph.png" style={{ height: '16px', width: '16px' }} />
                  THE PROPHET<span className="dot">.</span>
                </a>
                {/* End Brand */}
              </div>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a className="page-scroll" href="#page-top">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="page-scroll" href="#features">
                      Features
                    </a>
                  </li>
                  <li>
                    <a className="page-scroll" href="#teams">
                      Team
                    </a>
                  </li>

                  <li>
                    <a className="page-scroll" href="/#/user/login">
                      Login
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
                  We Offering<span className="dot">.</span>
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
                  <h3>AI-onlin Prediction</h3>
                  <p>For Everyone.</p>
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
                  <h3>Open-sourse AI Modules</h3>
                  <p>100% Free &amp; Open.</p>
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
                  <h3>Customised AI Training</h3>
                  <p>Train Your AI online.</p>
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
                  <h3>TSAI Exclusive Datasets</h3>
                  <p>Fully Collected, Maintained Datasets.</p>
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
                  PROPHET SYSTEM & TOPSOFT FAMILY<span className="dot">.</span>
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
                  <h3 className="wow fadeInDown">THE PROPPHET SYSTEM</h3>
                  <p className="wow fadeIn">
                    THE PROPHET system project is an on-line AI manipulating system consists of
                    multiple internal subsystems which allow users to request existing, and
                    well-trained AI modules to perform prediction tasks by providing certain
                    parameters.
                  </p>
                </div>

                <div className="features">
                  <h3 className="wow fadeInDown">TOPSOFT INT</h3>
                  <p className="wow fadeIn">
                    Members from over 12 countries / regions, full of professions, reserchers,
                    university students, we are a huge international computer science community to
                    work with.
                  </p>
                </div>

                <div className="features">
                  <h3 className="wow fadeInDown">TOPSOFT AI</h3>
                  <p className="wow fadeIn">
                    &quot;By using artificial intelligence, we wish to build a new way for people to
                    live with. We have members from widly separated top universities around the
                    world including University of Liverpool, University of Oxford, Nanyang
                    Technological University etc. &quot;
                  </p>
                </div>

                <div className="features">
                  <h3 className="wow fadeInDown">TOPSOFT</h3>
                  <p className="wow fadeIn">Founded in 2015, Mainland China.</p>
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
                  VIDEO<span className="dot">.</span>
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
                  DEVELOPING / RESEARCH TEAMS<span className="dot">.</span>
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
                    <h3>Yuhang Song</h3>
                    <p>
                      Founder of TOPSOFT, TOPSOFT Board Member.
                      <br /> Project Director of THE PROPHET. Head of AI Department.
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
                    <h3>Hongyu Chen</h3>
                    <p>
                      TOPSOFT Board Member.
                      <br /> Head of WEB Back Department.
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
                    <h3>Dursun Satiroglu</h3>
                    <p>
                      WEB Front Department Developer
                      <br /> Project Documenting
                      <br /> APP Department IOS Developer
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
                    <h3>Zhan Feng</h3>
                    <p>
                      TOPSOFT Board Member
                      <br /> WEB Back Developer
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/img/fz.jpg"
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
                    <h3>Qingling Kang</h3>
                    <p>
                      TOPSOFT Board Member.
                      <br /> Head of Marketing Department
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
                    <h3>Yilin Lu</h3>
                    <p>
                      AI Department Developer
                      <br /> WEB Front Department Developer
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
                    <h3>Yiming Li</h3>
                    <p>
                      WEB Back Department Developer
                      <br /> Project Documenting
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
                    <h3>Yang Yang</h3>
                    <p>
                      TOPSOFT Chief technical advisor
                      <br /> Project Director
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
                    <h3>Shenpu Zhou</h3>
                    <p>
                      WEB Back Department Developer
                      <br /> WEB Front Department Developer
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
                    <h3>Yang Zhang</h3>
                    <p>
                      AI Department Developer
                      <br /> WEB Front Department Developer
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
                  AI MODULES<span className="dot">.</span>
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
                      src="assets/img/screenshots/01.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/01.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 1 */}
                  {/* Screenshot 2 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot2"
                      src="assets/img/screenshots/02.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/02.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 2 */}
                  {/* Screenshot 3 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot3"
                      src="assets/img/screenshots/03.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/03.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 3 */}
                  {/* Screenshot 4 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot4"
                      src="assets/img/screenshots/04.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/04.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 4 */}
                  {/* Screenshot 5 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot5"
                      src="assets/img/screenshots/01.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/01.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 5 */}
                  {/* Screenshot 6 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot6"
                      src="assets/img/screenshots/02.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/02.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 6 */}
                  {/* Screenshot 7 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot7"
                      src="assets/img/screenshots/03.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/03.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 7 */}
                  {/* Screenshot 8 */}
                  <div className="img-wrap">
                    <img
                      className="img-responsive center-block"
                      alt="screenshot8"
                      src="assets/img/screenshots/04.jpg"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <a className="zoom" href="assets/img/screenshots/04.jpg"></a>
                    </div>
                  </div>
                  {/* End Screenshot 8 */}
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
                  SEARCH MODULES<span className="dot">.</span>
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
                      <button type="submit" className="btn custom-button-1">
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
                <p>@TOPSOFT AI | 2021 All Rights Reserved.</p>
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
