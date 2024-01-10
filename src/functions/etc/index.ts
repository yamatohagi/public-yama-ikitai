export function convertMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  const formattedHours = hours > 0 ? hours.toString() : '';
  const formattedMinutes = remainderMinutes.toString().padStart(2, '');

  // 0時間になるときは0時間を表示しない
  if (hours === 0) {
    return `${formattedMinutes}分`;
  }
  const min = formattedMinutes === '0' ? '' : `${formattedMinutes}分`;

  return `${formattedHours}時間${min}`;
}
