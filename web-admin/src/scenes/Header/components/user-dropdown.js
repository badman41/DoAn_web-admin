import React from 'react'
import PropTypes from 'prop-types'

import { Menu, Dropdown } from 'antd'

const UserDropdown = ({ onClick, children, logOut }) => (
  <Dropdown
    overlay={(
      <Menu>
        <Menu.Item key="profile" onClick={onClick}>
          <span role="img" aria-label="Password">
                        Tài khoản
          </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="change-pass" onClick={logOut}>
          <span role="img" aria-label="Password">
                        Đăng xuất
          </span>
        </Menu.Item>
      </Menu>
    )}
  >
    <span
      style={{
        width: '40px',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      {children}
    </span>
  </Dropdown>
)

UserDropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  logOut: PropTypes.func.isRequired,
}

export default UserDropdown
