import React from 'react'
import { Menu, Layout, Icon } from 'antd'
import { Link } from 'react-router-dom'
import ROUTER from '../../constants/router'

import toJs from '../../hoc/toJs'

const { SubMenu } = Menu
const { Sider } = Layout

class MenuBar extends React.Component {
  render() {
    return (
      <Sider theme="dark" style={{ boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)' }}>
        <div
          style={{ margin: 24 }}
        >
          <Link to={ROUTER.HOME}>
            <img src="/images/anfast.jpg" style={{ width: '80%' }} alt="" />
          </Link>
        </div>
        <Menu onClick={this.handleClick} mode="inline" theme="dark">
          <SubMenu
            key="data"
            title={(
              <span>
                <Icon type="database" />
                <span>Dữ liệu</span>
              </span>
            )}
          >
            <Menu.Item key="vehicle">
              <Link to={ROUTER.VEHICLE.INDEX}>
                <span style={{ marginLeft: '10px' }}>Phương tiện</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="driver">
              <Link to={ROUTER.DRIVER.INDEX}>
                <span style={{ marginLeft: '10px' }}>Lái xe</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="customer">
              <Link to={ROUTER.CUSTOMER.INDEX}>
                <span style={{ marginLeft: '10px' }}>Khách hàng</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="customer-group">
              <Link to={ROUTER.CUSTOMER_GROUP.INDEX}>
                <span style={{ marginLeft: '10px' }}>Nhóm khách hàng</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="product">
              <Link to={ROUTER.PRODUCT.INDEX}>
                <span style={{ marginLeft: '10px' }}>Hàng hóa</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="invoice">
              <Link to={ROUTER.INVOICE.INDEX}>
                <span style={{ marginLeft: '10px' }}>Đơn hàng</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="routing"
            title={(
              <span>
                <Icon type="share-alt" />
                <span>Định tuyến</span>
              </span>
            )}
          >
            <Menu.Item key="schedule">
              <Link to={ROUTER.SCHEDULE.INDEX}>
                <span style={{ marginLeft: '10px' }}>Lịch giao vận</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="routes">
              <Link to={ROUTER.ROUTE.INDEX}>
                <span style={{ marginLeft: '10px' }}>Tuyến đường</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="routing-vrp">
              <Link to={ROUTER.ROUTING.VRP}>
                <span style={{ marginLeft: '10px' }}>Định tuyến</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="general"
            title={(
              <span>
                <Icon type="mail" />
                <span>Quản lí chung</span>
              </span>
            )}
          >
            <Menu.Item key="item">
              <Link to={ROUTER.GENERAL.INDEX}>Quản lí chung</Link>
            </Menu.Item>
            <Menu.Item key="account">
              <Link to={ROUTER.GENERAL.ACCOUNT}>Tài khoản</Link>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu
            key="report"
            title={(
              <span>
                <Icon type="file-text" />
                <span>Báo cáo</span>
              </span>
            )}
          >
            <Menu.Item key="distance">
              <Link to={ROUTER.REPORT.DISTANCE}>Quãng đường</Link>
            </Menu.Item>
            <Menu.Item key="weight">
              <Link to={ROUTER.REPORT.WEIGHT}>Khối lượng</Link>
            </Menu.Item>
            <Menu.Item key="working-days">
              <Link to={ROUTER.REPORT.WORKING_DAYS}>Ngày làm việc</Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
    )
  }
}

export default toJs(MenuBar)
