import { Order } from '../lib/constants';
import { monthMap } from '../lib/utils';

export const useFilterOrders = (
 orders: Order[] | null,
 monthCycle: string,
 selectedDate: string,
 day: number,
 year: number
) => {
 const [startMonth, endMonth] = monthCycle.split('-');
 const startMonthNumber = monthMap[startMonth];
 const endMonthNumber = monthMap[endMonth];

 const startDate = new Date(year, startMonthNumber, 22);
 const endDate = new Date(year, endMonthNumber, 21);

 let filterOrders = null;
 let totalFilteredOrders = 0;

 if (orders !== null) {
  if (selectedDate === 'month') {
   filterOrders = orders.filter((order) => {
    const orderDate = new Date(order.order_date);
    return orderDate >= startDate && orderDate <= endDate;
   });

   totalFilteredOrders = filterOrders.reduce((acc, order) => {
    return acc + order.number;
   }, 0);
  } else {
   const filterDate =
    day >= 22
     ? new Date(year, startMonthNumber, day)
     : new Date(year, endMonthNumber, day);

   filterOrders = orders.filter((order) => {
    const orderDate = new Date(order.order_date);

    return (
     orderDate.getFullYear() === filterDate.getFullYear() &&
     orderDate.getMonth() === filterDate.getMonth() &&
     orderDate.getDate() === filterDate.getDate() &&
     orderDate.setHours(0, 0, 0, 0) === filterDate.setHours(0, 0, 0, 0)
    );
   });

   if (filterOrders && filterOrders.length > 0) {
    totalFilteredOrders = filterOrders[0].number;
   }
  }
 }

 return { totalFilteredOrders };
};
