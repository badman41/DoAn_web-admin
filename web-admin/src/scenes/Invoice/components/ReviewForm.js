import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Form } from 'antd'

const FormItem = Form.Item

class ReviewForm extends React.Component {
    handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onUpdateNode(values.Note)
        }
      })
    };

    render() {
      const {
        defaultValue,
        form: { getFieldDecorator },
        status,
      } = this.props
      return (
        <Form onSubmit={this.handleSubmit}>
          {/* <FormItem label="Ghi chú về đơn hàng">
            {getFieldDecorator('Note', { initialValue: defaultValue })(<Input.TextArea />)}
          </FormItem> */}
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ float: 'right' }} disabled={status !== 0}>
                        Hủy đơn hàng
            </Button>
          </FormItem>
        </Form>
      )
    }
}

ReviewForm.propTypes = {
  defaultValue: PropTypes.string,
  form: PropTypes.object.isRequired,
  onUpdateNode: PropTypes.func.isRequired,
}

ReviewForm.defaultProps = { defaultValue: '' }

export default Form.create()(ReviewForm)
