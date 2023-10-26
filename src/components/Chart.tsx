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
const orders = [10, 5, 3, 15, 4, 12, 2];
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
 labels,
 datasets: [
  {
   label: 'Dataset 1',
   data: orders,
   tension: 0.5,
   borderColor: 'rgb(255, 99, 132)',
   pointBorderWidth: 0,
  },
 ],
};

export default function Chart() {
 return <Line data={data} options={options} />;
}
