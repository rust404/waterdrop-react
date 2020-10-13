import React, {FC, useEffect, useState} from "react";
import dayjs from "dayjs";
import useCalcStr from "../../../hooks/useCalcStr";
import styled from "styled-components";
import {brandColor, grey2} from "../../../style/variables";

const gap = '10px'
const Wrapper = styled.div`
  background: ${grey2};
  display: flex;
  flex-wrap: wrap;
  padding: ${parseInt(gap) / 2}px;

  > button {
    box-sizing: content-box;
    display: inline-block;
    width: calc((100% - ${parseInt(gap)*5}px) / 4);
    margin: ${parseInt(gap) / 2}px;
    font-size: 16px;
    line-height: 2;
    background: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    transition: all 100ms ease-in;

    &:focus {
      outline: none;
    }

    &:active {
      color: #fff;
      background-color: ${brandColor};
    }
    &.clear-button {
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        stroke-width: 0.5
      }
    }
    &.submit-button,
    &.equal-button {
      color: #fff;
      background-color: ${brandColor};

      &:active {
        color: #000;
        background: #fff;
      }
    }

    &.date-picker-button {
      font-size: 14px;
    }
  }
`

interface NumberPadProps {
  date: Date
  amount?: number
  onDateChange: (date: Date) => void
  onCalcStrChange: (str: string) => void
  className: string
  onSubmit: Function
}

const NumberPad: FC<NumberPadProps> = (props) => {
  const {date, amount, onDateChange, onCalcStrChange, onSubmit} = props
  const [curDate, setCurDate] = useState(date || new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const {expStr, add, clear, getValue, setInitNum} = useCalcStr(amount)

  const dateStr = dayjs(curDate).format('YYYY/MM/DD')
  const showEqual = /^.+(\+|-)/.test(expStr)

  useEffect(() => {
    onDateChange(curDate)
  }, [curDate, onDateChange])
  useEffect(() => {
    onCalcStrChange(expStr)
  }, [expStr, onCalcStrChange])
  useEffect(() => {
    amount !== undefined && setInitNum(amount)
  }, [amount, setInitNum])

  const onNumberClick = (num: string) => () => {
    add(num)
  }
  const onDateClick = () => {
    setShowDatePicker(true)
  }
  const onOperatorClick = (operator: '+' | '-') => () => {
    add(operator)
  }
  const onClearClick = () => {
    console.log('clear', amount, expStr)
    clear()
  }
  const onEqualClick = () => {
    getValue()
  }
  const onDotClick = () => {
    add('.')
  }
  const onSubmitClick = () => {
    onSubmit()
  }
  return (
    <Wrapper>
      <button className="calc-button" onClick={onNumberClick('1')}>1</button>
      <button className="calc-button" onClick={onNumberClick('2')}>2</button>
      <button className="calc-button" onClick={onNumberClick('3')}>3</button>
      <button className="date-picker-button" onClick={onDateClick}>{dateStr}</button>
      <button className="calc-button" onClick={onNumberClick('4')}>4</button>
      <button className="calc-button" onClick={onNumberClick('5')}>5</button>
      <button className="calc-button" onClick={onNumberClick('6')}>6</button>
      <button className="calc-button" onClick={onOperatorClick('+')}>+</button>
      <button className="calc-button" onClick={onNumberClick('7')}>7</button>
      <button className="calc-button" onClick={onNumberClick('8')}>8</button>
      <button className="calc-button" onClick={onNumberClick('9')}>9</button>
      <button className="calc-button" onClick={onOperatorClick('-')}>-</button>
      <button className="calc-button" onClick={onDotClick}>.</button>
      <button className="calc-button" onClick={onNumberClick('0')}>0</button>
      <button className="clear-button" onClick={onClearClick}>回退</button>
      {!showEqual ?
        <button className="submit-button" onClick={onSubmitClick}>完成</button>
        :
        <button className="equal-button" onClick={onEqualClick}>=</button>
      }
    </Wrapper>
  )
}

export default NumberPad
