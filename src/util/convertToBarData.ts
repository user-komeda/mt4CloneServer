import BarData from '../types/barData'
import FinanceResponseData from '../types/FinanceResponseData'

const convertToBarData = (responseData: FinanceResponseData): BarData => {
  return converter(responseData)
}

const converter = (responseData: FinanceResponseData): BarData => {
  const openValue = Number(responseData.openValue)
  const closeValue = Number(responseData.closeValue)
  const barY = Math.min(openValue, closeValue)

  const barX = 70

  const barWidth = 10

  const barHeight = Math.max(openValue, closeValue)
  const barData: BarData = {
    x: barX,
    y: barY,
    barWidth: barWidth,
    barHeight: barHeight,
  }
  return barData
}
export default convertToBarData
