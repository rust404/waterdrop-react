import React from "react";
import styled from "styled-components";

const MoneyTypeWrapper = styled.section`
  line-height: 40px;
  font-size: 16px;
  background-color: #ffd947;
  > ul {
    display: flex;
    justify-content: center;
    li {
      position: relative;
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
