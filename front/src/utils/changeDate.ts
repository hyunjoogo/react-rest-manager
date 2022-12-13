interface ChangeDate {
  (year: number, month: number, date: number): string;
}

export const changeDate: ChangeDate = (year, month, date) => {
  return `${year}${month < 10 ? '0' + String(month) : month}${date < 10 ? '0' + String(date) : date}`;
};

export const dateChangeDate = (newDate: Date) => {
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  return `${year}${month < 10 ? '0' + String(month) : month}${date < 10 ? '0' + String(date) : date}`;
};

export const insertAtInString = (str : String) => {
  return str.slice(0,4) + '-' + str.slice(4, 6) + '-' + str.slice(6,8);
}


