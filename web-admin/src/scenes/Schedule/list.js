/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, notification, Row, Col } from 'antd'

import Filter from './components/filter'
import ScheduleList from './components/list'
import UploadForm from '../../components/UploadForm'

import WithPageHOC from '../../hoc/page'
import select from '../../util/select'
import ROUTER from '../../constants/router'
import { getSchedules, deleteSchedule, importSchedule } from './actions'

class Schedule extends React.Component {
  state = { showUploadForm: false };

  componentDidMount() {
    const { meta } = this.props
    this.props.getSchedules({
      Page: meta.current ? meta.current : 1,
      PageSize: meta.pageSize ? meta.pageSize : 10,
    })
  }

  openUploadForm = () => this.setState({ showUploadForm: true });

  handleCancel = () => this.setState({ showUploadForm: false });

  onChange = (Page, PageSize) => this.props.getSchedules({ Page, PageSize });

  handleFilter = filterOptions => this.props.getSchedules({
    ...filterOptions,
    Page: 1,
    PageSize: 10,
  });


  upload = async ({ current: { files } }) => {
    const formData = new FormData()
    formData.append('file', files[0])
    this.props.importSchedule(formData, {
      onSuccess: newId => {
        this.handleCancel()
        this.props.history.push(ROUTER.ROUTE.SCHEDULE.EDIT.replace(':id', newId))
      },
      onError: () => {
        this.handleCancel()
        notification.success({ message: 'Thêm thất bại ! Vui lòng kiểm tra và thử lại !' })
      },
    })
  };

  handleDelete = async id => {
    await this.props.deleteSchedule(id)
    const { meta } = this.props
    this.props.getSchedules({
      Page: meta.current ? meta.current : 1,
      PageSize: meta.pageSize ? meta.pageSize : 10,
    })
  };

  render() {
    const { schedules, meta, isFetching } = this.props
    return (
      <div>
        <Row gutter={24}>
          <Col span={6}><Filter onFilter={this.handleFilter} /></Col>
          <Col span={18}>
            {/* <Button icon="plus" onClick={this.openUploadForm}>
              {'Thêm tuyến mẫu'}
            </Button> */}
            <ScheduleList
              schedules={schedules}
              isFetching={isFetching}
              meta={meta}
              onChange={this.onChange}
              onShowSizeChange={this.onChange}
              onDelete={this.handleDelete}
            />
          </Col>
        </Row>
        <Modal
          title="Thêm lịch mẫu từ file Excel"
          visible={this.state.showUploadForm}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <UploadForm
            isFetching={isFetching}
            contentLoading="Đang xử lí dữ liệu"
            onUpload={this.upload}
            supportContent={(
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/spreadsheets/d/1O5yjqfejnamvsHwpV5KxxnJpiYhg1R-XAgTOfC0mGi8/edit?usp=sharing"
              >
                Mẫu file excel
              </a>
            )}
          />
        </Modal>
      </div>
    )
  }
}

export default connect(
  state => ({
    schedules: select(state, ['scheduleReducer', 'list'], 'items'),
    isFetching: select(state, ['scheduleReducer', 'list'], 'isFetching'),
    meta: select(state, ['scheduleReducer', 'list'], 'meta'),
  }),
  dispatch => ({
    getSchedules: filterOptions => dispatch(getSchedules(filterOptions)),
    deleteSchedule: id => dispatch(deleteSchedule(id)),
    importSchedule: (payload, meta) => dispatch(importSchedule(payload, meta)),
  }),
)(WithPageHOC('schedule', 'route')(Schedule))
