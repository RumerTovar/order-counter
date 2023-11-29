import { supabase } from '@/lib/supabaseClient';
import { SupabaseResponse, DataProps } from '../lib/constants';
import { fetchData } from './supabaseFetch';

export const createData = async (props: DataProps) => {
 const {
  inputValue,
  setInputValue,
  selectedDate,
  setAllOrders,
  setHasValueChanged,
 } = props;

 const { data, error }: SupabaseResponse = await supabase
  .from('orders')
  .insert([
   {
    number: inputValue,
    user_id: 1,
    order_date: selectedDate,
   },
  ])
  .select();

 if (error) {
  console.error(error);
 }

 const orders = JSON.parse(localStorage.getItem('orders') || '[]');

 if (data !== null) {
  const newOrders = {
   id: data[0].id,
   number: data[0].number,
   user_id: data[0].user_id,
   order_date: data[0].order_date,
  };

  console.log(orders);
  orders.push(newOrders);

  localStorage.setItem('orders', JSON.stringify(orders));
 }

 fetchData(setAllOrders, setInputValue, selectedDate);
 setHasValueChanged(true);
};
