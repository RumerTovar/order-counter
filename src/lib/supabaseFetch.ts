import { supabase } from '@/lib/supabaseClient';
import { Order } from '@/lib/constants';
import { filterOrders } from '@/components/TabsComponent';

export const fetchData = async (
 setAllOrders: React.Dispatch<React.SetStateAction<Order[] | null>>,
 setInputValue: React.Dispatch<React.SetStateAction<string>>,
 selectedDate: string
) => {
 const getOrdersFromLocal = localStorage.getItem('orders');

 if (!getOrdersFromLocal) {
  try {
   const { data: orders, error } = await supabase.from('orders').select('*');
   setAllOrders(orders);
   setInputValue(filterOrders(orders, selectedDate).value);
   localStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
   console.error(error);
  }
 } else {
  const parseOrders = JSON.parse(getOrdersFromLocal);
  setAllOrders(parseOrders);
  setInputValue(filterOrders(parseOrders, selectedDate).value);
 }
};
