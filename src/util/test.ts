import { BarController } from 'chart.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires

import { BubbleController } from 'chart.js'

/**
 *
 */
export default class Custom extends BarController {
  /**
   *
   */
  draw () {
    const meta = this.getMeta()
    const data = meta.data
    const dataList: any = meta.controller.getDataset().data
    const dataSet: any = meta.controller.getDataset()
    const minValue = dataSet['min']
    const maxValue = dataSet['max']
    const par = (maxValue - minValue) / 10
    // dataList.pop()
    // dataList.pop()

    const ctx = this.chart.ctx
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 1
    // ctx.canvas.width = 1000
    // ctx.canvas.height = 600

    let count = 1
    for (const pt0 of dataList) {
      const x = pt0['x']
      const y = pt0['y']
      const xWidth = pt0['barWidth']
      const xHeight = pt0['barHeight']
      const par2 = 100 - ((y - minValue) / par) * 10
      const par3 = 100 - ((xHeight - minValue) / par) * 10

      console.log(y)
      console.log(xHeight)
      console.log(par2)
      console.log(par3)
      console.log((600 * par2) / 100)
      console.log((600 * par3) / 100)
      ctx.strokeRect(
        x * count,
        (600 * par2) / 100,
        Number(xWidth),
        (600 * par2) / 100 - (600 * par3) / 100
      )
      // ctx.strokeRect(900, 600 - (600 - 135.2), Number(xWidth), 10)
      // ctx.strokeRect(950, 10, Number(xWidth), 1)

      count += 0.3
      // break
    }
    // //現在のパスを輪郭表示する
    // ctx.stroke()
    // ctx.strokeRect(200, 135, 7, 300.99)
    // ctx.strokeRect(250, 137, 7, 400)
    // ctx.strokeRect(55, 100, 7, 1000)
    // ctx.strokeRect(60, 100, 7, 1000)
    // ctx.strokeRect(65, 100, 7, 1000)
    // ctx.strokeRect(70, 100, 7, 1000)
    // ctx.strokeRect(75, 100, 7, 1000)
  }
}
