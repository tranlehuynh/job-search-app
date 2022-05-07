import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

function Charjs() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["John", "Kevin"],
      datasets: [
        {
          label: "Whom let the dogs out",
          data: [12, 55, 44],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      maintainAspectRadio: false,
      plugins: {
        legend: {
          position: "left",
        },
        title: {
          display: true,
          text: "Whom let the dog out",
        },
      },
    });
  }, []);
  return (
    <div className="Charjs">
      <Line options={chartOptions} data={chartData} height={100} />
      <Bar options={chartOptions} data={chartData} height={100} />
      <div className="row">
        <div className="col-4">
          <Pie
            options={chartOptions}
            data={chartData}
            style={{ height: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Charjs;
