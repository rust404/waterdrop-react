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

const useCalc = () => {
  const [left, setLeft] = useState("0");
  const [right, setRight] = useState("");
  const [op, setOp] = useState("");
  function add(value: string) {
    if ("0123456789".indexOf(value) !== -1) {
      addNumber(value);
    } else if ("+-".indexOf(value) !== -1) {
      addOp(value);
    } else if (value === ".") {
      addDot();
    }
  }
  function addDot() {
    if (op) {
      if (right.indexOf(".") !== -1) return;
      if (right.length === 0) {
        setRight('0.')
      } else {
        setRight(right + '.')
      }
    } else {
      if (left.indexOf('.') !== -1) return;
      setLeft(left + '.')
    }
  }
  function addNumber(value: string) {
    if (op) {
      if (right === "0") {
        setRight(value);
      } else {
        setRight(right + value);
      }
    } else {
      if (left === "0") {
        setLeft(value);
      } else {
        setLeft(left + value);
      }
    }
  }
  function addOp(value: string) {
    if (right) {
      let ret;
      if (op === "+") {
        ret = parseFloat(left) + parseFloat(right);
      } else if (op === "-") {
        ret = parseFloat(left) - parseFloat(right);
      }
      setLeft(ret + "");
      setRight("");
      setOp(value);
    } else {
      setOp(value);
    }
  }
  function getValue() {
    let ret
    if (right.length === 0) {
      ret = parseFloat(left)
    } else {
      if (op === "+") {
        ret = parseFloat(left) + parseFloat(right);
      } else if (op === "-") {
        ret = parseFloat(left) - parseFloat(right);
      }
    }
    return ret
  }
  function clear() {
    setLeft("0");
    setRight("");
    setOp("");
  }
  const expStr = left + op + right
  return {expStr, add, clear, getValue};
};

const NumberPad: React.FC<Props> = props => {
  const {className, onChange} = props;
  const {expStr, add, clear, getValue} = useCalc();
  const calcHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    const value = e.target.dataset["value"];
    if (value === undefined) return;
    add(value);
  };
  const clearHandler = (e: React.MouseEvent<HTMLElement>) => {
    clear();
  };
  const okHandler = (e: React.MouseEvent<HTMLElement>) => {
    onChange({amount: getValue()});
    clear()
  };

  const onPadClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.dataset["value"] === undefined) return;
    const value = e.target.dataset["value"];
    switch (value) {
      case "ok":
        okHandler(e);
        break;
      case "clear":
        clearHandler(e);
        break;
      default:
        calcHandler(e);
        break;
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
