import React from "react";
import styled from "styled-components";
import Icon from "components/icon";

const CatagoryWrapper = styled.section`
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
      width: 25%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-wrapper {
        position: relative;
        width: 70%;
        height: 0;
        padding-bottom: 70%;
        border-radius: 50%;
        background-color: grey;
        &.selected {
          background-color: #ffd947;
      }
        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%)
        }
      }
    }
  }
`;

const list = [
  {name: "餐饮", icon: "canyin"},
  {name: "服饰", icon: "fushi"},
  {name: "读书", icon: "dushu"},
  {name: "交通", icon: "jiaotong"},
  {name: "理财", icon: "licai"},
  {name: "旅行", icon: "lvxing"},
  {name: "日用", icon: "riyongpin"},
  {name: "日用", icon: "riyongpin"},
  {name: "日用", icon: "riyongpin"},
  {name: "日用", icon: "riyongpin"},
  {name: "社交", icon: "shejiao"},
  {name: "添加", icon: "tianjia"}
];

const Catagory = (props: any) => {
  return (
    <CatagoryWrapper {...props}>
      <ul>
        {list.map(item => (
          <li>
            <div className="icon-wrapper selected">
              <Icon className="icon" id={item.icon} size="60%" />
            </div>
            <p>
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </CatagoryWrapper>
  );
};

export default Catagory;
