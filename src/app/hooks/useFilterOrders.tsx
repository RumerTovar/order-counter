interface Order {
 id: number;
 number: number;
 user_id: number;
 order_date: Date;
}

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
 let totalOrders = 0;

 if (orders !== null) {
  if (selectedDate === 'month') {
   filterOrders = orders.filter((order) => {
    const orderDate = new Date(order.order_date);
    return orderDate >= startDate && orderDate <= endDate;
   });

   totalOrders = filterOrders.reduce((acc, order) => {
    return acc + order.number;
   }, 0);
  } else {
   const filterDate =
    day >= 22
     ? new Date(year, startMonthNumber, day - 1)
     : new Date(year, endMonthNumber, day - 1);

   //console.log(filterDate);

   filterOrders = orders.filter((order) => {
    const orderDate = new Date(order.order_date);

    if (
     orderDate.getFullYear() === filterDate.getFullYear() &&
     orderDate.getMonth() === filterDate.getMonth() &&
     orderDate.getDate() === filterDate.getDate() &&
     orderDate.setHours(0, 0, 0, 0) === filterDate.setHours(0, 0, 0, 0)
    ) {
     // console.log(orderDate);
    }

    return (
     orderDate.getFullYear() === filterDate.getFullYear() &&
     orderDate.getMonth() === filterDate.getMonth() &&
     orderDate.getDate() === filterDate.getDate() &&
     orderDate.setHours(0, 0, 0, 0) === filterDate.setHours(0, 0, 0, 0)
    );
   });

   if (filterOrders && filterOrders.length > 0) {
    //console.log(filterOrders);
    totalOrders = filterOrders[0].number;
   }
  }
 }

 return { totalOrders };
};
