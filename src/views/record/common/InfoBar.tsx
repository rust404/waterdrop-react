import React, {ChangeEvent, FC} from "react";
import styled from "styled-components";
import {grey2} from "../../../style/variables";

const gap = '10px'
const Wrapper = styled.div`
  padding: ${gap};
  background-color: ${grey2};
  > div {
    display: flex;
    font-size: 20px;
    padding: 0px ${gap};
    line-height: 30px;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: #fff;
    text-align: right;
    > input {
      font-size: 14px;
      outline: none;
      border: none;
    }
    > span {
      overflow: auto;
    }
    > * {
      flex: 1;
    }
  }
`

interface CalcStrBarProps {
  calcStr: string
  remarks?: string
  onRemarksChange: (remarks: string) => void
}
const InfoBar:FC<CalcStrBarProps> = (props) => {
  const {calcStr, remarks, onRemarksChange} = props
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onRemarksChange(e.target.value)
  }
  const onBlur = () => {
    // 解决safari失焦时底部空白问题
    document.body.scrollTop = 0
  }
  return (<Wrapper>
    <div>
      <input type="text" value={remarks} onChange={handleOnChange} onBlur={onBlur} placeholder="点击输入备注"/>
      <span>{calcStr}</span>
    </div>
  </Wrapper>)
}

export default InfoBar
