/**
 * barLabelの取得
 *
 * @param {*} ctx ctx
 * @return {string} label
 */
const getLabelValue = (ctx: any) => {
  const labelValue: Array<string> = [
    `openValue:${ctx.raw.openValue}`,
    `closeValue:${ctx.raw.closeValue}`,
    `highValue:${ctx.raw.highValue}`,
    `lowValue:${ctx.raw.lowValue}`,
  ]
  return labelValue
}
export default getLabelValue
