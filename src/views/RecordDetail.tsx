import React, {FC, useState} from "react";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import styled from "styled-components";
import Datepicker from "react-mobile-datepicker";
import {formatTime} from 'util/index'

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
  const [pickerState, setPickerState] = useState({
    time: new Date(),
    isOpen: false
  });
  const handleClick = () => {
    setPickerState(state => {
      return {
        ...state,
        isOpen: true
      };
    });
  };
  const handleCancel = () => {
    setPickerState(state => {
      return {
        ...state,
        isOpen: false
      };
    });
  };
  const handleSelect = (time: Date) => {
    setPickerState(state => {
      return {
        ...state,
        isOpen: false,
        time
      };
    });
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
  const {year, month} = formatTime(pickerState.time)
  return (
    <Layout>
      <TopBar>收入支出明细</TopBar>
      <GeneralInfo>
        <div className="general-record">
          <div className="money">99</div>
          <div className="date">{month}月收入</div>
        </div>
        <div className="pick-date" onClick={handleClick}>
          <div className="month">{month}月&#9660;</div>
          <div className="year">{year}年</div>
        </div>
        <div className="general-record">
          <div className="money">188</div>
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
        <RecordItem>
          <div className="date-info">
            <span>2020年06月24日</span>
            <span>收入：0；支出：0</span>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
          <div className="record-info">
            <div className="icon-wrapper"></div>
            <div className="record-catagory">123</div>
            <div className="money">456</div>
          </div>
        </RecordItem>
      </RecordsWrapper>
    </Layout>
  );
};

export default React.memo(RecordDetail);
