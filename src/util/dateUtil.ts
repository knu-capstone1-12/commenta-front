export const getDaysOfMonth = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let daysOfMonth: (number | null)[] = [];
  const weeks: (number | null)[][] = [];

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysOfMonth.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    daysOfMonth.push(i);

    if (daysOfMonth.length === 7) {
      weeks.push(daysOfMonth);
      daysOfMonth = [];
    }
  }

  if (daysOfMonth.length > 0) {
    weeks.push(daysOfMonth);
  }

  return weeks;
};

export const formatDateToMonthYear = (date: Date): string => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export const weekDaysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDateToYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
