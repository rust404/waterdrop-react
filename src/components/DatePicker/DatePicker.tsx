import React, {FC, useState} from "react";
import PickerList from "./PickerList";
import {brandColor, grey5} from "../../style/variables";
import styled from "styled-components";
import dayjs from "dayjs";

const Wrapper = styled.div`
  background-color: #fff
`
const Header = styled.div`
  padding: 6px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;

  > button {
    font-size: 16px;
    border: none;
    outline: none;
    background: transparent;
  }

  .cancel-btn {
    color: ${grey5};
  }

  .ok-btn {
    color: ${brandColor};
  }
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  > * {
    flex: 1;
  }
`

export type DatePickerType = 'year' | 'full-date' | 'year-month' | 'month-date'

interface DatePickerProps {
  date: Date,
  pickerType: DatePickerType
  onChange?: (date: Date) => void
  onOk?: (date: Date) => void
  onCancel?: (date: Date) => void
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const {date: pDate, pickerType, onOk, onChange, onCancel} = props
  const [year, setYear] = useState(dayjs(pDate).year())
  const [month, setMonth] = useState(dayjs(pDate).month() + 1)
  const [date, setDate] = useState(dayjs(pDate).date())
  const onYearChange = (val: string) => {
    setYear(parseInt(val))
  }
  const onMonthChange = (val: string) => {
    setMonth(parseInt(val))
  }
  const onDateChange = (val: string) => {
    setDate(parseInt(val))
  }
  const yearList = []
  for (let i = 0; i < 20; i++) {
    yearList.unshift(year - i + '')
  }
  const showYear = pickerType === 'full-date' || pickerType === 'year-month' || pickerType === 'year'
  const showMonth = pickerType === 'full-date' || pickerType === 'year-month' || pickerType === 'month-date'
  const showDate = pickerType === 'full-date' || pickerType === 'month-date'

  let dateStr = ''
  if (pickerType === 'full-date') {
    dateStr = `${year}-${month}-${date}`
  }
  if (pickerType === 'month-date') {
    dateStr = `${month}-${date}`
  }
  if (pickerType === 'year-month') {
    dateStr = `${year}-${month}`
  }

  const daysInMonth =  dayjs().year(year).month(month - 1).daysInMonth()

  const monthList = Array(12).fill(0).map((item, index) => index + 1 + '')

  const dateList =  Array(daysInMonth).fill(0).map((item, index) => index + 1 + '')

  const onClickOk = () => {
    const fullDate = new Date(dayjs().year(year).month(month - 1).date(date).valueOf())
    onChange && onChange(fullDate)
    onOk && onOk(fullDate)
  }
  const onClickCancel = () => {
    const fullDate = new Date(dayjs().year(year).month(month - 1).date(date).valueOf())
    onCancel && onCancel(fullDate)
  }
  return (
    <Wrapper>
      <Header>
        <button className="cancel-btn" onClick={onClickCancel}>取消</button>
        <header className="title">{dateStr}</header>
        <button className="ok-btn" onClick={onClickOk}>确定</button>
      </Header>
      <Container>
        {showYear && <PickerList onChange={onYearChange} value={year + ''} listData={yearList}/>}
        {showMonth && <PickerList onChange={onMonthChange} value={month + ''} listData={monthList}/>}
        {showDate && <PickerList onChange={onDateChange} value={date + ''} listData={dateList}/>}
      </Container>
    </Wrapper>
  )
}

export default DatePicker
