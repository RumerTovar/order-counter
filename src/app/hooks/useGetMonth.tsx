export const useGetMonth = () => {
 const currentDate = new Date();
 const currentMonth = currentDate.getMonth() + 1;
 const currentDay = currentDate.getDate();
 const currentYear = currentDate.getFullYear();

 function getSelectedSpan() {
  let startMonth, endMonth;

  if (currentDay >= 22) {
   startMonth = currentMonth;
   endMonth = (currentMonth % 12) + 1;
  } else {
   endMonth = currentMonth;
   startMonth = currentMonth - 1 || 12;
  }

  return `${getMonthName(startMonth)}-${getMonthName(endMonth)}`;
 }

 function getMonthName(monthIndex: number) {
  const monthNames = [
   'Ene',
   'Feb',
   'Mar',
   'Abr',
   'May',
   'Jun',
   'Jul',
   'Ago',
   'Sep',
   'Oct',
   'Nov',
   'Dic',
  ];
  return monthNames[monthIndex - 1];
 }

 const selectedSpan = getSelectedSpan();

 return {
  currentDay,
  currentYear,
  selectedSpan,
 };
};
