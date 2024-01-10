export function tfStr(params: number | null | undefined | boolean) {
  if (params === null || params === undefined) return '-';
  return params === 0 ? '×' : '○';
}
