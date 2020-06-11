import React from "react";
import styled from "styled-components";

const MoneyTypeWrapper = styled.section`
  line-height: 48px;
  font-size: 20px;
  background-color: #ffd947;
  box-shadow: 0 2px rgba(0,0,0,0.25);
  > ul {
    display: flex;
    justify-content: center;
    li {
      position: relative;
      width: 60px;
      text-align: center;
    }
    li:last-child {
      margin-left: 10px;
    }
    li.selected:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #000;
    }
  }
`;
const MoneyType = () => {
  return (
    <MoneyTypeWrapper>
      <ul>
        <li className="selected">支出</li>
        <li>收入</li>
      </ul>
    </MoneyTypeWrapper>
  );
};

export default MoneyType;
