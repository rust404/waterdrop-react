import React, {FC, useContext, useState} from "react";
import Layout from "components/Layout";
import Echarts from "components/Echarts";
import {RecordContext, CatagoryContext} from "store";
import {EChartOption} from "echarts";
import {IRecord} from "store/moneyRecordReducer";
import {MoneyDirection} from "store/catagoryReducer";

const Statistics: FC = () => {
  const {state: records} = useContext(RecordContext);
  const {state: catagory} = useContext(CatagoryContext);
  const [time, setTime] = useState(new Date());
  console.log(records, catagory);
  const filteredRecords = records.filter(record => {
    const d1 = new Date(record.time);
    const d2 = new Date(time);
    return (
      d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
    );
  });
  const dateCount = Date.getDaysInMonth(time.getFullYear(), time.getMonth());
  const dates = Array(dateCount)
    .fill(0)
    .map((_, i) => i + 1);
  console.log('filtered', filteredRecords);
  const incomeAmounts = filteredRecords.reduce<number[]>(
    (acc, record) => {
      const index = (new Date(record.time)).getDate() - 1
      if (record.direction === MoneyDirection.INCOME) {
        acc[index] += Math.abs(record.amount)
      }
      return acc
    },
    Array(dateCount).fill(0)
  );
  const expenditureAmounts = filteredRecords.reduce<number[]>(
    (acc, record) => {
      const index = (new Date(record.time)).getDate() - 1
      if (record.direction === MoneyDirection.EXPENDITURE) {
        acc[index] += Math.abs(record.amount)
      }
      return acc
    },
    Array(dateCount).fill(0)
  );
  const option1: EChartOption = {
    xAxis: {
      data: dates
    },
    yAxis: {},
    series: [
      {
        name: "收入",
        type: "line",
        data: incomeAmounts
      },
      {
        name: "支出",
        type: "line",
        data: expenditureAmounts
      }
    ]
  };
  const option = {
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "line",
        data: [5, 20, 36, 10, 10, 20]
      },
      {
        name: "大小",
        type: "line",
        data: [15, 2, 3, 11, 20, 40]
      }
    ]
  };
  return (
    <Layout>
      <Echarts option={option1} />
    </Layout>
  );
};
export default Statistics;
