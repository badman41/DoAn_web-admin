import React from 'react'
import PropTypes from 'prop-types'

import { Button, Select, Form, DatePicker, Input, Alert, Modal, Row, Col } from 'antd'
import WithLoading from '../../../../hoc/loading'
import toJs from '../../../../hoc/toJs'
import ErrorBoard from './error-board'

const { Item } = Form

class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errorFile: false }
    this.fileUpload = React.createRef()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.fileUpload.current.files.length > 0) {
          this.setState(() => ({ errorFile: false }))
          const { current: { files } } = this.fileUpload
          const formData = new FormData()
          formData.append('file', files[0])
          this.props.onUpload({ ...values, date: values.date.toISOString() }, formData)
        } else {
          this.setState(() => ({ errorFile: true }))
        }
      }
    })
  };

  render() {
    const {
      groups,
      showGroup, form: { getFieldDecorator }, customerCode, visible, onCloseModal, hasResult, result, error, isFetching,
    } = this.props
    const { errorFile } = this.state
    return (
      <Modal
        visible={visible}
        closable={false}
        footer={[
          <Button
            type="primary"
            icon="plus"
            key="submit"
            loading={isFetching}
            disabled={hasResult}
            onClick={this.handleSubmit}
          >
            {'Thêm báo giá'}
          </Button>,
          <Button
            key="close"
            icon="close"
            onClick={onCloseModal}
            disabled={isFetching}
          >
              Đóng cửa sổ
          </Button>,
        ]}
      >
        {
          hasResult ? (
            <ErrorBoard error={error} result={result} />
          ) : (
            <Form>
              <Item
                label={(
                  <span>
                    {'Chọn báo giá theo '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://drive.google.com/file/d/15ys-HtvO7nQK0rfXhQUKQJoJzo_1t6bf/view?usp=sharing"
                    >
                      {'file excel mẫu'}
                    </a>
                  </span>
                )}
              >
                <input disabled={isFetching} type="file" ref={this.fileUpload} />
                {errorFile && <Alert style={{ marginTop: 10 }} type="error" showIcon message="Chọn file để upload" />}
              </Item>
              <Row gutter={24}>
                <Col span={12}>
                  {showGroup ? (
                    <Item label="Chọn nhóm khách hàng" required>
                      {
                        getFieldDecorator('group_id', {
                          rules: [
                            {
                              required: true,
                              message: 'Chọn nhóm khách hàng',
                            },
                          ],
                        })(
                          <Select disabled={isFetching} style={{ width: '100%' }}>
                            {groups.map((item, index) => (
                              <Select.Option key={`group${index + 1}`} value={item.ID}>
                                {item.Name}
                              </Select.Option>
                            ))}
                          </Select>,
                        )
                      }
                    </Item>
                  ) : (
                    <Item label="Mã khách hàng">
                      {
                        getFieldDecorator('customer_code', { initialValue: customerCode })(
                          <Input disabled />,
                        )
                      }
                    </Item>
                  )}
                </Col>
                <Col span={12}>
                  <Item label="Thời gian báo giá" required>
                    {
                      getFieldDecorator('date', {
                        rules: [
                          {
                            required: true,
                            message: 'Chọn ngày bắt đầu áp dụng',
                          },
                        ],
                      })(
                        <DatePicker style={{ width: '100%' }} disabled={isFetching} />,
                      )
                    }
                  </Item>
                </Col>
              </Row>
            </Form>
          )
        }
      </Modal>
    )
  }
}

UploadForm.propTypes = {
  form: PropTypes.object,
  groups: PropTypes.array,
  showGroup: PropTypes.bool,
  onUpload: PropTypes.func,
  customerCode: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  hasResult: PropTypes.bool.isRequired,
  result: PropTypes.object,
  error: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

UploadForm.defaultProps = {
  form: {},
  groups: [],
  showGroup: true,
  onUpload: () => {},
  customerCode: '',
  result: {},
}

export default WithLoading(toJs(Form.create()(UploadForm)))
