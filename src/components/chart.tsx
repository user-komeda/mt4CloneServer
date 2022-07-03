import Custom from '../util/test'
import { useEffect, useRef } from 'react'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from 'chart.js'
import FinanceResponseData from '../types/FinanceResponseData'
import convertToBarData from '../util/convertToBarData'
import getLabelValue from '../util/getLabelValue'
import getTitleValue from '../util/getTitleValue'
/**
 *chartComponent
 *
 * @param {*} props props
 * @return {*} jsx
 */
const ChartComponent: React.FC<{
  responseDataList: Array<FinanceResponseData>
}> = (props) => {
  const inputRef = useRef<HTMLCanvasElement>(
    null
  ) as React.MutableRefObject<HTMLCanvasElement>

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
    Chart.register(Custom, LinearScale, CategoryScale, BarElement, Tooltip)

    const barData = responseDataList.map((response) => {
      return convertToBarData(response)
    })

    const maxDataList = []
    for (const responseData of responseDataList) {
      maxDataList.push(Number(responseData.highValue))
      maxDataList.push(Number(responseData.lowValue))
    }

    const max = Math.floor(Math.max(...maxDataList)) + 1
    const min = Math.floor(Math.min(...maxDataList)) - 1

    const labels = responseDataList.map((responseData) => {
      return responseData.date
    })

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: barData,
          min: min,
          max: max,
          backgroundColor: '#3498db',
        },
      ],
    }
    if (inputRef) {
      const ctx = inputRef.current.getContext('2d')
      if (ctx !== null) {
        new Chart(ctx, {
          type: 'derivedBubble',
          data: data,
          options: {
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
                axis: 'x',

                enabled: true,
                callbacks: {
                  /**
                   * title表示
                   *
                   * @param {*} ctx ctx
                   * @return {string} title
                   */
                  title: (ctx: any[]): string => {
                    return getTitleValue(ctx[0])
                  },
                  /**
                   *label表示
                   *
                   * @param {*} ctx ctx
                   * @return {Array<string>} label
                   */
                  label: (ctx: any): Array<string> => {
                    return getLabelValue(ctx)
                  },
                },
              },
            },
            scales: {
              x: {
                // x軸設定
                // barPercentage: 1, //棒グラフ幅
              },
              y: {
                beginAtZero: false,
              },
            },
          },
        })
      }
    }
  }, [])

  return (
    <div>
      <canvas ref={inputRef}></canvas>
    </div>
  )
}
export default ChartComponent
