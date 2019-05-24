import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button } from 'antd'
import Icon from 'react-fa'

const TextArea = Input.TextArea

export class DriverItem extends Component {
  constructor() {
    super()
    this.state = {
      editNoteVisible: false,
      note: '',
    }
  }

    confirmNote = () => {
      const { driver, onChangeNote } = this.props
      onChangeNote(driver, this.state.note)
      this.handleVisibleChange(false)
    };

    cancelNote = () => {
      this.setState(() => ({ note: this.props.driver.note }))
      this.handleVisibleChange(false)
    };

    onChangeNote = event => {
      const value = event.target.value
      this.setState(() => ({ note: value }))
    };

    renderNoteContent = () => (
      <div style={{ width: '100%' }}>
        <TextArea
          rows={4}
          value={this.state.note}
          onChange={event => this.onChangeNote(event)}
        />
        <Row gutter={10} style={{ marginTop: 5 }}>
          <Col span={12}>
            <Button
              style={{ width: '100%' }}
              type="primary"
              size="small"
              onClick={this.confirmNote}
            >
                            Xong
            </Button>
          </Col>
          <Col span={12}>
            <Button
              style={{ width: '100%' }}
              type="danger"
              size="small"
              onClick={this.cancelNote}
            >
                            Hủy
            </Button>
          </Col>
        </Row>
      </div>
    );

    handleVisibleChange = visible => {
      this.setState(() => ({ editNoteVisible: visible }))
    };

    render() {
      const { driver, index } = this.props
      return (
        <div
          style={{
            width: '100%',
            height: 70,
            backgroundColor: index % 2 === 0 ? '#f2f2f2' : null,
            padding: 5,
          }}
        >
          <Icon name="motorcycle" />
          <b>{driver.DriverInfo.Name}</b>
          <div>
            <Icon name="qrcode" />
            <small>
                        &nbsp;
              {driver.DriverInfo.Code}
            </small>
          </div>
          <div>
            <Icon name="phone" />
            <small>
                        &nbsp;
              {driver.DriverInfo.PhoneNumber}
            </small>
          </div>
          {/* <Popover
                    title="Ghi chú"
                    visible={this.state.editNoteVisible}
                    onVisibleChange={this.handleVisibleChange}
                    content={this.renderNoteContent()}
                    trigger="click"
                >
                    <FaStickyNote size={IconSize} color={driver.note ? "#439F46" : null}/>
                </Popover> */}
        </div>
      )
    }
}

DriverItem.propTypes = {
  driver: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChangeNote: PropTypes.func.isRequired,
}

export default DriverItem
