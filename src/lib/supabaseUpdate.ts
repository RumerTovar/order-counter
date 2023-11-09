import { supabase } from '@/lib/supabaseClient';
import { Order, SupabaseResponse, DataProps } from '../lib/constants';
export const updateData = async (props: DataProps) => {
 const { inputValue, selectedYear, month, selectedDay } = props;

 const selectedDate = `${selectedYear}-${month + 1}-${selectedDay}`;

 const { data, error }: SupabaseResponse = await supabase
  .from('orders')
  .update({ number: inputValue })
  .eq('order_date', selectedDate)
  .select();

 const orders = JSON.parse(localStorage.getItem('orders') || '[]');
 const indexToUpdate = orders.findIndex((order: Order) => {
  const orderDate = new Date(order.order_date);
  const dateToString = orderDate
   .toLocaleDateString('en-US')
   .replace(/\//g, '-');
  const selectedDateFormatted = new Date(selectedDate)
   .toLocaleDateString('en-US')
   .replace(/\//g, '-');
  return dateToString === selectedDateFormatted;
 });

 if (indexToUpdate !== -1 && data !== null) {
  console.log(data);
  orders[indexToUpdate].number = data[0].number;
 }

 localStorage.setItem('orders', JSON.stringify(orders));
 if (error) {
  console.error(error);
 }
};
