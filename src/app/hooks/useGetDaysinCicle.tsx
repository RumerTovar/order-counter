const monthMap: { [key: string]: number } = {
 Ene: 0,
 Feb: 1,
 Mar: 2,
 May: 4,
 Jun: 5,
 Jul: 6,
 Ago: 7,
 Sep: 8,
 Oct: 9,
 Nov: 10,
 Dic: 11,
};

export const useGetDaysInCycle = (monthCycle: string) => {
 const [startMonth, endMonth] = monthCycle.split('-');

 const startMonthNumber = monthMap[startMonth];
 const endMonthNumber = monthMap[endMonth];

 const currentDate = new Date();
 const currentYear = currentDate.getFullYear();

 const startDate = new Date(currentYear, startMonthNumber, 22);
 const endDate = new Date(currentYear, endMonthNumber, 21);

 const days = [];
 for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
  days.push(date.getDate());
 }

 return { days };
};
