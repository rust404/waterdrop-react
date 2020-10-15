import React, {FC, lazy, useContext, useState, Suspense} from "react";
import Layout from "components/Layout";
import {CategoryContext, RecordContext} from "store";
import {getCategoryById, MoneyType} from "store/categoryReducer";
import TopBar from "components/TopBar";
import {getRecords, getRecordsByTime, MoneyRecord} from "store/moneyRecordReducer";
import styled from "styled-components";
import dayjs from "dayjs";
import RadioGroup from "../components/Radio/RadioGroup";
import RadioButton from "../components/Radio/RadioButton";
import PopUp from "../components/PopUp";
import DatePicker, {DatePickerType} from "../components/DatePicker/DatePicker";
import {brandColor, grey1, grey2, grey5} from "../style/variables";
import {EChartOption} from "echarts";
import Icon from "../components/Icon";

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
  margin-top: 20px;
  font-size: 20px;
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
type CategoryToRecordsMap = { [categoryId: number]: MoneyRecord[] }
type CategoryToSumMap = { [categoryId: number]: number }

const Statistics: FC = () => {
  const {state: records} = useContext(RecordContext);
  const {state: category} = useContext(CategoryContext);
  const [curDate, setCurDate] = useState(new Date())
  const [dateType, setDateType] = useState('year-month')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [moneyType, setMoneyType] = useState<MoneyType>(
    MoneyType.EXPENDITURE
  );
  const monthArr = Array(12).fill(0).map((_, index) => index + 1)
  const dateArr = Array(dayjs(curDate).daysInMonth()).fill(0).map((_, index) => index + 1)
  let dateStr: string
  if (dateType === 'year') {
    dateStr = dayjs(curDate).format('YYYY年')
  } else {
    dateStr = dayjs(curDate).format('YYYY年M月')
  }
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
  const getSumForDates = (records: MoneyRecord[], date: Date) => {
    records = getRecordsByTime(records, date, 'month')
    const ret = {
      [MoneyType.INCOME]: dateArr.map(_ => 0),
      [MoneyType.EXPENDITURE]: dateArr.map(_ => 0)
    }
    return records.reduce((acc, record) => {
      acc[record.moneyType][dayjs(record.time).date() - 1] += record.amount
      return acc
    }, ret)
  }
  const getSumForMonths = (records: MoneyRecord[], date: Date) => {
    records = getRecordsByTime(records, date, 'year')
    const ret = {
      [MoneyType.INCOME]: monthArr.map(_ => 0),
      [MoneyType.EXPENDITURE]: monthArr.map(_ => 0)
    }
    return records.reduce((acc, record) => {
      acc[record.moneyType][dayjs(record.time).month()] += record.amount
      return acc
    }, ret)
  }
  const getSumsForCategories = (records: MoneyRecord[]): CategoryToSumMap => {
    function getCategoryToRecordMap(records: MoneyRecord[]) {
      const map: CategoryToRecordsMap = {}
      return records.reduce((acc, record) => {
        if (acc[record.categoryId]) {
          acc[record.categoryId].push(record)
        } else {
          acc[record.categoryId] = [record]
        }
        return acc
      }, map)
    }

    const map = getCategoryToRecordMap(records)
    const ret: { [categoryId: number]: number } = {}
    for (const i in map) {
      if (!Object.prototype.hasOwnProperty.call(map, i)) continue
      ret[i] = map[i].reduce((acc, record) => acc + record.amount, 0)
    }
    return ret
  }
  const categoryRankData = (() => {
    let filteredRecords = records
    filteredRecords = dateType === 'year-month' ?
      getRecordsByTime(filteredRecords, curDate, 'month') : getRecordsByTime(filteredRecords, curDate, 'year')
    filteredRecords = getRecords(filteredRecords, {
      moneyType: moneyType
    })

    const sumsForCategories = getSumsForCategories(filteredRecords)
    const ret = Object.entries(sumsForCategories)
    const total = ret.reduce((acc, item) => acc + item[1], 0)
    ret.sort((a, b) => b[1] - a[1])
    return ret.map(item => {
      return {
        category: getCategoryById(category, parseInt(item[0])),
        sum: item[1],
        percent: item[1] / total * 100
      }
    })
  })()
  const xSeriesData = dateType === 'year-month' ? dateArr : monthArr
  const ySeriesData = dateType === 'year-month' ?
    getSumForDates(records, curDate) : getSumForMonths(records, curDate)

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
    series: [moneyType === MoneyType.EXPENDITURE ? {
      name: '支出',
      seriesLayoutBy: 'row',
      type: 'line',
      symbol: 'emptycircle',
      symbolSize: 6,
      lineStyle: {
        color: '#bbb',
        width: 1,
      },
      data: ySeriesData[MoneyType.EXPENDITURE]
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
      data: ySeriesData[MoneyType.INCOME]
    }]
  }
  return (
    <Layout>
      <TopBar>
        <RadioGroup value={dateType} onChange={(dateType) => setDateType(dateType)}>
          <RadioButton label="year">年</RadioButton>
          <RadioButton label="year-month">月</RadioButton>
        </RadioGroup>
      </TopBar>
      <ContentWrapper>
        <div className="date" onClick={handleDateClick}>
          {dateStr}&#9660;
        </div>
        <RadioGroup block value={moneyType} onChange={(d) => setMoneyType(d as MoneyType)}>
          <RadioButton label={MoneyType.INCOME}>收入</RadioButton>
          <RadioButton label={MoneyType.EXPENDITURE}>支出</RadioButton>
        </RadioGroup>
        {categoryRankData.length === 0 ?
          <FallBackMessage>暂无数据</FallBackMessage> :
          <React.Fragment>
            <Suspense fallback={<FallBackMessage>加载中</FallBackMessage>}>
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
          pickerType={dateType as DatePickerType}
          onOk={handleOk}
        />
      </PopUp>
    </Layout>
  );
};
export default Statistics;
