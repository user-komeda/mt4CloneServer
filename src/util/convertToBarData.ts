import BarData from '../types/barData'
import FinanceResponseData from '../types/FinanceResponseData'

/**
 *
 * @param responseData
 */
const convertToBarData = (responseData: FinanceResponseData): BarData => {
  return converter(responseData)
}

/**
 *
 * @param responseData
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
