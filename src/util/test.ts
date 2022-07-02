import { BarController } from 'chart.js'
import checkFillColorBlue from './checkFillColor'

/**
 *
 */
export default class Custom extends BarController {
  /**
   *
   */
  draw () {
    const meta = this.getMeta()
    const dataList: any = meta.controller.getDataset().data
    const dataSet: any = meta.controller.getDataset()
    // スケールの最小値
    const minValue = dataSet['min']
    // スケールの最大値
    const maxValue = dataSet['max']
    // メモリ増加量
    const par = (maxValue - minValue) / 10
    const width = meta.data[0]['width']

    const ctx = this.chart.ctx

    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 0.5
    ctx.fillStyle = 'red'

    let count = 1
    for (const pt0 of dataList) {
      // openValueCloseValueの最小値
      const y = pt0['y']

      // openValueCloseValueの最小値
      const xHeight = pt0['barHeight']

      const openValue = pt0['openValue']
      const closeValue = pt0['closeValue']
      const highValue = pt0['highValue']
      const lowValue = pt0['lowValue']

      ctx.fillStyle = checkFillColorBlue(openValue, closeValue)
        ? 'rgb(0, 0, 255)'
        : 'rgb(255, 0, 0)'

      // 全体の百分率
      const par2 = 100 - ((y - minValue) / par) * 10
      // 全体の百分率
      const par3 = 100 - ((xHeight - minValue) / par) * 10

      const par4 = 100 - ((highValue - minValue) / par) * 10

      const par5 = 100 - ((lowValue - minValue) / par) * 10

      ctx.fillRect(
        meta.data[count - 1]['x'] - 8.5,
        meta.data[count - 1]['y'],
        Number(width),
        (600 * par3) / 100 - (600 * par2) / 100
      )
      ctx.strokeRect(
        meta.data[count - 1]['x'] - 8.5 + Number(width) / 2,
        meta.data[count - 1]['y'],
        1,
        (600 * par5) / 100 - (600 * par3) / 100
      )
      const x = (600 * par2) / 100 - (600 * par3) / 100
      ctx.strokeRect(
        meta.data[count - 1]['x'] - 8.5 + Number(width) / 2,
        meta.data[count - 1]['y'] - x,
        1,
        (600 * par4) / 100 - (600 * par3) / 100
      )
      count++
    }
  }
}
