import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
  { name: 'Mon', invoice: 40, customer: 24, amt: 2400 },
  { name: 'Tue', invoice: 30, customer: 13, amt: 2210 },
  { name: 'Wed', invoice: 20, customer: 98, amt: 2290 },
  { name: 'Thu', invoice: 27, customer: 39, amt: 2000 },
  { name: 'Fri', invoice: 18, customer: 48, amt: 2181 },
  { name: 'Sat', invoice: 23, customer: 38, amt: 2500 },
  { name: 'Sun', invoice: 34, customer: 43, amt: 2100 },
]
const Chart = () => (
  <BarChart
    width={600}
    height={400}
    data={data}
    margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="invoice" fill="#8884d8" />
    <Bar dataKey="customer" fill="#82ca9d" />
  </BarChart>
)

export default Chart
