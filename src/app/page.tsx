'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Chart from '../components/Chart';
import Image from 'next/image';
import addIcon from '../../public/add_FILL0_wght400_GRAD0_opsz24.svg';

interface Order {
 id: number;
 number: number;
 user_id: number;
 order_date: string;
}

export default function Home() {
 const [orders, setOrders] = useState<Order[] | null>(null);
 const [total, setTotal] = useState(0);

 useEffect(() => {
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

 return (
  <main className='flex min-h-screen flex-col'>
   {/* se puede seleccionar la opcion de por año o por mes para ver los graficos.
    
    En el grafico de años salen los meses en la leyenda
    
    En el grafico de meses salen los dias en la leyenda*/}

   <section className='flex flex-col bg-gradient-to-t from-pink-950 via-black  to-black to-60% '>
    <h1 className='h-fit p-4 pb-8 text-center'>PEDIDOS</h1>
    <h2 className='text-center text-pink-900 p-2'>TOTAL / AÑO</h2>
    <h3 className='text-center text-4xl'>{total}</h3>
    <div className='py-10'>
     <Chart />
    </div>
   </section>
   <section className='flex-1  bg-black'>
    <article className='flex overflow-x-auto  space-x-2 p-2 bg-stone-900 text-sm text-gray-600'>
     <div>ENE</div>
     <div>FEB</div>
     <div>MAR</div>
     <div>ABR</div>
     <div>MAY</div>
     <div>JUN</div>
     <div>JUL</div>
     <div>AGO</div>
     <div>SEP</div>
     <div>OCT</div>
     <div>NOV</div>
     <div>DIC</div>
    </article>
    <div className='flex space-x-10 items-center justify-center'>
     <button className='border-4 border-pink-600 rounded-full p-2'>
      <svg
       className='h-8 w-8 fill-current  text-white '
       xmlns='http://www.w3.org/2000/svg'
       viewBox='0 -960 960 960'>
       <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
      </svg>
     </button>
     <button className='border-4 border-pink-600 rounded-full p-2'>
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
