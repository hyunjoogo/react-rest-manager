interface ChangeDate {
  (year: number, month: number, date: number): string;
}

export const changeDate: ChangeDate = (year, month, date) => {
  return `${year}${month < 10 ? '0' + String(month) : month}${date < 10 ? '0' + String(date) : date}`;
};
