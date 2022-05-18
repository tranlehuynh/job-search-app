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
import Api, { endpoints } from "../../../api/Api";

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
    const loadData = async () => {
      const res = await Api.get(endpoints["CV"]);
      setChartData({
        labels: ["Hôm kia", "Hôm qua", "Hôm nay"],
        datasets: [
          {
            label: "Số lượng CV là",
            data: [1, 3, res.data.length],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
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
            text: "Số lượng CV",
          },
        },
      });
    };

    loadData();
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
