import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip, Badge, Icon } from 'antd'
import { withState } from 'recompose'

const BadgeIcon = ({ isHover, setHover, count, icon, name, onClick }) => (
  <Tooltip title={name} placement="left">
    <span
      style={{ width: '40px', display: 'inline-block', textAlign: 'center' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <Badge count={count} offset={[-5, 5]}>
        <Icon style={{ fontSize: '16px', color: isHover ? 'green' : null }} type={icon} />
      </Badge>
    </span>
  </Tooltip>
)

BadgeIcon.propTypes = {
  isHover: PropTypes.bool,
  setHover: PropTypes.func,
  count: PropTypes.number,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
}

BadgeIcon.defaultProps = {
  isHover: false,
  setHover: () => {},
  count: 0,
  icon: '',
  name: '',
  onClick: () => {},
}

export default withState('isHover', 'setHover', false)(BadgeIcon)
