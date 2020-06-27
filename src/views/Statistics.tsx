import React, {FC, useContext, useState, useEffect} from "react";
import Layout from "components/Layout";
import Echarts from "components/Echarts";
import {RecordContext, CatagoryContext} from "store";
import {EChartOption} from "echarts";
import {MoneyDirection, findCatagory} from "store/catagoryReducer";
import TopBar from "components/TopBar";
import Datepicker from "react-mobile-datepicker";
import useDatePicker from "hooks/useDatePicker";
import {IRecord} from "store/moneyRecordReducer";
import styled from "styled-components";

const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;
const Statistics: FC = () => {
  const {state: records} = useContext(RecordContext);
  const {state: catagory} = useContext(CatagoryContext);
  // const [showCharts, setShowCharts] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowCharts(true);
  //   }, 800);
  // }, []);
  const {
    pickerState,
    handleCancel,
    handleSelect,
    handleClick
  } = useDatePicker();
  const timeFilteredRecords = records.filter(record => {
    const d1 = new Date(record.time);
    const d2 = new Date(pickerState.time);
    return (
      d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
    );
  });
  const getDatesByTime = (time: Date) => {
    const dateCount = Date.getDaysInMonth(time.getFullYear(), time.getMonth());
    return Array(dateCount)
      .fill(0)
      .map((_, i) => i + 1);
  };
  const dates = getDatesByTime(pickerState.time);

  const directionFilter = (direction: MoneyDirection) => (record: IRecord) => {
    return record.direction === direction;
  };
  const incomeFilter = directionFilter(MoneyDirection.INCOME);
  const expenditureFilter = directionFilter(MoneyDirection.EXPENDITURE);

  const incomeRecords = timeFilteredRecords.filter(incomeFilter);
  const expenditureRecords = timeFilteredRecords.filter(expenditureFilter);

  const amountsReducer = (acc: number[], record: IRecord) => {
    const index = new Date(record.time).getDate() - 1;
    acc[index] += record.amount;
    return acc;
  };
  const incomeAmounts = incomeRecords.reduce<number[]>(
    amountsReducer,
    dates.map(() => 0)
  );
  const expenditureAmounts = expenditureRecords.reduce<number[]>(
    amountsReducer,
    dates.map(() => 0)
  );
  const catagoryAmounts = (records: IRecord[]) => {
    return records.reduce<{[index: string]: number}>((acc, record) => {
      const catagoryName = findCatagory(catagory, record.catagoryId).name;
      if (acc[catagoryName]) {
        acc[catagoryName] += record.amount;
      } else {
        acc[catagoryName] = record.amount;
      }
      return acc;
    }, {});
  };
  const incomePieData = Object.entries(catagoryAmounts(incomeRecords)).map(
    item => {
      return {
        name: item[0],
        value: item[1]
      };
    }
  );
  const expeniturePieData = Object.entries(
    catagoryAmounts(expenditureRecords)
  ).map(item => {
    return {
      name: item[0],
      value: item[1]
    };
  });
  const option: EChartOption = {
    title: {
      text: `收入支出明细`,
      textStyle: {
        fontSize: 16
      }
    },
    color: ["#1de9b6", "#ff5252"],
    legend: {
      data: ["收入", "支出"]
    },
    xAxis: {
      data: dates
    },
    yAxis: {},
    series: [
      {
        name: "收入",
        type: "bar",
        stack: "one",
        data: incomeAmounts
      },
      {
        name: "支出",
        type: "bar",
        stack: "one",
        data: expenditureAmounts
      }
    ]
  };
  const pieOption: EChartOption = {
    title: {
      text: "分类占比",
      left: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "left",
      // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      data: ["收入", "支出"],
      selected: {
        收入: false,
        支出: true
      }
    },
    series: [
      {
        name: "收入",
        type: "pie",
        radius: "60%",
        center: ["50%", "50%"],
        data: incomePieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      },
      {
        name: "支出",
        type: "pie",
        radius: "60%",
        center: ["50%", "50%"],
        data: expeniturePieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  const dateConfig = {
    year: {
      format: "YYYY",
      caption: "年",
      step: 1
    },
    month: {
      format: "MM",
      caption: "月",
      step: 1
    }
  };
  return (
    <Layout>
      <TopBar style={{flexShrink: 0}}>
        <span onClick={handleClick}>
          {new Date(pickerState.time).toString("yyyy年MM月")}&#9660;
        </span>
      </TopBar>
      <ContentWrapper>
        {/* {showCharts ? ( */}
        {/*   <> */}
            <Echarts option={option} />
            <Echarts option={pieOption} />
          {/* </> */}
        {/* ) : ( */}
          {/*   <div>loading</div> */}
          {/* )} */}
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
