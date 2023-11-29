import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DateSelector from './DateSelector';
import OrderInput from './OrderInput';
import { format } from 'date-fns';
import { Order, ResultObject } from '@/lib/constants';
import { isSameDay } from 'date-fns';
import { fetchData } from '@/lib/supabaseFetch';
import SaveButton from '../components/SaveButton';

export const filterOrders = (
 allOrders: Order[] | null,
 selectedDate: string
): ResultObject => {
 const result = allOrders?.filter((order: Order) => {
  const orderDate = new Date(order.order_date);
  const compareDate = new Date(selectedDate);
  return isSameDay(orderDate, compareDate);
 });

 if (result && result.length > 0) {
  return {
   value: result[0].number.toString(),
   exist: true,
  };
 } else {
  const value = 0;
  return {
   value: value.toString(),
   exist: false,
  };
 }
};

export default function TabsComponent() {
 const [tabIndex, setTabIndex] = useState(0);
 const [selectedDate, setSelectedDate] = useState(getTodayDateString());
 const [allOrders, setAllOrders] = useState<Order[] | null>(null);
 const [inputValue, setInputValue] = useState('0');
 const [hasValueChanged, setHasValueChanged] = useState(true);

 const filterOrders = (allOrders: Order[] | null): ResultObject => {
  const result = allOrders?.filter((order: Order) => {
   const orderDate = new Date(order.order_date);
   const compareDate = new Date(selectedDate);
   return isSameDay(orderDate, compareDate);
  });

  if (result && result.length > 0) {
   return {
    value: result[0].number.toString(),
    exist: true,
   };
  } else {
   const value = 0;
   return {
    value: value.toString(),
    exist: false,
   };
  }
 };

 function getTodayDateString() {
  return format(new Date(), 'yyyy-MM-dd');
 }

 const tabLabels = ['Dia', 'Periodo'];

 const renderTabPanel = (index: number) => (
  <TabPanel key={index} className='flex flex-col'>
   <DateSelector
    tabIndex={tabIndex}
    selectedDate={selectedDate}
    setSelectedDate={setSelectedDate}
    setHasValueChanged={setHasValueChanged}
   />
   <OrderInput
    inputValue={inputValue}
    setInputValue={setInputValue}
    setHasValueChanged={setHasValueChanged}
    filterOrders={filterOrders(allOrders)}
   />
   <SaveButton
    filterOrders={filterOrders(allOrders)}
    hasValueChanged={hasValueChanged}
    inputValue={inputValue}
    selectedDate={selectedDate}
    setAllOrders={setAllOrders}
    setInputValue={setInputValue}
    setHasValueChanged={setHasValueChanged}
   />
  </TabPanel>
 );

 const getTabClassName = (index: number) =>
  tabIndex === index
   ? 'text-emerald-500 border-b-4 border-b-emerald-500 focus:outline-none'
   : 'text-white';

 useEffect(() => {
  fetchData(setAllOrders, setInputValue, selectedDate);
 }, [selectedDate]);

 return (
  <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
   <TabList className='flex justify-around py-5 pt-10'>
    {tabLabels.map((label, index) => (
     <Tab key={index} className={getTabClassName(index)}>
      {label}
     </Tab>
    ))}
   </TabList>
   {tabLabels.map((label, index) => renderTabPanel(index))}
  </Tabs>
 );
}
