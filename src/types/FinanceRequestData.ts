/**
 * SizeType型定義
 */
export const SizeType = {
  '5MIN': '5min',
  '15MIN': '15min',
  '30MIN': '30min',
  '60MIN': '60min',
} as const

/**
 * FinanceRequestData 型定義
 */
export default interface FinanceRequestData {
  url?: string
  apiKey?: string
  function?: string
  fromSymbol?: string
  toSymbol?: string
  interval?: typeof SizeType[keyof typeof SizeType]
}
