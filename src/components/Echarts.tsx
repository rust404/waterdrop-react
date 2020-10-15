import React, {FC, useRef, useEffect, useState, HTMLProps} from "react";
import { ECharts, EChartOption, init } from "echarts";

interface IEchartsProps extends HTMLProps<HTMLDivElement>{
  option: EChartOption
}
const Echarts: FC<IEchartsProps> = (props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { option, ...restProps } = props;
  const [chart, setChart] = useState<ECharts | null>(null);
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    const node = chartContainerRef.current;
    setChart(init(node));
  }, []);

  useEffect(() => {
    if (!chart) return;
    chart.setOption(option);
  }, [option, chart]);
  return <div ref={chartContainerRef} {...restProps}/>;
};

export default Echarts;
