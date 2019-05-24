import React from 'react'
import PropTypes from 'prop-types'

import { Button, DatePicker, Divider } from 'antd'
import WithLoading from '../../../hoc/loading'

class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: '' }
    this.fileUpload = React.createRef()
  }

  onChange = date => {
    this.setState({ date })
  };

  render() {
    return (
      <div>
        {this.props.supportContent}
        <Divider dashed />
        <input type="file" ref={this.fileUpload} />
        <DatePicker placeholder="Chọn ngày" onChange={this.onChange} />
        <Divider />
        <Button
          style={{ width: '100%' }}
          type="primary"
          onClick={() => this.props.onUpload(this.fileUpload, this.state.date)}
        >
          Thêm dữ liệu từ File
        </Button>
      </div>
    )
  }
}

UploadForm.propTypes = { onUpload: PropTypes.func.isRequired }

export default WithLoading(UploadForm)
