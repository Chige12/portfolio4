// 最大値と最小値を指定して、それ以上orそれ以下のとき値固定
export const cutMinMax = (min: number, max: number, data: number) => {
  if (data >= max) {
    return max
  } else if (data <= min) {
    return min
  } else {
    return data
  }
}
// 正規化
export const minMaxNormalization = (
  min: number,
  max: number,
  data: number
): number => {
  return (data - min) / (max - min)
}
