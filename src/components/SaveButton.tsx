import { updateData } from '@/lib/supabaseUpdate';
import { fetchData } from '../lib/supabaseFetch';
import { createData } from '@/lib/supabaseCreate';
import { monthMap } from '../lib/utils';
import { SaveButton } from '../lib/constants';

export default function SaveButton(props: SaveButton) {
 const {
  selectedMonth,
  selectedDay,
  selectedYear,
  totalFilteredOrders,
  inputValue,
  hasValueChanged,
 } = props;

 const saveOrder = async () => {
  const [startMonth, endMonth] = selectedMonth.split('-');
  const startMonthNumber = monthMap[startMonth];
  const endMonthNumber = monthMap[endMonth];
  const month = selectedDay >= 22 ? startMonthNumber : endMonthNumber;

  if (totalFilteredOrders > 0) {
   updateData({ inputValue, selectedYear, month, selectedDay });
  } else {
   createData({ inputValue, selectedYear, month, selectedDay });
  }
 };

 return (
  <div className='flex  justify-center'>
   <button
    onClick={saveOrder}
    disabled={hasValueChanged}
    className='flex border-4 border-[#eb3356] bg-[#eb3356] rounded-full p-2  justify-between disabled:opacity-25'>
    GUARDAR
   </button>
  </div>
 );
}
