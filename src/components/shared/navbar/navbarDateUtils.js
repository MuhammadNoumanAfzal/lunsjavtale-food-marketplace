export const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const earlierSlots = ["11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM"];

export const laterSlots = ["1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM"];

export function getMonthDays(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [];

  for (let index = 0; index < firstDayIndex; index += 1) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarDays.push(new Date(year, month, day));
  }

  return calendarDays;
}

export function isSameDay(firstDate, secondDate) {
  if (!firstDate || !secondDate) {
    return false;
  }

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export function formatNavbarDate(date, time) {
  if (!date && !time) {
    return "Any time";
  }

  const dateLabel = date
    ? date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Any day";

  return time ? `${dateLabel}, ${time}` : dateLabel;
}
