import React, {FC, useRef, useEffect, useState} from "react";
import {ECharts, EChartOption, init} from "echarts";

interface IEchartsProps {
  option: EChartOption
}
const Echarts: FC<IEchartsProps> = (props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const {option} = props
  const [chart, setChart] = useState<ECharts | null>(null);
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    const node = chartContainerRef.current;
    node.style.width = "100vw";
    node.style.height = "300px";
    setChart(init(node));
  }, []);

  useEffect(() => {
    if (!chart) return
    chart.setOption(option);
  }, [option, chart]);
  return <div ref={chartContainerRef}></div>;
};

export default Echarts;
