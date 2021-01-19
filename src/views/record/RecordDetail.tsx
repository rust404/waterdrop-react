import React, {FC, ReactNode, useState} from "react";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import styled from "styled-components";
import Icon from "components/Icon";
import {useHistory} from "react-router-dom";
import dayjs from 'dayjs'
import DatePicker from "../../components/DatePicker/DatePicker";
import PopUp from "../../components/PopUp";
import {brandColor, grey1, grey5,} from "../../style/variables";
import {getSumByExpenditure, getSumByIncome} from "../../util";
import {useSelector} from "react-redux";
import {getCategoryById, getCategoryState} from "../../reduxStore/selectors/category";
import {getRecordsState} from "../../reduxStore/selectors/moneyRecord";

const FallBackMessage = styled.div`
  color: ${grey5};
  font: 20px bold;
  height: 200px;
  line-height: 200px;
  text-align: center;
`

const GeneralInfo = styled.div`
  padding: 20px 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  .general-record {
    display: flex;
    flex-direction: column;
    align-items: center;

    .money {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .date {
      font-size: 12px;
    }
  }

  .pick-date {
    display: flex;
    flex-direction: column;
    align-items: center;

    .month {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .year {
      font-size: 12px;
    }
  }
`;

const RecordsWrapper = styled.div`
  background-color: ${grey1};
  flex: 1;
  overflow: auto;
`;
const RecordItem = styled.div`
  .date-info {
    padding: 0 20px;
    font-size: 10px;
    line-height: 30px;
    color: #9b9b9b;
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-between;
  }

  .record-info {
    display: flex;
    margin: 10px 20px;
    border-radius: 10px;
    padding: 12px 16px;
    align-items: center;
    background-color: #fff;

    .icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${brandColor};

      > .icon {
        fill: #fff;
      }
    }

    .record-category {
      font-size: 18px;
      margin-left: 14px;

      .remarks {
        color: ${grey5};
        font-size: 12px;
      }
    }

    .money {
      font-size: 18px;
      margin-left: auto;
    }
  }
`;


const RecordDetail: FC = () => {
  const [show, setShow] = useState(false)
  const [curDate, setCurDate] = useState(new Date())
  const categories = useSelector(getCategoryState)
  const moneyRecords = useSelector(getRecordsState)
  const history = useHistory();
  const year = dayjs(curDate).year()
  const month = dayjs(curDate).month() + 1
  const filteredRecords = moneyRecords.filter(record => {
    const recordYear = dayjs(record.time).year()
    const recordMonth = dayjs(record.time).month() + 1
    return recordYear === year && recordMonth === month;
  });
  const hashMap: { [index: string]: MoneyRecord[] } = {};
  filteredRecords.forEach(record => {
    const key = dayjs(record.time).format("YYYY-MM-DD");
    if (hashMap[key]) {
      hashMap[key].push(record);
    } else {
      hashMap[key] = [record];
    }
  });
  let renderList: ReactNode | null
  const orderedRecords = Object.entries(hashMap).sort().reverse();
  if (orderedRecords.length === 0) {
    renderList = <FallBackMessage>本月暂无数据</FallBackMessage>
  } else {
    renderList = orderedRecords.map(item => {
      const [time, records] = item
      return (
        <RecordItem key={time}>
          <div className="date-info">
            <span>{dayjs(time).format("YYYY年MM月DD日")}</span>
            <span>
            收入：
              {getSumByIncome(records)}
              ；支出：
              {getSumByExpenditure(records)}
                </span>
          </div>
          {records.map(record => {
            const categoryItem = getCategoryById(categories, record.categoryId);
            return (
              <div
                className="record-info"
                key={record.id}
                onClick={() => {
                  history.push(`/record/edit/${record.id}`);
                }}
              >
                <div className="icon-wrapper">
                  <Icon id={categoryItem.icon} className="icon" size="60%"/>
                </div>
                <div className="record-category">
                  {categoryItem.name}
                  <p className="remarks">{record.remarks}</p>
                </div>
                <div className="money">
                  {record.moneyType === 'expenditure' && '-'}{record.amount}
                </div>
              </div>
            );
          })}
        </RecordItem>
      )
    });
  }
  return (
    <Layout>
      <TopBar style={{boxShadow: 'none'}}>水滴记账</TopBar>
      <GeneralInfo>
        <div className="general-record">
          <div className="money">
            {getSumByIncome(filteredRecords)}
          </div>
          <div className="date">{month}月收入</div>
        </div>
        <div className="pick-date" onClick={() => setShow(true)}>
          <div className="month">{month}月&#9660;</div>
          <div className="year">{year}年</div>
        </div>
        <div className="general-record">
          <div className="money">
            {getSumByExpenditure(filteredRecords)}
          </div>
          <div className="date">{month}月支出</div>
        </div>
      </GeneralInfo>
      <RecordsWrapper>
        {renderList}
      </RecordsWrapper>
      <PopUp show={show} onCancel={() => setShow(false)} position="bottom">
        <DatePicker
          date={curDate}
          pickerType="month"
          onOk={(d) => {
            setCurDate(d)
            setShow(false)
          }}
        />
      </PopUp>
    </Layout>
  );
};

export default RecordDetail;
