import React, {FC} from "react";
import styled from "styled-components";
import {grey2} from "../../../style/variables";

const gap = '10px'
const Wrapper = styled.div`
  padding: ${gap};
  background-color: ${grey2};
  span {
    display: block;
    font-size: 20px;
    padding-right: $gap;
    line-height: 30px;
    border: 1px solid #fff;
    border-radius: 4px;
    background-color: #fff;
    text-align: right;
  }
`

interface CalcStrBarProps {
  calcStr: string
}
const CalcStrBar:FC<CalcStrBarProps> = (props) => {
  const {calcStr} = props
  return (<Wrapper>
    <span>{calcStr}</span>
  </Wrapper>)
}

export default CalcStrBar
