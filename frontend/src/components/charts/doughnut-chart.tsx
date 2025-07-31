import { Card } from '@/components/ui/card';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data }: any) => {
  return (
    <Card className="flex flex-col-reverse items-center justify-center gap-4 rounded-xl border-2 border-gray-200 p-4 md:row-span-2 md:flex-row md:items-start md:justify-around">
      <div className="flex w-full justify-center">
        <Doughnut
          className="h-32 w-32 md:h-[200px] md:w-[200px]"
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
          data={{
            labels: data.map((item) => item.browser),
            datasets: [
              {
                data: data.map((item: any) => item.visitors),
                backgroundColor: data.map((item: any) => item.fill),
                hoverOffset: 4,
              },
            ],
          }}
        />
      </div>

      <ul className="flex flex-col items-center gap-2 md:items-start">
        {data.map((item: any, idx: number) => (
          <li key={idx} className="flex items-center text-sm">
            <span
              className="mr-2 inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            {item.browser}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default DoughnutChart;
