import { supabase } from '@/lib/supabaseClient';
import { Order, SupabaseResponse, DataProps } from '../lib/constants';

export const createData = async (props: DataProps) => {
 const { inputValue, selectedYear, month, selectedDay } = props;

 try {
  const { data, error }: SupabaseResponse = await supabase
   .from('orders')
   .insert([
    {
     number: inputValue,
     user_id: 1,
     order_date: `${selectedYear}-${month + 1}-${selectedDay}`,
    },
   ])
   .select();

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  if (data !== null) {
   const newOrders = {
    id: data[0].id,
    number: data[0].number,
    user_id: data[0].user_id,
    order_date: data[0].order_date,
   };

   orders.push(newOrders);

   localStorage.setItem('tuClave', JSON.stringify(orders));
  }
 } catch (error) {
  console.error(error);
 }
};
