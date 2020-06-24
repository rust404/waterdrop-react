import React, {FC, useRef, useEffect} from "react";
import echarts, {ECharts, EChartOption} from "echarts";

interface IEchartsProps {
  option: EChartOption
}
const Echarts: FC<IEchartsProps> = (props) => {
  const chartContainer = useRef<HTMLDivElement>(null);
  const {option} = props
  let chart: ECharts;
  useEffect(() => {
    if (chartContainer.current === null) return;
    const node = chartContainer.current;
    node.style.width = "100vw";
    node.style.height = "300px";
    chart = echarts.init(node);
  }, []);

  useEffect(() => {
    chart.setOption(option);
  }, [option]);
  return <div ref={chartContainer}></div>;
};

export default Echarts;
