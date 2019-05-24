/* global FileReader */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Cropper from 'react-cropper'
import Dropzone from 'react-dropzone'

import bytesToSize from './util/bytesToSize'
import fileSizeLessThan from './util/fileSizeLessThan'
import fileType from './util/fileType'

import './style/index.css'

class DropNCrop extends Component {
    static propTypes = {
      allowedFileTypes: PropTypes.array,
      canvasHeight: PropTypes.string,
      canvasWidth: PropTypes.string,
      className: PropTypes.string,
      cropperOptions: PropTypes.object,
      instructions: PropTypes.node,
      maxFileSize: PropTypes.number,
      onChange: PropTypes.func,
      value: PropTypes.shape({
        result: PropTypes.string,
        filename: PropTypes.string,
        filetype: PropTypes.string,
        src: PropTypes.string,
        error: PropTypes.string,
      }),
    };

    static defaultProps = {
      allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      className: '',
      canvasHeight: '360px',
      canvasWidth: '100%',
      cropperOptions: {
        guides: false,
        viewMode: 3,
        autoCropArea: 1,
      },
      maxFileSize: 3145728,
      onChange: () => {},
    };

    onCrop = () => {
      const { value, onChange, outputWidth, outputHeight } = this.props
      if (typeof this.cropperRef.getCroppedCanvas() !== 'undefined') {
        onChange({
          ...value,
          result: this.cropperRef
            .getCroppedCanvas({ width: outputWidth, height: outputHeight })
            .toDataURL(value.filetype),
        })
      }
    };

    onDrop = files => {
      const { onChange, maxFileSize, allowedFileTypes } = this.props
      const fileSizeValidation = fileSizeLessThan(maxFileSize, 'Kích thước phải nhỏ hơn')(files)
      const fileTypeValidation = fileType(allowedFileTypes, 'Định dạng không được hỗ trợ')(files)

      if (fileSizeValidation.isValid && fileTypeValidation.isValid) {
        const reader = new FileReader()
        reader.onload = () => {
          onChange({
            src: reader.result,
            filename: files[0].name,
            filetype: files[0].type,
            result: reader.result,
            error: null,
          })
        }
        reader.readAsDataURL(files[0])
      } else {
        onChange({
          error: !fileTypeValidation.isValid
            ? fileTypeValidation.message
            : !fileSizeValidation.isValid
              ? fileSizeValidation.message
              : null, // TODO: Update error state to be an array to handle both messages if necessary
        })
      }
    };

    componentDidUpdate(prevProps) {
      if (!prevProps.value && this.cropperRef) {
        setTimeout(() => {
          this.onCrop()
        }, 0)
      }
    }

    render() {
      const {
        canvasHeight,
        canvasWidth,
        className,
        cropperOptions,
        instructions,
        allowedFileTypes,
        maxFileSize,
        value,
      } = this.props

      const dropNCropClasses = {
        'drop-n-crop': true,
        [`${className}`]: className,
      }

      return (
        <div className={classNames(dropNCropClasses)}>
          {value && value.src ? (
            <Cropper
              ref={input => {
                this.cropperRef = input
              }}
              src={value && value.src}
              style={{
                height: canvasHeight,
                width: canvasWidth,
              }}
              cropend={this.onCrop} // Only use the cropend method- it will reduce the callback/setState lag while cropping
              zoom={this.onCrop}
              {...cropperOptions}
            />
          ) : (
            <Dropzone
              className="dropzone"
              activeClassName="dropzone--active"
              onDrop={this.onDrop}
              style={{
                height: canvasHeight,
                width: canvasWidth,
              }}
            >
              <div key="dropzone-instructions">
                {!instructions ? (
                  <div className="dropzone-instructions">
                    <div className="dropzone-instructions--main">
                      {'Nhấn để chọn ảnh hoặc kéo thả ảnh vào đây'}
                    </div>
                    <hr />
                    <div className="dropzone-instructions--sub">
                      {'Định dạng phù hợp'}
:
                      {' '}
                      {allowedFileTypes.map(mimeType => `.${mimeType.split('/')[1]}`).join(', ')}
                    </div>
                    <div className="dropzone-instructions--sub">
                      {'Dung lượng tối đa'}
:
                      {bytesToSize(maxFileSize)}
                    </div>
                  </div>
                ) : (
                  instructions
                )}
              </div>
            </Dropzone>
          )}
        </div>
      )
    }
}

export default DropNCrop
