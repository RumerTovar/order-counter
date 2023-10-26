import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
);

export const options = {
 scales: {
  x: {
   display: false,
  },
  y: {
   display: false,
  },
 },
 responsive: true,
 plugins: {
  legend: {
   display: false,
  },
  title: {
   display: false,
   text: 'Chart.js Line Chart',
  },
 },
};
const orders = [24, 235, 198, 212, 226];
const labels = ['Jul-Ago', 'Ago-Sep', 'Sep-Oct', 'Oct-Nov', 'Nov-dic'];

const data = {
 labels,
 datasets: [
  {
   label: 'Dataset 1',
   data: orders,
   tension: 0.5,
   borderColor: '#eb3356',
   pointBorderWidth: 0,
  },
 ],
};

export default function Chart() {
 return <Line data={data} options={options} />;
}
