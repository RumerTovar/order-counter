import { OrderInput } from '@/lib/constants';

export default function OrderInput(props: OrderInput) {
 const { inputValue, setInputValue, setHasValueChanged, filterOrders } = props;

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = Math.max(
   0,
   Math.min(99, Number(event.target.value))
  ).toString();

  setHasValueChanged(Number(event.target.value) === Number(filterOrders.value));

  setInputValue(value);
 };

 return (
  <input
   name='orderInput'
   className='bg-transparent text-center text-6xl focus:outline-none '
   type='number'
   min={0}
   max={99}
   maxLength={2}
   onChange={(event) => handleChange(event)}
   value={inputValue}
  />
 );
}
