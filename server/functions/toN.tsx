/**
 * 文字列を数値に変換します。
 *
 * @param value 変換する文字列。未定義の場合や数値に変換できない文字列が与えられた場合は、nullを返します。
 * @param zero zeroオプションがtrueで、valueが'0'の場合は、0を返します。
 * @returns 数値に変換された値、または条件によってはnull。
 *
 * 使用例:
 * toN('5') -> 5
 * toN('abc') -> null
 * toN(undefined) -> null
 * toN('0', {zero: true}) -> 0
 * toN('0', {zero: false}) -> null
 */
export function toN(value: string | undefined | null, {zero}: {zero?: boolean} = {}) {
  if (zero && value === '0') return 0;
  if (!value) return null;
  if (value === '') return null;
  if (!Number(value)) return null;
  return Number(value);
}

export function toStr(value: number | string | undefined | null) {
  if (value === '') return null;
  if (value === null) return null;
  if (value === undefined) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  return value;
}
