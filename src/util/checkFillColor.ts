/**
 *
 * @param openValue
 * @param closeValue
 */
const checkFillColorBlue = (openValue: number, closeValue: number): boolean => {
  const isColorBlue = openValue < closeValue ? true : false
  return isColorBlue
}
export default checkFillColorBlue
