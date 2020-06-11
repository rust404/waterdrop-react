import React from "react";
import styled from "styled-components";

const NumberPadWrapper = styled.section`
  background-color: #ffd947;
  div {
    margin: 12px 12px 0 12px;
    .numberbox {
      font-size: 6.5vw;
      padding: 10px;
      direction: rtl;
      background-color: #fff;
      margin: 0 0 12px 0;
      border-radius: 10px;
      border: 2px solid black;;
    }
    ul {
      margin-right: -12px;
      > li {
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
        :active {
          background-color: grey;
        }
        &.ok {
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
const NumberPad = (props: any) => {
  return (
    <NumberPadWrapper {...props}>
      <div>
        <div className="numberbox">0</div>
        <ul className="clearfix">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>+</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>-</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li className="ok">完成</li>
          <li>.</li>
          <li>0</li>
          <li>清零</li>
        </ul>
      </div>
    </NumberPadWrapper>
  );
};

export default NumberPad;
