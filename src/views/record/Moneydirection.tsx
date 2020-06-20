import React from "react";
import {recordDataFieldType} from "./index";
import styled from "styled-components";
import {MoneyDirectionType} from "hooks/useCatagory";

const Wrapper = styled.section`
  line-height: 48px;
  font-size: 20px;
  background-color: #ffd947;
  box-shadow: 0 2px rgba(0, 0, 0, 0.25);
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
interface IMoneyDirectionProps {
  direction: MoneyDirectionType;
  onChange: (field: recordDataFieldType) => void;
}

const MoneyDirection: React.FC<IMoneyDirectionProps> = (props) => {
  const {direction, onChange} = props;
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    const direction = e.target.dataset["direction"] as MoneyDirectionType;
    onChange({direction});
  };
  return (
    <Wrapper>
      <ul>
        <li
          data-direction="EXPENDITURE"
          onClick={handleClick}
          className={direction === MoneyDirectionType.EXPENDITURE ? "selected" : ""}
        >
          支出
        </li>
        <li
          data-direction="INCOME"
          onClick={handleClick}
          className={direction === MoneyDirectionType.INCOME ? "selected" : ""}
        >
          收入
        </li>
      </ul>
    </Wrapper>
  );
};

export default MoneyDirection;
