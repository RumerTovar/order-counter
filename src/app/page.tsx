'use client';

import { useEffect, useState, useRef, useId } from 'react';
import { supabase } from '../lib/supabaseClient';
import Chart from '../components/Chart';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useGetMonth } from './hooks/useGetMonth';
import { useGetDaysInCycle } from './hooks/useGetDaysinCicle';
import { useFilterOrders } from './hooks/useFilterOrders';
interface Order {
 id: number;
 number: number;
 user_id: number;
 order_date: Date;
}

export default function Home() {
 const { currentDay, currentYear, selectedSpan } = useGetMonth();

 const [selectedDate, setSelectedDate] = useState('month');
 const [allOrders, setAllOrders] = useState<Order[] | null>(null);
 const [test, setTest] = useState(0);
 const [selectedMonth, setSelectedMonth] = useState<string>(selectedSpan);
 const [selectedDay, setSelectedDay] = useState<number>(currentDay);
 const [selectedYear, setSelectedYear] = useState<number>(currentYear);
 const [hasValueChanged, setHasValueChanged] = useState(true);

 const { totalFilteredOrders } = useFilterOrders(
  allOrders,
  selectedMonth,
  selectedDate,
  selectedDay,
  selectedYear
 );

 const [inputValue, setInputValue] = useState<string | number>(
  totalFilteredOrders
 );
 const { days } = useGetDaysInCycle(selectedMonth);
 const scrollContainerRef = useRef<HTMLDivElement | null>(null);

 const fetchData = async () => {
  const { data: orders, error } = await supabase.from('orders').select('*');

  if (error) {
   console.log(error);
  } else {
   setAllOrders(orders);
   localStorage.setItem('orders', JSON.stringify(orders));
  }
 };

 useEffect(() => {
  setTest(95);
  const getOrdersFromLocal = localStorage.getItem('orders');

  if (!getOrdersFromLocal) {
   fetchData();
  } else {
   const parseOrders = JSON.parse(getOrdersFromLocal);
   setAllOrders(parseOrders);
  }
 }, []);

 useEffect(() => {
  if (scrollContainerRef.current) {
   const scrollContainer = scrollContainerRef.current;
   const scrollStopElement = scrollContainer.querySelector(
    '.scroll-stop'
   ) as HTMLElement | null;

   if (scrollStopElement) {
    const containerWidth = scrollContainer.clientWidth;
    const scrollStopPosition = scrollStopElement.offsetLeft;
    const scrollStopCenterPosition = scrollStopPosition - containerWidth / 2;

    scrollContainer.scrollLeft = scrollStopCenterPosition;
   }
  }

  setInputValue(totalFilteredOrders);
  setHasValueChanged(true);
 }, [selectedMonth, selectedDay, selectedDate, totalFilteredOrders]);

 const saveOrder = async () => {
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

  const [startMonth, endMonth] = selectedMonth.split('-');
  const startMonthNumber = monthMap[startMonth];
  const endMonthNumber = monthMap[endMonth];

  const month = selectedDay >= 22 ? startMonthNumber : endMonthNumber;

  if (totalFilteredOrders > 0) {
   const { data, error } = await supabase
    .from('orders')
    .update({ number: inputValue })
    .eq('order_date', `${selectedYear}-${month + 1}-${selectedDay}`)
    .select();

   if (error) {
    console.log(error);
   }

   fetchData();
   console.log(data);
  } else {
   const { data: orders, error } = await supabase
    .from('orders')
    .insert([
     {
      number: inputValue,
      user_id: 1,
      order_date: `${selectedYear}-${month + 1}-${selectedDay}`,
     },
    ])
    .select();

   if (error) {
    console.log(error);
   }
   fetchData();
   console.log(orders);
  }
 };

 const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedDate(event.target.value);
 };

 const handleMonthClick = (month: string) => {
  setSelectedMonth(month);
 };

 const handleDayClick = (day: number) => {
  setSelectedDay(day);
 };

 const handleBackYear = () => {
  setSelectedYear(selectedYear - 1);
 };

 const handleFowardYear = () => {
  setSelectedYear(selectedYear + 1);
 };

 const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = Math.max(
   0,
   Math.min(99, Number(event.target.value))
  ).toString();

  setHasValueChanged(Number(event.target.value) === totalFilteredOrders);
  setInputValue(value);
 };

 const months = [
  'Ene-Feb',
  'Feb-Mar',
  'Mar-May',
  'May-Jun',
  'Jun-Jul',
  'Jul-Ago',
  'Ago-Sep',
  'Sep-Oct',
  'Oct-Nov',
  'Nov-Dic',
  'Dic-Ene',
 ];

 return (
  <main className='flex min-h-screen flex-col '>
   <section className='flex flex-col bg-gradient-to-t from-pink-950 via-black  to-black to-60% '>
    <div className='flex justify-between px-10 p-4 pb-8 '>
     <svg
      onClick={() => handleBackYear()}
      className='fill-current  text-white'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'>
      <path d='M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z' />
     </svg>
     <h2 className='h-fit text-2xl text-center'>{selectedYear}</h2>
     <svg
      onClick={() => handleFowardYear()}
      className={`fill-current text-white ${
       selectedYear === currentYear && 'invisible'
      }`}
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'>
      <path d='m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z' />
     </svg>
    </div>
    <div
     className={`text-center py-2 ${selectedDate !== 'day' && 'invisible'}`}>
     <p>{selectedMonth}</p>
    </div>

    <select
     className='text-center text-[#eb3356] p-1  mx-24 bg-black focus:outline-none'
     value={selectedDate}
     onChange={handleSelectChange}>
     <option value='month'>PEDIDOS POR MES</option>
     <option value='day'>PEDIDOS POR DIA</option>
    </select>
    {selectedDate === 'month' ? (
     <input
      disabled
      className='bg-transparent text-center text-6xl pt-7 focus:outline-none'
      value={totalFilteredOrders}
     />
    ) : (
     <input
      name='orderInput'
      className='bg-transparent text-center text-6xl pt-7  focus:outline-none'
      type='number'
      min={0}
      max={99}
      maxLength={2}
      onChange={handleOrderChange}
      value={inputValue}
     />
    )}

    <div className='pt-4'>
     <Chart />
    </div>
   </section>
   <section className='flex-1  bg-black'>
    <article
     className='flex overflow-x-auto overflow-visible space-x-4 bg-stone-800 text-neutral-600  py-2 px-2 border-t border-t-[#eb3356] scroll-smooth '
     ref={scrollContainerRef}>
     {selectedDate === 'month' ? (
      months.map((month) => {
       return (
        <span
         className={`whitespace-nowrap ${
          selectedMonth === month && 'text-white scroll-stop'
         }`}
         onClick={() => handleMonthClick(month)}
         key={month}>
         {month}
        </span>
       );
      })
     ) : (
      <>
       {days.map((day, index) => {
        return (
         <span
          className={`${selectedDay === day && 'text-white scroll-stop'}`}
          onClick={() => handleDayClick(day)}
          key={index}>
          {day}
         </span>
        );
       })}
      </>
     )}
    </article>

    <div className='flex w-full justify-center align-middle py-10'>
     <div className='w-20 h-20 '>
      <CircularProgressbar
       value={test}
       text={`${test}%`}
       styles={buildStyles({
        textColor: '#ffffff',
        trailColor: 'black',
        pathColor: '#eb3356',
       })}
      />
     </div>
    </div>

    <div className='flex  justify-center'>
     <button
      onClick={saveOrder}
      disabled={hasValueChanged}
      className='flex border-4 border-[#eb3356] bg-[#eb3356] rounded-full p-2  justify-between disabled:opacity-25'>
      GUARDAR
     </button>
    </div>
   </section>
  </main>
 );
}
