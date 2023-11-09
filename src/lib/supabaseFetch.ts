import { supabase } from '@/lib/supabaseClient';
import { Order } from '@/lib/constants';

export const fetchData = async (
 setAllOrders: React.Dispatch<React.SetStateAction<Order[] | null>>
) => {
 const getOrdersFromLocal = localStorage.getItem('orders');

 if (!getOrdersFromLocal) {
  try {
   const { data: orders, error } = await supabase.from('orders').select('*');
   setAllOrders(orders);
   localStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
   console.error(error);
  }
 } else {
  const parseOrders = JSON.parse(getOrdersFromLocal);
  setAllOrders(parseOrders);
 }
};
