import React, { Component } from 'react'
import { Button, Modal, Alert, Icon } from 'antd'
import DropNCrop from '../DropNCrop'
import { dataUrlToFile } from '../../util/image'
import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'

class ImageUploadFormItem extends Component {
    static propTypes = {};

    constructor(props) {
      super(props)

      this.state = {
        visible: false,
        dropNCropValue: null,
        isLoading: false,
      }
    }

    showLoading = () => {
      this.setState(() => ({ isLoading: true }))
    };

    hideLoading = () => {
      this.setState(() => ({ isLoading: false }))
    };

    showModal = () => {
      this.setState(() => ({ visible: true }))
    };

    hideModal = () => {
      if (this.state.isLoading) {
        return
      }
      this.setState(() => ({ visible: false }))
      setTimeout(() => {
        this.refresh()
      }, 0)
    };

    onCropDrop = value => {
      this.setState(() => ({ dropNCropValue: value }))
    };

    upload = async () => {
      const { onChange } = this.props
      const dropNCropValue = this.state.dropNCropValue
      if (dropNCropValue && !dropNCropValue.error) {
        const fileUpload = dataUrlToFile(dropNCropValue.result)
        const api = API.MEDIA.imageUpload()
        const formData = new FormData()
        formData.append('file', fileUpload)
        this.showLoading()
        const { response, error } = await apiCall({
          ...api,
          payload: formData,
        })
        this.hideLoading()
        if (!error && response.status === 200) {
          onChange(response.data.ImagePath)
          this.hideModal()
        }
      }
    };

    refresh = () => {
      this.setState(() => ({ dropNCropValue: null }))
    };

    render() {
      const { value, width, height, outputWidth, outputHeight } = this.props
      const { dropNCropValue, isLoading } = this.state

      const cropperOptions = {
        guides: true,
        viewMode: 2,
        autoCropArea: 0.8,
        aspectRatio: outputWidth / outputHeight,
      }

      return (
        <div style={{ width }}>
          <img src={value} alt="" style={{ width, height }} />
          <Button style={{ width: '100%' }} onClick={() => this.showModal()}>
            <Icon type="edit" />
            {' '}
            {'Sửa'}
          </Button>
          <Modal
            onCancel={() => this.hideModal()}
            onOk={() => this.upload()}
            bodyStyle={{ textAlign: 'center' }}
            title="Upload Ảnh"
            visible={this.state.visible}
            footer={[
              <Button onClick={() => this.refresh()} disabled={isLoading} key="refresh-button">
                <Icon type="reload" />
                {' '}
                {'Làm mới'}
              </Button>,
              <Button onClick={() => this.hideModal()} disabled={isLoading} key="cancel-button">
                <Icon type="close" />
                {' '}
                {'Thoát'}
              </Button>,
              <Button
                type="primary"
                loading={isLoading}
                key="submit-button"
                icon="check"
                onClick={() => this.upload()}
              >
                {'OK'}
              </Button>,
            ]}
            maskClosable={false}
          >
            <DropNCrop
              canvasWidth="100%"
              canvasHeight="360px"
              outputWidth={outputWidth}
              outputHeight={outputHeight}
              value={dropNCropValue}
              onChange={value => this.onCropDrop(value)}
              cropperOptions={cropperOptions}
            />
            {dropNCropValue && dropNCropValue.error ? (
              <Alert
                style={{ width: '100%', border: '1px solid #ff0000', textAlign: 'left' }}
                type="error"
                message={dropNCropValue.error}
                banner
              />
            ) : null}
          </Modal>
        </div>
      )
    }
}
export default ImageUploadFormItem
