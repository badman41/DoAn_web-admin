/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Divider, notification } from 'antd'
import moment from 'moment'
import BadgeIcon from '../../components/BadgeIcon'
import select from '../../util/select'
import ItemList from './components/ItemList'
import ReviewForm from './components/ReviewForm'
import { getInvoiceById, updateInvoice, setOrder, cancleInvoice } from './actions'
import WithLoading from '../../hoc/loading'
import ROUTER from '../../constants/router'
import PropTypes from 'prop-types'
import { INVOICE_STATUS } from '../../constants/enum'

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

class Detail extends Component {
    state = { edit: false, quantities: {}, currentId: null };

    static getDerivedStateFromProps(props, prevState) {
      if (prevState.currentId !== props.match.params.id) {
        props.getInvoiceById(props.match.params.id)
      }
      return {
        ...prevState,
        currentId: props.match.params.id,
      }
    }

    toggleEditMode = () => {
      if (this.state.edit) {
        const { quantities } = this.state
        const invoice = this.props.invoice.toJS()
        const Items = invoice.Items.map((item, index) => {
          if (typeof quantities[index] === 'number') {
            return {
              ...item,
              Quantity: quantities[index],
              TotalPrice: item.Price * quantities[index],
            }
          } return item
        })
        this.props.updateInvoice(
          this.props.match.params.id,
          {
            ...invoice,
            Items: Items.filter(item => item.Quantity !== 0),
          },
          {
            onSuccess: () => {
              notification.success({ message: 'Sửa đơn hàng thành công' })
              this.props.getInvoiceById(this.props.match.params.id)
              this.setState({ quantities: {} })
            },
            onError: error => notification.error({ message: `Sửa đơn hàng gặp lỗi ${error}! Vui lòng thử lại !` }),
          },
        )
      }
      this.setState(prevState => ({ edit: !prevState.edit }))
    };

    onChangeQuantity = (value, index) => {
      const { quantities } = this.state
      quantities[index] = value
      this.setState({ quantities })
    };

    // onUpdateNode = Note => {
    //   const invoice = this.props.invoice.toJS()

    //   this.props.updateInvoice(
    //     this.props.match.params.id,
    //     {
    //       ...invoice,
    //       Note,
    //     },
    //     {
    //       onSuccess: () => {
    //         notification.success({ message: 'Sửa đơn hàng thành công' })
    //         this.props.getInvoiceById(this.props.match.params.id)
    //       },
    //       onError: error => notification.error({ message: `Sửa đơn hàng gặp lỗi ${error}! Vui lòng thử lại !` }),
    //     },
    //   )
    // };
    onUpdateNode = (Note) => {
      this.props.cancleInvoice(
        this.props.match.params.id,
        {
                ...this.state.invoice,
                Note,
              },
        {
          onSuccess: (id) => {
            debugger;
            this.props.history.push(ROUTER.INVOICE.INDEX);
            this.render();
            notification.success({ message: 'Hủy đơn hàng thành công.' });
          },
          onError: () => {
            notification.error({ message: 'Hủy thất bại.' });
          },
        },
      );
    };
    editInvoice = () => {
      this.props.setOrder(this.state.invoice);
      this.props.history.push(ROUTER.INVOICE.EDIT.replace(':id', this.props.match.params.id));
    };
    render() {
      const { invoice } = this.props
      const { edit } = this.state
      return (
        <React.Fragment>
          <Card
            hoverable
            title={invoice.get('CustomerName')}
            extra={
              <BadgeIcon icon={edit ? 'check' : 'edit'} name="Sửa đơn hàng" onClick={this.toggleEditMode} />
            }
          >
            <div>
              <span style={{ float: 'left' }}>
              Chi tiết đơn hàng #
            {invoice.get('Code')}
            {' '}
-
            {' '}
            <b>{INVOICE_STATUS[invoice.get('Status')]}</b>
              </span>
              <span style={{ float: 'right' }}>
                            Ngày giao:
                {' '}
                <b>{moment(invoice.get('DeliveryTime')).format('LLLL')}</b>
              </span>
            </div>
            <Divider />
            <ItemList
              dataSource={invoice.get('Items')}
              edit={edit}
              onChangeQuantity={this.onChangeQuantity}
              footer={() => (
                <div>
                  <b>Tổng cộng</b>
                  <b style={{ float: 'right' }}>
                    {`${formatter.format(
                      invoice.get('TotalPrice'),
                    )}/${Math.round(invoice.get('WeightTotal') * 10) / 10} kg`}
                  </b>
                </div>
              )}
            />
            <Divider />
            <ReviewForm defaultValue={invoice.get('Note')} onUpdateNode={this.onUpdateNode} status={invoice.get('Status')}/>
          </Card>
        </React.Fragment>
      )
    }
}
Detail.propTypes = {
  getInvoiceById: PropTypes.func,
  setOrder: PropTypes.func,
  updateInvoice: PropTypes.func,
  cancleInvoice: PropTypes.func,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

Detail.defaultProps = {
  getInvoiceById: () => {},
  setOrder: () => {},
  updateInvoice: () => {},
  cancleInvoice: () => {},
};
const mapStateToProps = state => ({
  invoice: select(state, ['invoiceReducer', 'detail'], 'item'),
  isFetching: select(state, ['invoiceReducer', 'detail'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getInvoiceById: id => dispatch(getInvoiceById(id)),
  setOrder: payload => dispatch(setOrder(payload)),
  updateInvoice: (id, payload, meta) => dispatch(updateInvoice(id, payload, meta)),
  cancleInvoice: (id, payload, meta) => dispatch(cancleInvoice(id, payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoading(Detail))
