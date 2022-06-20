import axios from 'axios'
import FinanceRequestData from '../types/FinanceRequestData'
import FinanceResponseData from '../types/FinanceResponseData'

/**
 * @param {FinanceRequestData} requestObject requestObject
 */
const GetFinanceData = async (requestObject: FinanceRequestData) => {
  const requestUrl = buildURL(requestObject)
  const data = await axios
    .get(requestUrl)
    .then((response) => {
      return response.data['Time Series FX (60min)']
    })
    .catch((error) => {
      console.error(error)
      return error
    })

  const keyList = Object.keys(JSON.parse(JSON.stringify(data)))
  let loopCount = 0
  const responseDataList: Array<FinanceResponseData> = []
  for (const key of keyList) {
    const responseData: FinanceResponseData = {}
    const keyList2 = Object.keys(data[key])
    for (const key2 of keyList2) {
      if (loopCount > 3) {
        console.log(key)
        loopCount = 0
        break
      }
      switch (loopCount) {
        case 0:
          responseData.openValue = data[key][key2]
          break
        case 1:
          responseData.highValue = data[key][key2]
          break
        case 2:
          responseData.lowValue = data[key][key2]
          break
        case 3:
          responseData.closeValue = data[key][key2]
          responseData.date = key
          responseDataList.push(responseData)
          break
      }
      loopCount++
    }
  }
  return responseDataList
}

/**
 * @param {FinanceRequestData} requestObject requestObject
 * @return {string} requestUrl
 */
const buildURL = (requestObject: FinanceRequestData): string => {
  const requestUrl = new URL(requestObject.url ? requestObject.url : '')
  requestUrl.searchParams.append(
    'function',
    requestObject.function ? requestObject.function : ''
  )
  requestUrl.searchParams.append(
    'from_symbol',
    requestObject.fromSymbol ? requestObject.fromSymbol : ''
  )
  requestUrl.searchParams.append(
    'to_symbol',
    requestObject.toSymbol ? requestObject.toSymbol : ''
  )
  requestUrl.searchParams.append(
    'interval',
    requestObject.interval ? requestObject.interval : ''
  )
  requestUrl.searchParams.append(
    'apikey',
    requestObject.apiKey ? requestObject.apiKey : ''
  )
  requestUrl.searchParams.append('outputsize', 'full')

  return requestUrl.toString()
}

export default GetFinanceData
