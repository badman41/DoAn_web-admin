import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Route from './route'
import { formatDuration } from '../../../../../util/vrp'

const RouteList = ({
  routes,
  onShowNodeInfo,
  onChangeNodePosition,
  onSwapNodes,
}) => (
  <Fragment>
     {routes.map((route, routeIndex) => {console.log(route); return (
      <div
        key={`${routeIndex + 1}`}
        style={{
          height: 70,
          display: 'flex',
        }}
      >
        <div
          style={{
            height: 70,
            width: '10%',
          }}
        >
          <div>
            {`${route.distance > 0
              ? Math.round(
                (route.distance / 1000) * 10,
              ) / 10
              : 0} km`}
          </div>
          <div>{formatDuration(route.duration)}</div>
          <div>
            {Math.round(route.weight * 10) / 10}
          </div>
        </div>
        <div
          style={{
            whiteSpace: 'nowrap',
            width: '90%',
            height: 70,
            overflow: 'auto',
          }}
        >
          <Route
            routeIndex={routeIndex}
            route={route}
            onChangeNodePosition={onChangeNodePosition}
            onSwapNodes={onSwapNodes}
            onShowNodeInfo={node => onShowNodeInfo(node, routeIndex)}
          />
        </div>
      </div>
    );})}
  </Fragment>
)

RouteList.propTypes = {
  routes: PropTypes.array,
  onShowNodeInfo: PropTypes.func.isRequired,
  onChangeNodePosition: PropTypes.func.isRequired,
  onSwapNodes: PropTypes.func.isRequired,
}

RouteList.defaultProps = { routes: [] }

export default RouteList
