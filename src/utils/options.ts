/**
 *
 * @param interval 分単位の間隔 デフォルトは5分
 * @param maxHours 最大時間 デフォルトは9時間
 * @returns
 */
export function generateTimeOptions(interval: number = 5, maxHours: number = 9) {
  const options = [];

  for (let hour = 0; hour <= maxHours; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const formattedHour = hour.toString().padStart(2, '');
      const formattedMinute = minute === 0 && hour !== 0 ? '' : `${minute.toString().padStart(2, '')}分`;
      // 時間が0の場合は分のみ表示

      const timeLabel = hour === 0 ? `${formattedMinute}` : `${formattedHour}時間 ${formattedMinute}`;
      const valueInMinutes = hour * 60 + minute;
      options.push({value: valueInMinutes.toString(), label: timeLabel});
    }
  }

  return options;
}

/**
 *
 * @param interval // 0.5km単位の間隔
 * @param maxDistance // 30kmまで
 * @returns
 */
export function generateDistanceOptions(interval: number = 0.5, maxDistance: number = 30) {
  const options = [];

  for (let distance = 0; distance <= maxDistance; distance += interval) {
    const valueInMeters = (distance * 1000).toFixed(0); // kmをメートルに変換して、小数点以下を四捨五入
    const labelInKm = distance.toFixed(1); // ラベル用のkm表示
    options.push({value: valueInMeters, label: `${labelInKm} km`});
  }

  return options;
}
