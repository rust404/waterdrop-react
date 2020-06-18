import React from "react";
import useCatagory from "./useCatagory";
import styled from "styled-components";
import Icon from "components/icon";
import {recordDataFieldType} from ".";
import {moneyDirectionType} from './useCatagory'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  > ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    li {
      margin-top: 20px;
      position: relative;
      width: 25vw;
      font-size: 4vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-wrapper {
        position: relative;
        width: 18vw;
        height: 18vw;
        margin-bottom: 4px;
        border-radius: 50%;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        &.selected {
          background-color: #ffd947;
        }
      }
    }
  }
`;

interface ICatagoryProps {
  catagoryId: number;
  direction: moneyDirectionType;
  className?: string;
  onChange: (field: recordDataFieldType) => void;
}
const Catagory: React.FC<ICatagoryProps> = props => {
  const {catagory, addCatagory} = useCatagory();
  const {direction} = props
  const handleClick = (e: React.MouseEvent<Element>) => {
    if (!(e.target instanceof Element)) return;
    let target = e.target;
    let li = null;
    // find li
    while (target !== e.currentTarget) {
      if (target.nodeName.toLowerCase() === "li") {
        li = target as HTMLLIElement;
      }
      target = target.parentNode as Element;
    }
    if (!li || !li.dataset["id"]) return;
    let id = parseInt(li.dataset["id"]);
    // add catagory
    props.onChange({catagoryId: id});
  };

  const onAddClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const newType = window.prompt("请输入分类");
    if (!newType) return;
    addCatagory(newType, direction);
    e.stopPropagation()
  }
  return (
    <Wrapper className={props.className}>
      <ul onClick={handleClick}>
        {catagory.filter(item => item.direction === direction).map((item, index) => (
          <li key={item.name + index} data-id={item.id}>
            <div
              className={`icon-wrapper ${
                item.id === props.catagoryId ? "selected" : ""
                }`}
            >
              <Icon className="icon" id={item.icon} size="60%" />
            </div>
            <p className={props.catagoryId === item.id ? "selected" : ""}>
              {item.name}
            </p>
          </li>
        ))}
        <li onClick={onAddClick}>
          <div className="icon-wrapper">
            <Icon className="icon" id="tianjia" size="60%" />
          </div>
          <p>添加</p>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Catagory;
