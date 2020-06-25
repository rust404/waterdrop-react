import React, {useContext} from "react";
import styled from "styled-components";
import Icon from "components/Icon";
import {MoneyDirection} from 'store/catagoryReducer'
import {useHistory} from "react-router-dom";
import {CatagoryContext} from "store";

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
      width: 20vw;
      font-size: 4vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-wrapper {
        position: relative;
        width: 14vw;
        height: 14vw;
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
  direction: MoneyDirection;
  className?: string;
  onChange: (value: number) => void;
}
const Catagory: React.FC<ICatagoryProps> = props => {
  const {state} = useContext(CatagoryContext);
  const history = useHistory();
  const {direction, catagoryId} = props
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
    if (id === catagoryId) return
    // add catagory
    props.onChange(id);
  };

  const onSettingClick = (e: React.MouseEvent<HTMLLIElement>) => {
    history.push(`/catagory/manage?direction=${direction}`)
    e.stopPropagation()
  }
  return (
    <Wrapper className={props.className}>
      <ul onClick={handleClick}>
        {state.filter(item => item.direction === direction).map((item) => (
          <li key={item.id} data-id={item.id}>
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
        <li onClick={onSettingClick}>
          <div className="icon-wrapper">
            <Icon className="icon" id="settings" size="60%" />
          </div>
          <p>设置</p>
        </li>
      </ul>
    </Wrapper>
  );
};

export default React.memo(Catagory);