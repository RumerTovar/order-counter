import { updateData } from '@/lib/supabaseUpdate';
import { fetchData } from '../lib/supabaseFetch';
import { createData } from '@/lib/supabaseCreate';
import { monthMap } from '../lib/utils';
import { SaveButton } from '../lib/constants';

export default function SaveButton(props: SaveButton) {
 const {
  filterOrders,
  hasValueChanged,
  inputValue,
  selectedDate,
  setAllOrders,
  setInputValue,
  setHasValueChanged,
 } = props;

 const saveOrder = async () => {
  if (filterOrders.exist) {
   updateData({
    inputValue,
    setInputValue,
    selectedDate,
    setAllOrders,
    setHasValueChanged,
   });
  } else {
   createData({
    inputValue,
    setInputValue,
    selectedDate,
    setAllOrders,
    setHasValueChanged,
   });
  }
 };

 return (
  <div className='flex  justify-center'>
   <button
    onClick={saveOrder}
    disabled={hasValueChanged}
    className='flex border-4 border-emerald-500 bg-emerald-500 rounded-full p-2  justify-between disabled:opacity-25'>
    GUARDAR
   </button>
  </div>
 );
}
