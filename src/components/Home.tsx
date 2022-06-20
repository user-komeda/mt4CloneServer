import FinanceResponseData from '../types/FinanceResponseData'

/**
 * homeComponent
 *
 * @param {Array<FinanceResponseData>} props props
 * @return {JSX.IntrinsicAttributes} html
 */
const Home: React.FC<{
  responseDataList: Array<FinanceResponseData>
}> = props => {
  return (
    <div>
      {props.responseDataList.map((responseData, i) => {
        return (
          <div key={i}>
            <p>{responseData.openValue}</p>
            <p>{responseData.highValue}</p>
            <p>{responseData.lowValue}</p>
            <p>{responseData.closeValue}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Home
