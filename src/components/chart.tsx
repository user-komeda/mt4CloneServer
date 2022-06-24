import Custom from '../util/test'
import { useEffect, useRef } from 'react'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
} from 'chart.js'
import FinanceResponseData from '../types/FinanceResponseData'
import convertToBarData from '../util/convertToBarData'
/**
 *
 */
const ChartComponent: React.FC<{
  responseDataList: Array<FinanceResponseData>
}> = props => {
  const inputRef = useRef<HTMLCanvasElement>(null) as React.MutableRefObject<
    HTMLCanvasElement
  >

  const renderFlgRef = useRef(false)
  const responseDataList = props.responseDataList

  useEffect(() => {
    if (renderFlgRef.current === true) {
      return
    } else {
      renderFlgRef.current = true
    }
    Custom.id = 'derivedBubble'
    Custom.defaults = BarController.defaults
    // Stores the controller so that the chart initialization routine can look it up
    Chart.register(Custom, LinearScale, CategoryScale, BarElement)

    const barData = responseDataList.map(response => {
      return convertToBarData(response)
    })
    const test = { x: 70, y: 136.0, barWidth: 10, barHeight: 136.0 }
    const test2 = { x: 70, y: 134.0, barWidth: 10, barHeight: 134.0 }
    barData.push(test)
    barData.push(test2)

    const a = []
    for (const responseData of responseDataList) {
      a.push(Number(responseData.openValue))
      a.push(Number(responseData.closeValue))
      // a.push(Number(responseData.highValue))
      // a.push(Number(responseData.lowValue))
    }
    a.push(136.0)
    a.push(134.0)

    const labels = responseDataList.map(responseData => {
      return responseData.date
    })
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: barData,
          min: Math.min(...a),
          max: Math.max(...a),
          // data: [
          //   { x: 250, y: 132.73, xWidth: 10, xHeight: 132.99 },
          //   { x: 500, y: 136.73, xWidth: 10, xHeight: 126.99 },
          // ],
        },
      ],
    }
    if (inputRef) {
      const ctx = inputRef.current.getContext('2d')
      if (ctx !== null) {
        const chart = new Chart(ctx, {
          type: 'derivedBubble',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: false,
              },
            },
          },
        })
        // chart.destroy()
      }
    }
    // Now we can create and use our new chart type
  }, [])

  return (
    <div>
      <canvas ref={inputRef}></canvas>
    </div>
  )
}
export default ChartComponent
