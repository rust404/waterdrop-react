import React, {useState} from "react";
import styled from "styled-components";
import {recordDataFieldType} from ".";

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
          float: right;
          height: calc(20vw + 12px);
          background-color: #f97b94;
          color: #fff;
          &:active {
            background-color: grey;
          }
        }
      }
    }
  }
`;

type Props = {
  onChange: (field: recordDataFieldType) => void;
  className?: string;
};


const NumberPad: React.FC<Props> = props => {
  const {className, onChange} = props;
  const [localStr, setLocalStr] = useState("0");
  const [left, setLeft] = useState('0')
  const [right, setRight] = useState('')
  const [op, setOp] = useState('')
  const numberHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    const value = e.target.dataset["value"];
    if (value === undefined) return;
    if (op) {
      if (right === '0') {
        setLocalStr(localStr.slice(0, -1) + value)
        setRight(value)
      } else {
        setLocalStr(localStr + value)
        setRight(right + value)
      }
    } else {
      if (left === '0') {
        setLocalStr(value)
        setLeft(value)
      } else {
        setLocalStr(localStr + value)
        setLeft(localStr + value)
      }
    }
  };
  const operationHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    const value = e.target.dataset["value"];
    if (value === undefined) return;
    if (right) {
      let ret
      if (op === '+') {
        ret = parseFloat(left) + parseFloat(right)
      } else if (op === '-') {
        ret = parseFloat(left) - parseFloat(right)
      }
      setLocalStr(ret + value)
      setLeft(ret + '')
      setRight('')
      setOp(value)
    } else {
      setOp(value)
      if (op) {
        setLocalStr(localStr.slice(0, -1) + value)
      } else {
        setLocalStr(localStr + value)
      }
    }
  };
  const clearHandler = (e: React.MouseEvent<HTMLElement>) => {
    setLocalStr("0");
    setLeft('0')
    setRight('')
    setOp('')
  };
  const dotHandler = (e: React.MouseEvent<HTMLElement>) => {
    setLocalStr(localStr + ".");
  };
  const okHandler = (e: React.MouseEvent<HTMLElement>) => {
    onChange({amount: parseInt(localStr)});
  };

  const buttonHandlerMap: {
    [index: string]: (e: React.MouseEvent<HTMLElement>) => void;
  } = {
    ".": dotHandler,
    ok: okHandler,
    clear: clearHandler
  };
  "0123456789".split("").forEach(key => {
    buttonHandlerMap[key] = numberHandler;
  });
  "+-".split("").forEach(key => {
    buttonHandlerMap[key] = operationHandler;
  });
  const onPadClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.dataset["value"] === undefined) return;
    if (localStr.length >= 15) return;
    const value = e.target.dataset["value"];
    buttonHandlerMap[value](e);
  };
  return (
    <Wrapper className={className}>
      <div className="container">
        <div className="output">{localStr}</div>
        <div onClick={onPadClick} className="button-wrapper clearfix">
          <button data-value="1">1</button>
          <button data-value="2">2</button>
          <button data-value="3">3</button>
          <button data-value="+">+</button>
          <button data-value="4">4</button>
          <button data-value="5">5</button>
          <button data-value="6">6</button>
          <button data-value="-">-</button>
          <button data-value="7">7</button>
          <button data-value="8">8</button>
          <button data-value="9">9</button>
          <button data-value="ok">完成</button>
          <button data-value=".">.</button>
          <button data-value="0">0</button>
          <button data-value="clear">清零</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default NumberPad;
