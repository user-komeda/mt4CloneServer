import FinanceResponseData from '../types/FinanceResponseData'
import ChartComponent from '../components/chart'

/**
 * homeComponent
 *
 * @param {Array<FinanceResponseData>} props props
 * @return {JSX.IntrinsicAttributes} html
 */
const Home: React.FC<{
  responseDataList: Array<FinanceResponseData>
}> = (props) => {
  console.log('homeComponent')
  return (
    <div>
      <ChartComponent
        responseDataList={props.responseDataList}
      ></ChartComponent>
      {props.responseDataList.map((responseData, i) => {
        return (
          <div key={i}>
            <p>{responseData.openValue}</p>
            <p>{responseData.closeValue}</p>
            <p>{responseData.highValue}</p>
            <p>{responseData.lowValue}</p>
            <p>------</p>
          </div>
        )
      })}
      <p>aaa</p>
    </div>
  )
}

export default Home
