import React, {FC, lazy, useState, Suspense} from "react";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import styled from "styled-components";
import dayjs from "dayjs";
import RadioGroup from "../components/Radio/RadioGroup";
import RadioButton from "../components/Radio/RadioButton";
import PopUp from "../components/PopUp";
import DatePicker, {DatePickerType} from "../components/DatePicker/DatePicker";
import {brandColor, grey1, grey2, grey5} from "../style/variables";
import {EChartOption} from "echarts";
import Icon from "../components/Icon";
import {useSelector} from "react-redux";
import {getCategoryById, getCategoryState} from "../reduxStore/selectors/category";
import {getRecordsByOption, getRecordsByTime, getRecordsState} from "../reduxStore/selectors/moneyRecord";

const Echarts = lazy(() => import("components/Echarts"));

const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;

  .date {
    background-color: #f8f8f8;
    padding: 10px 0;
    text-align: center;
    margin-bottom: 10px;
    color: ${brandColor};
  }

  .message {
    text-align: center;
  }
`;
const FallBackMessage = styled.div`
  color: ${grey5};
  font: 20px bold;
  height: 200px;
  line-height: 200px;
  text-align: center;
`
const RankList = styled.ol`
  padding: 10px;

  > li {
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid ${grey2};

    .icon-wrapper {
      width: 40px;
      height: 40px;
      background-color: ${grey1};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      margin-right: 10px;

      .icon {
        fill: ${brandColor};
      }
    }

    .info {
      flex: 1;

      .text-info {
        display: flex;
        align-items: center;

        .percent {
          font-size: 12px;
          margin-left: 6px;
        }

        .amount {
          margin-left: auto;
        }
      }

      .percent-bar {
        margin: 4px 0;
        height: 6px;
        width: 100%;
        border-radius: 5px;
        background-color: ${brandColor};
      }
    }
  }
