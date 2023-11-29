import { DateSelector } from '@/lib/constants';
import { subDays, addDays, format } from 'date-fns';

export default function DateSelector(props: DateSelector) {
 const { tabIndex, selectedDate, setSelectedDate, setHasValueChanged } = props;

 function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
  setSelectedDate(event.target.value);
 }

 const addDay = () => {
  const date = new Date(selectedDate);
  const formatDate = format(addDays(date, 2), 'yyyy-MM-dd');
  setSelectedDate(formatDate);
  setHasValueChanged(true);
 };

 const subDay = () => {
  const date = new Date(selectedDate);
  const formatDate = format(subDays(date, 0), 'yyyy-MM-dd');
  setSelectedDate(formatDate);
  setHasValueChanged(true);
 };

 return (
  <section className='flex justify-between py-5 items-center '>
   <svg
    className='fill-current  text-white'
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 -960 960 960'
    width='24'
    onClick={() => subDay()}>
    <path d='M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z' />
   </svg>
   <input
    type={tabIndex === 0 ? 'date' : 'month'}
    className='dark:bg-dark-bg mt-1 block p-1 rounded border-gray-400 text-lg dark:border-gray-600 dark:text-white dark:[color-scheme:dark] focus:outline-none '
    onChange={(event) => handleDateChange(event)}
    value={selectedDate}
   />
   <svg
    className='fill-current text-white'
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 -960 960 960'
    width='24'
    onClick={addDay}>
    <path d='m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z' />
   </svg>
  </section>
 );
}
