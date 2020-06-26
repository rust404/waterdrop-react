import React, {useEffect, FC} from "react";
import styled from "styled-components";
import useCalcStr from "hooks/useCalcStr";
import useDatePicker from "hooks/useDatePicker";
import Datepicker from "react-mobile-datepicker";

const Wrapper = styled.section`
  background-color: #ffd947;
  .container {
    margin: 12px 12px 0 12px;
    .output {
      font-size: 6.5vw;
      padding: 5px;
      text-align: right;
      background-color: #fff;
      margin: 0 0 12px 0;
      border-radius: 10px;
      border: 2px solid black;
    }
    .button-wrapper {
      margin-right: -12px;
      > button {
        float: left;
        width: calc(25vw - 15px);
        height: 10vw;
        margin: 0 12px 12px 0;
        border-radius: 10px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 6.5vw;
        border: 2px solid black;
        box-shadow: inset 0 -4px rgba(0, 0, 0, 0.25);
        transition: all 0.1s linear;
        :focus {
          outline: none;
        }
        :active {
          background-color: grey;
        }
        &[data-value="ok"] {
          background-color: #f97b94;
          color: #fff;
        }
        &[data-value="date"] {
          font-size: 14px;
        }
      }
    }
  }
`;

interface INumberPadProps {
  amount?: number;
  time: string;
  onChange: (amount: number, time: string) => void;
  className?: string;
}

const NumberPad: FC<INumberPadProps> = props => {
  const {className, onChange, time, amount} = props;
  const {expStr, add, clear, setInitNum, getValue} = useCalcStr(amount);
  const {
    pickerState,
    handleClick,
    handleCancel,
    handleSelect,
    setPickerState
  } = useDatePicker(time);

  useEffect(() => {
    console.log(amount)
    if (amount === undefined) return
    setInitNum(amount || 0);
  }, [amount, setInitNum]);

  useEffect(() => {
    setPickerState(state => {
      return {
        ...state,
        time: new Date(time)
      };
    });
  }, [time, setPickerState]);

  const calcHandler = (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLElement).dataset["value"];
    if (value === undefined) return;
    add(value);
  };
  const clearHandler = () => {
    clear();
  };
  const okHandler = () => {
    onChange(getValue(), pickerState.time.toISOString());
  };

  const onPadClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;

    const value = e.target.dataset["value"];
    if (value === undefined) return;
    switch (value) {
      case "ok":
        okHandler();
        break;
      case "clear":
        clearHandler();
        break;
      default:
        calcHandler(e);
        break;
    }
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
    },
    date: {
      format: "DD",
      caption: "日",
      step: 1
    }
  };
  return (
    <Wrapper className={className}>
      <div className="container">
        <div className="output">{expStr}</div>
        <div onClick={onPadClick} className="button-wrapper clearfix">
          <button data-value="1">1</button>
          <button data-value="2">2</button>
          <button data-value="3">3</button>
          <button data-value="date" onClick={handleClick}>
            {new Date(pickerState.time).toString("yyyy/MM/dd")}
          </button>
          <button data-value="4">4</button>
          <button data-value="5">5</button>
          <button data-value="6">6</button>
          <button data-value="+">+</button>
          <button data-value="7">7</button>
          <button data-value="8">8</button>
          <button data-value="9">9</button>
          <button data-value="-">-</button>
          <button data-value=".">.</button>
          <button data-value="0">0</button>
          <button data-value="clear">清零</button>
          <button data-value="ok">完成</button>
        </div>
      </div>
      <Datepicker
        theme="ios"
        headerFormat="YYYY/MM"
        dateConfig={dateConfig}
        value={pickerState.time}
        onCancel={handleCancel}
        onSelect={handleSelect}
        isOpen={pickerState.isOpen}
      />
    </Wrapper>
  );
};

export default React.memo(NumberPad);
