"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  maleData: number[];
  femaleData: number[];
}

export default function BarChart({
  labels,
  maleData,
  femaleData,
}: BarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "ผู้หญิง",
        data: femaleData,
        backgroundColor: "#FF8DC7", // ชมพูนีออนพาสเทล
      },
      {
        label: "ผู้ชาย",
        data: maleData,
        backgroundColor: "#5DA0F2", // ฟ้านีออนพาสเทล
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  return <Bar className="" options={options} data={data} />;
}
