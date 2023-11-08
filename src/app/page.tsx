'use client';

import { useEffect, useState, useRef } from 'react';
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
 const [orders, setOrders] = useState<Order[] | null>(null);
 const [total, setTotal] = useState(0);
 const [test, setTest] = useState(0);
 const [selectedMonth, setSelectedMonth] = useState<string>(selectedSpan);
 const [selectedDay, setSelectedDay] = useState<number>(currentDay);
 const [selectedYear, setSelectedYear] = useState<number>(currentYear);

 const { totalOrders } = useFilterOrders(
  orders,
  selectedMonth,
  selectedDate,
  selectedDay,
  selectedYear
 );

 const [inputValue, setInputValue] = useState<string | number>(totalOrders);

 const { days } = useGetDaysInCycle(selectedMonth);
 const scrollContainerRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  setTest(95);
  const getOrdersFromLocal = localStorage.getItem('orders');

  const calculateTotal = (ordersData: Order[]) => {
   let acc = 0;

   ordersData?.forEach((order: Order) => {
    return (acc += order.number);
   });

   return setTotal(acc);
  };

  const fetchData = async () => {
   const { data: orders, error } = await supabase.from('orders').select('*');

   if (error) {
    console.log(error);
   } else {
    setOrders(orders);
    localStorage.setItem('orders', JSON.stringify(orders));
    calculateTotal(orders);
   }
  };

  if (!getOrdersFromLocal) {
   fetchData();
  } else {
   const parseOrders = JSON.parse(getOrdersFromLocal);

   setOrders(parseOrders);
   calculateTotal(parseOrders);
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

  setInputValue(totalOrders);
 }, [selectedMonth, selectedDay, selectedDate, totalOrders]);

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
  setInputValue(Number(event.target.value).toString());
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
    {selectedDate === 'day' && (
     <div className='text-center py-2'>
      <p>{selectedMonth}</p>
     </div>
    )}
    <select
     className='text-center text-[#eb3356] p-1  mx-24 bg-black focus:outline-none'
     value={selectedDate}
     onChange={handleSelectChange}>
     <option value='month'>PEDIDOS POR MES</option>
     <option value='day'>PEDIDOS POR DIA</option>
    </select>
    {selectedDate === 'month' ? (
     <span className='text-center text-6xl pt-10 focus:outline-none'>
      {totalOrders}
     </span>
    ) : (
     <input
      className='bg-black text-center text-6xl pt-10 focus:outline-none'
      type='number'
      onChange={handleOrderChange}
      value={inputValue}
     />
    )}

    <div className='pt-5'>
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

    {/*     <div className='flex w-full justify-center align-middle py-20'>
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
 */}
    {/*     <div className='flex  justify-center'>
     <button className='flex border-4 border-[#eb3356] rounded-full p-4  w-36 justify-between'>
      GUARDAR
      <svg
       className='fill-current  text-white'
       xmlns='http://www.w3.org/2000/svg'
       height='24'
       viewBox='0 -960 960 960'
       width='24'>
       <path d='M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z' />
      </svg>
     </button>
    </div> */}
   </section>
  </main>
 );
}
