import React from "react";
import styled from "styled-components";
import {recordDataFieldType} from ".";
import useCalc from "./useCalc";

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
  const {expStr, add, clear, getValue} = useCalc();
  const calcHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    const value = e.target.dataset["value"];
    if (value === undefined) return;
    add(value);
  };
  const clearHandler = () => {
    clear();
  };
  const okHandler = () => {
    onChange({amount: getValue()});
    clear()
  };

  const onPadClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.dataset["value"] === undefined) return;
    const value = e.target.dataset["value"];
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
