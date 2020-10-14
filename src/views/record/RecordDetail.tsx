import React, {FC, useContext, useState} from "react";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import styled from "styled-components";
import Datepicker from "react-mobile-datepicker";
import {formatTime} from "util/index";
import useDatePicker from "hooks/useDatePicker";
import {RecordContext, CategoryContext} from "store";
import {IRecord} from "store/moneyRecordReducer";
import {findCategory, MoneyDirection} from "store/categoryReducer";
import Icon from "components/Icon";
import {useHistory} from "react-router-dom";
import dayjs from 'dayjs'
import DatePicker from "../../components/DatePicker/DatePicker";
import Overlay from "../../components/Overlay";
import PopUp from "../../components/PopUp";

const GeneralInfo = styled.div`
  padding: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffd947;
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
  background-color: #f5f5f5;
  flex: 1;
  overflow: auto;
`;
const RecordItem = styled.div`
  .date-info {
    padding: 0px 20px;
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
    padding: 22px 26px;
    align-items: center;
    background-color: #fff;
    .icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffd947;
    }
    .record-category {
      font-size: 18px;
      margin-left: 14px;
    }
    .money {
      font-size: 18px;
      margin-left: auto;
    }
  }
`;
const RecordDetail: FC = () => {
  const [show, setShow] = useState(false)
  const {
    pickerState,
    handleClick,
    handleCancel,
    handleSelect
  } = useDatePicker();
  const {state: category} = useContext(CategoryContext);
  const {state: records} = useContext(
    RecordContext
  );
  const history = useHistory();
  const {year, month} = formatTime(pickerState.time);
  const filterdRecords = records.filter(record => {
    const {year: recordYear, month: recordMonth} = formatTime(
      new Date(record.time)
    );
    return recordYear === year && recordMonth === month;
  });
  const hashMap: { [index: string]: IRecord[] } = {};
  filterdRecords.forEach(record => {
    const key = dayjs(record.time).format("YYYY-MM-DD");
    if (hashMap[key]) {
      hashMap[key].push(record);
    } else {
      hashMap[key] = [record];
    }
  });
  const orderedRecords = Object.entries(hashMap).sort().reverse();
  return (
    <Layout>
      <TopBar>收入支出明细</TopBar>
      <GeneralInfo>
        <div className="general-record">
          <div className="money">
            {filterdRecords.reduce<number>((acc, item) => {
              if (item.direction === MoneyDirection.INCOME) {
                return acc + Math.abs(item.amount);
              }
              return acc;
            }, 0)}
          </div>
          <div className="date">{month}月收入</div>
        </div>
        <div className="pick-date" onClick={handleClick}>
          <div className="month">{month}月&#9660;</div>
          <div className="year">{year}年</div>
        </div>
        <div className="general-record">
          <div className="money">
            {filterdRecords.reduce<number>((acc, item) => {
              if (item.direction === MoneyDirection.EXPENDITURE) {
                return acc + Math.abs(item.amount);
              }
              return acc;
            }, 0)}
          </div>
          <div className="date">{month}月支出</div>
        </div>
      </GeneralInfo>
      <RecordsWrapper>
        {orderedRecords.map(item => {
          return (
            <RecordItem key={item[0]}>
              <div className="date-info">
                <span>{dayjs(item[0]).format("YYYY年MM月DD日")}</span>
                <span>
                  收入：
                  {item[1].reduce<number>((acc, item) => {
                    if (item.direction === MoneyDirection.INCOME) {
                      return acc + Math.abs(item.amount);
                    } else {
                      return acc;
                    }
                  }, 0)}
                  ；支出：
                  {item[1].reduce<number>((acc, item) => {
                    if (item.direction === MoneyDirection.EXPENDITURE) {
                      return acc + Math.abs(item.amount);
                    } else {
                      return acc;
                    }
                  }, 0)}
                </span>
              </div>
              {item[1].map(record => {
                const categoryItem = findCategory(category, record.categoryId);
                return (
                  <div
                    className="record-info"
                    data-id={record.id}
                    key={record.id}
                    onClick={() => {
                      history.push(`/record/edit/${record.id}`);
                    }}
                  >
                    <div className="icon-wrapper">
                      <Icon id={categoryItem.icon}/>
                    </div>
                    <div className="record-category">{categoryItem.name}</div>
                    <div className="money">{record.amount}</div>
                  </div>
                );
              })}
            </RecordItem>
          );
        })}
      </RecordsWrapper>
      <button onClick={() => setShow(true)}>123</button>
      <PopUp show={show} onCancel={() => setShow(state => !state)} position="bottom">
        <DatePicker
          date={new Date()}
          pickerType="full-date"
        />
      </PopUp>
    </Layout>
  );
};

export default React.memo(RecordDetail);
