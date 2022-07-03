import { BarController } from 'chart.js'
import checkFillColorBlue from './checkFillColor'

/**
 * customChartClass
 */
export default class Custom extends BarController {
  static id: string
  static defaults: any
  /**
   * cartの描画
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
    // barの幅
    const width = meta.data[0]['width']

    const ctx = this.chart.ctx

    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 0.5
    ctx.fillStyle = 'red'

    let count = 1
    for (const pt0 of dataList) {
      // y座標
      const y = pt0['y']
      // barの高さ
      const xHeight = pt0['barHeight']
      // openVale
      const openValue = pt0['openValue']
      // closeValue
      const closeValue = pt0['closeValue']
      // highValue
      const highValue = pt0['highValue']
      // lowValue
      const lowValue = pt0['lowValue']
      // bar塗りつぶし色(青:赤)
      ctx.fillStyle = checkFillColorBlue(openValue, closeValue)
        ? 'rgb(0, 0, 255)'
        : 'rgb(255, 0, 0)'

      // 全体の百分率
      const par2 = 100 - ((y - minValue) / par) * 10
      // 全体の百分率
      const par3 = 100 - ((xHeight - minValue) / par) * 10
      // 全体の百分率
      const par4 = 100 - ((highValue - minValue) / par) * 10
      // 全体の百分率
      const par5 = 100 - ((lowValue - minValue) / par) * 10

      // ローソク足の描画
      ctx.fillRect(
        meta.data[count - 1]['x'] - 8.5,
        meta.data[count - 1]['y'],
        Number(width),
        (600 * par3) / 100 - (600 * par2) / 100
      )

      // ひげの描画
      ctx.strokeRect(
        meta.data[count - 1]['x'] - 8.5 + Number(width) / 2,
        meta.data[count - 1]['y'],
        1,
        -((600 * par3) / 100 - (600 * par5) / 100)
      )
      const x = (600 * par2) / 100 - (600 * par3) / 100

      // ひげの描画
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
