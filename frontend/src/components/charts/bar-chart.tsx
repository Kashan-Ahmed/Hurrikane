import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

Chart.defaults.maintainAspectRatio = false;
Chart.defaults.responsive = true;

const BarChart = ({ chartData, options }) => {
  return <Bar data={chartData} options={options} />;
};

export default BarChart;
