import React, {FC, useContext} from "react";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import styled from "styled-components";
import Datepicker from "react-mobile-datepicker";
import {formatTime} from "util/index";
import useDatePicker from "hooks/useDatePicker";
import {RecordContext, CatagoryContext} from "store";
import {IRecord} from "store/moneyRecordReducer";
import {findCatagory, MoneyDirection} from "store/catagoryReducer";
import Icon from "components/Icon";

const GeneralInfo = styled.div`
  padding: 18px;
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
  flex: 1;
  overflow: auto;
`;
const RecordItem = styled.div`
  .date-info {
    padding: 0px 16px;
    font-size: 10px;
    line-height: 30px;
    color: #9b9b9b;
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-between;
  }
  .record-info {
    display: flex;
    padding: 12px 16px;
    align-items: center;
    .icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffd947;
    }
    .record-catagory {
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
  const {
    pickerState,
    handleClick,
    handleCancel,
    handleSelect
  } = useDatePicker();
  const {state: catagory} = useContext(CatagoryContext);
  const {state: records, dispatch: dispatchRecords} = useContext(
    RecordContext
  );
  const {year, month} = formatTime(pickerState.time);
  const filterdRecords = records.filter(record => {
    const {year: recordYear, month: recordMonth} = formatTime(
      new Date(record.time)
    );
    return recordYear === year && recordMonth === month;
  });
  const hashMap: {[index: string]: IRecord[]} = {};
  filterdRecords.forEach(record => {
    const key = new Date(record.time).toString("yyyy-MM-dd");
    if (hashMap[key]) {
      hashMap[key].push(record);
    } else {
      hashMap[key] = [record];
    }
  });
  const orderedRecords = Object.entries(hashMap).sort().reverse();
  console.log(orderedRecords);
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
      <Datepicker
        theme="ios"
        headerFormat="YYYY/MM"
        dateConfig={dateConfig}
        value={pickerState.time}
        onCancel={handleCancel}
        onSelect={handleSelect}
        isOpen={pickerState.isOpen}
      />
      <RecordsWrapper>
        {orderedRecords.map(item => {
          return (
            <RecordItem key={item[0]}>
              <div className="date-info">
                <span>{new Date(item[0]).toString("yyyy年MM月dd日")}</span>
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
                const catagoryItem = findCatagory(catagory, record.catagoryId);
                return (
                  <div
                    className="record-info"
                    data-id={record.id}
                    key={record.id}
                    onClick={(e) => {
                      dispatchRecords({
                        type: 'deleteRecord',
                        payload: {
                          id: parseInt(e.currentTarget.dataset['id'] as string)
                        }
                      })
                    }}
                  >
                    <div className="icon-wrapper">
                      <Icon id={catagoryItem.icon} />
                    </div>
                    <div className="record-catagory">{catagoryItem.name}</div>
                    <div className="money">{record.amount}</div>
                  </div>
                );
              })}
            </RecordItem>
          );
        })}
      </RecordsWrapper>
    </Layout>
  );
};

export default React.memo(RecordDetail);
