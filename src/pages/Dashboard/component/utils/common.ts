export const makeChartResponse = (data: any, chartTitle : string, labelProp: string = "title", valueProp: string = "count", colors: string[] = []) => {
  const labels = data.map((entry : any) => entry[labelProp]);
  const values = data.map((entry : any) => entry[valueProp]);

  const datasets = [
    {
      label: labelProp,
      data: values,
      backgroundColor: colors,
      borderWidth: 1,
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  return {
    data: chartData,
    options: options,
  };
};
