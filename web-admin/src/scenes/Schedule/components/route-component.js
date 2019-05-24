/* global google */

import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Steps, Card, Button, Select, Table } from 'antd'
import moment from 'moment'
import TrackingMap from './tracking-map'
import WithLoading from '../../../hoc/loading'

import { formatDuration } from '../../../util/vrp'
import { ROUTE_STATUS } from '../../../constants/enum'
import ToJS from '../../../hoc/toJs'

const { Step } = Steps
const { Option } = Select

const InfoField = ({ label, data, rightMap }) => (
  <Fragment>
    <Col span={6}>
      <p style={{ fontWeight: 'bold' }}>{label}</p>
    </Col>
    <Col span={6}>
      {data !== undefined ? (
        <p style={{ fontWeight: 'bold' }}>{data}</p>
      ) : (
        <p style={{ fontStyle: 'italic' }}>Chưa cập nhật</p>
      )}
    </Col>
  </Fragment>
)

const RouteCard = ({ route }) => (
  <Row>
    <InfoField
      label="Thời gian bắt đầu"
      data={route.ArrivalTime === 0 ? 'Chưa bắt đầu' : moment(route.ArrivalTime).format('DD/MM/YYYY')}
    />
    <InfoField
      label="Thời gian kết thúc"
      data={route.DepartureTime === 0 ? 'Chưa kết thúc' : moment(route.DepartureTime).format('DD/MM/YYYY')}
    />
    <InfoField label="Tổng khoảng cách dự kiến" data={`${Math.floor(route.EstimatedDistance / 1000)} km`} />
    <InfoField label="Tổng thời gian dự kiến" data={formatDuration(route.EstimatedDuration)} />
    <InfoField label="Tổng khối lượng" data={`${Math.floor(route.Weight)} kg`} />
    <InfoField label="Số lượng khách hàng" data={route.Customers.length} />
    <StatusSteps current={route.RouteStatus} />
  </Row>
)

const RouteSteps = ({ route }) => (
  <Card style={{ overflowX: 'auto' }}>
    <Steps
      direction="vertical"
      labelPlacement="vertical"
      current={route.Customers.map(item => (item.IsServed ? 1 : 0)).reduce((a, b) => a + b, 1)}
    >
      {route.Customers.length !== 0 ? <Step key="start" description={route.Depot.Address} /> : null}
      {route.Customers.map((customer, index) => (
        <Step key={`${route.RouteID}${index + 1}`} description={customer.Name} />
      ))}
      {route.Customers.length !== 0 ? <Step key="end" description={route.Depot.Address} /> : null}
    </Steps>
  </Card>
)

const StatusSteps = ({ current }) => (
  <Steps current={current}>
    {ROUTE_STATUS.map((item, index) => (
      <Step key={`${index + 1}`} title={item} />
    ))}
  </Steps>
)

class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditting: false,
      selectingDriver: null,
    }
  }

    toggleEditDriver = value => {
      this.setState(() => ({ isEditting: value }))
    };

    selectDriverOnChange = value => {
      this.setState(() => ({ selectingDriver: value }))
    };

    saveChange = () => {
      const { route, onUpdateDriver } = this.props
      this.toggleEditDriver(false)
      onUpdateDriver(route.RouteID, this.state.selectingDriver)
    };

    render() {
      const { driverInfo, drivers } = this.props
      const { isEditting, selectingDriver } = this.state
      return (
        <Fragment>
          {!isEditting ? (
            <h3 style={{ fontWeight: 'bold' }}>
              {driverInfo && `${driverInfo.Name} (${driverInfo.PhoneNumber})`}
              <Button
                shape="circle"
                icon="edit"
                onClick={() => this.toggleEditDriver(true)}
                style={{ marginLeft: 5 }}
              />
            </h3>
          ) : (
            <div>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={this.selectDriverOnChange}
                value={selectingDriver}
              >
                {drivers.map(driver => (
                  <Option key={driver.ID} value={driver.ID}>
                    {driver.DriverInfo.Name}
                  </Option>
                ))}
              </Select>
              <Button
                shape="circle"
                icon="check"
                type="primary"
                style={{ marginLeft: 5 }}
                onClick={this.saveChange}
              />
              <Button
                shape="circle"
                icon="cross"
                style={{ marginLeft: 5 }}
                onClick={() => this.toggleEditDriver(false)}
              />
            </div>
          )}
        </Fragment>
      )
    }
}

const RouteList = ({ routes, viewDetail, onUpdateDriver, drivers }) => {
  const columns = [
    {
      title: 'Lái xe',
      dataIndex: 'DriverInfo',
      render: (text, route) => (
        <Driver route={route} driverInfo={route.DriverInfo} drivers={drivers} onUpdateDriver={onUpdateDriver} />
      ),
    },
    {
      title: 'Khoảng cách',
      dataIndex: 'EstimatedDistance',
      render: (text, route) => `${Math.floor(route.EstimatedDistance / 1000)} km`,
    },
    {
      title: 'Thời gian',
      dataIndex: 'EstimatedDuration',
      render: (text, route) => formatDuration(route.EstimatedDuration),
    },
    {
      title: 'Khối lượng',
      dataIndex: 'Weight',
      render: (text, route) => `${Math.floor(route.Weight)} kg`,
    },
    {
      title: 'Số lượng khách hàng',
      align: 'center',
      dataIndex: 'CustomerLength',
      render: (text, route) => route.Customers.length,
      sort: (a, b) => a.Customers.length - b.Customers.length,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'RouteStatus',
      render: (text, route) => ROUTE_STATUS[route.RouteStatus],
      sort: (a, b) => a.RouteStatus - b.RouteStatus,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Chi tiết',
      dataIndex: 'detail',
      render: (text, route) => (
        <Button disabled={route.Customers.length === 0} onClick={() => viewDetail(route)}>
          {'Chi tiết'}
        </Button>
      ),
    },
  ]
  return <Table size="small" columns={columns} bordered dataSource={routes} rowKey="RouteID" rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')} />
}

const RouteDetail = ({ mapConfig, data, route }) => (
  <Row gutter={10}>
    <Col span={18}>
      <TrackingMap
        id="tracking-map"
        options={mapConfig}
        data={data}
        collectResult={result => console.log(result)}
        onMapLoad={map => {
          let marker
          data.nodes.forEach((item, index) => {
            marker = new window.google.maps.Marker({
              position: item,
              map,
            })
            const infowindow = new google.maps.InfoWindow()
            google.maps.event.addListener(
              marker,
              'click',
              (function (marker, index) {
                return function () {
                  infowindow.setContent(item.info)
                  infowindow.open(map, marker)
                }
              }(marker, index)),
            )
          })
        }}
      />
    </Col>
    <Col span={6}>
      <RouteSteps route={route} />
    </Col>
  </Row>
)

RouteList.propTypes = {
  routes: PropTypes.array,
  viewDetail: PropTypes.func,
  onUpdateDriver: PropTypes.func,
  drivers: PropTypes.array,
}

RouteList.defaultProps = {
  routes: [],
  drivers: [],
  viewDetail: () => {},
  onUpdateDriver: () => {},
}

export default {
  RouteSteps,
  RouteCard,
  InfoField,
  RouteDetail,
  RouteList: WithLoading(ToJS(RouteList)),
}
