import React, { Component } from 'react'
import { Form, Select, Button } from 'antd'
import ToJs from '../../../../hoc/toJs'

const FormItem = Form.Item
const Option = Select.Option

class SampleSolutionForm extends Component {
    onSubmit = event => {
      event.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onSubmit(values)
        }
      })
    };

    render() {
      const { form, sampleSolutions, disabled } = this.props
      const { getFieldDecorator } = form
      return (
        <Form onSubmit={this.onSubmit} layout="inline">
          <FormItem label="Tuyến mẫu">
            {getFieldDecorator('SolutionID', {
              rules: [
                { required: true, message: 'Hãy chọn tuyến mẫu!' },
              ],
            })(
              <Select
                placeholder="Chọn tuyến mẫu"
                style={{ width: '200px' }}
                disabled={disabled}
              >
                {sampleSolutions.map((item, index) => (
                  <Option key={`${index + 1}`} value={item.ID}>
                    {item.Name}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
            >
                        Chọn
            </Button>
          </FormItem>
        </Form>
      )
    }
}

export default ToJs(Form.create()(SampleSolutionForm))
