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
 }, [selectedMonth, selectedDay, selectedDate]);

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
     <div className='text-center'>
      <p>{selectedMonth}</p>
     </div>
    )}

    <select
     className='text-center text-[#eb3356] p-1  mx-24 bg-black'
     value={selectedDate}
     onChange={handleSelectChange}>
     <option value='month'>PEDIDOS POR MES</option>
     <option value='day'>PEDIDOS POR DIA</option>
    </select>

    <h3 className='text-center text-4xl pt-10'>{totalOrders}</h3>
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
       {days.map((day) => {
        return (
         <span
          className={`${selectedDay === day && 'text-white scroll-stop'}`}
          onClick={() => handleDayClick(day)}
          key={day}>
          {day}
         </span>
        );
       })}
      </>
     )}
    </article>

    <div className='flex w-full justify-center align-middle py-20'>
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

    <div className='flex justify-between items-center px-20'>
     <button className='border-4 border-[#eb3356] rounded-full p-2'>
      <svg
       className='h-8 w-8 fill-current  text-white'
       xmlns='http://www.w3.org/2000/svg'
       viewBox='0 -960 960 960'>
       <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
      </svg>
     </button>
     <button className='border-4 border-[#eb3356] rounded-full p-2'>
      <svg
       className='h-8 w-8 fill-current  text-white'
       xmlns='http://www.w3.org/2000/svg'
       viewBox='0 -960 960 960'>
       <path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
      </svg>
     </button>
    </div>
   </section>
  </main>
 );
}
