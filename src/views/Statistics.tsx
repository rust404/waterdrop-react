import React, { FC, useContext, useState, lazy, Suspense } from "react";
import Layout from "components/Layout";
import { RecordContext, CatagoryContext } from "store";
import { EChartOption } from "echarts";
import { MoneyDirection, findCatagory } from "store/catagoryReducer";
import TopBar from "components/TopBar";
import Datepicker from "react-mobile-datepicker";
import useDatePicker from "hooks/useDatePicker";
import { IRecord } from "store/moneyRecordReducer";
import styled from "styled-components";
import dayjs from "dayjs";
import Tab from "components/Tab";
// import Echarts from "components/Echarts";
const Echarts = lazy(() => import("components/Echarts"));

const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;
  .date {
    background-color: #f8f8f8;
    padding: 10px 0;
    text-align: center;
    margin-bottom: 10px;
  }
  .message {
    text-align: center;
  }
`;
const directionName = {
  [MoneyDirection.INCOME]: "收入",
  [MoneyDirection.EXPENDITURE]: "支出",
};
const Statistics: FC = () => {
  const { state: records } = useContext(RecordContext);
  const { state: catagory } = useContext(CatagoryContext);
  const {
    pickerState,
    handleCancel,
    handleSelect,
    handleClick,
  } = useDatePicker();
  const [direction, setDirection] = useState<MoneyDirection>(
    MoneyDirection.EXPENDITURE
  );
  const timeFilteredRecords = records.filter((record) => {
    const d1 = new Date(record.time);
    const d2 = new Date(pickerState.time);
    return (
      d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
    );
  });
  const getDatesByTime = (time: Date) => {
    const dateCount = dayjs(time).daysInMonth();
    return Array(dateCount)
      .fill(0)
      .map((_, i) => i + 1);
  };
  const dates = getDatesByTime(pickerState.time);

  const filteredRecords = timeFilteredRecords.filter((record: IRecord) => {
    return record.direction === direction;
  });

  const amountsReducer = (acc: number[], record: IRecord) => {
    const index = new Date(record.time).getDate() - 1;
    acc[index] += Math.abs(record.amount);
    return acc;
  };
  const directionAmounts = filteredRecords.reduce<number[]>(
    amountsReducer,
    dates.map(() => 0)
  );
  const catagoryAmounts = (records: IRecord[]) => {
    return records.reduce<{ [index: string]: number }>((acc, record) => {
      const catagoryName = findCatagory(catagory, record.catagoryId).name;
      if (acc[catagoryName]) {
        acc[catagoryName] += record.amount;
      } else {
        acc[catagoryName] = record.amount;
      }
      return acc;
    }, {});
  };
  const catagoryData = Object.entries(catagoryAmounts(filteredRecords))
    .map((item) => {
      return {
        name: item[0],
        value: Math.abs(item[1]),
      };
    })
    .sort((a, b) => a.value - b.value);
  const option: EChartOption = {
    title: {
      text: `月收入支出趋势`,
      textStyle: {
        fontSize: 16,
      },
    },
    xAxis: {
      data: dates,
    },
    yAxis: {},
    series: [
      {
        name: directionName[direction],
        type: "bar",
        data: directionAmounts,
        itemStyle: { color: "#ffd947" },
      },
    ],
  };
  const option1: EChartOption = {
    title: {
      text: `分类排行`,
      textStyle: {
        fontSize: 16,
      },
    },
    series: [
      {
        name: directionName[direction],
        type: "pie",
        data: catagoryData,
        label: {
          position: "inner",
          formatter: "{b}:{c}\n{d}%",
        },
      },
    ],
  };
  const dateConfig = {
    year: {
      format: "YYYY",
      caption: "年",
      step: 1,
    },
    month: {
      format: "MM",
      caption: "月",
      step: 1,
    },
  };
  return (
    <Layout>
      <TopBar>
        <Tab
          onChange={(direction) => {
            setDirection(direction);
          }}
          value={direction}
          map={{
            支出: MoneyDirection.EXPENDITURE,
            收入: MoneyDirection.INCOME,
          }}
        />
      </TopBar>
      <ContentWrapper>
        <div className="date" onClick={handleClick}>
          {dayjs(pickerState.time).format("YYYY年MM月")}&#9660;
        </div>
        {filteredRecords.length === 0 ? (
          <div className="message">本月{directionName[direction]}数据为空</div>
        ) : (
          <Suspense fallback={<div className="message">图表加载中</div>}>
            <Echarts option={option} />
            <Echarts option={option1} />
          </Suspense>
        )}
      </ContentWrapper>
      <Datepicker
        theme="ios"
        headerFormat="YYYY/MM"
        dateConfig={dateConfig}
        value={pickerState.time}
        onCancel={handleCancel}
        onSelect={handleSelect}
        isOpen={pickerState.isOpen}
      />
    </Layout>
  );
};
export default Statistics;
