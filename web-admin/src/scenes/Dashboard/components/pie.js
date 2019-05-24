import React from 'react'

import { PieChart, Pie, Tooltip } from 'recharts'
import toJs from '../../../hoc/toJs'

const Pies = ({ data }) => (
  <PieChart width={400} height={400}>
    <Pie isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
    <Tooltip />
  </PieChart>
)

export default toJs(Pies)
