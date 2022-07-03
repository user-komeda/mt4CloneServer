import BarData from '../types/BarData'
import FinanceResponseData from '../types/FinanceResponseData'

/**
 * responseDataからbarData作成関数
 *
 * @param {FinanceResponseData} responseData responseData
 * @return {BarData} barData
 */
const convertToBarData = (responseData: FinanceResponseData): BarData => {
  return converter(responseData)
}

/**
 * responseDataからbarData作成関数
 *
 * @param {FinanceResponseData} responseData responseData
 * @return {BarData} barData
 */
const converter = (responseData: FinanceResponseData): BarData => {
  const openValue = Number(responseData.openValue)
  const highValue = Number(responseData.highValue)
  const lowValue = Number(responseData.lowValue)
  const closeValue = Number(responseData.closeValue)
  const date = responseData.date ? responseData.date : ''
  const barY = Math.min(openValue, closeValue)

  const barX = 100

  const barWidth = 10

  const barHeight = Math.max(openValue, closeValue)
  const barData: BarData = {
    x: barX,
    y: barY,
    barWidth: barWidth,
    barHeight: barHeight,
    highValue: highValue,
    lowValue: lowValue,
    openValue: openValue,
    closeValue: closeValue,
    date: date,
  }
  return barData
}
export default convertToBarData
