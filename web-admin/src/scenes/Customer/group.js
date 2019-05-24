/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { notification, Row, Col } from 'antd'

import WithPageHOC from '../../hoc/page'
import select from '../../util/select'
import GroupList from './components/GroupList'
import UploadModal from './components/price-table-modal'
import GroupForm from './components/GroupForm'
import { getCustomerGroups, insertCustomerGroup, removeGroup, importPriceTableByGroup } from './actions'

class CustomerGroup extends Component {
  state = {
    showImportModal: false,
    error: false,
    hasResult: false,
    result: {},
  };

  static getDerivedStateFromProps(nextProps) {
    nextProps.getCustomerGroups()
    return null
  }

  handleAdd = (formData, meta) => this.props.insertCustomerGroup(formData, meta);

  removeGroup = id => this.props.removeGroup(id, {
    onSuccess: () => this.props.getCustomerGroups(),
    onError: error => notification.error({ message: `Xoá nhóm không thành công - ${error}` }),
  });

  toggleImportModal = () => this.setState(prevState => ({
    showImportModal: !prevState.showImportModal,
    error: false,
    hasResult: false,
    result: {},
  }));

  handleUpload = (params, payload) => {
    this.props.importPriceTableByGroup(params, payload, {
      onSuccess: result => {
        this.setState(() => ({ result, hasResult: true, error: false }), () => {
          notification.success({ message: 'Thêm thành công' })
        })
      },
      onError: error => {
        this.setState(() => ({ result: { error }, hasResult: true, error: true }), () => {
          notification.success({ message: 'Thêm thất bại' })
        })
      },
    })
  };

  render() {
    const {
      groups,
      isFetching,
      isLoadingPriceTable,
    } = this.props
    const { showImportModal, hasResult, error, result } = this.state
    return (
      <div>
        <Row gutter={24}>
          <Col span={6}>
            <GroupForm onAdd={this.handleAdd} />
          </Col>
          <Col span={18}>
            <GroupList
              dataSource={groups}
              isFetching={isFetching}
              removeGroup={this.removeGroup}
              onOpenModal={this.toggleImportModal}
            />
          </Col>
        </Row>
        <UploadModal
          visible={showImportModal}
          onCloseModal={this.toggleImportModal}
          hasResult={hasResult}
          error={error}
          result={result}
          groups={groups}
          isFetching={isLoadingPriceTable}
          onUpload={this.handleUpload}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groups: select(state, ['customerReducer', 'group'], 'items'),
  isFetching: select(state, ['customerReducer', 'group'], 'isFetching'),
  isLoadingPriceTable: select(state, ['customerReducer', 'priceTable'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getCustomerGroups: () => dispatch(getCustomerGroups()),
  insertCustomerGroup: (payload, meta) => dispatch(insertCustomerGroup(payload, meta)),
  removeGroup: (id, meta) => dispatch(removeGroup(id, meta)),
  importPriceTableByGroup: (params, payload, meta) => dispatch(importPriceTableByGroup(params, payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('customer-group', 'data')(CustomerGroup))
