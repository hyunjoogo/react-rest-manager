export function classStr(classArr : string[]) : string {
  if (classArr.length === 1) {
    return String(classArr[0]);
  }
  return classArr.join(' ');
}
