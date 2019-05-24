import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Card, Modal, Button, Divider, notification, Row, Col, Input, Pagination } from 'antd'
import moment from 'moment'
import toJs from '../../../../hoc/toJs'
import PriceForm from './price-form'
import { changeAlias } from '../../../../util/formatText'
import WithLoadingHOC from '../../../../hoc/loading'

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

const columns = (onEdit, onDelete) => [
  {
    title: 'Mã mặt hàng',
    dataIndex: 'ProductCode',
  },
  {
    title: 'Tên mặt hàng',
    dataIndex: 'ProductName',
  },
  {
    title: 'Giá',
    dataIndex: 'Prices[0].Price',
    render: (text, record) => (record.Prices.length ? `${formatter.format(text)}/${record.Prices[0].UnitName}` : 'Chưa có giá'),
  },
  {
    title: 'Sửa',
    dataIndex: 'ProductID',
    width: 100,
    render: (text, record) => (
      <Row>
        <Button icon="edit" onClick={() => onEdit(record)} type="primary" shape="circle" />
        {/* <Button icon="delete" onClick={() => onDelete(record)} type="danger" shape="circle" /> */}
      </Row>
    ),
  },
]

class PriceTable extends Component {
  state = {
    showPriceModal: false,
    editMode: false,
    priceTable: [],
    filterText: '',
    price: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      priceTable:
        nextProps.dataSource.length
        && nextProps.dataSource[0].ProductPrices
          ? nextProps.dataSource[0].ProductPrices.filter(
            item => changeAlias(item.ProductName.toLowerCase()).indexOf(changeAlias(prevState.filterText.toLowerCase())) >= 0
            || changeAlias(item.ProductCode.toLowerCase()).indexOf(changeAlias(prevState.filterText.toLowerCase())) >= 0,
          ) : [],
    }
  }

  priceFormRef = ref => {
    this.priceFrom = ref
  }

  togglePriceModal = () => {
    this.setState(prevState => ({
      editMode: prevState.showPriceModal ? false : prevState.editMode,
      showPriceModal: !prevState.showPriceModal,
    }))
  };

  onOk = () => {
    this.priceFrom.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.editMode) {
          this.props.updateItem(this.props.dataSource[0].ID, values, {
            onSuccess: () => {
              this.togglePriceModal()
              notification.success({ message: 'Cập nhật thành công' })
            },
            onError: () => {
              this.togglePriceModal()
              notification.success({ message: 'Cập nhật thất bại' })
            },
          })
        } else {
          this.props.addItem(this.props.dataSource[0].ID, values, {
            onSuccess: () => {
              this.togglePriceModal()
              notification.success({ message: 'Cập nhật thành công' })
            },
            onError: () => {
              this.togglePriceModal()
              notification.success({ message: 'Cập nhật thất bại' })
            },
          })
        }
      }
    })
  };

  onEdit = price => {
    this.setState({ price, editMode: true })
    this.togglePriceModal()
  };

  onDelete = price => {
    this.props.removeItem(
      this.props.dataSource[0].ID,
      { ProductCode: price.ProductCode, UnitID: price.Prices[0].UnitID },
      {
        onSuccess: () => {
          notification.success({ message: 'Cập nhật thành công' })
        },
        onError: () => {
          notification.success({ message: 'Cập nhật thất bại' })
        },
      },
    )
  };

  onChangeFilter = ({ target: { value } }) => {
    this.setState({ filterText: value })
  };

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <Button style={{ border: 'none' }}>Tháng sau</Button>
    }
    if (type === 'next') {
      return <Button style={{ border: 'none' }}>Tháng trước</Button>
    }
    return originalElement
  };

  render() {
    const {
      dataSource,
      products,
      units,
      meta: { current, total, pageSize },
      onChangePage,
      onOpenImportModal,
    } = this.props
    const { showPriceModal, editMode, price, filterText, priceTable } = this.state
    return (
      <Card
        title="Sửa báo giá cho khách hàng"
        extra={(
          <Button key="close" onClick={onOpenImportModal}>
            {'Thêm báo giá'}
          </Button>
        )}
      >
        {dataSource.map((item, index) => (
          <Card
            key={`${index + 1}`}
            title={`Ngày ${moment(item.Date).format('DD/MM/YYYY')}`}
            extra={(
              <Pagination
                size="small"
                simple
                current={current}
                total={total}
                pageSize={pageSize}
                onChange={onChangePage}
                itemRender={this.itemRender}
              />
            )}
          >
            <Row>
              <Col span={12}>
                <Input value={filterText} onChange={this.onChangeFilter} placeholder="Lọc giá sản phẩm" />
              </Col>
              <Col span={12}>
                <Button style={{ float: 'right' }} type="primary" onClick={this.togglePriceModal}>
                  Thêm sản phẩm vào báo giá
                </Button>
              </Col>
            </Row>
            <Divider dashed />
            <Table
              size="small"
              dataSource={priceTable}
              columns={columns(this.onEdit, this.onDelete)}
              rowKey="ProductID"
            />
          </Card>
        ))}

        {showPriceModal && (
          <Modal
            title="Sửa báo giá"
            visible={showPriceModal}
            closable={false}
            centered
            footer={[
              <Button key="submit" onClick={this.onOk} type="primary">
                Cập nhật
              </Button>,
              <Button key="close" onClick={this.togglePriceModal}>
                Đóng cửa sổ
              </Button>,
            ]}
          >
            <PriceForm
              wrappedComponentRef={this.priceFormRef}
              products={products}
              units={units}
              editMode={editMode}
              price={price}
            />
          </Modal>
        )}
      </Card>
    )
  }
}

PriceTable.propTypes = {
  dataSource: PropTypes.array,
  products: PropTypes.array,
  units: PropTypes.array,
  addItem: PropTypes.func,
  updateItem: PropTypes.func,
  removeItem: PropTypes.func,
  meta: PropTypes.object,
  onChangePage: PropTypes.func,
  onOpenImportModal: PropTypes.func,
}

PriceTable.defaultProps = {
  dataSource: [],
  products: [],
  units: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  meta: {},
  onChangePage: () => {},
  onOpenImportModal: () => {},
}

export default toJs(WithLoadingHOC(PriceTable))
