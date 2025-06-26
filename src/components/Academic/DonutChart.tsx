"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DonutChartProps {
  title: string;
  value: number[];
  label: string[];
  backgroundColor?: string[];
  cutout?: string;
  legendPosition?: "top" | "bottom" | "left" | "right";
}

export default function DonutChart({
  title,
  value,
  label,
  backgroundColor = ["#36A2EB", "#FF6384", "#FFCE56"],
  cutout = "65%",
  legendPosition = "bottom",
}: DonutChartProps) {
  const data = {
    labels: label,
    datasets: [
      {
        label: title,
        data: value,
        backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          color: "#014feb",
          font: {
            size: 16,
            weight: 400,
            family: "Prompt-Light",
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (!data.labels || !data.datasets.length) return [];

            return data.labels.map((label: string, i: number) => {
              const dataset = data.datasets[0];
              const value = dataset.data[i];
              const color = dataset.backgroundColor?.[i];

              return {
                text: `${label} ${value} คน`,
                fillStyle: color,
                strokeStyle: color,
                index: i,
              };
            });
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: "#014feb",
        font: {
          size: 20,
          weight: 500,
          family: "Prompt",
        },
        padding: {
          top: 10,
          bottom: 15,
        },
        align: "center" as const,
      },
    },
  };

  return (
    <div className="px-0 py-4 h-fit shadow-lg rounded-md text-blue-600 bg-white">
      <Doughnut data={data} options={options} />
    </div>
  );
}
