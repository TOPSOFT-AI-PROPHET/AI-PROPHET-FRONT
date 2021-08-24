import React from 'react';
import t1 from '../../../public/degreeBadge/t1.png';
import t0 from '../../../public/degreeBadge/t0.png';
import t2 from '../../../public/degreeBadge/T2.png';
import t3 from '../../../public/degreeBadge/t3.png';
import t4 from '../../../public/degreeBadge/t4.png';
import t5 from '../../../public/degreeBadge/T5.png';

const badgesList = {
  t1,
  t2,
  t3,
  t4,
  t5,
  t0,
};

export default class Badges extends React.Component {
  // 此组件需传入 level属性值（用户等级）

  render() {
    console.log(this.props.level);
    return <img src={badgesList[this.props.level]} />;
  }
}
