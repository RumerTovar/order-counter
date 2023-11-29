import { Order } from '../lib/constants';

export const useFilterOrders = (
 orders: Order[] | null,
 selectedDate: string
) => {
 let filterOrders = null;
 let totalFilteredOrders = 0;

 if (orders !== null) {
 }

 return { totalFilteredOrders };
};
