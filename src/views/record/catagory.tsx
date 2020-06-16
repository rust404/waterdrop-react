import React, { useState } from "react";
import styled from "styled-components";
import Icon from "components/icon";
import { recordDataFieldType } from ".";

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

type Props = {
  catagoryName: string;
  className?: string;
  onChange: (field: recordDataFieldType) => void;
};
const Catagory: React.FC<Props> = (props) => {
  const [list, setList] = useState([
    { name: "餐饮", icon: "canyin" },
    { name: "服饰", icon: "fushi" },
    { name: "读书", icon: "dushu" },
    { name: "交通", icon: "jiaotong" },
    { name: "理财", icon: "licai" },
    { name: "旅行", icon: "lvxing" },
    { name: "日用", icon: "riyongpin" },
    { name: "社交", icon: "shejiao" },
    { name: "添加", icon: "tianjia" },
  ]);
  const handleClick = (e: React.MouseEvent<Element>) => {
    if (!(e.target instanceof Element)) return;
    let target = e.target;
    let li = null;
    // find li
    while (target !== e.currentTarget) {
      if (target.nodeName.toLowerCase() === "li") {
        li = target as HTMLElement;
      }
      target = target.parentNode as Element;
    }
    if (!li) return;
    let index = parseInt(li.dataset["index"] as string);
    // add catagory
    if (index === list.length - 1) {
      const newType = window.prompt("请输入分类");
      if (!newType) return;
      const newList = list.concat();
      newList.splice(-1, 0, {
        name: newType,
        icon: "custom",
      });
      setList(newList);
    } else {
      props.onChange({ catagoryName: list[index].name });
    }
  };
  return (
    <Wrapper className={props.className}>
      <ul onClick={handleClick}>
        {list.map((item, index) => (
          <li key={item.icon + index} data-index={index}>
            <div
              className={`icon-wrapper ${
                item.name === props.catagoryName ? "selected" : ""
              }`}
            >
              <Icon className="icon" id={item.icon} size="60%" />
            </div>
            <p className={props.catagoryName === item.name ? "selected" : ""}>
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Catagory;
