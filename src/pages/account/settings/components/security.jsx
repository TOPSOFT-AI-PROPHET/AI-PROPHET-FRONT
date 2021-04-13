import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import { List } from 'antd';

const passwordStrength = {
  veryStrong: (
    <span className="veryStrong">
      <FormattedMessage id="accountandsettings.security.veryStrong" defaultMessage="Very Strong" />
    </span>
  ),
  strong: (
    <span className="strong">
      <FormattedMessage id="accountandsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountandsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountandsettings.security.weak" defaultMessage="Weak" />
    </span>
  ),
};

class SecurityView extends Component {
  // componentDidMount(){
  //  const { currentUser } = this.props;
  //  console.log(currentUser);
  // }

  passwordsLevel = (password) => {
    let Modes = 0;
    for (let i = 0; i < password.length; i += 1) {
      Modes |= this.charMode(password.charCodeAt(i)); // eslint-disable-line no-bitwise
    }

    if (this.bitTotal(Modes) === 1) {
      return passwordStrength.weak;
    }
    if (this.bitTotal(Modes) === 2) {
      return passwordStrength.medium;
    }
    if (this.bitTotal(Modes) === 3) {
      return passwordStrength.strong;
    }
    return passwordStrength.veryStrong;
  };

  bitTotal = (num) => {
    let n = num;
    let modes = 0;
    for (let i = 0; i < 4; i += 1) {
      if (n && 1) {
        modes += 1;
      }
      n >>>= 1; // eslint-disable-line no-bitwise
    }
    return modes;
  };

  handleEmailAddress = (email) => {
    const newEmail = new Array(2);
    newEmail[0] = email.substr(0, 3);
    newEmail[1] = email.substr(email.length - 4, email.length);
    return newEmail.join('*****');
  };

  handlephoneNumber = (phoneNumber) => {
    // console.log(phoneNumber);
    let entity = new Array(2);
    entity = phoneNumber.split('-');
    // console.log(entity);
    const newPhone = new Array(2);
    newPhone[0] = entity[1].substr(0, 2);
    newPhone[1] = entity[1].substr(entity[1].length - 2, entity[1].length);
    return newPhone.join('*****');
  };

  charMode = (iN) => {
    if (iN >= 48 && iN <= 57) {
      // number
      return 1;
    }
    if (iN >= 65 && iN <= 90) {
      // upletter
      return 2;
    }
    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
      // upcase and lowercase
      return 4;
    } // Special characters
    return 8;
  };

  getData = (currentUser) => [
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.password',
        },
        {},
      ),
      description: (
        <>
          {formatMessage({
            id: 'accountandsettings.security.password-description',
          })}
          {this.passwordsLevel(currentUser.password)}
        </>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountandsettings.security.phone-description',
        },
        {},
      )} ${this.handlephoneNumber(currentUser.contact_number)}`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountandsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountandsettings.security.email-description',
        },
        {},
      )} ${this.handleEmailAddress(currentUser.email)}`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  ];

  render() {
    const { currentUser } = this.props;
    // console.log(currentUser);

    const data = this.getData(currentUser);
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default connect(({ accountAndsettings }) => ({
  currentUser: accountAndsettings.currentUser,
}))(SecurityView);
