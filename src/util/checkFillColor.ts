/**
 *chartBarの塗りつぶし色判定
 *
 * @param {number} openValue openValue
 * @param {number} closeValue closeValue
 * @return {boolean} isBlue
 */
const checkFillColorBlue = (openValue: number, closeValue: number): boolean => {
  const isColorBlue = openValue < closeValue ? true : false
  return isColorBlue
}
export default checkFillColorBlue
