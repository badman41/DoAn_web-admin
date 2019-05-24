/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Card, Button, Icon, Row, message } from 'antd'

import PrepareDriverStep from './steps/prepare-driver'
import PrepareInvoiceStep from './steps/prepare-invoice'

import Solution from './steps/solve'
import Sample from './steps/sample'

import SaveDataStep from './steps/save'

import { solveVrp } from './actions'
import select from '../../util/select'
import WithPageHOC from '../../hoc/page'

const { Step } = Steps

class Routing extends Component {
  constructor() {
    super()
    this.state = {
      currentStep: 0,
      isVrp: true,
    }
  }

    nextPrevSteps = action => {
      if (this.validateSelectedData()) {
        switch (action) {
        case 'next':
          this.setState(prevState => ({ currentStep: prevState.currentStep < 3 ? prevState.currentStep + 1 : prevState.currentStep }))
          break
        case 'prev':
          this.setState(prevState => ({ currentStep: prevState.currentStep > 0 ? prevState.currentStep - 1 : prevState.currentStep }))
          break
        default:
          break
        }
      }
    };

    validateSelectedData = () => {
      const { selectedDrivers, selectedInvoices } = this.props
      const { currentStep } = this.state
      if (currentStep === 0 && selectedDrivers.size === 0) {
        message.warning('Chọn ít nhất một lái xe')
        return false
      } if (currentStep === 1 && selectedInvoices.size === 0) {
        message.warning('Chọn ít nhất một đơn hàng')
        return false
      } return true
    };

    onSolve = () => {
      const { selectedDrivers, selectedInvoices } = this.props
      if (this.validateSelectedData()) {
        this.props.solveVrp({
          drivers: selectedDrivers.toJS(),
          invoices: selectedInvoices.toJS(),
          options: { orderbalancing: true },
        })
      }
    };

    onChangeMethod = ({ target: { value } }) => this.setState({ isVrp: value });

    renderComponent = () => {
      const { currentStep, isVrp } = this.state
      switch (currentStep) {
      case 0:
        return <PrepareDriverStep />
      case 1:
        return <PrepareInvoiceStep isVrp={isVrp} onChangeMethod={this.onChangeMethod} />
      case 2:
        return isVrp ? <Solution onSolve={this.onSolve} /> : <Sample />
      case 3:
        return <SaveDataStep />
      default:
        return <div />
      }
    };

    render() {
      const { currentStep } = this.state
      return (
        <div>
          <Steps current={currentStep}>
            <Step title="Chuẩn bị lái xe" description="Lấy thông tin lái xe" />
            <Step title="Chuẩn bị đơn hàng" description="Lấy thông tin đơn hàng" />
            <Step title="Chỉnh sửa tuyến đường" description="Tối ưu & chỉnh sửa lộ trình" />
            <Step title="Xuất dữ liệu" description="Xuất dữ liệu" />
          </Steps>
          <Row
            style={{ textAlign: 'right' }}
          >
            <Button
              disabled={currentStep === 0}
              style={{ marginRight: 10 }}
              type="primary"
              ghost="ghost"
              onClick={() => this.nextPrevSteps('prev')}
            >
              <Icon type="left" />
                        Trước
            </Button>
            <Button
              disabled={currentStep === 3}
              type="primary"
              ghost="ghost"
              onClick={() => this.nextPrevSteps('next')}
            >
                        Sau
              <Icon type="right" />
            </Button>
          </Row>
          <Card
            style={{
              width: '100%',
              margin: '10px 0',
            }}
          >
            {this.renderComponent()}
          </Card>

        </div>
      )
    }
}

const mapStateToProps = state => ({
  invoices: select(state, 'invoiceReducer', 'items'),
  selectedDrivers: select(state, 'routingReducer', 'drivers'),
  selectedInvoices: select(state, 'routingReducer', 'invoices'),
})

const mapDispatchToProps = dispatch => ({ solveVrp: payload => dispatch(solveVrp(payload)) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('routing-vrp', 'routing')(Routing))
