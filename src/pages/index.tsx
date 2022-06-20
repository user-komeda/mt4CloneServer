import { GetServerSideProps } from 'next'
import HomeComponent from '../components/Home'
import FinanceRequestData, { SizeType } from '../types/FinanceRequestData'
import getFinanceData from '../service/GetFinanceData'
import Props from '../types/Props.js'

/**
 *getServerSideProps
 */
export const getServerSideProps: GetServerSideProps = async () => {
  const requestObject: FinanceRequestData = {}
  requestObject.url = process.env.REQUEST_URL
  requestObject.apiKey = process.env.API_KEY
  requestObject.function = 'FX_INTRADAY'
  requestObject.fromSymbol = 'USD'
  requestObject.toSymbol = 'JPY'
  requestObject.interval = SizeType['60MIN']
  const responseDataList = await getFinanceData(requestObject)

  console.log(getFinanceData(requestObject))

  const props: Props = {
    responseDataList: responseDataList,
  }

  return { props: props }
}

/**
 * homeComponent
 *
 * @param {Props} props props
 * @return {HomeComponent} homeComponent
 */
const Home = (props: Props) => {
  return (
    <HomeComponent responseDataList={props.responseDataList}></HomeComponent>
  )
}

export default Home
