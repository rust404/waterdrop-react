import React, {FC, useContext, useState} from "react";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import styled from "styled-components";
import {formatTime} from "util/index";
import {RecordContext, CategoryContext} from "store";
import {IRecord} from "store/moneyRecordReducer";
import {findCategory, MoneyType} from "store/categoryReducer";
import Icon from "components/Icon";
import {useHistory} from "react-router-dom";
import dayjs from 'dayjs'
import DatePicker from "../../components/DatePicker/DatePicker";
import PopUp from "../../components/PopUp";
import {brandColor, grey1} from "../../style/variables";

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
      background-color: ${brandColor};
      > .icon {
        fill: #fff;
      }
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
  const [curDate, setCurDate] = useState(new Date())
  const {state: category} = useContext(CategoryContext);
  const {state: records} = useContext(
    RecordContext
  );
  const history = useHistory();
  const {year, month} = formatTime(curDate);
  const filteredRecords = records.filter(record => {
    const {year: recordYear, month: recordMonth} = formatTime(
      new Date(record.time)
    );
    return recordYear === year && recordMonth === month;
  });
  const hashMap: { [index: string]: IRecord[] } = {};
  filteredRecords.forEach(record => {
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
      <TopBar style={{boxShadow: 'none'}}>收入支出明细</TopBar>
      <GeneralInfo>
        <div className="general-record">
          <div className="money">
            {filteredRecords.reduce<number>((acc, item) => {
              if (item.moneyType === MoneyType.INCOME) {
                return acc + Math.abs(item.amount);
              }
              return acc;
            }, 0)}
          </div>
          <div className="date">{month}月收入</div>
        </div>
        <div className="pick-date" onClick={() => setShow(true)}>
          <div className="month">{month}月&#9660;</div>
          <div className="year">{year}年</div>
        </div>
        <div className="general-record">
          <div className="money">
            {filteredRecords.reduce<number>((acc, item) => {
              if (item.moneyType === MoneyType.EXPENDITURE) {
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
                    if (item.moneyType === MoneyType.INCOME) {
                      return acc + Math.abs(item.amount);
                    } else {
                      return acc;
                    }
                  }, 0)}
                  ；支出：
                  {item[1].reduce<number>((acc, item) => {
                    if (item.moneyType === MoneyType.EXPENDITURE) {
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
                      <Icon id={categoryItem.icon} className="icon" size="24px"/>
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
      <PopUp show={show} onCancel={() => setShow(false)} position="bottom">
        <DatePicker
          date={new Date()}
          pickerType="year-month"
          onOk={(d) => {
            setCurDate(d)
            setShow(false)
          }}
        />
      </PopUp>
    </Layout>
  );
};

export default React.memo(RecordDetail);