`
type CategoryToSumMap = { [categoryId: string]: number }

const monthArr = Array(12).fill(0).map((_, index) => index + 1)

// 生成某一年的每月收入支出统计
const getSumForMonths = (records: MoneyRecord[], date: Date) => {
  records = getRecordsByTime(records, date, 'year')
  const ret = {
    income: monthArr.map(_ => 0),
    expenditure: monthArr.map(_ => 0)
  }
  return records.reduce((acc, record) => {
    acc[record.moneyType][dayjs(record.time).month()] += record.amount
    return acc
  }, ret)
}

// 生成每一个分类的收入/支出之和
const getSumForCategories = (records: MoneyRecord[]): CategoryToSumMap => {
  const ret: { [categoryId: string]: number } = {}
  return records.reduce((acc, record) => {
    if (acc[record.categoryId] !== undefined) {
      acc[record.categoryId] += record.amount
    } else {
      acc[record.categoryId] = record.amount
    }
    return acc
  }, ret)
}

// 生成某一月的每天收入支出统计
const getSumForDates = (records: MoneyRecord[], date: Date) => {
  const sumForDates = Array(dayjs(date).daysInMonth()).fill(0)
  records = getRecordsByTime(records, date, 'month')
  const ret = {
    income: [...sumForDates],
    expenditure: [...sumForDates]
  }
  return records.reduce((acc, record) => {
    acc[record.moneyType][dayjs(record.time).date() - 1] += record.amount
    return acc
  }, ret)
}

const Statistics: FC = () => {
  const moneyRecords = useSelector(getRecordsState)
  const categories = useSelector(getCategoryState)
  const [curDate, setCurDate] = useState(new Date())
  const [dateType, setDateType] = useState<DatePickerType>('month')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [moneyType, setMoneyType] = useState<MoneyType>(
    'expenditure'
  );
  const dateArr = Array(dayjs(curDate).daysInMonth()).fill(0).map((_, index) => index + 1)
  let dateStr = dayjs(curDate).format(dateType === 'year'?'YYYY年':'YYYY年M月')

  const handleCancel = () => {
    setShowDatePicker(false)
  }
  const handleOk = (d: Date) => {
    setCurDate(d)
    setShowDatePicker(false)
  }
  const handleDateClick = () => {
    setShowDatePicker(true)
  }
  // 获取当前时间的收入/支出
  let filteredRecords = moneyRecords
  filteredRecords = getRecordsByTime(filteredRecords, curDate, dateType)
  filteredRecords = getRecordsByOption(filteredRecords, {moneyType})

  const sumForCategories = getSumForCategories(filteredRecords)
  const ret = Object.entries(sumForCategories)
  const total = ret.reduce((acc, [id, sum]) => acc + sum, 0)
  ret.sort((a, b) => b[1] - a[1])

  let categoryRankData = ret.map(item => {
    const [categoryId, sum] = item
    return {
      category: getCategoryById(categories, categoryId),
      sum,
      percent: sum / total * 100
    }
  })

  // 获取echarts的选项数据
  const xSeriesData = dateType === 'month' ? dateArr : monthArr
  const ySeriesData = dateType === 'month' ?
    getSumForDates(moneyRecords, curDate) : getSumForMonths(moneyRecords, curDate)

  const option: EChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      transitionDuration: 0,
      formatter: `{b}${dateType === 'year' ? '月' : '日'}<br/>{a} : {c}元`,
      textStyle: {
        fontSize: 12,
      },
      confine: true,
      position: function (point) {
        return [point[0], '30%']
      }
    },
    grid: {
      top: 40,
      bottom: 20,
      left: 10,
      right: 10
    },
    color: [brandColor],
    title: {
      text: `${dateType === 'year' ? '年' : '月'}度趋势图`,
      top: 10,
      left: 6,
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    xAxis: {
      type: 'category',
      data: xSeriesData,
      axisTick: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [moneyType === 'expenditure' ? {
      name: '支出',
      seriesLayoutBy: 'row',
      type: 'line',
      symbol: 'emptycircle',
      symbolSize: 6,
      lineStyle: {
        color: '#bbb',
        width: 1,
      },
      data: ySeriesData['expenditure']
    } : {
      name: '收入',
      seriesLayoutBy: 'row',
      type: 'line',
      symbol: 'emptycircle',
      symbolSize: 6,
      lineStyle: {
        color: '#bbb',
        width: 1,
      },
      data: ySeriesData['income']
    }]
  }
  return (
    <Layout>
      <TopBar>
        <RadioGroup value={dateType} onChange={(e) => setDateType(e.target.value as DatePickerType)}>
          <RadioButton label="year">年</RadioButton>
          <RadioButton label="month">月</RadioButton>
        </RadioGroup>
      </TopBar>
      <ContentWrapper>
        <div className="date" onClick={handleDateClick}>
          {dateStr}&#9660;
        </div>
        <RadioGroup block value={moneyType} onChange={(e) => setMoneyType(e.target.value as MoneyType)}>
          <RadioButton label="income">收入</RadioButton>
          <RadioButton label="expenditure">支出</RadioButton>
        </RadioGroup>
        {categoryRankData.length === 0 ?
          <FallBackMessage>暂无数据</FallBackMessage> :
          <React.Fragment>
            <Suspense fallback={<FallBackMessage>图表加载中</FallBackMessage>}>
              <Echarts option={option} style={{height: "200px"}}/>
            </Suspense>
            <RankList>
              {categoryRankData.map(item => {
                return (
                  <li className="rank-list-item" key={item.category.id}>
                    <div className="icon-wrapper">
                      <Icon className="icon" size="24px" id={item.category.icon}/>
                    </div>
                    <div className="info">
                      <span className="text-info">
                        <span className="icon-name">{item.category.name}</span>
                        <span className="percent">{item.percent.toFixed(2)}%</span>
                        <span className="amount">{item.sum}</span>
                      </span>
                      <div className="percent-bar" style={{width: item.percent + '%'}}/>
                    </div>
                  </li>
                )
              })}
            </RankList>
          </React.Fragment>
        }
      </ContentWrapper>
      <PopUp
        show={showDatePicker}
        onCancel={handleCancel}
        position="bottom"
      >
        <DatePicker
          date={curDate}
          pickerType={dateType}
          onOk={handleOk}
        />
      </PopUp>
    </Layout>
  );
};
export default Statistics;
